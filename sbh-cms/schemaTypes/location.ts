import { defineType, defineField } from 'sanity'

/**
 * Schéma pour les localisations (quartiers de Saint-Barthélemy)
 * L'admin rédige en français, les traductions sont gérées par Google Translate API en frontend
 */
export const location = defineType({
    name: 'location',
    title: 'Localisations',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nom du quartier',
            type: 'string',
            description: 'Ex: "Flamands", "Gustavia", "St Jean" (en français)',
            validation: (rule) => rule.required().max(100)
                .error('Le nom est obligatoire (100 caractères max)'),
        }),
        defineField({
            name: 'order',
            title: 'Ordre d\'affichage',
            type: 'number',
            description: 'Ordre dans lequel ce quartier apparaîtra dans les listes (1, 2, 3...)',
            initialValue: 1,
            validation: (rule) => rule.required().min(1)
                .error('L\'ordre doit être un nombre positif'),
        }),
    ],
    preview: {
        select: {
            name: 'name',
            order: 'order',
        },
        prepare({ name, order }) {
            return {
                title: name || 'Nouvelle localisation',
                subtitle: `Ordre: ${order || '?'}`,
            }
        },
    },
    orderings: [
        {
            title: 'Par ordre',
            name: 'orderAsc',
            by: [{ field: 'order', direction: 'asc' }],
        },
        {
            title: 'Nom (A → Z)',
            name: 'nameAsc',
            by: [{ field: 'name', direction: 'asc' }],
        },
    ],
})
