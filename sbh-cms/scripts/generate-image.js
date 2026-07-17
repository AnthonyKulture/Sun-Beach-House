#!/usr/bin/env node
/**
 * Generate a main image for a post using Gemini Imagen 3.
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

const apiKey = process.env.GEMINI_API_KEY
if (!apiKey) { console.error('Error: GEMINI_API_KEY not set'); process.exit(1) }

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
        `Editorial luxury travel photography for the article: "${title}".`,
        `Visual context: ${context}.`,
        excerpt ? `Mood: ${excerpt}.` : '',
        'Style: cinematic wide shot, warm Caribbean golden-hour light, luxury travel magazine.',
        'Technical: 16:9 aspect ratio, sharp focus, high resolution.',
        'Constraints: no text overlays, no logos, no visible human faces.',
        'Location cues: Saint-Barthélemy, French West Indies — turquoise water, white sand, lush tropical vegetation or elegant white architecture.',
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

    const payload = JSON.stringify({
        instances: [{ prompt }],
        parameters: {
            sampleCount:      1,
            aspectRatio:      '16:9',
            safetySetting:    'block_some',
            personGeneration: 'dont_allow',
        },
    })

    const apiUrl = new URL('https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict')
    apiUrl.searchParams.set('key', apiKey)

    const { status, body } = await request(
        {
            hostname: apiUrl.hostname,
            path:     apiUrl.pathname + apiUrl.search,
            method:   'POST',
            headers:  {
                'Content-Type':   'application/json',
                'Content-Length': Buffer.byteLength(payload),
            },
        },
        payload,
    )

    if (status !== 200) {
        const detail = typeof body === 'object' ? JSON.stringify(body).slice(0, 300) : String(body).slice(0, 300)
        throw new Error(`Gemini API ${status}: ${detail}`)
    }

    const b64 = body?.predictions?.[0]?.bytesBase64Encoded
    if (!b64) throw new Error(`No image data in response: ${JSON.stringify(body).slice(0, 200)}`)

    fs.writeFileSync(outPath, Buffer.from(b64, 'base64'))
    console.error(`  ✓ Saved to ${outPath}`)

    // Output the path on stdout for the workflow step to capture
    process.stdout.write(outPath + '\n')
}

main().catch((err) => {
    console.error(`✗ Image generation failed: ${err.message}`)
    process.exit(1)
})
