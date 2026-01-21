/**
 * Script de migration pour transformer les listes fixes en références dynamiques
 * 
 * Ce script va:
 * 1. Créer les documents Equipment à partir des équipements existants
 * 2. Créer les documents Season à partir des saisons existantes
 * 3. Créer les documents Location à partir des localisations existantes
 * 4. Mettre à jour les villas pour utiliser les références
 * 
 * IMPORTANT: Exécutez ce script APRÈS avoir déployé les nouveaux schémas
 */

const sanityClient = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

const client = sanityClient.createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    token: process.env.SANITY_API_TOKEN,
    apiVersion: '2024-03-01',
    useCdn: false,
})

// ═══════════════════════════════════════════════════════════════
// DONNÉES À MIGRER
// ═══════════════════════════════════════════════════════════════

const EQUIPMENTS = [
    { name: 'Wifi Haut Débit', icon: 'Wifi' },
    { name: 'Climatisation', icon: 'Wind' },
    { name: 'Accès Plage Direct', icon: 'Waves' },
    { name: 'Cuisine Équipée', icon: 'ChefHat' },
    { name: 'Parking Privé', icon: 'Car' },
    { name: 'Piscine', icon: 'Droplets' },
    { name: 'Terrasse / Solarium', icon: 'Sun' },
    { name: 'Machine à Café', icon: 'Coffee' },
    { name: 'Jardin Tropical', icon: 'Flower2' },
    { name: 'Système Audio Sonos', icon: 'Speaker' },
    { name: 'Salle de Fitness', icon: 'Dumbbell' },
    { name: 'TV / Cinéma', icon: 'Tv' },
    { name: 'Sécurité 24/7', icon: 'Shield' },
    { name: 'Barbecue', icon: 'Utensils' },
    { name: 'Proche Commerces', icon: 'ShoppingBag' },
    { name: 'Bar Extérieur', icon: 'Martini' },
    { name: 'Sonorisation', icon: 'Music' },
    { name: 'Service Conciergerie', icon: 'Key' },
]

const SEASONS = [
    { name: 'Basse Saison', order: 1 },
    { name: 'Haute Saison', order: 2 },
    { name: 'Été', order: 3 },
    { name: 'Noël', order: 4 },
    { name: 'Nouvel An', order: 5 },
    { name: 'Low Season', order: 6 },
    { name: 'High Season', order: 7 },
    { name: 'Summer', order: 8 },
    { name: 'Thanksgiving', order: 9 },
    { name: 'Thanksgiving & Bucket', order: 10 },
    { name: 'Christmas', order: 11 },
    { name: 'New Year', order: 12 },
]

const LOCATIONS = [
    { name: 'Flamands', order: 1 },
    { name: 'Toiny', order: 2 },
    { name: 'Saline', order: 3 },
    { name: 'Gustavia', order: 4 },
    { name: 'Lorient', order: 5 },
    { name: 'Gouverneur', order: 6 },
    { name: 'St Jean', order: 7 },
    { name: 'Colombier', order: 8 },
    { name: 'Corossol', order: 9 },
    { name: 'Marigot', order: 10 },
    { name: 'Grand Cul de Sac', order: 11 },
    { name: 'Petit Cul de Sac', order: 12 },
    { name: 'Pointe Milou', order: 13 },
    { name: 'Lurin', order: 14 },
    { name: 'Vitet', order: 15 },
]

// Mapping des anciennes valeurs d'icônes vers les noms d'équipements
const ICON_TO_NAME = {
    'Wifi': 'Wifi Haut Débit',
    'Wind': 'Climatisation',
    'Waves': 'Accès Plage Direct',
    'ChefHat': 'Cuisine Équipée',
    'Car': 'Parking Privé',
    'Droplets': 'Piscine',
    'Sun': 'Terrasse / Solarium',
    'Coffee': 'Machine à Café',
    'Flower2': 'Jardin Tropical',
    'Speaker': 'Système Audio Sonos',
    'Dumbbell': 'Salle de Fitness',
    'Tv': 'TV / Cinéma',
    'Shield': 'Sécurité 24/7',
    'Utensils': 'Barbecue',
    'ShoppingBag': 'Proche Commerces',
    'Martini': 'Bar Extérieur',
    'Music': 'Sonorisation',
    'Key': 'Service Conciergerie',
}

// ═══════════════════════════════════════════════════════════════
// FONCTIONS DE MIGRATION
// ═══════════════════════════════════════════════════════════════

async function createEquipments() {
    console.log('\n📦 Création des équipements...')
    const createdEquipments = {}

    for (const equipment of EQUIPMENTS) {
        try {
            const doc = await client.create({
                _type: 'equipment',
                name: equipment.name,
                icon: equipment.icon,
            })
            createdEquipments[equipment.icon] = doc._id
            console.log(`  ✅ Créé: ${equipment.name} (${doc._id})`)
        } catch (error) {
            console.error(`  ❌ Erreur pour ${equipment.name}:`, error.message)
        }
    }

    return createdEquipments
}

