const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') }); // Try root first
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });    // Then current dir

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_API_TOKEN || process.env.SANITY_WRITE_TOKEN;
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

if (!PROJECT_ID || !TOKEN) {
    console.error('❌ Missing required environment variables:');
    console.error('   NEXT_PUBLIC_SANITY_PROJECT_ID:', PROJECT_ID ? '✅' : '❌');
    console.error('   SANITY_WRITE_TOKEN:', TOKEN ? '✅' : '❌');
    process.exit(1);
}

const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: '2024-03-01',
    token: TOKEN,
    useCdn: false,
});

async function migratePropertyTypes() {
    console.log('\n🏗️ Starting propertyType migration...\n');

    try {
        // Fetch all villas that don't have a propertyType set
        const query = '*[_type == "villa" && !defined(propertyType) && !(_id in path("drafts.**"))]';
        const villas = await client.fetch(query);

        console.log(`📦 Found ${villas.length} villas to process\n`);

        if (villas.length === 0) {
            console.log('✅ No villas need migration.');
            return;
        }

        let successCount = 0;
        let errorCount = 0;

        for (let i = 0; i < villas.length; i++) {
            const villa = villas[i];
            const { _id, name } = villa;

            console.log(`🔄 [${i + 1}/${villas.length}] Processing: ${name}`);

            try {
                await client.patch(_id)
                    .set({ propertyType: 'villa' })
                    .commit();

                successCount++;
                console.log(`  ✅ Updated to "villa"\n`);
            } catch (err) {
                errorCount++;
                console.error(`  ❌ Error migrating ${name}:`, err.message, '\n');
            }
        }

        console.log('\n🎉 Migration complete!');
        console.log(`  ✅ Success: ${successCount}`);
        console.log(`  ❌ Errors: ${errorCount}`);
        console.log(`  📊 Total: ${villas.length}`);

    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migratePropertyTypes();
