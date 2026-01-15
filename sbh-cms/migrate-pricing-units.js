const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables from .env.local and .env
dotenv.config({ path: path.resolve(__dirname, '.env.local') }); // Current dir
dotenv.config({ path: path.resolve(__dirname, '../.env.local') }); // Parent dir (fallback)
dotenv.config({ path: path.resolve(__dirname, '../.env') }); // Parent .env (fallback)

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_WRITE_TOKEN) {
    console.error('Error: Missing required environment variables (NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN)');
    process.exit(1);
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: '2024-01-01',
    useCdn: false,
});

const CSV_PATH = path.resolve(__dirname, '../rental-properties.csv');

async function migratePricing() {
    console.log('🚀 Starting pricing unit migration...');

    try {
        const csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
        const lines = csvContent.split(/\r?\n/).filter(line => line.trim() !== '');

        if (lines.length < 2) {
            console.error('Error: CSV file is empty or has no data rows');
            return;
        }

        // Parse Headers
        const headerLine = lines[0].replace(/^\uFEFF/, ''); // Remove BOM if present
        const headers = headerLine.split(';').map(h => h.trim().replace(/^"|"$/g, ''));

        // Find column indices
        const slugIndex = headers.findIndex(h => h.toLowerCase() === 'slug' || h.toLowerCase() === 'url');
        const priceIndex = headers.findIndex(h => h.toLowerCase() === 'tarif le plus bas' || h.includes('tarif'));

        console.log('Headers detected:', headers);
        console.log(`Indices -> Slug: ${slugIndex}, Price: ${priceIndex}`);

        if (slugIndex === -1 || priceIndex === -1) {
            console.error('Error: Could not find required columns (Slug or Tarif le plus bas)');
            return;
        }

        let successCount = 0;
        let errorCount = 0;

        // Process each line
        for (let i = 1; i < lines.length; i++) {
            const line = lines[i];
            const columns = line.split(';').map(c => c.trim().replace(/^"|"$/g, ''));

            if (columns.length <= Math.max(slugIndex, priceIndex)) continue; // Skip malformed lines

            const slug = columns[slugIndex];
            const rawPriceString = columns[priceIndex];

            if (!slug) continue;

            // Parse Price String
            // Formats: "1250 per night" or "22000 per week"
            const priceMatch = rawPriceString.match(/([\d\s]+)\s+(per night|per week)/i);

            let pricePerNight = null;
            let pricePerWeek = null;
            let updateNeeded = false;

            if (priceMatch) {
                const numericValue = parseInt(priceMatch[1].replace(/\s/g, ''), 10);
                const unit = priceMatch[2].toLowerCase();

                if (unit === 'per night') {
                    pricePerNight = numericValue;
                    pricePerWeek = null; // Clear weekly price to avoid confusion? Or keep it? 
                    // Plan said: "If per night: Update Sanity pricePerNight = value. Set pricePerWeek = null"
                    // Actually, let's unset the other field to be clean.
                } else if (unit === 'per week') {
                    pricePerWeek = numericValue;
                    pricePerNight = null;
                }
                updateNeeded = true;
            } else {
                console.warn(`⚠️  Row ${i + 1}: Could not parse price format for ${slug} ("${rawPriceString}"). Skipping.`);
                continue;
            }

            if (updateNeeded) {
                try {
                    // Find document ID by slug
                    const query = `*[_type == "villa" && slug.current == $slug][0]._id`;
                    const docId = await client.fetch(query, { slug });

                    if (docId) {
                        const patch = client.patch(docId);

                        if (pricePerNight !== null) {
                            patch.set({ pricePerNight: pricePerNight });
                            patch.unset(['pricePerWeek']); // Explicitly remove invalid field
                            console.log(`✅ ${slug}: Set Nightly=${pricePerNight} (Cleared Weekly)`);
                        } else {
                            patch.set({ pricePerWeek: pricePerWeek });
                            patch.unset(['pricePerNight']); // Explicitly remove invalid field
                            console.log(`✅ ${slug}: Set Weekly=${pricePerWeek} (Cleared Nightly)`);
                        }

                        await patch.commit();
                        successCount++;
                    } else {
                        console.warn(`⚠️  Villa not found in Sanity: ${slug}`);
                        errorCount++;
                    }
                } catch (err) {
                    console.error(`❌ Error updating ${slug}:`, err.message);
                    errorCount++;
                }
            }
        }

        console.log(`\n🎉 Migration Complete!`);
        console.log(`Successful updates: ${successCount}`);
        console.log(`Errors/Skipped: ${errorCount}`);

    } catch (error) {
        console.error('Fatal Error during migration:', error);
    }
}

migratePricing();
