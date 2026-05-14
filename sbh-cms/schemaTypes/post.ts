import { defineType, defineField } from 'sanity'

export const post = defineType({
    name: 'post',
    title: 'Articles de blog',
    type: 'document',
    groups: [
        { name: 'content', title: 'Contenu', default: true },
        { name: 'seo', title: 'SEO' },
        { name: 'meta', title: 'Métadonnées & sources' },
    ],
    fields: [
        defineField({
            name: 'title',
            title: 'Titre (par langue)',
            type: 'object',
            group: 'content',
            fields: [
                defineField({ name: 'fr', title: 'Français', type: 'string', validation: (r) => r.required().max(120) }),
                defineField({ name: 'en', title: 'English', type: 'string', validation: (r) => r.max(120) }),
                defineField({ name: 'es', title: 'Español', type: 'string', validation: (r) => r.max(120) }),
                defineField({ name: 'pt', title: 'Português', type: 'string', validation: (r) => r.max(120) }),
            ],
        }),
        defineField({
            name: 'slug',
            title: 'Slug URL (par langue)',
            description: 'Ex: louer-villa-saint-barth-haute-saison',
            type: 'object',
            group: 'content',
            fields: [
                defineField({
                    name: 'fr',
                    title: 'fr',
                    type: 'slug',
                    options: { source: 'title.fr', maxLength: 96 },
                    validation: (r) => r.required(),
                }),
                defineField({ name: 'en', title: 'en', type: 'slug', options: { source: 'title.en', maxLength: 96 } }),
                defineField({ name: 'es', title: 'es', type: 'slug', options: { source: 'title.es', maxLength: 96 } }),
                defineField({ name: 'pt', title: 'pt', type: 'slug', options: { source: 'title.pt', maxLength: 96 } }),
            ],
        }),
        defineField({
            name: 'excerpt',
            title: 'Excerpt / Résumé court',
            description: '155 caractères max — utilisé comme meta description par défaut',
            type: 'object',
            group: 'content',
            fields: [
                defineField({ name: 'fr', title: 'Français', type: 'text', rows: 2, validation: (r) => r.max(170) }),
                defineField({ name: 'en', title: 'English', type: 'text', rows: 2, validation: (r) => r.max(170) }),
                defineField({ name: 'es', title: 'Español', type: 'text', rows: 2, validation: (r) => r.max(170) }),
                defineField({ name: 'pt', title: 'Português', type: 'text', rows: 2, validation: (r) => r.max(170) }),
            ],
        }),
        defineField({
            name: 'body',
            title: 'Corps de l\'article (Markdown)',
            description: 'Markdown standard avec H2/H3, listes, tables, liens internes, et footnotes [^1] pour les sources',
            type: 'object',
            group: 'content',
            fields: [
                defineField({ name: 'fr', title: 'Français', type: 'text', rows: 30, validation: (r) => r.required() }),
                defineField({ name: 'en', title: 'English', type: 'text', rows: 30 }),
                defineField({ name: 'es', title: 'Español', type: 'text', rows: 30 }),
                defineField({ name: 'pt', title: 'Português', type: 'text', rows: 30 }),
            ],
        }),
        defineField({
            name: 'mainImage',
            title: 'Image principale',
            type: 'image',
            group: 'content',
            options: { hotspot: true },
            fields: [
                defineField({ name: 'alt', title: 'Alt text (fr)', type: 'string', validation: (r) => r.required() }),
                defineField({ name: 'alt_en', title: 'Alt text (en)', type: 'string' }),
                defineField({ name: 'alt_es', title: 'Alt text (es)', type: 'string' }),
                defineField({ name: 'alt_pt', title: 'Alt text (pt)', type: 'string' }),
                defineField({ name: 'credit', title: 'Crédit photo', type: 'string' }),
            ],
        }),
        defineField({
            name: 'category',
            title: 'Catégorie',
            type: 'string',
            group: 'meta',
            options: {
                list: [
                    { title: 'Vie à Saint-Barth', value: 'vie-st-barth' },
                    { title: 'Services & Conciergerie', value: 'services' },
                    { title: 'Villas & Propriétés', value: 'villas' },
                    { title: 'Saison & Évènements', value: 'saison' },
                    { title: 'Immobilier & Investissement', value: 'immobilier' },
                    { title: 'Destinations & Quartiers', value: 'destinations' },
                    { title: 'Guides pratiques', value: 'guides' },
                ],
            },
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            group: 'meta',
            of: [{ type: 'string' }],
            options: { layout: 'tags' },
        }),
        defineField({
            name: 'targetKeywords',
            title: 'Mots-clés SEO ciblés',
            type: 'object',
            group: 'seo',
            fields: [
                defineField({ name: 'primary', title: 'Mot-clé principal', type: 'string' }),
                defineField({
                    name: 'secondary',
                    title: 'Mots-clés secondaires / LSI',
                    type: 'array',
                    of: [{ type: 'string' }],
                    options: { layout: 'tags' },
                }),
            ],
        }),
        defineField({
            name: 'seoTitle',
            title: 'Title SEO (override)',
            description: 'Si vide, le titre principal est utilisé',
            type: 'object',
            group: 'seo',
            fields: [
                defineField({ name: 'fr', title: 'fr', type: 'string', validation: (r) => r.max(70) }),
                defineField({ name: 'en', title: 'en', type: 'string', validation: (r) => r.max(70) }),
                defineField({ name: 'es', title: 'es', type: 'string', validation: (r) => r.max(70) }),
                defineField({ name: 'pt', title: 'pt', type: 'string', validation: (r) => r.max(70) }),
            ],
        }),
        defineField({
            name: 'seoDescription',
            title: 'Meta description (override)',
            description: 'Si vide, l\'excerpt est utilisé',
            type: 'object',
            group: 'seo',
            fields: [
                defineField({ name: 'fr', title: 'fr', type: 'text', rows: 2, validation: (r) => r.max(170) }),
                defineField({ name: 'en', title: 'en', type: 'text', rows: 2, validation: (r) => r.max(170) }),
                defineField({ name: 'es', title: 'es', type: 'text', rows: 2, validation: (r) => r.max(170) }),
                defineField({ name: 'pt', title: 'pt', type: 'text', rows: 2, validation: (r) => r.max(170) }),
            ],
        }),
        defineField({
            name: 'sources',
            title: 'Sources / Bibliographie',
            description: 'Sources externes consultées pour rédiger l\'article (transparence et traçabilité)',
            type: 'array',
            group: 'meta',
            of: [
                {
                    type: 'object',
                    fields: [
                        defineField({ name: 'title', title: 'Titre de la source', type: 'string', validation: (r) => r.required() }),
                        defineField({ name: 'url', title: 'URL', type: 'url', validation: (r) => r.required() }),
                        defineField({ name: 'publisher', title: 'Éditeur / Site', type: 'string' }),
                        defineField({ name: 'publishedDate', title: 'Date de publication', type: 'date' }),
                        defineField({ name: 'accessedDate', title: 'Date de consultation', type: 'date' }),
                    ],
                    preview: {
                        select: { title: 'title', publisher: 'publisher' },
                        prepare: ({ title, publisher }) => ({
                            title: title || 'Source sans titre',
                            subtitle: publisher || '',
                        }),
                    },
                },
            ],
        }),
        defineField({
            name: 'relatedVillas',
            title: 'Villas liées (maillage interne)',
            description: 'Villas citées ou pertinentes pour cet article',
            type: 'array',
            group: 'meta',
            of: [{ type: 'reference', to: [{ type: 'villa' }] }],
        }),
        defineField({
            name: 'author',
            title: 'Auteur affiché',
            type: 'string',
            group: 'meta',
            initialValue: 'Sun Beach House',
        }),
        defineField({
            name: 'publishedAt',
            title: 'Date de publication',
            type: 'datetime',
            group: 'meta',
            initialValue: () => new Date().toISOString(),
        }),
        defineField({
            name: 'updatedAt',
            title: 'Date de dernière mise à jour',
            type: 'datetime',
            group: 'meta',
        }),
        defineField({
            name: 'status',
            title: 'Statut',
            type: 'string',
            group: 'meta',
            options: {
                list: [
                    { title: 'Brouillon', value: 'draft' },
                    { title: 'En relecture', value: 'review' },
                    { title: 'Publié', value: 'published' },
                ],
                layout: 'radio',
            },
            initialValue: 'draft',
            validation: (r) => r.required(),
        }),
        defineField({
            name: 'verificationNotes',
            title: 'Notes de vérification (interne)',
            description: 'Points marqués [À VÉRIFIER] par l\'agent rédactionnel à valider avant publication',
            type: 'text',
            rows: 4,
            group: 'meta',
        }),
    ],
    preview: {
        select: {
            title: 'title.fr',
            category: 'category',
            publishedAt: 'publishedAt',
            status: 'status',
            media: 'mainImage',
        },
        prepare({ title, category, publishedAt, status, media }) {
            const date = publishedAt ? new Date(publishedAt).toLocaleDateString('fr-FR') : '?'
            const statusLabel = status === 'published' ? '[PUB]' : status === 'review' ? '[REL]' : '[BRO]'
            return {
                title: title || 'Article sans titre',
                subtitle: `${statusLabel} ${category || '?'} · ${date}`,
                media,
            }
        },
    },
    orderings: [
        {
            title: 'Date de publication (récent → ancien)',
            name: 'publishedAtDesc',
            by: [{ field: 'publishedAt', direction: 'desc' }],
        },
        {
            title: 'Statut',
            name: 'statusAsc',
            by: [{ field: 'status', direction: 'asc' }],
        },
    ],
})
