import {bedroomPrice, seasonalPrice, amenity, villa} from './villa'

export const schemaTypes = [
  // Types d'objets (doivent être déclarés avant les documents qui les utilisent)
  bedroomPrice,
  seasonalPrice,
  amenity,
  // Types de documents
  villa,
]
