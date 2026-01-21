/**
 * Script pour ajouter les nouveaux équipements et retirer les anciens
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

// Nouveaux équipements à ajouter
const NEW_EQUIPMENTS = [
    { name: 'Ascenseur', icon: 'MoveVertical' },
    { name: 'Butler', icon: 'UserCheck' },
    { name: 'Chef Privé', icon: 'ChefHat' },
    { name: 'Home Cinéma', icon: 'Tv' },
    { name: 'Sauna / Hammam', icon: 'Droplets' },
    { name: 'Court de Tennis', icon: 'Trophy' },
    { name: 'Court de Paddle', icon: 'Trophy' },
    { name: 'Piscine Chauffée', icon: 'Flame' },
    { name: 'Chambres Climatisées', icon: 'Wind' },
    { name: 'Salon Climatisé', icon: 'Wind' },
    { name: 'Cuisine Climatisée', icon: 'Wind' },
    { name: 'Coffre Fort', icon: 'Lock' },
    { name: 'Cave à Vins', icon: 'Wine' },
    { name: 'Jacuzzi', icon: 'Waves' },
    { name: 'Petit Déjeuner Compris', icon: 'Coffee' },
    { name: 'Lits Simples', icon: 'BedSingle' },
    { name: 'Ventilateur', icon: 'Fan' },
    { name: 'Portail', icon: 'DoorOpen' },
]

// Équipements à retirer (par nom)
const EQUIPMENTS_TO_REMOVE = [
    'Climatisation',
    'Sécurité 24/7',
    'Proche Commerces',
    'Bar Extérieur',
    'Sonorisation',
    'Machine à Café',
    'Terrasse / Solarium',
    'Service Conciergerie',
]

async function addNewEquipments() {
    console.log('\n📦 Ajout des nouveaux équipements...\n')
    const createdEquipments = []

    for (const equipment of NEW_EQUIPMENTS) {
        try {
            const doc = await client.create({
                _type: 'equipment',
                name: equipment.name,
                icon: equipment.icon,
            })
            createdEquipments.push(doc)
            console.log(`  ✅ Créé: ${equipment.name} (icône: ${equipment.icon})`)
        } catch (error) {
            console.error(`  ❌ Erreur pour ${equipment.name}:`, error.message)
        }
    }

    return createdEquipments
}

async function removeOldEquipments() {
    console.log('\n🗑️  Suppression des anciens équipements...\n')

    let successCount = 0
    let notFoundCount = 0
    let errorCount = 0

    for (const equipmentName of EQUIPMENTS_TO_REMOVE) {
        try {
            // Chercher l'équipement par nom
            const equipments = await client.fetch(
                `*[_type == "equipment" && name == $name]`,
                { name: equipmentName }
            )

            if (equipments.length === 0) {
                console.log(`  ⚠️  "${equipmentName}" non trouvé (peut-être déjà supprimé)`)
                notFoundCount++
                continue
            }

            // Vérifier si l'équipement est utilisé par des villas
            const usageCount = await client.fetch(
                `count(*[_type == "villa" && references($id)])`,
                { id: equipments[0]._id }
            )

            if (usageCount > 0) {
                console.log(`  ⚠️  "${equipmentName}" est utilisé par ${usageCount} villa(s) - Conservation recommandée`)
                console.log(`      Pour le supprimer, retirez-le d'abord de toutes les villas`)
                continue
            }

            // Supprimer l'équipement
            await client.delete(equipments[0]._id)
            successCount++
            console.log(`  ✅ Supprimé: ${equipmentName}`)
        } catch (error) {
            errorCount++
            console.error(`  ❌ Erreur pour ${equipmentName}:`, error.message)
        }
    }

    console.log(`\n✨ Suppression terminée: ${successCount} supprimés, ${notFoundCount} non trouvés, ${errorCount} erreurs`)
}

async function showEquipmentSummary() {
    console.log('\n📊 Résumé des équipements...\n')

    try {
        const allEquipments = await client.fetch(
            `*[_type == "equipment"] | order(name asc) {_id, name, icon}`
        )

        console.log(`  Total d'équipements: ${allEquipments.length}\n`)

        console.log('  Liste complète:')
        allEquipments.forEach((eq, idx) => {
            console.log(`    ${idx + 1}. ${eq.name} (${eq.icon})`)
        })

        // Vérifier les équipements les plus utilisés
        console.log('\n  📈 Top 10 des équipements les plus utilisés:')
        for (let i = 0; i < Math.min(10, allEquipments.length); i++) {
            const eq = allEquipments[i]
            const count = await client.fetch(
                `count(*[_type == "villa" && references($id)])`,
                { id: eq._id }
            )
            if (count > 0) {
                console.log(`    - ${eq.name}: ${count} villa(s)`)
            }
        }
    } catch (error) {
        console.error('  ❌ Erreur lors du résumé:', error.message)
    }
}

async function main() {
    console.log('🚀 Démarrage de la mise à jour des équipements...\n')
    console.log(`  📝 ${NEW_EQUIPMENTS.length} équipements à ajouter`)
    console.log(`  🗑️  ${EQUIPMENTS_TO_REMOVE.length} équipements à retirer\n`)

    try {
        // Étape 1: Ajouter les nouveaux équipements
        await addNewEquipments()

        // Étape 2: Retirer les anciens équipements
        await removeOldEquipments()

        // Étape 3: Afficher le résumé
        await showEquipmentSummary()

        console.log('\n✅ Opération terminée avec succès!')
        console.log('\n📝 Prochaines étapes:')
        console.log('  1. Vérifiez les équipements dans Sanity Studio')
        console.log('  2. Mettez à jour les villas pour utiliser les nouveaux équipements')
        console.log('  3. Retirez manuellement les anciens équipements des villas si nécessaire')
    } catch (error) {
        console.error('\n❌ Erreur fatale:', error)
        process.exit(1)
    }
}

main()
