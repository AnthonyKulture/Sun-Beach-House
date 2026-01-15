import { defineType, defineField, defineArrayMember } from 'sanity'

// ═══════════════════════════════════════════════════════════════
// OBJETS RÉUTILISABLES
// ═══════════════════════════════════════════════════════════════

const bedroomPrice = defineType({
  name: 'bedroomPrice',
  title: 'Tarif par configuration',
  type: 'object',
  fields: [
    defineField({
      name: 'bedrooms',
      title: 'Nombre de chambres',
      type: 'number',
      validation: (rule) => rule.required().min(1).max(10)
        .error('Veuillez indiquer un nombre entre 1 et 10'),
    }),
    defineField({
      name: 'price',
      title: 'Prix ($ / semaine)',
      type: 'number',
      validation: (rule) => rule.required().min(0)
        .error('Le prix doit être positif'),
    }),
  ],
  preview: {
    select: { bedrooms: 'bedrooms', price: 'price' },
    prepare({ bedrooms, price }) {
      return {
        title: `${bedrooms} chambre${bedrooms > 1 ? 's' : ''} → ${price?.toLocaleString('fr-FR')} €`,
      }
    },
  },
})

const seasonalPrice = defineType({
  name: 'seasonalPrice',
  title: 'Tarif saisonnier',
  type: 'object',
  fields: [
    defineField({
      name: 'seasonName',
      title: 'Nom de la saison',
      type: 'string',
      description: 'Exemple : "Haute Saison", "Noël", "Été"',
      options: {
        list: [
          { title: 'Basse Saison (Low Season)', value: 'Low Season' },
          { title: 'Été (Summer)', value: 'Summer' },
          { title: 'Haute Saison (High Season)', value: 'High Season' },
          { title: 'Thanksgiving', value: 'Thanksgiving & Bucket' },
          { title: 'Noël (Christmas)', value: 'Christmas' },
          { title: 'Nouvel An (New Year)', value: 'New Year' },
        ],
      },
      validation: (rule) => rule.required().error('Choisissez une saison'),
    }),
    defineField({
      name: 'dates',
      title: 'Période',
      type: 'string',
      description: 'Exemple : "15 Avr - 30 Avr" ou "17 Déc - 26 Déc"',
      validation: (rule) => rule.required().error('Indiquez les dates de la saison'),
    }),
    defineField({
      name: 'prices',
      title: 'Grille tarifaire',
      description: 'Ajoutez un prix pour chaque configuration de chambres disponible',
      type: 'array',
      of: [{ type: 'bedroomPrice' }],
      validation: (rule) => rule.required().min(1)
        .error('Ajoutez au moins un tarif'),
    }),
  ],
  preview: {
    select: { seasonName: 'seasonName', dates: 'dates', prices: 'prices' },
    prepare({ seasonName, dates, prices }) {
      const priceCount = prices?.length || 0
      return {
        title: seasonName,
        subtitle: `${dates} • ${priceCount} tarif${priceCount > 1 ? 's' : ''}`,
      }
    },
  },
})

// Labels par défaut pour les équipements
const EQUIPMENT_LABELS: Record<string, string> = {
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
  'Star': 'Équipement personnalisé',
}

const homeFeature = defineType({
  name: 'homeFeature',
  title: 'Caractéristique',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      description: 'Ex: "Chambre 1", "Salon Principal", "Terrasse"',
      validation: (rule) => rule.required().error('Le titre est obligatoire'),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Détails: lit king size, vue mer, équipements, etc.',
      validation: (rule) => rule.required().error('La description est obligatoire'),
    }),
  ],
  preview: {
    select: { title: 'title', description: 'description' },
    prepare({ title, description }) {
      return {
        title: title,
        subtitle: description?.substring(0, 60) + '...',
      }
    },
  },
})

