import { getCliClient } from 'sanity/cli'

// Cette fonction sera exécutée par Sanity CLI avec les bonnes permissions
export default async function cleanupVillas(client) {
    console.log('🧹 Nettoyage des champs surface et viewType...\n')

    // Récupérer toutes les villas
    const villas = await client.fetch('*[_type == "villa"]{_id, name}')
    console.log(`📊 ${villas.length} villas trouvées\n`)

    // Créer une transaction pour tout supprimer en une fois
    const transaction = client.transaction()

    villas.forEach(villa => {
        transaction.patch(villa._id, patch => patch.unset(['surface', 'viewType']))
    })

    // Exécuter la transaction
    const result = await transaction.commit()

    console.log(`✅ ${villas.length} villas nettoyées !`)
    console.log('✨ Les champs "surface" et "viewType" ont été supprimés\n')

    return result
}
