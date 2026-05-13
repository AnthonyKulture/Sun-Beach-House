import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { frFRLocale } from '@sanity/locale-fr-fr'
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
      ...prev,
      {
        name: 'share-selection',
        title: 'Partager Sélection',
        icon: EnvelopeIcon,
        component: ShareSelectionTool,
      }
    ]
  },

  plugins: [
    frFRLocale(),
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
