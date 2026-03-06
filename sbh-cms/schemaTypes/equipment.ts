import { defineType, defineField } from 'sanity'

/**
 * Schéma pour les équipements des villas
 * L'admin rédige en français, les traductions sont gérées par Google Translate API en frontend
 */
export const equipment = defineType({
    name: 'equipment',
    title: 'Équipements',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nom de l\'équipement (FR)',
            type: 'string',
            description: 'Nom français. Ex: "Piscine"',
            validation: (rule) => rule.required().max(100)
                .error('Le nom est obligatoire'),
        }),
        defineField({
            name: 'name_en',
            title: 'Nom de l\'équipement (EN)',
            type: 'string',
            description: 'Nom anglais. Si vide, le nom français sera utilisé ou traduit automatiquement via Google.',
        }),
        defineField({
            name: 'icon',
            title: 'Icône',
            type: 'string',
            description: 'Code de l\'icône Lucide React (ex: "Wifi", "Wind", "Waves", "Droplets")',
            options: {
                list: [
                    { title: '📶 Wifi', value: 'Wifi' },
                    { title: '❄️ Wind (Climatisation)', value: 'Wind' },
                    { title: '💨 Fan (Ventilateur)', value: 'Fan' },
                    { title: '🌊 Waves (Plage)', value: 'Waves' },
                    { title: '👨‍🍳 ChefHat (Cuisine)', value: 'ChefHat' },
                    { title: '🚗 Car (Parking)', value: 'Car' },
                    { title: '🚪 DoorOpen (Portail)', value: 'DoorOpen' },
                    { title: '🏊 Droplets (Piscine)', value: 'Droplets' },
                    { title: '🚿 ShowerHead (Douche Extérieure)', value: 'ShowerHead' },
                    { title: '☀️ Sun (Terrasse)', value: 'Sun' },
                    { title: '☕ Coffee', value: 'Coffee' },
                    { title: '🌺 Flower2 (Jardin)', value: 'Flower2' },
                    { title: '🌴 Trees (Palmiers)', value: 'Trees' },
                    { title: '🔊 Speaker (Audio)', value: 'Speaker' },
                    { title: '💪 Dumbbell (Fitness)', value: 'Dumbbell' },
                    { title: '📺 Tv', value: 'Tv' },
                    { title: '🎮 Gamepad2 (Jeux Vidéo)', value: 'Gamepad2' },
                    { title: '🔒 Shield (Sécurité)', value: 'Shield' },
                    { title: '🔐 Lock (Coffre-fort)', value: 'Lock' },
                    { title: '🍖 Utensils (Barbecue)', value: 'Utensils' },
                    { title: '💼 Briefcase (Bureau)', value: 'Briefcase' },
                    { title: '👶 Baby (Équipement Bébé)', value: 'Baby' },
                    { title: '♿ Accessibility (Accès PMR)', value: 'Accessibility' },
                    { title: '🛍️ ShoppingBag (Commerces)', value: 'ShoppingBag' },
                    { title: '🍸 Martini (Bar)', value: 'Martini' },
                    { title: '🎵 Music (Sonorisation)', value: 'Music' },
                    { title: '📹 Video (Cinéma)', value: 'Video' },
                    { title: '🚲 Bike (Vélos)', value: 'Bike' },
                    { title: '⛵ Ship (Bateau)', value: 'Ship' },
                    { title: '⚓ Anchor (Mouillage)', value: 'Anchor' },
                    { title: '🔑 Key (Conciergerie)', value: 'Key' },
                    { title: '⭐ Star (Personnalisé)', value: 'Star' },
                    { title: '🎾 Trophy (Tennis)', value: 'Trophy' },
                    { title: '🥎 Activity (Padel)', value: 'Activity' },
                    { title: '💆‍♀️ Heart (Massage / Spa)', value: 'Heart' },
                ],
                layout: 'dropdown',
            },
            validation: (rule) => rule.required().error('Choisissez une icône'),
        }),
    ],
    preview: {
        select: {
            name: 'name',
            icon: 'icon',
        },
        prepare({ name, icon }) {
            const iconEmojis: Record<string, string> = {
                'Wifi': '📶', 'Wind': '❄️', 'Fan': '💨', 'Waves': '🌊', 'ChefHat': '👨‍🍳',
                'Car': '🚗', 'DoorOpen': '🚪', 'Droplets': '🏊', 'ShowerHead': '🚿', 'Sun': '☀️', 'Coffee': '☕',
                'Flower2': '🌺', 'Trees': '🌴', 'Speaker': '🔊', 'Dumbbell': '💪', 'Tv': '📺', 'Gamepad2': '🎮',
                'Shield': '🔒', 'Lock': '🔐', 'Utensils': '🍖', 'Briefcase': '💼', 'Baby': '👶',
                'Accessibility': '♿', 'ShoppingBag': '🛍️', 'Martini': '🍸', 'Music': '🎵',
                'Video': '📹', 'Bike': '🚲', 'Ship': '⛵', 'Anchor': '⚓',
                'Key': '🔑', 'Star': '⭐', 'Heart': '💆‍♀️'
            }
            return {
                title: name || 'Nouvel équipement',
                subtitle: `Icône: ${icon || 'Non définie'}`,
                media: iconEmojis[icon] ? undefined : undefined,
            }
        },
    },
    orderings: [
        {
            title: 'Nom (A → Z)',
            name: 'nameAsc',
            by: [{ field: 'name', direction: 'asc' }],
        },
    ],
})
