/**
 * Migration Script: Convert Bilingual Villa Descriptions to French-Only
 * 
 * This script migrates villa descriptions from the old format:
 *   { description: { fr: "...", en: "..." } }
 * 
 * To the new format:
 *   { description: "..." }
 * 
 * Run with: node scripts/migrate-descriptions-to-french.js
 */

const { createClient } = require('@sanity/client');

// Initialize Sanity client
const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6dkdu7j',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // Must have write permissions
    useCdn: false,
});

async function migrateVillas() {
    console.log('🚀 Starting villa description migration...\n');

    try {
        // Fetch all villas
        const villas = await client.fetch(`*[_type == "villa"] {
      _id,
      _rev,
      title,
      description,
      fullDescription
    }`);

        console.log(`📊 Found ${villas.length} villas to process\n`);

        let successCount = 0;
        let skipCount = 0;
        let errorCount = 0;

        for (const villa of villas) {
            const updates = {};
            let needsUpdate = false;

            // Check if description needs migration (is object with fr/en)
            if (villa.description && typeof villa.description === 'object' && villa.description.fr) {
                updates.description = villa.description.fr;
                needsUpdate = true;
                console.log(`✏️  [${villa.title}] description: "${villa.description.fr.substring(0, 50)}..."`);
            }

            // Check if fullDescription needs migration
            if (villa.fullDescription && typeof villa.fullDescription === 'object' && villa.fullDescription.fr) {
                updates.fullDescription = villa.fullDescription.fr;
                needsUpdate = true;
                console.log(`✏️  [${villa.title}] fullDescription: "${villa.fullDescription.fr.substring(0, 50)}..."`);
            }

            if (needsUpdate) {
                try {
                    await client
                        .patch(villa._id)
                        .set(updates)
                        .commit();

                    successCount++;
                    console.log(`✅ [${villa.title}] Migrated successfully\n`);
                } catch (error) {
                    errorCount++;
                    console.error(`❌ [${villa.title}] Error: ${error.message}\n`);
                }
            } else {
                skipCount++;
                console.log(`⏭️  [${villa.title}] Already in correct format, skipping\n`);
            }
        }

        console.log('\n' + '='.repeat(60));
        console.log('📈 Migration Summary:');
        console.log('='.repeat(60));
        console.log(`✅ Successfully migrated: ${successCount} villa(s)`);
        console.log(`⏭️  Skipped (already migrated): ${skipCount} villa(s)`);
        console.log(`❌ Errors: ${errorCount} villa(s)`);
        console.log('='.repeat(60));

        if (errorCount === 0) {
            console.log('\n🎉 Migration completed successfully!');
            console.log('\n📝 Next steps:');
            console.log('1. Deploy the updated schema: cd sbh-cms && npm run deploy');
            console.log('2. Test the site with different languages');
            console.log('3. Verify translations are working correctly');
        } else {
            console.log('\n⚠️  Migration completed with errors. Please review the errors above.');
        }

    } catch (error) {
        console.error('\n❌ Fatal error during migration:', error);
        process.exit(1);
    }
}

// Check for required environment variables
if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN environment variable is required');
    console.error('Please set it in your .env.local file or pass it when running the script');
    console.error('\nExample: SANITY_API_TOKEN=sk... node scripts/migrate-descriptions-to-french.js');
    process.exit(1);
}

// Run migration
migrateVillas();
