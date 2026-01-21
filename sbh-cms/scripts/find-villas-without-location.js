/**
 * Script pour trouver et corriger les villas sans localisation
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

async function findVillasWithoutLocation() {
    console.log('🔍 Recherche des villas sans localisation...\n')

    try {
        // Trouver toutes les villas
        const allVillas = await client.fetch(`*[_type == "villa"] {_id, name, location}`)

        // Filtrer celles sans localisation
        const villasWithoutLocation = allVillas.filter(v => !v.location || !v.location._ref)

        console.log(`📊 Résultats:`)
        console.log(`  Total de villas: ${allVillas.length}`)
        console.log(`  Villas sans localisation: ${villasWithoutLocation.length}\n`)

        if (villasWithoutLocation.length > 0) {
            console.log('⚠️  Villas sans localisation:')
            villasWithoutLocation.forEach((v, i) => {
                console.log(`  ${i + 1}. ${v.name} (${v._id})`)
            })

            console.log('\n💡 Pour corriger:')
            console.log('  1. Ouvrez Sanity Studio: https://sbh-admin.sanity.studio/')
            console.log('  2. Recherchez chaque villa par son nom')
            console.log('  3. Assignez-lui une localisation dans le champ "Quartier"')
            console.log('  4. Publiez les changements')
        } else {
            console.log('✅ Toutes les villas ont une localisation assignée!')
        }

    } catch (error) {
        console.error('❌ Erreur:', error.message)
    }
}

findVillasWithoutLocation()
