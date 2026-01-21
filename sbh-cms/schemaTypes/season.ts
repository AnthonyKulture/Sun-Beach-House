import { defineType, defineField } from 'sanity'

/**
 * Schéma pour les saisons (périodes tarifaires)
 * L'admin rédige en français, les traductions sont gérées par Google Translate API en frontend
 */
export const season = defineType({
    name: 'season',
    title: 'Saisons',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nom de la saison',
            type: 'string',
            description: 'Ex: "Basse Saison", "Haute Saison", "Noël", "Nouvel An" (en français)',
            validation: (rule) => rule.required().max(100)
                .error('Le nom est obligatoire (100 caractères max)'),
        }),
        defineField({
            name: 'order',
            title: 'Ordre d\'affichage',
            type: 'number',
            description: 'Ordre dans lequel cette saison apparaîtra dans les listes (1, 2, 3...)',
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
                title: name || 'Nouvelle saison',
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
