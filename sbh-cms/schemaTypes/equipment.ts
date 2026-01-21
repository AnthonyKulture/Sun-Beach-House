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
            title: 'Nom de l\'équipement',
            type: 'string',
            description: 'Ex: "Wifi Haut Débit", "Climatisation", "Piscine" (en français)',
            validation: (rule) => rule.required().max(100)
                .error('Le nom est obligatoire (100 caractères max)'),
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
                    { title: '🌊 Waves (Plage)', value: 'Waves' },
                    { title: '👨‍🍳 ChefHat (Cuisine)', value: 'ChefHat' },
                    { title: '🚗 Car (Parking)', value: 'Car' },
                    { title: '🏊 Droplets (Piscine)', value: 'Droplets' },
                    { title: '☀️ Sun (Terrasse)', value: 'Sun' },
                    { title: '☕ Coffee', value: 'Coffee' },
                    { title: '🌺 Flower2 (Jardin)', value: 'Flower2' },
                    { title: '🔊 Speaker (Audio)', value: 'Speaker' },
                    { title: '💪 Dumbbell (Fitness)', value: 'Dumbbell' },
                    { title: '📺 Tv', value: 'Tv' },
                    { title: '🔒 Shield (Sécurité)', value: 'Shield' },
                    { title: '🍖 Utensils (Barbecue)', value: 'Utensils' },
                    { title: '🛍️ ShoppingBag (Commerces)', value: 'ShoppingBag' },
                    { title: '🍸 Martini (Bar)', value: 'Martini' },
                    { title: '🎵 Music (Sonorisation)', value: 'Music' },
                    { title: '🔑 Key (Conciergerie)', value: 'Key' },
                    { title: '⭐ Star (Personnalisé)', value: 'Star' },
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
                'Wifi': '📶', 'Wind': '❄️', 'Waves': '🌊', 'ChefHat': '👨‍🍳',
                'Car': '🚗', 'Droplets': '🏊', 'Sun': '☀️', 'Coffee': '☕',
                'Flower2': '🌺', 'Speaker': '🔊', 'Dumbbell': '💪', 'Tv': '📺',
                'Shield': '🔒', 'Utensils': '🍖', 'ShoppingBag': '🛍️',
                'Martini': '🍸', 'Music': '🎵', 'Key': '🔑', 'Star': '⭐'
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
