const { createClient } = require('@sanity/client');
const path = require('path');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_WRITE_TOKEN) {
    console.error('Error: Missing required environment variables (NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN)');
    process.exit(1);
}

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_WRITE_TOKEN,
    apiVersion: '2024-03-01',
    useCdn: false,
});

// Configuration
const DRY_RUN = false; // Set to false to apply changes

const MONTH_MAPPINGS = [
    { regex: /\b(jan|janv)\.?\b/gi, replacement: 'janvier' },
    { regex: /\b(fev|fév)\.?\b/gi, replacement: 'février' },
    { regex: /\b(mar|mars)\.?\b/gi, replacement: 'mars' },
    { regex: /\b(avr|av)\.?\b/gi, replacement: 'avril' },
    { regex: /\b(mai)\.?\b/gi, replacement: 'mai' },
    { regex: /\b(jun|juin)\.?\b/gi, replacement: 'juin' },
    { regex: /\b(jul|juil|jui)\.?\b/gi, replacement: 'juillet' },
    { regex: /\b(aou|août|aout)\.?\b/gi, replacement: 'août' },
    { regex: /\b(sep|sept)\.?\b/gi, replacement: 'septembre' },
    { regex: /\b(oct)\.?\b/gi, replacement: 'octobre' },
    { regex: /\b(nov)\.?\b/gi, replacement: 'novembre' },
    { regex: /\b(dec|déc)\.?\b/gi, replacement: 'décembre' },
];

async function normalizeDates() {
    console.log(`🚀 Starting date normalization... (DRY_RUN: ${DRY_RUN})`);

    try {
        const villas = await client.fetch(`*[_type == "villa" && defined(seasonalPrices)]`);
        let updateCount = 0;

        for (const villa of villas) {
            let hasChanges = false;
            const newSeasonalPrices = villa.seasonalPrices.map(price => {
                if (!price.dates) return price;

                let newDates = price.dates;

                // Apply all mappings
                for (const mapping of MONTH_MAPPINGS) {
                    newDates = newDates.replace(mapping.regex, mapping.replacement);
                }

                // Clean up any double spaces created
                newDates = newDates.replace(/\s+/g, ' ').trim();

                if (newDates !== price.dates) {
                    console.log(`📝 [${villa.name}] "${price.dates}" -> "${newDates}"`);
                    hasChanges = true;
                    return { ...price, dates: newDates };
                }
                return price;
            });

            if (hasChanges) {
                updateCount++;
                if (!DRY_RUN) {
                    await client
                        .patch(villa._id)
                        .set({ seasonalPrices: newSeasonalPrices })
                        .commit();
                    console.log(`✅ Updated ${villa.name}`);
                } else {
                    console.log(`ℹ️ [Dry Run] Would update ${villa.name}`);
                }
            }
        }

        console.log(`\n🎉 Process Complete!`);
        console.log(`Villas requiring updates: ${updateCount}`);

        if (DRY_RUN && updateCount > 0) {
            console.log('Set DRY_RUN = false in the script to apply changes.');
        }

    } catch (error) {
        console.error('Fatal Error:', error);
    }
}

normalizeDates();
