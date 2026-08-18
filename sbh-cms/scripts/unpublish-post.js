#!/usr/bin/env node
/**
 * Unpublish an editorial post from Sanity, without opening the Studio.
 *
 * Mirrors the "Retirer du site" villa action (sbh-cms/actions/unpublishAndDeindexAction.ts):
 * the published document is deleted so the public API stops returning it, while a
 * draft is kept so nothing is lost and the post can be re-published later.
 *
 * Usage:
 *   node scripts/unpublish-post.js --slug=<slug-fr> [--delete-draft] [--dry-run]
 *
 * Flags:
 *   --slug=<slug>     Required. French slug, e.g. "st-barth-cata-cup-2026".
 *   --delete-draft    Also delete the draft — removes the post from Sanity entirely.
 *   --dry-run         Report what would happen, write nothing.
 *
 * Env (same as import-post.js):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_WRITE_TOKEN
 *
 * Exit codes: 0 on success (including "already unpublished"), 1 on error.
 */

const path = require('path')
const sanityClient = require('@sanity/client')
require('dotenv').config({path: path.join(__dirname, '..', '.env.local')})

const args = process.argv.slice(2).reduce((acc, arg) => {
    if (arg.startsWith('--slug=')) acc.slug = arg.slice(7)
    else if (arg === '--delete-draft') acc.deleteDraft = true
    else if (arg === '--dry-run') acc.dryRun = true
    return acc
}, {})

if (!args.slug) {
    console.error('Error: --slug=<slug-fr> is required')
    process.exit(1)
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6dkdu7j'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN

if (!token && !args.dryRun) {
    console.error('Error: SANITY_WRITE_TOKEN (or SANITY_TOKEN) missing')
    process.exit(1)
}

const client = sanityClient.createClient({
    projectId,
    dataset,
    token: token || 'dry-run-no-token',
    apiVersion: '2024-03-01',
    useCdn: false,
})

const publishedId = `post-${args.slug}`
const draftId = `drafts.post-${args.slug}`

async function main() {
    console.log(`\n→ Looking up post "${args.slug}" in ${projectId}/${dataset}`)

    const [published, draft] = await Promise.all([
        client.getDocument(publishedId).catch(() => null),
        client.getDocument(draftId).catch(() => null),
    ])

    console.log(`  published (${publishedId}): ${published ? 'found' : 'absent'}`)
    console.log(`  draft     (${draftId}): ${draft ? 'found' : 'absent'}`)

    if (!published && !draft) {
        console.error(`\n✗ No document found for slug "${args.slug}". Nothing to do.`)
        console.error(`  Check the slug — it must be the French one, without the "post-" prefix.`)
        process.exit(1)
    }

    if (!published) {
        console.log(`\n✓ Already unpublished — the published document does not exist.`)
        if (!args.deleteDraft) return
    }

    if (args.dryRun) {
        console.log(`\n[DRY-RUN] Would delete: ${published ? publishedId : '(nothing)'}` +
            `${args.deleteDraft && draft ? ` and ${draftId}` : ''}`)
        if (published && !draft && !args.deleteDraft) {
            console.log(`[DRY-RUN] Would first copy ${publishedId} → ${draftId} to preserve the content.`)
        }
        return
    }

    const tx = client.transaction()

    // Preserve the content as a draft before removing the published version,
    // unless a draft already exists (it would be the newer copy) or the caller
    // explicitly asked for a full removal.
    if (published && !draft && !args.deleteDraft) {
        const {_id, _rev, _createdAt, _updatedAt, ...content} = published
        tx.createIfNotExists({...content, _id: draftId, _type: 'post'})
        console.log(`\n→ Preserving content as draft ${draftId}`)
    }

    if (published) tx.delete(publishedId)
    if (args.deleteDraft && draft) tx.delete(draftId)

    await tx.commit({visibility: 'async'})

    if (args.deleteDraft) {
        console.log(`\n✓ Removed "${args.slug}" from Sanity entirely (published + draft).`)
    } else {
        console.log(`\n✓ Unpublished "${args.slug}". The site no longer serves it; the draft is kept in Studio.`)
        console.log(`  Re-publish later from Studio, or re-run the import workflow on its post.json.`)
    }
}

main().catch((err) => {
    console.error('\n✗ Unpublish failed:', err.message)
    if (err.statusCode) console.error(`  HTTP ${err.statusCode}`)
    process.exit(1)
})
