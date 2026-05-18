import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { frFRLocale } from '@sanity/locale-fr-fr'
import { muxInput } from 'sanity-plugin-mux-input'
import { schemaTypes } from './schemaTypes'
import { Logo } from './components/Logo'
import { GeneratePDFAction } from './actions/generatePDFAction'
import { GeneratePDFWithPricingAction } from './actions/generatePDFWithPricingAction'
import { ShareSelectionTool } from './tools/ShareSelectionTool'
import { EnvelopeIcon } from '@sanity/icons'

export default defineConfig({
  name: 'default',
  title: 'Sun Beach House',

  projectId: 'i6dkdu7j',
  dataset: 'production',

  studio: {
    components: {
      logo: Logo
    }
  },

  tools: (prev) => {
    return [
      // Hide the built-in "Releases" tab and the Mux Video configuration tab
      ...prev.filter((t) => !['releases', 'mux-video', 'mux-video-tool', 'mux', 'mux-input'].includes(t.name)),
      {
        name: 'share-selection',
        title: 'Partager Sélection',
        icon: EnvelopeIcon,
        component: ShareSelectionTool,
      }
    ]
  },

  // Disable Content Releases feature entirely (removes the tab and its sidebar UI)
  releases: {
    enabled: false,
  },

  plugins: [
    frFRLocale(),
    muxInput(),
    structureTool({
      structure: (S) =>
        S.list()
          .title('Contenu')
          .items([
            // Vue: Toutes les villas
            S.listItem()
              .title('📋 Toutes les villas')
              .child(
                S.documentList()
                  .title('Toutes les villas')
                  .schemaType('villa')
                  .filter('_type == "villa"')
                  .defaultOrdering([{ field: 'name', direction: 'asc' }])
              ),

            S.divider(),

            // === SECTION: LOCATIONS ===
            S.listItem()
              .title('🏖️ Locations de vacances')
              .child(
                S.list()
                  .title('Locations de vacances')
                  .items([
                    // Toutes les locations
                    S.listItem()
                      .title('Toutes les locations')
                      .child(
                        S.documentList()
                          .title('Toutes les locations')
                          .schemaType('villa')
                          .filter('_type == "villa" && listingType == "rent"')
                          .defaultOrdering([{ field: 'name', direction: 'asc' }])
                      ),

                    S.divider(),

                    // Par localisation
                    S.listItem()
                      .title('📍 Par quartier (Locations)')
                      .child(
                        S.documentTypeList('location')
                          .title('Quartiers')
                          .child((locationId) =>
                            S.documentList()
                              .title('Villas dans ce quartier (Location)')
                              .schemaType('villa')
                              .filter('_type == "villa" && listingType == "rent" && location._ref == $locationId')
                              .params({ locationId })
                              .defaultOrdering([{ field: 'name', direction: 'asc' }])
                          )
                      ),
                  ])
              ),

            // === SECTION: VENTES ===
            S.listItem()
              .title('🏡 Propriétés à vendre')
              .child(
                S.list()
                  .title('Propriétés à vendre')
                  .items([
                    // Toutes les ventes
                    S.listItem()
                      .title('Toutes les ventes')
                      .child(
                        S.documentList()
                          .title('Toutes les ventes')
                          .schemaType('villa')
                          .filter('_type == "villa" && listingType == "sale"')
                          .defaultOrdering([{ field: 'name', direction: 'asc' }])
                      ),

                    S.divider(),

                    // Par localisation
                    S.listItem()
                      .title('📍 Par quartier (Ventes)')
                      .child(
                        S.documentTypeList('location')
                          .title('Quartiers')
                          .child((locationId) =>
                            S.documentList()
                              .title('Propriétés dans ce quartier (Vente)')
                              .schemaType('villa')
                              .filter('_type == "villa" && listingType == "sale" && location._ref == $locationId')
                              .params({ locationId })
                              .defaultOrdering([{ field: 'name', direction: 'asc' }])
                          )
                      ),
                  ])
              ),

            S.divider(),

            // === VUE: GESTION DES LOCALISATIONS ===
            S.listItem()
              .title('🗺️ Gérer les Localisations (Quartiers)')
              .child(
                S.documentTypeList('location')
                  .title('Localisations')
                  .defaultOrdering([{ field: 'name', direction: 'asc' }])
              ),

            S.divider(),

            // === VUE: PAR LOCALISATION (TOUTES) ===
            S.listItem()
              .title('📍 Toutes les Villas par localisation')
              .child(
                S.documentTypeList('location')
                  .title('Quartiers')
                  .child((locationId) =>
                    S.documentList()
                      .title('Toutes les villas dans ce quartier')
                      .schemaType('villa')
                      .filter('_type == "villa" && location._ref == $locationId')
                      .params({ locationId })
                      .defaultOrdering([{ field: 'name', direction: 'asc' }])
                  )
              ),

            S.divider(),

            // === VUE: MISE EN AVANT ===
            S.listItem()
              .title('⭐ Mise en avant (Homepage)')
              .child(
                S.documentList()
                  .title('Villas mises en avant')
                  .schemaType('villa')
                  .filter('_type == "villa" && featuredOnHomepage == true')
                  .defaultOrdering([{ field: 'homepageOrder', direction: 'asc' }])
              ),

            S.divider(),

            // === SECTION: BLOG / MAGAZINE ===
            S.listItem()
              .title('📰 Blog / Magazine')
              .child(
                S.list()
                  .title('Blog / Magazine')
                  .items([
                    S.listItem()
                      .title('Tous les articles')
                      .child(
                        S.documentList()
                          .title('Tous les articles')
                          .schemaType('post')
                          .filter('_type == "post"')
                          .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                      ),

                    S.divider(),

                    S.listItem()
                      .title('📂 Par catégorie')
                      .child(
                        S.list()
                          .title('Catégories')
                          .items([
                            S.listItem()
                              .title('Vie à Saint-Barth')
                              .child(
                                S.documentList()
                                  .title('Vie à Saint-Barth')
                                  .schemaType('post')
                                  .filter('_type == "post" && category == "vie-st-barth"')
                                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                              ),
                            S.listItem()
                              .title('Services & Conciergerie')
                              .child(
                                S.documentList()
                                  .title('Services & Conciergerie')
                                  .schemaType('post')
                                  .filter('_type == "post" && category == "services"')
                                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                              ),
                            S.listItem()
                              .title('Villas & Propriétés')
                              .child(
                                S.documentList()
                                  .title('Villas & Propriétés')
                                  .schemaType('post')
                                  .filter('_type == "post" && category == "villas"')
                                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                              ),
                            S.listItem()
                              .title('Saison & Évènements')
                              .child(
                                S.documentList()
                                  .title('Saison & Évènements')
                                  .schemaType('post')
                                  .filter('_type == "post" && category == "saison"')
                                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                              ),
                            S.listItem()
                              .title('Immobilier & Investissement')
                              .child(
                                S.documentList()
                                  .title('Immobilier & Investissement')
                                  .schemaType('post')
                                  .filter('_type == "post" && category == "immobilier"')
                                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                              ),
                            S.listItem()
                              .title('Destinations & Quartiers')
                              .child(
                                S.documentList()
                                  .title('Destinations & Quartiers')
                                  .schemaType('post')
                                  .filter('_type == "post" && category == "destinations"')
                                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                              ),
                            S.listItem()
                              .title('Guides pratiques')
                              .child(
                                S.documentList()
                                  .title('Guides pratiques')
                                  .schemaType('post')
                                  .filter('_type == "post" && category == "guides"')
                                  .defaultOrdering([{ field: 'publishedAt', direction: 'desc' }])
                              ),
                          ])
                      ),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: (prev, context) => {
      // Add both PDF generation actions for villa documents
      if (context.schemaType === 'villa') {
        return [...prev, GeneratePDFAction, GeneratePDFWithPricingAction]
      }
      return prev
    },
  },
})
