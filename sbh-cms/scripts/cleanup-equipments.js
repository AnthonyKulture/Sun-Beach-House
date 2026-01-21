/**
 * Script pour nettoyer les équipements en double et ceux qui ne sont plus utilisés
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

// Équipements à supprimer (ceux qui sont encore utilisés)
const EQUIPMENTS_TO_FORCE_REMOVE = [
    'Climatisation',
    'Sécurité 24/7',
    'Sonorisation',
    'Machine à Café',
]

// Mapping des anciens équipements vers les nouveaux
const EQUIPMENT_REPLACEMENTS = {
    'Climatisation': 'Chambres Climatisées', // On remplace par défaut par chambres climatisées
    'Machine à Café': 'Petit Déjeuner Compris',
}

async function replaceEquipmentInVillas(oldName, newName) {
    console.log(`\n  🔄 Remplacement de "${oldName}" par "${newName}"...`)

    try {
        // Trouver l'ancien et le nouveau équipement
        const oldEquipments = await client.fetch(
            `*[_type == "equipment" && name == $name]`,
            { name: oldName }
        )
        const newEquipments = await client.fetch(
            `*[_type == "equipment" && name == $name]`,
            { name: newName }
        )

        if (oldEquipments.length === 0) {
            console.log(`    ⚠️  Ancien équipement "${oldName}" non trouvé`)
            return
        }
        if (newEquipments.length === 0) {
            console.log(`    ⚠️  Nouvel équipement "${newName}" non trouvé`)
            return
        }

        const oldId = oldEquipments[0]._id
        const newId = newEquipments[0]._id

        // Trouver toutes les villas qui utilisent l'ancien équipement
        const villas = await client.fetch(
            `*[_type == "villa" && references($oldId)]`,
            { oldId }
        )

        console.log(`    📊 ${villas.length} villa(s) à mettre à jour`)

        let successCount = 0
        for (const villa of villas) {
            try {
                // Remplacer l'ancienne référence par la nouvelle
                const updatedAmenities = villa.amenities.map(ref => {
                    if (ref._ref === oldId) {
                        return {
                            ...ref,
                            _ref: newId,
                        }
                    }
                    return ref
                })

                await client
                    .patch(villa._id)
                    .set({ amenities: updatedAmenities })
                    .commit()

                successCount++
            } catch (error) {
                console.error(`    ❌ Erreur pour ${villa.name}:`, error.message)
            }
        }

        console.log(`    ✅ ${successCount} villa(s) mises à jour`)

        // Maintenant on peut supprimer l'ancien équipement
        await client.delete(oldId)
        console.log(`    ✅ Équipement "${oldName}" supprimé`)

    } catch (error) {
        console.error(`    ❌ Erreur:`, error.message)
    }
}

async function deleteUnusedEquipment(name) {
    console.log(`\n  🗑️  Suppression de "${name}"...`)

    try {
        const equipments = await client.fetch(
            `*[_type == "equipment" && name == $name]`,
            { name }
        )

        if (equipments.length === 0) {
            console.log(`    ⚠️  Non trouvé`)
            return
        }

        const usageCount = await client.fetch(
            `count(*[_type == "villa" && references($id)])`,
            { id: equipments[0]._id }
        )

        if (usageCount > 0) {
            console.log(`    ⚠️  Encore utilisé par ${usageCount} villa(s) - skip`)
            return
        }

        await client.delete(equipments[0]._id)
        console.log(`    ✅ Supprimé`)
    } catch (error) {
        console.error(`    ❌ Erreur:`, error.message)
    }
}

async function cleanDuplicateEquipments() {
    console.log('\n🧹 Nettoyage des équipements en double...')

    // Supprimer les doublons créés pendant la migration (avec icône Star et nom en minuscules)
    const duplicates = [
        'ascenseur',
        'butler',
        'chef prive',
        'piscine chauffée',
        'barbecue charbon',
        'Sunset',
        'Piscine chauffée à contre courant',
        'Sauna et bassin d\'eau froide',
    ]

    for (const name of duplicates) {
        await deleteUnusedEquipment(name)
    }

    // Supprimer le doublon "Ascenseur" avec icône Star
    console.log(`\n  🗑️  Suppression du doublon "Ascenseur" (Star)...`)
    try {
        const ascenseurs = await client.fetch(
            `*[_type == "equipment" && name == "Ascenseur"]`
        )

        // Trouver celui avec l'icône Star et le supprimer
        for (const asc of ascenseurs) {
            if (asc.icon === 'Star') {
                const usageCount = await client.fetch(
                    `count(*[_type == "villa" && references($id)])`,
                    { id: asc._id }
                )

                if (usageCount === 0) {
                    await client.delete(asc._id)
                    console.log(`    ✅ Doublon supprimé`)
                } else {
                    console.log(`    ⚠️  Utilisé par ${usageCount} villa(s) - migration nécessaire`)
                    // Migrer vers le bon Ascenseur
                    const goodAscenseur = ascenseurs.find(a => a.icon === 'MoveVertical')
                    if (goodAscenseur) {
                        const villas = await client.fetch(
                            `*[_type == "villa" && references($oldId)]`,
                            { oldId: asc._id }
                        )

                        for (const villa of villas) {
                            const updatedAmenities = villa.amenities.map(ref => {
                                if (ref._ref === asc._id) {
                                    return { ...ref, _ref: goodAscenseur._id }
                                }
                                return ref
                            })
                            await client.patch(villa._id).set({ amenities: updatedAmenities }).commit()
                        }
                        await client.delete(asc._id)
                        console.log(`    ✅ ${usageCount} villa(s) migrées et doublon supprimé`)
                    }
                }
            }
        }
    } catch (error) {
        console.error(`    ❌ Erreur:`, error.message)
    }
}

async function main() {
    console.log('🚀 Démarrage du nettoyage des équipements...\n')

    try {
        // Étape 1: Remplacer les équipements obsolètes
        console.log('📝 Remplacement des équipements obsolètes...')
        for (const [oldName, newName] of Object.entries(EQUIPMENT_REPLACEMENTS)) {
            await replaceEquipmentInVillas(oldName, newName)
        }

        // Étape 2: Supprimer les équipements non remplaçables
        console.log('\n🗑️  Suppression des équipements non remplaçables...')
        for (const name of EQUIPMENTS_TO_FORCE_REMOVE) {
            if (!EQUIPMENT_REPLACEMENTS[name]) {
                await deleteUnusedEquipment(name)
            }
        }

        // Étape 3: Nettoyer les doublons
        await cleanDuplicateEquipments()

        // Résumé final
        console.log('\n📊 Résumé final...')
        const allEquipments = await client.fetch(
            `*[_type == "equipment"] | order(name asc) {_id, name, icon, "usageCount": count(*[_type == "villa" && references(^._id)])}`
        )

        console.log(`\n  Total d'équipements: ${allEquipments.length}`)
        console.log(`\n  Équipements actifs (utilisés):`)
        allEquipments.filter(eq => eq.usageCount > 0).forEach(eq => {
            console.log(`    - ${eq.name} (${eq.icon}): ${eq.usageCount} villa(s)`)
        })

        const unused = allEquipments.filter(eq => eq.usageCount === 0)
        if (unused.length > 0) {
            console.log(`\n  ⚠️  Équipements non utilisés (${unused.length}):`)
            unused.forEach(eq => {
                console.log(`    - ${eq.name} (${eq.icon})`)
            })
        }

        console.log('\n✅ Nettoyage terminé avec succès!')
    } catch (error) {
        console.error('\n❌ Erreur fatale:', error)
        process.exit(1)
    }
}

main()
