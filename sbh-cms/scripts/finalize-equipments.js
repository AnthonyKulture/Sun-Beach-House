/**
 * Script pour migrer les équipements personnalisés (Star) vers les équipements standards
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

// Mapping des équipements personnalisés vers les standards
const CUSTOM_TO_STANDARD = {
    'ascenseur': 'Ascenseur',
    'butler': 'Butler',
    'chef prive': 'Chef Privé',
    'piscine chauffée': 'Piscine Chauffée',
    'barbecue charbon': 'Barbecue', // On utilise le barbecue standard
    'Sunset': null, // Équipement unique, on le garde
    'Piscine chauffée à contre courant': 'Piscine Chauffée',
    'Sauna et bassin d\'eau froide': 'Sauna / Hammam',
}

async function migrateCustomEquipment(customName, standardName) {
    if (!standardName) {
        console.log(`  ⏭️  "${customName}" - Équipement unique, conservation`)
        return
    }

    console.log(`\n  🔄 Migration de "${customName}" vers "${standardName}"...`)

    try {
        // Trouver les deux équipements
        const customEquipments = await client.fetch(
            `*[_type == "equipment" && name == $name]`,
            { name: customName }
        )
        const standardEquipments = await client.fetch(
            `*[_type == "equipment" && name == $name]`,
            { name: standardName }
        )

        if (customEquipments.length === 0) {
            console.log(`    ⚠️  Équipement personnalisé non trouvé`)
            return
        }
        if (standardEquipments.length === 0) {
            console.log(`    ⚠️  Équipement standard non trouvé`)
            return
        }

        const customId = customEquipments[0]._id
        const standardId = standardEquipments[0]._id

        // Trouver les villas qui utilisent l'équipement personnalisé
        const villas = await client.fetch(
            `*[_type == "villa" && references($customId)]`,
            { customId }
        )

        if (villas.length === 0) {
            console.log(`    ℹ️  Aucune villa à migrer`)
            await client.delete(customId)
            console.log(`    ✅ Équipement personnalisé supprimé`)
            return
        }

        console.log(`    📊 ${villas.length} villa(s) à migrer`)

        let successCount = 0
        for (const villa of villas) {
            try {
                // Remplacer la référence
                const updatedAmenities = villa.amenities.map(ref => {
                    if (ref._ref === customId) {
                        return {
                            ...ref,
                            _ref: standardId,
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

        console.log(`    ✅ ${successCount} villa(s) migrées`)

        // Supprimer l'équipement personnalisé
        await client.delete(customId)
        console.log(`    ✅ Équipement personnalisé supprimé`)

    } catch (error) {
        console.error(`    ❌ Erreur:`, error.message)
    }
}

async function deleteObsoleteEquipments() {
    console.log('\n🗑️  Suppression des équipements obsolètes encore utilisés...')

    const obsolete = ['Sécurité 24/7', 'Sonorisation']

    for (const name of obsolete) {
        console.log(`\n  🗑️  "${name}"...`)

        try {
            const equipments = await client.fetch(
                `*[_type == "equipment" && name == $name]`,
                { name }
            )

            if (equipments.length === 0) {
                console.log(`    ⚠️  Non trouvé`)
                continue
            }

            const equipmentId = equipments[0]._id

            // Trouver toutes les villas qui l'utilisent
            const villas = await client.fetch(
                `*[_type == "villa" && references($id)]`,
                { id: equipmentId }
            )

            console.log(`    📊 ${villas.length} villa(s) utilisent cet équipement`)

            let successCount = 0
            for (const villa of villas) {
                try {
                    // Retirer l'équipement de la liste
                    const updatedAmenities = villa.amenities.filter(ref => ref._ref !== equipmentId)

                    await client
                        .patch(villa._id)
                        .set({ amenities: updatedAmenities })
                        .commit()

                    successCount++
                } catch (error) {
                    console.error(`    ❌ Erreur pour ${villa.name}:`, error.message)
                }
            }

            console.log(`    ✅ Retiré de ${successCount} villa(s)`)

            // Supprimer l'équipement
            await client.delete(equipmentId)
            console.log(`    ✅ Équipement supprimé`)

        } catch (error) {
            console.error(`    ❌ Erreur:`, error.message)
        }
    }
}

async function main() {
    console.log('🚀 Démarrage de la migration des équipements personnalisés...\n')

    try {
        // Étape 1: Migrer les équipements personnalisés
        console.log('📝 Migration des équipements personnalisés vers les standards...')
        for (const [customName, standardName] of Object.entries(CUSTOM_TO_STANDARD)) {
            await migrateCustomEquipment(customName, standardName)
        }

        // Étape 2: Supprimer les équipements obsolètes
        await deleteObsoleteEquipments()

        // Résumé final
        console.log('\n📊 Résumé final...')
        const allEquipments = await client.fetch(
            `*[_type == "equipment"] | order(name asc) {
                _id, 
                name, 
                icon, 
                "usageCount": count(*[_type == "villa" && references(^._id)])
            }`
        )

        console.log(`\n  Total d'équipements: ${allEquipments.length}`)

        const used = allEquipments.filter(eq => eq.usageCount > 0)
        console.log(`\n  ✅ Équipements utilisés (${used.length}):`)
        used.forEach(eq => {
            console.log(`    - ${eq.name} (${eq.icon}): ${eq.usageCount} villa(s)`)
        })

        const unused = allEquipments.filter(eq => eq.usageCount === 0)
        if (unused.length > 0) {
            console.log(`\n  📦 Équipements disponibles mais non utilisés (${unused.length}):`)
            unused.forEach(eq => {
                console.log(`    - ${eq.name} (${eq.icon})`)
            })
        }

        console.log('\n✅ Migration terminée avec succès!')
        console.log('\n📝 Les nouveaux équipements sont maintenant disponibles dans Sanity Studio')
        console.log('   pour être ajoutés aux villas selon les besoins.')
    } catch (error) {
        console.error('\n❌ Erreur fatale:', error)
        process.exit(1)
    }
}

main()
