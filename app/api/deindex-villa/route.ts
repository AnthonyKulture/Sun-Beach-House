import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = 'https://www.sun-beach-house.com'
const LOCALES = ['fr', 'en', 'es', 'pt']

/**
 * POST /api/deindex-villa
 *
 * Called by the Sanity "Retirer du site" action when a villa is unpublished.
 * Submits a Google Indexing API "URL_DELETED" notification for all locale variants.
 *
 * Body: { villaId: string, slug?: string }
 *
 * Google Indexing API docs:
 * https://developers.google.com/search/apis/indexing-api/v3/quickstart
 *
 * NOTE: Requires a Google service account with Indexing API access.
 * Set GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON in Vercel env vars.
 */
export async function POST(req: NextRequest) {
  const { villaId, slug } = await req.json()

  if (!villaId) {
    return NextResponse.json({ error: 'villaId is required' }, { status: 400 })
  }

  const preferredId = slug || villaId

  // Build all URLs to deindex (4 locales × 1 slug = 4 URLs)
  const urls = LOCALES.map((locale) => `${BASE_URL}/${locale}/villas/${preferredId}`)

  // --- Google Indexing API ---
  const serviceAccountJson = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON

  if (!serviceAccountJson) {
    // Graceful degradation: log the URLs and return a helpful message
    console.warn(
      '[deindex-villa] GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON not set. ' +
        'Villa was unpublished but Google was not notified. ' +
        'URLs to deindex manually:\n' +
        urls.join('\n')
    )
    return NextResponse.json({
      status: 'unpublished_only',
      message: 'Villa dépubliée. Google non notifié (clé API manquante).',
      urls,
    })
  }

  try {
    const serviceAccount = JSON.parse(serviceAccountJson)

    // Get an access token via Google's OAuth2 service account flow
    const accessToken = await getGoogleAccessToken(serviceAccount)

    // Submit URL_DELETED notification for each locale URL
    const results = await Promise.allSettled(
      urls.map((url) =>
        fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify({ url, type: 'URL_DELETED' }),
        }).then(async (r) => {
          if (!r.ok) {
            const text = await r.text()
            throw new Error(`${r.status}: ${text}`)
          }
          return r.json()
        })
      )
    )

    const succeeded = results.filter((r) => r.status === 'fulfilled').length
    const failed = results.filter((r) => r.status === 'rejected')

    if (failed.length > 0) {
      console.error('[deindex-villa] Some notifications failed:', failed)
    }

    return NextResponse.json({
      status: 'ok',
      notified: succeeded,
      failed: failed.length,
      urls,
    })
  } catch (error) {
    console.error('[deindex-villa] Error:', error)
    return NextResponse.json(
      { error: 'Failed to notify Google', detail: String(error), urls },
      { status: 500 }
    )
  }
}

/**
 * Obtain a short-lived Google OAuth2 access token using a service account
 * (JSON Web Token / JWT Bearer flow — no external library needed).
 */
async function getGoogleAccessToken(serviceAccount: {
  client_email: string
  private_key: string
}): Promise<string> {
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const payload = {
    iss: serviceAccount.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }

  const encode = (obj: object) =>
    Buffer.from(JSON.stringify(obj)).toString('base64url')

  const signingInput = `${encode(header)}.${encode(payload)}`

  // Sign using the private key via Web Crypto (Edge-compatible)
  const privateKeyPem = serviceAccount.private_key.replace(/\\n/g, '\n')
  const pemBody = privateKeyPem.replace(/-----[^-]+-----/g, '').replace(/\s/g, '')
  const keyData = Uint8Array.from(atob(pemBody), (c) => c.charCodeAt(0))

  const cryptoKey = await crypto.subtle.importKey(
    'pkcs8',
    keyData.buffer,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  )

  const signatureBuffer = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    cryptoKey,
    new TextEncoder().encode(signingInput)
  )

  const signature = Buffer.from(signatureBuffer).toString('base64url')
  const jwt = `${signingInput}.${signature}`

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })

  if (!tokenRes.ok) {
    throw new Error(`Token fetch failed: ${await tokenRes.text()}`)
  }

  const { access_token } = await tokenRes.json()
  return access_token
}
