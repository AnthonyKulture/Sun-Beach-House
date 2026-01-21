/**
 * Script pour créer les localisations manquantes et assigner les villas
 */

const sanityClient = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = sanityClient.createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6dkdu7j',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    token: process.env.SANITY_WRITE_TOKEN || process.env.SANITY_TOKEN,
    apiVersion: '2024-03-01',
    useCdn: false,
})

// Localisations manquantes à créer
const MISSING_LOCATIONS = [
    { name: 'Anse des Cayes', order: 16 },
    { name: 'Mont Jean', order: 17 },
    { name: 'Camaruche', order: 18 },
    { name: 'Flamands Beach', order: 19 },
    { name: 'Lorient Beach', order: 20 },
    { name: 'Saint-Jean Beach', order: 21 },
    { name: 'Anse des Lézards', order: 22 },
]

// Mapping des villas par localisation
const VILLA_ASSIGNMENTS = {
    'Anse des Cayes': ['Firefly', 'Grace', 'Suite Harbour', 'Coeur de Pirate', 'Marcel', 'Gaillac', 'Nagabaaja'],
    'Mont Jean': ['Celadon', 'Cosmos', 'Nocean', 'Arrow Marine'],
    'Camaruche': ['Veronika', 'Avenstar', 'Star', 'La Carette'],
    'Flamands Beach': ['Ela', 'Maison de la Mer'],
    'Lorient Beach': ['La Plage'],
    'Saint-Jean Beach': ['Sunset Corail', 'Bohemian Blue', 'Wild Banana', 'Coco Mango', 'Le Moulin'],
    'Anse des Lézards': ['Les Lataniers', 'Lo Scoglio'],
}

async function createMissingLocations() {
    console.log('\n📍 Création des localisations manquantes...\n')
    const createdLocations = {}

    for (const location of MISSING_LOCATIONS) {
        try {
            const doc = await client.create({
                _type: 'location',
                name: location.name,
                order: location.order,
            })
            createdLocations[location.name] = doc._id
            console.log(`  ✅ Créé: ${location.name} (${doc._id})`)
        } catch (error) {
            console.error(`  ❌ Erreur pour ${location.name}:`, error.message)
        }
    }

    return createdLocations
}

async function assignVillasToLocations(locationMap) {
    console.log('\n🏠 Attribution des villas aux nouvelles localisations...\n')

    let successCount = 0
    let errorCount = 0
    let notFoundCount = 0

    for (const [locationName, villaNames] of Object.entries(VILLA_ASSIGNMENTS)) {
        const locationId = locationMap[locationName]

        if (!locationId) {
            console.error(`  ⚠️  Localisation "${locationName}" non créée, skip`)
            continue
        }

        console.log(`\n  📌 ${locationName}:`)

        for (const villaName of villaNames) {
            try {
                // Chercher la villa par nom
                const villas = await client.fetch(
                    `*[_type == "villa" && name == $name]`,
                    { name: villaName }
                )

                if (villas.length === 0) {
                    console.log(`    ⚠️  Villa "${villaName}" non trouvée`)
                    notFoundCount++
                    continue
                }

                if (villas.length > 1) {
                    console.log(`    ⚠️  Plusieurs villas trouvées pour "${villaName}", utilisation de la première`)
                }

                const villa = villas[0]

                // Mettre à jour la localisation
                await client
                    .patch(villa._id)
                    .set({
                        location: {
                            _type: 'reference',
                            _ref: locationId,
                        },
                    })
                    .commit()

                successCount++
                console.log(`    ✅ ${villaName}`)
            } catch (error) {
                errorCount++
                console.error(`    ❌ Erreur pour ${villaName}:`, error.message)
            }
        }
    }

    console.log(`\n✨ Attribution terminée: ${successCount} succès, ${notFoundCount} non trouvées, ${errorCount} erreurs`)
}

async function main() {
    console.log('🚀 Démarrage de la création des localisations manquantes...\n')

    try {
        // Étape 1: Créer les localisations
        const locationMap = await createMissingLocations()

        // Étape 2: Assigner les villas
        await assignVillasToLocations(locationMap)

        console.log('\n✅ Opération terminée avec succès!')
        console.log('\n📝 Prochaines étapes:')
        console.log('  1. Vérifiez les villas dans Sanity Studio')
        console.log('  2. Testez les filtres par localisation sur le frontend')
        console.log('  3. Vérifiez la carte interactive')
    } catch (error) {
        console.error('\n❌ Erreur fatale:', error)
        process.exit(1)
    }
}

main()
