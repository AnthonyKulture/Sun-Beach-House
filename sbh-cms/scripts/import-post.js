#!/usr/bin/env node
/**
 * Import an editorial post.json (produced by sbh-editorial agent) into Sanity.
 *
 * Usage:
 *   node scripts/import-post.js --file=<path-to-post.json> [--image=<path>] [--publish] [--dry-run]
 *
 * Flags:
 *   --file=<path>     Required. Path to post.json (relative to cwd or absolute).
 *   --image=<path>    Optional. Local image to upload as mainImage. Inherits alt fields
 *                     already present in post.json mainImage block.
 *   --publish         Optional. Force status = "published" (overrides post.json).
 *   --dry-run         Optional. Validate + look up references but do NOT write to Sanity.
 *
 * Env (from sbh-cms/.env.local):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID
 *   NEXT_PUBLIC_SANITY_DATASET
 *   SANITY_WRITE_TOKEN   (must have write access)
 *
 * Idempotency:
 *   The Sanity document _id is derived from slug.fr.current → "post-<slug>".
 *   Re-running with the same slug updates the existing document (createOrReplace).
 */

const fs = require('fs')
const path = require('path')
const sanityClient = require('@sanity/client')
require('dotenv').config({path: path.join(__dirname, '..', '.env.local')})

// ──────────────────────────────────────────────────────────────────────
// Arg parsing
// ──────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2).reduce((acc, arg) => {
    if (arg.startsWith('--file=')) acc.file = arg.slice(7)
    else if (arg.startsWith('--image=')) acc.image = arg.slice(8)
    else if (arg === '--publish') acc.publish = true
    else if (arg === '--dry-run') acc.dryRun = true
    return acc
}, {})

if (!args.file) {
    console.error('Error: --file=<path-to-post.json> is required')
    process.exit(1)
}

const postPath = path.resolve(process.cwd(), args.file)
if (!fs.existsSync(postPath)) {
    console.error(`Error: file not found: ${postPath}`)
    process.exit(1)
}

// ──────────────────────────────────────────────────────────────────────
// Env validation
// ──────────────────────────────────────────────────────────────────────
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6dkdu7j'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN

if (!token && !args.dryRun) {
    console.error('Error: SANITY_WRITE_TOKEN (or SANITY_TOKEN) missing in .env.local')
    console.error('       Generate one at https://www.sanity.io/manage → project → API → Tokens (Editor role)')
    process.exit(1)
}

const client = sanityClient.createClient({
    projectId,
    dataset,
    token: token || 'dry-run-no-token',
    apiVersion: '2024-03-01',
    useCdn: false,
})

// ──────────────────────────────────────────────────────────────────────
// Validation
// ──────────────────────────────────────────────────────────────────────
function validatePost(post) {
    const errors = []
    if (post._type !== 'post') errors.push('_type must be "post"')
    if (!post.title?.fr) errors.push('title.fr is required')
    if (!post.slug?.fr?.current) errors.push('slug.fr.current is required')
    if (!post.body?.fr) errors.push('body.fr is required')
    if (!post.category) errors.push('category is required')
    if (post.title?.fr?.length > 120) errors.push(`title.fr too long (${post.title.fr.length} > 120)`)
    if (post.excerpt?.fr?.length > 170) errors.push(`excerpt.fr too long (${post.excerpt.fr.length} > 170)`)

    const allowedCategories = [
        'vie-st-barth', 'services', 'villas', 'saison',
        'immobilier', 'destinations', 'guides',
    ]
    if (post.category && !allowedCategories.includes(post.category)) {
        errors.push(`category "${post.category}" not in allowed list: ${allowedCategories.join(', ')}`)
    }

    // Anti-hallucination quick scan
    const bodyAll = ['fr', 'en', 'es', 'pt']
        .map((l) => post.body?.[l] || '')
        .join('\n')
    const verifMatches = bodyAll.match(/\[À VÉRIFIER\]/g)
    if (verifMatches && verifMatches.length > 0) {
        errors.push(
            `Found ${verifMatches.length} "[À VÉRIFIER]" marker(s) in body. ` +
            `Resolve them before importing, or pass --force-with-flags (not implemented).`,
        )
    }
    return errors
}

// ──────────────────────────────────────────────────────────────────────
// Resolve relatedVillaSlugs → Sanity references
// ──────────────────────────────────────────────────────────────────────
async function resolveVillaSlugs(slugs) {
    if (!slugs || slugs.length === 0) return []

    const query = '*[_type == "villa" && slug.current in $slugs]{_id, "slug": slug.current, name}'
    const villas = await client.fetch(query, {slugs})

    const found = new Map(villas.map((v) => [v.slug, v._id]))
    const missing = slugs.filter((s) => !found.has(s))

    if (missing.length > 0) {
        console.warn(`  ! Villa slug(s) not found in Sanity, skipping: ${missing.join(', ')}`)
    }

    return slugs
        .filter((s) => found.has(s))
        .map((s, i) => ({
            _type: 'reference',
            _ref: found.get(s),
            _key: `villa-ref-${i}`,
        }))
}

