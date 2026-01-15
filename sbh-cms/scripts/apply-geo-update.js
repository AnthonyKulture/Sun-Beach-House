// Script à exécuter avec: npx sanity exec scripts/apply-geo-update.js --with-user-token

import { getCliClient } from 'sanity/cli'
import fs from 'fs'

const applyGeoUpdate = async () => {
    const client = getCliClient()

    console.log('🗺️  Mise à jour avec géolocalisation et informations privées...\n')

    // Lire le fichier de mutations
    const mutations = fs.readFileSync('add-geo-mutations.ndjson', 'utf-8')
        .split('\n')
        .filter(line => line.trim())
        .map(line => JSON.parse(line))

    console.log(`📝 ${mutations.length} villas à mettre à jour\n`)

    // Créer une transaction
    const transaction = client.transaction()

    let geoCount = 0
    let privateCount = 0

    mutations.forEach(mutation => {
        const { id, set } = mutation.patch

        if (set.geopoint) geoCount++
        if (set.privateInfo) privateCount++

        transaction.patch(id, patch => patch.set(set))
    })

    console.log(`Application des mises à jour...`)
    console.log(`   - ${geoCount} villas avec géolocalisation`)
    console.log(`   - ${privateCount} villas avec informations privées\n`)

    // Exécuter la transaction
    await transaction.commit()

    console.log('✅ Mise à jour terminée !')
    console.log('🗺️  Les coordonnées GPS et informations privées ont été ajoutées\n')
}

applyGeoUpdate()