const amenity = defineType({
  name: 'amenity',
  title: 'Équipement',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Choisir un équipement',
      type: 'string',
      description: 'Sélectionnez un équipement dans la liste',
      options: {
        list: [
          { title: '📶 Wifi Haut Débit', value: 'Wifi' },
          { title: '❄️ Climatisation', value: 'Wind' },
          { title: '🌊 Accès Plage Direct', value: 'Waves' },
          { title: '👨‍🍳 Cuisine Équipée', value: 'ChefHat' },
          { title: '🚗 Parking Privé', value: 'Car' },
          { title: '🏊 Piscine', value: 'Droplets' },
          { title: '☀️ Terrasse / Solarium', value: 'Sun' },
          { title: '☕ Machine à Café', value: 'Coffee' },
          { title: '🌺 Jardin Tropical', value: 'Flower2' },
          { title: '🔊 Système Audio Sonos', value: 'Speaker' },
          { title: '💪 Salle de Fitness', value: 'Dumbbell' },
          { title: '📺 TV / Cinéma', value: 'Tv' },
          { title: '🔒 Sécurité 24/7', value: 'Shield' },
          { title: '🍖 Barbecue', value: 'Utensils' },
          { title: '🛍️ Proche Commerces', value: 'ShoppingBag' },
          { title: '🍸 Bar Extérieur', value: 'Martini' },
          { title: '🎵 Sonorisation', value: 'Music' },
          { title: '🔑 Service Conciergerie', value: 'Key' },
          { title: '⭐ Autre (personnalisé)...', value: 'Star' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required().error('Choisissez un équipement'),
    }),
    defineField({
      name: 'label',
      title: 'Nom personnalisé',
      type: 'string',
      description: 'Donnez un nom à votre équipement personnalisé',
      hidden: ({ parent }) => parent?.icon !== 'Star',
      validation: (rule) => rule.custom((value, context) => {
        const parent = context.parent as { icon?: string }
        if (parent?.icon === 'Star' && !value) {
          return 'Entrez le nom de votre équipement personnalisé'
        }
        return true
      }),
    }),
  ],
  preview: {
    select: { icon: 'icon', label: 'label' },
    prepare({ icon, label }) {
      const iconEmojis: Record<string, string> = {
        'Wifi': '📶', 'Wind': '❄️', 'Waves': '🌊', 'ChefHat': '👨‍🍳',
        'Car': '🚗', 'Droplets': '🏊', 'Sun': '☀️', 'Coffee': '☕',
        'Flower2': '🌺', 'Speaker': '🔊', 'Dumbbell': '💪', 'Tv': '📺',
        'Shield': '🔒', 'Utensils': '🍖', 'ShoppingBag': '🛍️',
        'Martini': '🍸', 'Music': '🎵', 'Key': '🔑', 'Star': '⭐'
      }
      const displayLabel = label || EQUIPMENT_LABELS[icon] || icon
      return {
        title: `${iconEmojis[icon] || '•'} ${displayLabel}`,
      }
    },
  },
})

// ═══════════════════════════════════════════════════════════════
// DOCUMENT PRINCIPAL : VILLA
// ═══════════════════════════════════════════════════════════════