// ──────────────────────────────────────────────────────────────────────
// Upload main image
// ──────────────────────────────────────────────────────────────────────
async function uploadImage(imagePath, altFields) {
    const absPath = path.resolve(process.cwd(), imagePath)
    if (!fs.existsSync(absPath)) {
        throw new Error(`Image not found: ${absPath}`)
    }
    console.log(`  Uploading image: ${absPath}`)
    const asset = await client.assets.upload('image', fs.createReadStream(absPath), {
        filename: path.basename(absPath),
    })
    return {
        _type: 'image',
        asset: {_type: 'reference', _ref: asset._id},
        ...altFields,
    }
}

// ──────────────────────────────────────────────────────────────────────
// Transform: post.json → Sanity document
// ──────────────────────────────────────────────────────────────────────
async function transformForSanity(post) {
    const slug = post.slug.fr.current
    const doc = {
        _id: `post-${slug}`,
        _type: 'post',
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        body: post.body,
        category: post.category,
        tags: post.tags || [],
        targetKeywords: post.targetKeywords,
        seoTitle: post.seoTitle,
        seoDescription: post.seoDescription,
        sources: (post.sources || []).map((s, i) => ({
            _key: `source-${i}`,
            _type: 'object',
            ...s,
        })),
        author: post.author || 'Sun Beach House',
        publishedAt: post.publishedAt || new Date().toISOString(),
        updatedAt: post.updatedAt,
        status: args.publish ? 'published' : post.status || 'draft',
        verificationNotes: post.verificationNotes || '',
    }

    // Resolve villa references
    if (post.relatedVillaSlugs && post.relatedVillaSlugs.length > 0) {
        console.log(`  Resolving ${post.relatedVillaSlugs.length} villa reference(s)…`)
        doc.relatedVillas = await resolveVillaSlugs(post.relatedVillaSlugs)
    }

    // Upload image if provided
    if (args.image) {
        const existingMainImage = post.mainImage || {}
        const altFields = {
            alt: existingMainImage.alt || post.title.fr,
            alt_en: existingMainImage.alt_en,
            alt_es: existingMainImage.alt_es,
            alt_pt: existingMainImage.alt_pt,
            credit: existingMainImage.credit,
        }
        doc.mainImage = await uploadImage(args.image, altFields)
    } else if (post.mainImage?.asset) {
        // Image already specified inline (e.g. existing asset reference)
        doc.mainImage = post.mainImage
    }

    return doc
}

// ──────────────────────────────────────────────────────────────────────
// Main
// ──────────────────────────────────────────────────────────────────────
async function main() {
    console.log(`\n→ Reading ${postPath}`)
    const raw = fs.readFileSync(postPath, 'utf-8')
    let post
    try {
        post = JSON.parse(raw)
    } catch (e) {
        console.error(`Error: invalid JSON in ${postPath}: ${e.message}`)
        process.exit(1)
    }

    console.log(`→ Validating…`)
    const errors = validatePost(post)
    if (errors.length > 0) {
        console.error('Validation failed:')
        errors.forEach((e) => console.error(`  ✗ ${e}`))
        process.exit(1)
    }
    console.log(`  ✓ schema OK`)

    console.log(`→ Transforming…`)
    const doc = await transformForSanity(post)
    console.log(`  ✓ document _id: ${doc._id}`)
    console.log(`  ✓ status: ${doc.status}`)
    console.log(`  ✓ languages: ${Object.keys(doc.body).filter((l) => doc.body[l]).join(', ')}`)
    console.log(`  ✓ sources: ${doc.sources.length}`)
    console.log(`  ✓ related villas: ${doc.relatedVillas?.length || 0}`)

    if (args.dryRun) {
        console.log(`\n[DRY-RUN] Skipping write to Sanity.`)
        console.log(`\nPreview of doc structure:`)
        console.log(JSON.stringify(
            {...doc, body: Object.fromEntries(Object.entries(doc.body).map(([k, v]) => [k, `<${v.length} chars>`]))},
            null,
            2,
        ).slice(0, 2000) + '…')
        return
    }

    console.log(`→ Writing to Sanity (${projectId}/${dataset})…`)
    const result = await client.createOrReplace(doc)
    console.log(`  ✓ saved as ${result._id} (rev: ${result._rev})`)

    const studioUrl = `https://${projectId}.sanity.studio/structure/post;${result._id}`
    console.log(`\n✓ Done. Open in Studio:`)
    console.log(`  ${studioUrl}\n`)
}

main().catch((err) => {
    console.error('\n✗ Import failed:', err.message)
    if (err.statusCode) console.error(`  HTTP ${err.statusCode}`)
    if (err.responseBody) console.error(`  ${err.responseBody}`)
    process.exit(1)
})
