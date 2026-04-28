const { createClient } = require('@sanity/client');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });
dotenv.config({ path: path.resolve(__dirname, '.env') });

const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_TOKEN,
    apiVersion: '2024-03-01',
    useCdn: false,
});

async function migratePriceUnits() {
    console.log('🚀 Starting price unit bulk update...');

    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_TOKEN) {
        console.error('Error: Missing required environment variables (NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN)');
        return;
    }

    try {
        const query = `*[_type == "villa" && defined(seasonalPrices)] { _id, seasonalPrices }`;
        const villas = await client.fetch(query);
        
        let updatedCount = 0;

        for (const villa of villas) {
            let needsUpdate = false;
            
            // We need to build the patch object to modify the array
            // It's easier to just update the entire seasonalPrices array if it needs changes
            const newSeasonalPrices = villa.seasonalPrices.map(season => {
                if (!season.prices) return season;
                
                let seasonNeedsUpdate = false;
                const newPrices = season.prices.map(price => {
                    if (!price.priceUnit) {
                        needsUpdate = true;
                        seasonNeedsUpdate = true;
                        return { ...price, priceUnit: 'week' };
                    }
                    return price;
                });
                
                if (seasonNeedsUpdate) {
                    return { ...season, prices: newPrices };
                }
                return season;
            });

            if (needsUpdate) {
                console.log(`Updating villa: ${villa._id}`);
                await client
                    .patch(villa._id)
                    .set({ seasonalPrices: newSeasonalPrices })
                    .commit();
                updatedCount++;
            }
        }

        console.log(`\n🎉 Bulk Update Complete! Updated ${updatedCount} villas.`);
    } catch (error) {
        console.error('Fatal Error during migration:', error);
    }
}

migratePriceUnits();