async function createSeasons() {
    console.log('\n📅 Création des saisons...')
    const createdSeasons = {}

    for (const season of SEASONS) {
        try {
            const doc = await client.create({
                _type: 'season',
                name: season.name,
                order: season.order,
            })
            createdSeasons[season.name] = doc._id
            console.log(`  ✅ Créé: ${season.name} (${doc._id})`)
        } catch (error) {
            console.error(`  ❌ Erreur pour ${season.name}:`, error.message)
        }
    }

    return createdSeasons
}

async function createLocations() {
    console.log('\n📍 Création des localisations...')
    const createdLocations = {}

    for (const location of LOCATIONS) {
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

async function migrateVillas(equipmentMap, seasonMap, locationMap) {
    console.log('\n🏠 Migration des villas...')

    // Récupérer toutes les villas
    const villas = await client.fetch(`*[_type == "villa"]`)
    console.log(`  Trouvé ${villas.length} villas à migrer`)

    let successCount = 0
    let errorCount = 0

    for (const villa of villas) {
        try {
            const patches = []

            // 1. Migrer la localisation (string -> reference)
            if (villa.location && typeof villa.location === 'string') {
                const locationId = locationMap[villa.location]
                if (locationId) {
                    patches.push({
                        set: {
                            location: {
                                _type: 'reference',
                                _ref: locationId,
                            },
                        },
                    })
                } else {
                    console.warn(`  ⚠️  Localisation "${villa.location}" non trouvée pour ${villa.name}`)
                }
            }

            // 2. Migrer les équipements (array of objects -> array of references)
            if (villa.amenities && Array.isArray(villa.amenities)) {
                const amenityRefs = []
                for (const amenity of villa.amenities) {
                    // Ancien format: { icon: 'Wifi', label?: 'Custom' }
                    if (amenity.icon) {
                        const equipmentId = equipmentMap[amenity.icon]
                        if (equipmentId) {
                            amenityRefs.push({
                                _type: 'reference',
                                _ref: equipmentId,
                                _key: `amenity-${Math.random().toString(36).substr(2, 9)}`,
                            })
                        } else if (amenity.icon === 'Star' && amenity.label) {
                            // Équipement personnalisé - créer un nouveau document
                            console.log(`  ℹ️  Création d'un équipement personnalisé: "${amenity.label}"`)
                            const customEquipment = await client.create({
                                _type: 'equipment',
                                name: amenity.label,
                                icon: 'Star',
                            })
                            amenityRefs.push({
                                _type: 'reference',
                                _ref: customEquipment._id,
                                _key: `amenity-${Math.random().toString(36).substr(2, 9)}`,
                            })
                        }
                    }
                }
                if (amenityRefs.length > 0) {
                    patches.push({
                        set: {
                            amenities: amenityRefs,
                        },
                    })
                }
            }

            // 3. Migrer les saisons dans seasonalPrices (string -> reference)
            if (villa.seasonalPrices && Array.isArray(villa.seasonalPrices)) {
                const updatedSeasonalPrices = villa.seasonalPrices.map((sp) => {
                    if (sp.seasonName && typeof sp.seasonName === 'string') {
                        const seasonId = seasonMap[sp.seasonName]
                        if (seasonId) {
                            return {
                                ...sp,
                                seasonName: {
                                    _type: 'reference',
                                    _ref: seasonId,
                                },
                            }
                        } else {
                            console.warn(`  ⚠️  Saison "${sp.seasonName}" non trouvée pour ${villa.name}`)
                            return sp
                        }
                    }
                    return sp
                })
                patches.push({
                    set: {
                        seasonalPrices: updatedSeasonalPrices,
                    },
                })
            }

            // Appliquer tous les patches
            if (patches.length > 0) {
                let transaction = client.transaction()
                for (const patch of patches) {
                    transaction = transaction.patch(villa._id, patch)
                }
                await transaction.commit()
                successCount++
                console.log(`  ✅ Migré: ${villa.name}`)
            } else {
                console.log(`  ⏭️  Aucune migration nécessaire pour: ${villa.name}`)
            }
        } catch (error) {
            errorCount++
            console.error(`  ❌ Erreur pour ${villa.name}:`, error.message)
        }
    }

    console.log(`\n✨ Migration terminée: ${successCount} succès, ${errorCount} erreurs`)
}

// ═══════════════════════════════════════════════════════════════
// EXÉCUTION
// ═══════════════════════════════════════════════════════════════

async function main() {
    console.log('🚀 Démarrage de la migration vers les références dynamiques...\n')

    try {
        // Étape 1: Créer les nouveaux documents
        const equipmentMap = await createEquipments()
        const seasonMap = await createSeasons()
        const locationMap = await createLocations()

        // Étape 2: Migrer les villas
        await migrateVillas(equipmentMap, seasonMap, locationMap)

        console.log('\n✅ Migration terminée avec succès!')
        console.log('\n📝 Prochaines étapes:')
        console.log('  1. Vérifiez les villas dans le CMS Sanity')
        console.log('  2. Testez la création d\'une nouvelle villa')
        console.log('  3. Vérifiez que le frontend affiche correctement les données')
    } catch (error) {
        console.error('\n❌ Erreur fatale:', error)
        process.exit(1)
    }
}

main()
