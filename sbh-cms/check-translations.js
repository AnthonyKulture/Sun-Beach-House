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
    console.error('❌ Missing required environment variables');
    process.exit(1);
}

const client = createClient({
    projectId: PROJECT_ID,
    dataset: DATASET,
    apiVersion: '2024-03-01',
    token: TOKEN,
    useCdn: false,
});

async function checkTranslations() {
    console.log('\n🔍 Checking translation quality for 5 sample villas...\n');

    const villas = await client.fetch(`
        *[_type == "villa" && !(_id in path("drafts.**"))][0...5]{
            name,
            description,
            fullDescription
        }
    `);

    villas.forEach((villa, idx) => {
        console.log(`\n${'='.repeat(80)}`);
        console.log(`Villa ${idx + 1}: ${villa.name}`);
        console.log(`${'='.repeat(80)}\n`);

        // Check description
        console.log('📝 DESCRIPTION:');
        if (typeof villa.description === 'string') {
            console.log('  ⚠️  Still a string (not migrated)');
            console.log(`  Value: "${villa.description.substring(0, 100)}..."`);
        } else if (villa.description) {
            console.log(`  ✅ Object structure detected`);
            console.log(`  🇬🇧 EN: "${(villa.description.en || '').substring(0, 80)}..."`);
            console.log(`  🇫🇷 FR: "${(villa.description.fr || '').substring(0, 80)}..."`);

            // Check if FR is actually different from EN
            if (villa.description.fr === villa.description.en) {
                console.log('  ⚠️  WARNING: FR and EN are identical!');
            }
        }

        // Check fullDescription
        console.log('\n📖 FULL DESCRIPTION:');
        if (typeof villa.fullDescription === 'string') {
            console.log('  ⚠️  Still a string (not migrated)');
            console.log(`  Value: "${villa.fullDescription.substring(0, 100)}..."`);
        } else if (villa.fullDescription) {
            console.log(`  ✅ Object structure detected`);
            console.log(`  🇬🇧 EN: "${(villa.fullDescription.en || '').substring(0, 80)}..."`);
            console.log(`  🇫🇷 FR: "${(villa.fullDescription.fr || '').substring(0, 80)}..."`);

            // Check if FR is actually different from EN
            if (villa.fullDescription.fr === villa.fullDescription.en) {
                console.log('  ⚠️  WARNING: FR and EN are identical!');
            }
        }
    });

    console.log(`\n${'='.repeat(80)}\n`);
}

checkTranslations().catch(console.error);
