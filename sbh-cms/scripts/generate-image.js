#!/usr/bin/env node
/**
 * Generate a main image for a post using the Gemini image models
 * (gemini-2.5-flash-image "nano banana", with fallbacks).
 *
 * Usage:
 *   node scripts/generate-image.js --file=<path-to-post.json> [--output=<path>]
 *
 * Env:
 *   GEMINI_API_KEY  — Google AI Studio key (generativelanguage.googleapis.com)
 *
 * Writes the image to --output (or /tmp/sbh-<slug>.jpg) and prints the path on stdout.
 * Exits 1 on failure so the caller can decide whether to abort or skip.
 */

'use strict'

const fs   = require('fs')
const path = require('path')
const https = require('https')
const os   = require('os')

// ── args ──────────────────────────────────────────────────────────────
const args = process.argv.slice(2).reduce((acc, arg) => {
    if (arg.startsWith('--file='))   acc.file   = arg.slice(7)
    if (arg.startsWith('--output=')) acc.output = arg.slice(9)
    return acc
}, {})

if (!args.file) { console.error('Error: --file=<path> required'); process.exit(1) }

// .trim() matters: a trailing newline pasted into the GitHub secret turns into
// %0A in the request and Google rejects the credential entirely (401 UNAUTHENTICATED).
const apiKey = (process.env.GEMINI_API_KEY || '').trim()
if (!apiKey) { console.error('Error: GEMINI_API_KEY not set'); process.exit(1) }
if (!apiKey.startsWith('AIza')) {
    console.error(`  ⚠  key does not look like a Google AI Studio key (starts with "${apiKey.slice(0, 4)}", length ${apiKey.length}) — expected an "AIza…" key from https://aistudio.google.com/apikey`)
}

const postPath = path.resolve(process.cwd(), args.file)
if (!fs.existsSync(postPath)) { console.error(`Error: not found: ${postPath}`); process.exit(1) }

// ── category → visual context ─────────────────────────────────────────
const CATEGORY_CONTEXT = {
    'services':     'luxury concierge, private chef cooking in a villa kitchen, elegant table setting',
    'destinations': 'Saint-Barthélemy neighborhood, cobblestone streets of Gustavia or scenic coastal viewpoint',
    'saison':       'Saint-Barth marina at golden hour, luxury yachts, festive tropical atmosphere',
    'villas':       'modern infinity-pool luxury villa overlooking the Caribbean Sea, Saint-Barthélemy',
    'guides':       'Saint-Barth beach lifestyle, white sand, turquoise water, palm tree shade',
    'immobilier':   'luxury real estate Saint-Barthélemy, contemporary villa architecture, tropical garden',
    'vie-st-barth': 'authentic Saint-Barth island life, colorful market or scenic hillside panorama',
}

// ── prompt builder ────────────────────────────────────────────────────
function buildPrompt(post) {
    const title    = (post.title?.fr || post.title?.en || 'Saint-Barth luxury')
                         .replace(/[:\[\]«»]/g, ' ').trim()
    const excerpt  = (post.excerpt?.fr || '').slice(0, 120)
    const category = post.category || 'guides'
    const context  = CATEGORY_CONTEXT[category] || 'luxury travel in Saint-Barthélemy'

    const parts = [
        `Travel editorial photograph for the article: "${title}".`,
        `Scene: ${context}.`,
        excerpt ? `Atmosphere: ${excerpt}.` : '',
        'Camera: full-frame mirrorless, 35mm prime lens, f/2.2 aperture, natural available light, slight film grain — real documentary photograph, not an illustration.',
        'Lighting: soft tropical afternoon light or golden hour, realistic shadows, no studio lighting.',
        'Framing: wide environmental shot, off-center composition, authentic sense of place.',
        'Constraints: no text, no logos, no watermarks, no visible human faces, no AI-generated aesthetic, not a painting, not digital art, not CGI.',
        'Location: Saint-Barthélemy, French West Indies — real Caribbean turquoise water, real white coral sand, real lush tropical vegetation, real white Creole architecture.',
    ]

    return parts.filter(Boolean).join(' ')
}

