const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');


// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const TOKEN = process.env.SANITY_WRITE_TOKEN;
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

// Use Google Cloud Translation API
const { Translate } = require('@google-cloud/translate').v2;

// Initialize Google Translate client
const translate = new Translate({
    key: process.env.GOOGLE_TRANSLATE_API_KEY
});

async function translateText(text, targetLang = 'fr') {
    const maxRetries = 3;
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Google Translate API call
            const [translation] = await translate.translate(text, targetLang);

            // Verify translation is different from original
            if (translation === text) {
                console.error(`  ⚠️  Translation identical to original (attempt ${attempt}/${maxRetries})`);
                if (attempt < maxRetries) {
                    await delay(1000 * attempt); // Exponential backoff
                    continue;
                }
                return text; // Fallback after all retries
            }

            return translation;

        } catch (err) {
            lastError = err;
            console.error(`  ⚠️  Translation error (attempt ${attempt}/${maxRetries}):`, err.message);

            if (attempt < maxRetries) {
                await delay(1000 * attempt); // Exponential backoff
            }
        }
    }

    // All retries failed
    console.error('  ❌ All translation attempts failed, using original text');
    console.error('  Last error:', lastError?.message);
    return text;
}

// Add delay to avoid rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function migrateDescriptionsToI18n() {
    console.log('\n🌍 Starting AI-powered i18n migration for villa descriptions...\n');
    console.log('⚙️  Mode: FORCE RE-TRANSLATION (will update even if structure exists)\n');

    try {
        // Fetch all villas
        const villas = await client.fetch('*[_type == "villa" && !(_id in path("drafts.**"))]');
        console.log(`📦 Found ${villas.length} villas to process\n`);

        let successCount = 0;
        let errorCount = 0;
        let skippedCount = 0;

        for (let i = 0; i < villas.length; i++) {
            const villa = villas[i];
            const { _id, name, description, fullDescription } = villa;

            console.log(`🔄 [${i + 1}/${villas.length}] Processing: ${name}`);

            try {
                const patch = client.patch(_id);
                let needsUpdate = false;

                // Migrate description - Extract EN, translate to FR
                if (description) {
                    const enDescription = typeof description === 'string' ? description : description.en;

                    if (enDescription) {
                        console.log(`  🇬🇧 EN: "${enDescription.substring(0, 60)}..."`);
                        console.log(`  🤖 Translating to French...`);

                        const frDescription = await translateText(enDescription);
                        await delay(800); // Longer delay for better API reliability

                        console.log(`  🇫🇷 FR: "${frDescription.substring(0, 60)}..."`);

                        // Verify translation is different
                        if (frDescription === enDescription) {
                            console.log(`  ⚠️  WARNING: Translation identical to original, keeping EN text`);
                        }

                        patch.set({
                            description: {
                                en: enDescription,
                                fr: frDescription,
                            }
                        });
                        needsUpdate = true;
                    }
                }

                // Migrate fullDescription - Extract EN, translate to FR
                if (fullDescription) {
                    const enFullDescription = typeof fullDescription === 'string' ? fullDescription : fullDescription.en;

                    if (enFullDescription) {
                        console.log(`  🤖 Translating full description to French...`);

                        const frFullDescription = await translateText(enFullDescription);
                        await delay(800); // Longer delay for better API reliability

                        // Verify translation is different
                        if (frFullDescription === enFullDescription) {
                            console.log(`  ⚠️  WARNING: Full description translation identical to original`);
                        }

                        patch.set({
                            fullDescription: {
                                en: enFullDescription,
                                fr: frFullDescription,
                            }
                        });
                        needsUpdate = true;
                    }
                }

                if (needsUpdate) {
                    await patch.commit();
                    successCount++;
                    console.log(`  ✅ Migrated successfully\n`);
                } else {
                    skippedCount++;
                    console.log(`  ⏭️  Skipped (no content to migrate)\n`);
                }

            } catch (err) {
                errorCount++;
                console.error(`  ❌ Error migrating ${name}:`, err.message, '\n');
            }

            // Delay between villas to be nice to the API
            if (i < villas.length - 1) {
                await delay(1200);
            }
        }

        console.log('\n🎉 Migration complete!');
        console.log(`  ✅ Success: ${successCount}`);
        console.log(`  ⏭️  Skipped (no content): ${skippedCount}`);
        console.log(`  ❌ Errors: ${errorCount}`);
        console.log(`  📊 Total: ${villas.length}`);

        console.log('\n💡 Note: AI translations have been generated.');
        console.log('   You can review and refine them in Sanity Studio if needed.\n');

    } catch (error) {
        console.error('\n❌ Migration failed:', error);
        process.exit(1);
    }
}

// Run migration
migrateDescriptionsToI18n();
