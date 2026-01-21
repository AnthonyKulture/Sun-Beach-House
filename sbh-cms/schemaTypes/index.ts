import { bedroomPrice, seasonalPrice, homeFeature, villa } from './villa'
import translationCache from './translationCache'
import { equipment } from './equipment'
import { season } from './season'
import { location } from './location'

export const schemaTypes = [
  // Nouveaux types de documents (gestion dynamique)
  equipment,
  season,
  location,
  // Types d'objets (doivent être déclarés avant les documents qui les utilisent)
  bedroomPrice,
  seasonalPrice,
  homeFeature,
  // Types de documents
  villa,
  translationCache,
]