// ── HTTPS helper ──────────────────────────────────────────────────────
function request(options, body) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            const chunks = []
            res.on('data', (c) => chunks.push(c))
            res.on('end', () => {
                const raw = Buffer.concat(chunks).toString('utf-8')
                try { resolve({ status: res.statusCode, body: JSON.parse(raw) }) }
                catch { resolve({ status: res.statusCode, body: raw }) }
            })
        })
        req.on('error', reject)
        if (body) req.write(body)
        req.end()
    })
}

// ── main ──────────────────────────────────────────────────────────────
async function main() {
    const post   = JSON.parse(fs.readFileSync(postPath, 'utf-8'))
    const prompt = buildPrompt(post)
    const slug   = post.slug?.fr?.current || 'article'
    const outPath = args.output || path.join(os.tmpdir(), `sbh-img-${slug}.jpg`)

    console.error(`→ Generating image for "${post.title?.fr || slug}"`)
    console.error(`  Prompt (excerpt): ${prompt.slice(0, 120)}…`)

    // Image-capable models, most recent first.
    // gemini-3.1-flash-image (Nano Banana 2) is the current recommended default (Aug 2026).
    // gemini-3-pro-image is highest quality but slower and pricier.
    // gemini-2.5-flash-image is kept as legacy fallback.
    // Auth via x-goog-api-key header (Google AI Studio keys — Vertex AI needs OAuth2).
    const MODELS = [
        'gemini-3.1-flash-image',
        'gemini-3.1-flash-image-preview',
        'gemini-3-pro-image',
        'gemini-2.5-flash-image',
        'gemini-2.0-flash-preview-image-generation',
    ]
    const CONFIGS = [
        { responseModalities: ['IMAGE'], imageConfig: { aspectRatio: '16:9' } },
        { responseModalities: ['TEXT', 'IMAGE'] },
        undefined, // model defaults
    ]

    let b64 = null
    let lastError = 'no attempt made'

    outer:
    for (const model of MODELS) {
        for (const generationConfig of CONFIGS) {
            const geminiPayload = JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                ...(generationConfig ? { generationConfig } : {}),
            })

            const { status, body } = await request(
                {
                    hostname: 'generativelanguage.googleapis.com',
                    path:     `/v1beta/models/${model}:generateContent`,
                    method:   'POST',
                    headers:  {
                        'Content-Type':   'application/json',
                        'Content-Length': Buffer.byteLength(geminiPayload),
                        'x-goog-api-key': apiKey,
                    },
                },
                geminiPayload,
            )

            if (status === 200) {
                const parts = body?.candidates?.[0]?.content?.parts || []
                b64 = parts.find((p) => p.inlineData?.data)?.inlineData?.data || null
                if (b64) {
                    console.error(`  ✓ model: ${model}`)
                    break outer
                }
                lastError = `${model}: 200 but no image part (finishReason: ${body?.candidates?.[0]?.finishReason}, ${JSON.stringify(body).slice(0, 200)})`
                console.error(`  ✗ ${lastError}`)
                continue
            }

            const detail = typeof body === 'object' ? JSON.stringify(body).slice(0, 250) : String(body).slice(0, 250)
            lastError = `${model} → HTTP ${status}: ${detail}`
            console.error(`  ✗ ${lastError}`)

            // Bad key (401/403, or Google's 400 API_KEY_INVALID): retrying is pointless
            if (status === 401 || status === 403 || detail.includes('API_KEY_INVALID')) break outer
            // 404 = model unknown: skip remaining configs for this model
            if (status === 404) continue outer
            // 400 = payload shape rejected: try next config
        }
    }

    if (!b64) throw new Error(`Gemini image generation exhausted all attempts. Last error: ${lastError}`)

    fs.writeFileSync(outPath, Buffer.from(b64, 'base64'))
    console.error(`  ✓ Saved to ${outPath}`)

    // Output the path on stdout for the workflow step to capture
    process.stdout.write(outPath + '\n')
}

main().catch((err) => {
    console.error(`✗ Image generation failed: ${err.message}`)
    process.exit(1)
})
