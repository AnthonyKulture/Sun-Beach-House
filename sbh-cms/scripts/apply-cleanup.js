// Script à exécuter avec: npx sanity exec scripts/apply-cleanup.js --with-user-token

import { getCliClient } from 'sanity/cli'

const applyCleanup = async () => {
    const client = getCliClient()

    console.log('🧹 Nettoyage des champs surface et viewType...\n')

    // Récupérer toutes les villas
    const villas = await client.fetch(`
    *[_type == "villa"]{
      _id,
      name,
      listingType,
      surface,
      viewType
    }
  `)

    console.log(`📊 ${villas.length} villas trouvées\n`)

    // Créer une transaction
    const transaction = client.transaction()

    let rentalCount = 0
    let allCount = 0

    villas.forEach(villa => {
        const fieldsToUnset = []

        // Supprimer viewType pour TOUTES les villas
        if (villa.viewType !== undefined) {
            fieldsToUnset.push('viewType')
        }

        // Supprimer surface UNIQUEMENT pour les locations (rent)
        if (villa.listingType === 'rent' && villa.surface !== undefined) {
            fieldsToUnset.push('surface')
            rentalCount++
        }

        // Appliquer le patch
        if (fieldsToUnset.length > 0) {
            transaction.patch(villa._id, patch => patch.unset(fieldsToUnset))
            allCount++
        }
    })

    console.log(`📝 Application des mutations...`)
    console.log(`   - ${allCount} villas à mettre à jour`)
    console.log(`   - ${rentalCount} locations (surface supprimée)`)
    console.log(`   - ${villas.length} villas (viewType supprimé)\n`)

    // Exécuter la transaction
    await transaction.commit()

    console.log('✅ Nettoyage terminé !')
    console.log('✨ Les champs ont été supprimés avec succès\n')
}

applyCleanup()
