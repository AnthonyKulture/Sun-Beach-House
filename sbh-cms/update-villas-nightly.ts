import { getCliClient } from 'sanity/cli';

const client = getCliClient();

async function publishVillasNightly() {
    console.log('🚀 Publishing night pricing for specific villas...');

    const villaNames = [
        'Wild banana',
        'Sunset corail',
        'Bohemian blue',
        'Coco mango'
    ];

    try {
        // Query BOTH drafts and published versions
        const query = `*[_type == "villa" && name match "Wild banana" || name match "Sunset corail" || name match "Bohemian blue" || name match "Coco mango"] { _id, name, seasonalPrices }`;
        const villas = await client.fetch(query);
        
        let updatedCount = 0;

        for (const villa of villas) {
            const isMatch = villaNames.some(name => villa.name.toLowerCase().includes(name.toLowerCase()));
            if (!isMatch) continue;

            if (!villa.seasonalPrices || villa.seasonalPrices.length === 0) continue;

            let needsUpdate = false;
            
            const newSeasonalPrices = villa.seasonalPrices.map(season => {
                if (!season.prices) return season;
                
                let seasonNeedsUpdate = false;
                const newPrices = season.prices.map(price => {
                    if (price.priceUnit !== 'night') {
                        needsUpdate = true;
                        seasonNeedsUpdate = true;
                        return { ...price, priceUnit: 'night' };
                    }
                    return price;
                });
                
                if (seasonNeedsUpdate) {
                    return { ...season, prices: newPrices };
                }
                return season;
            });

            if (needsUpdate) {
                console.log(`🔄 Updating published villa: ${villa.name} (${villa._id})`);
                await client
                    .patch(villa._id)
                    .set({ seasonalPrices: newSeasonalPrices })
                    .commit();
                updatedCount++;
            }
        }

        console.log(`\n🎉 Bulk Update Complete! Updated ${updatedCount} documents.`);
    } catch (error) {
        console.error('Fatal Error during migration:', error);
    }
}

publishVillasNightly();
