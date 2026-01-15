import { bedroomPrice, seasonalPrice, homeFeature, amenity, villa } from './villa'

export const schemaTypes = [
  // Types d'objets (doivent être déclarés avant les documents qui les utilisent)
  bedroomPrice,
  seasonalPrice,
  homeFeature,
  amenity,
  // Types de documents
  villa,
]