const villa = defineType({
  name: 'villa',
  title: 'Villa',
  type: 'document',
  groups: [
    { name: 'essential', title: 'Essentiel', default: true },
    { name: 'description', title: 'Description' },
    { name: 'pricing', title: 'Tarification' },
    { name: 'features', title: 'Caractéristiques' },
    { name: 'location', title: 'Localisation' },
    { name: 'media', title: 'Photos' },
    { name: 'extras', title: 'Équipements & Tags' },
    { name: 'pdfExport', title: 'Export PDF' },
  ],
  fields: [
    // ═══════════════════════════════════════════════════════════
    // GROUPE : ESSENTIEL
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'name',
      title: 'Nom de la villa',
      type: 'string',
      group: 'essential',
      description: 'Le nom unique de cette propriété',
      validation: (rule) => rule.required().max(100)
        .error('Le nom est obligatoire (100 caractères max)'),
    }),
    defineField({
      name: 'slug',
      title: 'URL de la page',
      type: 'slug',
      group: 'essential',
      description: 'Cliquez sur "Generate" pour créer automatiquement l\'URL',
      options: {
        source: 'name',
        maxLength: 96,
        slugify: input => input
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[àáâãäå]/g, 'a')
          .replace(/[èéêë]/g, 'e')
          .replace(/[ìíîï]/g, 'i')
          .replace(/[òóôõö]/g, 'o')
          .replace(/[ùúûü]/g, 'u')
          .replace(/[ç]/g, 'c')
          .replace(/[^a-z0-9-]/g, '')
          .slice(0, 96)
      },
      validation: (rule) => rule.required().error('Cliquez sur "Generate" pour créer l\'URL'),
    }),
    defineField({
      name: 'listingType',
      title: 'Type d\'annonce',
      type: 'string',
      group: 'essential',
      description: 'Cette villa est-elle à louer ou à vendre ?',
      options: {
        list: [
          { title: 'Location (vacances)', value: 'rent' },
          { title: 'Vente (immobilier)', value: 'sale' },
        ],
        layout: 'radio',
      },
      initialValue: 'rent',
      validation: (rule) => rule.required().error('Choisissez le type d\'annonce'),
    }),
    defineField({
      name: 'location',
      title: 'Quartier',
      type: 'string',
      group: 'essential',
      description: 'Où se situe cette villa à Saint-Barthélemy ?',
      options: {
        list: [
          { title: 'Flamands', value: 'Flamands' },
          { title: 'Toiny', value: 'Toiny' },
          { title: 'Saline', value: 'Saline' },
          { title: 'Gustavia', value: 'Gustavia' },
          { title: 'Lorient', value: 'Lorient' },
          { title: 'Gouverneur', value: 'Gouverneur' },
          { title: 'St Jean', value: 'St Jean' },
          { title: 'Colombier', value: 'Colombier' },
          { title: 'Corossol', value: 'Corossol' },
          { title: 'Marigot', value: 'Marigot' },
          { title: 'Grand Cul de Sac', value: 'Grand Cul de Sac' },
          { title: 'Petit Cul de Sac', value: 'Petit Cul de Sac' },
          { title: 'Pointe Milou', value: 'Pointe Milou' },
          { title: 'Lurin', value: 'Lurin' },
          { title: 'Vitet', value: 'Vitet' },
        ],
        layout: 'dropdown',
      },
      validation: (rule) => rule.required().error('Sélectionnez un quartier'),
    }),
    defineField({
      name: 'privateInfo',
      title: 'Informations privées',
      type: 'text',
      group: 'essential',
      description: 'Notes internes, non affichées sur le site (accès propriétaire, codes, etc.)',
      rows: 3,
    }),
    defineField({
      name: 'geopoint',
      title: 'Position sur la carte',
      type: 'geopoint',
      group: 'location',
      description: 'Coordonnées GPS pour afficher la villa sur une carte',
    }),
    defineField({
      name: 'featuredOnHomepage',
      title: 'Afficher sur la page d\'accueil',
      type: 'boolean',
      group: 'essential',
      description: 'Cochez cette case pour afficher cette villa dans la section "Collection Exclusive" de la page d\'accueil (uniquement pour les locations)',
      initialValue: false,
      hidden: ({ document }) => document?.listingType === 'sale',
      validation: (rule) => rule.custom((value, context) => {
        if (value && context.document?.listingType === 'sale') {
          return 'Seules les villas de location peuvent être affichées sur la page d\'accueil'
        }
        return true
      }),
    }),
    defineField({
      name: 'homepageOrder',
      title: 'Position sur la page d\'accueil',
      type: 'number',
      group: 'essential',
      description: 'Choisissez la position (1, 2, 3 ou 4) où cette villa apparaîtra. Si vous décochez "Afficher sur la page d\'accueil", videz ce champ (menu "..." → Unset).',
      hidden: ({ document }) => document?.listingType === 'sale', // Caché pour les villas à vendre
      options: {
        list: [
          { title: 'Position 1', value: 1 },
          { title: 'Position 2', value: 2 },
          { title: 'Position 3', value: 3 },
          { title: 'Position 4', value: 4 },
        ],
      },
      validation: (rule) => rule.custom(async (value, context) => {
        // IMPORTANT: Si la villa n'est plus featured mais a encore une position
        if (!context.document?.featuredOnHomepage && value) {
          return {
            level: 'error',
            message: `❌ Veuillez vider ce champ. Une position ne devrait être définie que si "Afficher sur la page d\'accueil" est coché.`
          }
        }

        // Vérifier que la position est valide
        if (context.document?.featuredOnHomepage && (!value || value < 1 || value > 4)) {
          return 'Choisissez une position entre 1 et 4'
        }

        // Si la villa n'est pas featured, pas besoin de vérifier les conflits
        if (!context.document?.featuredOnHomepage || !value) {
          return true
        }

        // Vérifier s'il y a un conflit de position avec une autre villa
        const { getClient } = context
        const client = getClient({ apiVersion: '2024-03-01' })

        // Obtenir l'ID sans le préfixe "drafts." pour la comparaison
        const currentId = context.document._id
        const publishedId = currentId?.replace(/^drafts\./, '')

        const query = `*[
          _type == "villa" && 
          featuredOnHomepage == true && 
          homepageOrder == $position && 
          !(_id in [$draftId, $publishedId])
        ][0]{
          _id,
          name
        }`

        const existingVilla = await client.fetch(query, {
          position: value,
          draftId: `drafts.${publishedId}`,
          publishedId: publishedId
        })

        if (existingVilla) {
          return {
            level: 'warning',
            message: `⚠️ La position ${value} est déjà occupée par "${existingVilla.name}". En sauvegardant, vous la remplacerez automatiquement.`
          }
        }

        return true
      }),
    }),

    // ═══════════════════════════════════════════════════════════
    // GROUPE : DESCRIPTION
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'description',
      title: 'Accroche courte',
      type: 'object',
      group: 'description',
      description: 'Une phrase d\'accroche (affichée sur les cartes) en français et anglais',
      fields: [
        {
          name: 'fr',
          title: 'Français',
          type: 'string',
          validation: (rule) => rule.required().max(100),
        },
        {
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (rule) => rule.required().max(100),
        },
      ],
      validation: (rule) => rule.required().error('Les descriptions FR et EN sont obligatoires'),
    }),
    defineField({
      name: 'fullDescription',
      title: 'Description complète',
      type: 'object',
      group: 'description',
      description: 'Description détaillée de la villa en français et anglais',
      fields: [
        {
          name: 'fr',
          title: 'Français',
          type: 'text',
          rows: 10,
          validation: (rule) => rule.required(),
        },
        {
          name: 'en',
          title: 'English',
          type: 'text',
          rows: 10,
          validation: (rule) => rule.required(),
        },
      ],
      validation: (rule) => rule.required().error('Les descriptions FR et EN sont obligatoires'),
    }),
    defineField({
      name: 'viewType',
      title: 'Type de vue',
      type: 'string',
      group: 'description',
      description: 'Quelle vue offre cette villa ? Ex: "Océan panoramique", "Jardin tropical" (optionnel)',
    }),
    defineField({
      name: 'homeFeatures',
      title: 'Caractéristiques de la Maison',
      type: 'array',
      of: [{ type: 'homeFeature' }],
      group: 'description',
      description: 'Détails des chambres, espaces communs, équipements spéciaux',
    }),

    // ═══════════════════════════════════════════════════════════
    // GROUPE : TARIFICATION
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'pricePerNight',
      title: 'Prix par nuit (à partir de) - $',
      type: 'number',
      group: 'pricing',
      description: 'Prix par nuit (Basse Saison) - si applicable',
      hidden: ({ document }) => document?.listingType === 'sale',
    }),
    defineField({
      name: 'pricePerWeek',
      title: 'Prix par semaine (à partir de) - $',
      type: 'number',
      group: 'pricing',
      description: 'Prix par semaine (Basse Saison) - si applicable',
      hidden: ({ document }) => document?.listingType === 'sale',
    }),
    defineField({
      name: 'salePrice',
      title: 'Prix de vente (€)',
      type: 'number',
      group: 'pricing',
      description: 'Prix de vente (pour les biens à vendre uniquement)',
      hidden: ({ document }) => document?.listingType === 'rent',
      validation: (rule) => rule.custom((value, context) => {
        if (context.document?.listingType === 'sale' && !value) {
          return 'Le prix de vente est obligatoire'
        }
        return true
      }),
    }),
    defineField({
      name: 'seasonalPrices',
      title: 'Grille tarifaire saisonnière',
      type: 'array',
      group: 'pricing',
      of: [{ type: 'seasonalPrice' }],
      description: 'Ajoutez les tarifs pour chaque saison (locations uniquement)',
      hidden: ({ document }) => document?.listingType === 'sale',
    }),

    // ═══════════════════════════════════════════════════════════
    // GROUPE : CARACTÉRISTIQUES
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'bedrooms',
      title: 'Nombre de chambres',
      type: 'number',
      group: 'features',
      initialValue: 3,
      validation: (rule) => rule.required().min(1).max(20)
        .error('Indiquez le nombre de chambres (1-20)'),
    }),
    defineField({
      name: 'bathrooms',
      title: 'Nombre de salles de bain',
      type: 'number',
      group: 'features',
      initialValue: 2,
      validation: (rule) => rule.required().min(1).max(20)
        .error('Indiquez le nombre de salles de bain (1-20)'),
    }),
    defineField({
      name: 'guests',
      title: 'Capacité (personnes)',
      type: 'number',
      group: 'features',
      description: 'Nombre maximum de personnes pouvant séjourner',
      initialValue: 6,
      validation: (rule) => rule.required().min(1).max(50)
        .error('Indiquez la capacité (1-50 personnes)'),
    }),
    defineField({
      name: 'surface',
      title: 'Surface (m²)',
      type: 'number',
      group: 'features',
      description: 'Surface habitable en mètres carrés (optionnel)',
    }),

    // ═══════════════════════════════════════════════════════════
    // GROUPE : PHOTOS
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'mainImage',
      title: 'Photo principale',
      type: 'image',
      group: 'media',
      description: 'La photo qui apparaîtra en premier (format paysage recommandé)',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Description de l\'image',
          type: 'string',
          description: 'Décrivez l\'image pour l\'accessibilité',
        }),
      ],
    }),
    defineField({
      name: 'mainImageUrl',
      title: 'OU lien vers photo principale',
      type: 'url',
      group: 'media',
      description: 'Alternative : collez un lien vers l\'image (si pas de téléchargement)',
    }),
    defineField({
      name: 'galleryImages',
      title: 'Galerie photos',
      type: 'array',
      group: 'media',
      description: 'Ajoutez plusieurs photos de la villa',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Description',
              type: 'string',
            }),
            defineField({
              name: 'caption',
              title: 'Légende',
              type: 'string',
            }),
          ],
        }),
      ],
      options: { layout: 'grid' },
    }),
    defineField({
      name: 'galleryImageUrls',
      title: 'OU liens vers photos galerie',
      type: 'array',
      group: 'media',
      of: [{ type: 'url' }],
      description: 'Alternative : collez des liens vers les images',
    }),

    // ═══════════════════════════════════════════════════════════
    // GROUPE : ÉQUIPEMENTS & TAGS
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'amenities',
      title: 'Équipements & Services',
      type: 'array',
      group: 'extras',
      of: [{ type: 'amenity' }],
      description: 'Listez tous les équipements de la villa',
      validation: (rule) => rule.min(1).error('Ajoutez au moins un équipement'),
    }),
    defineField({
      name: 'tags',
      title: 'Mots-clés',
      type: 'array',
      group: 'extras',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description: 'Ajoutez des mots-clés pour le référencement. Ex: "Vue mer", "Piscine", "Luxe"',
    }),

    // ═══════════════════════════════════════════════════════════
    // GROUPE : EXPORT PDF
    // ═══════════════════════════════════════════════════════════
    defineField({
      name: 'pdfOptions',
      title: 'Options d\'export PDF',
      type: 'object',
      group: 'pdfExport',
      description: 'Configurez les éléments à inclure dans la brochure PDF téléchargeable',
      fields: [
        defineField({
          name: 'includePrice',
          title: 'Inclure les tarifs dans le PDF',
          type: 'boolean',
          initialValue: true,
          description: 'Si décoché, la grille tarifaire saisonnière sera masquée dans la brochure PDF (page 2)',
        }),
        defineField({
          name: 'customFooterText',
          title: 'Texte de pied de page personnalisé',
          type: 'text',
          rows: 3,
          description: 'Ajoutez une note légale ou un message personnalisé (laissez vide pour le texte par défaut)',
        }),
        defineField({
          name: 'highlightedAmenities',
          title: 'Équipements à mettre en avant (max 8)',
          type: 'array',
          of: [{ type: 'string' }],
          options: {
            list: [
              { title: '📶 Wifi Haut Débit', value: 'Wifi' },
              { title: '❄️ Climatisation', value: 'Wind' },
              { title: '🌊 Accès Plage Direct', value: 'Waves' },
              { title: '👨‍🍳 Cuisine Équipée', value: 'ChefHat' },
              { title: '🚗 Parking Privé', value: 'Car' },
              { title: '🏊 Piscine', value: 'Droplets' },
              { title: '☀️ Terrasse / Solarium', value: 'Sun' },
              { title: '☕ Machine à Café', value: 'Coffee' },
              { title: '🌺 Jardin Tropical', value: 'Flower2' },
              { title: '🔊 Système Audio Sonos', value: 'Speaker' },
              { title: '💪 Salle de Fitness', value: 'Dumbbell' },
              { title: '📺 TV / Cinéma', value: 'Tv' },
              { title: '🔒 Sécurité 24/7', value: 'Shield' },
              { title: '🍖 Barbecue', value: 'Utensils' },
              { title: '🛍️ Proche Commerces', value: 'ShoppingBag' },
              { title: '🍸 Bar Extérieur', value: 'Martini' },
              { title: '🎵 Sonorisation', value: 'Music' },
              { title: '🔑 Service Conciergerie', value: 'Key' },
            ],
          },
          validation: (rule) => rule.max(8).warning('Maximum 8 équipements pour un affichage optimal'),
          description: 'Sélectionnez les équipements clés qui apparaîtront dans la brochure PDF. Si vide, les premiers équipements seront utilisés.',
        }),
      ],
    }),
  ],

  // ═══════════════════════════════════════════════════════════════
  // APERÇU DANS LA LISTE
  // ═══════════════════════════════════════════════════════════════
  preview: {
    select: {
      title: 'name',
      location: 'location',
      listingType: 'listingType',
      media: 'mainImage',
      bedrooms: 'bedrooms',
      pricePerNight: 'pricePerNight',
      pricePerWeek: 'pricePerWeek',
      salePrice: 'salePrice',
    },
    prepare({ title, location, listingType, media, bedrooms, pricePerNight, pricePerWeek, salePrice }) {
      const typeLabel = listingType === 'sale' ? 'VENTE' : 'LOCATION'
      let displayPrice = '';
      if (listingType === 'sale') {
        displayPrice = `${(salePrice || 0).toLocaleString('fr-FR')} €`;
      } else {
        if (pricePerNight) displayPrice = `${pricePerNight} €/nuit`;
        if (pricePerWeek) displayPrice = displayPrice ? `${displayPrice} | ${pricePerWeek} €/semaine` : `${pricePerWeek} €/semaine`;
        if (!displayPrice) displayPrice = 'Prix sur demande';
      }

      return {
        title: title || 'Nouvelle villa',
        subtitle: `${typeLabel} • ${location || '?'} • ${bedrooms || '?'} ch. • ${displayPrice}`,
        media: media,
      }
    },
  },

  // ═══════════════════════════════════════════════════════════════
  // OPTIONS DE TRI
  // ═══════════════════════════════════════════════════════════════
  orderings: [
    {
      title: 'Nom (A → Z)',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
    {
      title: 'Prix croissant',
      name: 'priceAsc',
      by: [{ field: 'pricePerNight', direction: 'asc' }],
    },
    {
      title: 'Prix décroissant',
      name: 'priceDesc',
      by: [{ field: 'pricePerNight', direction: 'desc' }],
    },
    {
      title: 'Par quartier',
      name: 'locationAsc',
      by: [{ field: 'location', direction: 'asc' }],
    },
  ],
})

export { bedroomPrice, seasonalPrice, homeFeature, amenity, villa }

