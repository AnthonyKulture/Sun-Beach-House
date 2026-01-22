import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { frFRLocale } from '@sanity/locale-fr-fr'
import { schemaTypes } from './schemaTypes'
import { GeneratePDFAction } from './actions/generatePDFAction'
import { GeneratePDFWithPricingAction } from './actions/generatePDFWithPricingAction'

export default defineConfig({
  name: 'default',
  title: 'Sun Beach House',

  projectId: 'i6dkdu7j',
  dataset: 'production',

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
                S.documentTypeList('villa')
                  .title('Toutes les villas')
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
                        S.documentTypeList('villa')
                          .title('Toutes les locations')
                          .filter('listingType == "rent"')
                          .defaultOrdering([{ field: 'name', direction: 'asc' }])
                      ),

                    S.divider(),

                    // Par localisation
                    ...createLocationItems(S, 'rent'),
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
                        S.documentTypeList('villa')
                          .title('Toutes les ventes')
                          .filter('listingType == "sale"')
                          .defaultOrdering([{ field: 'name', direction: 'asc' }])
                      ),

                    S.divider(),

                    // Par localisation
                    ...createLocationItems(S, 'sale'),
                  ])
              ),

            S.divider(),

            // === VUE: PAR LOCALISATION ===
            S.listItem()
              .title('📍 Par localisation')
              .child(
                S.list()
                  .title('Villas par localisation')
                  .items(createLocationItems(S, null))
              ),

            S.divider(),

            // === VUE: MISE EN AVANT ===
            S.listItem()
              .title('⭐ Mise en avant (Homepage)')
              .child(
                S.documentTypeList('villa')
                  .title('Villas mises en avant')
                  .filter('featuredOnHomepage == true')
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

// Fonction helper pour créer les items de localisation
function createLocationItems(S: any, listingType: 'rent' | 'sale' | null) {
  const locations = [
    { title: 'Flamands', emoji: '🏖️' },
    { title: 'Grand Cul de Sac', emoji: '🌊' },
    { title: 'Gustavia', emoji: '⚓' },
    { title: 'Lorient', emoji: '🏝️' },
    { title: 'Lurin', emoji: '🌴' },
    { title: 'St Jean', emoji: '✈️' },
    { title: 'Saline', emoji: '🌺' },
    { title: 'Gouverneur', emoji: '🏔️' },
    { title: 'Colombier', emoji: '⛰️' },
    { title: 'Toiny', emoji: '🌅' },
    { title: 'Corossol', emoji: '🐚' },
    { title: 'Marigot', emoji: '🌴' },
    { title: 'Petit Cul de Sac', emoji: '🏄' },
    { title: 'Pointe Milou', emoji: '🌊' },
    { title: 'Vitet', emoji: '🌿' },
  ]

  return locations.map((loc) => {
    let filterQuery = `location == "${loc.title}"`
    if (listingType) {
      filterQuery += ` && listingType == "${listingType}"`
    }

    return S.listItem()
      .title(`${loc.emoji} ${loc.title}`)
      .child(
        S.documentTypeList('villa')
          .title(`${loc.title}${listingType ? ` (${listingType === 'rent' ? 'Locations' : 'Ventes'})` : ''}`)
          .filter(filterQuery)
          .defaultOrdering([{ field: 'name', direction: 'asc' }])
      )
  })
}
