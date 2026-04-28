import { Villa, SeasonalPrice, BedroomPrice, Equipment, Season, Location } from '../types';

// Configuration Sanity - Using environment variables
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6dkdu7j';
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';

// Use the Sanity CDN endpoint for global edge caching (was api.sanity.io)
const SANITY_API_URL = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}`;

// Fonction pour exécuter une requête GROQ
const fetchSanity = async (query: string, params?: Record<string, string>) => {
  const url = new URL(SANITY_API_URL);
  url.searchParams.set('query', query);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(`$${key}`, JSON.stringify(value));
    });
  }

  const response = await fetch(url.toString(), { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Sanity API error: ${response.status}`);
  }
  const data = await response.json();
  return data.result;
};

// Helper to build optimized Sanity image URLs with CDN parameters
// Automatically delivers WebP/AVIF, resizes to requested width, and compresses
const buildImageUrl = (ref: string, width = 1600, quality = 85) => {
  if (!ref) return '';
  const [, id, dimensions, format] = ref.split('-');
  if (!id || !dimensions || !format) return '';
  const base = `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`;
  return `${base}?auto=format&q=${quality}&w=${width}&fit=max`;
};

/** Raw document shape returned by the Sanity GROQ query */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityVillaDoc = Record<string, any>;

// Mapping des données Sanity vers le format Villa
const mapSanityVilla = (doc: SanityVillaDoc): Villa => {
  const seasonalPrices: SeasonalPrice[] | undefined = doc.seasonalPrices
    ?.filter((sp: any) => sp.seasonName) // Filter out missing seasons
    .map((sp: any, index: number) => ({
      id: sp._key || `season-${index}`,
      seasonName: sp.seasonName as Season,
      dates: sp.dates,
      prices: sp.prices?.map((p: any): BedroomPrice => ({
        bedrooms: p.bedrooms,
        price: p.price,
        priceUnit: p.priceUnit || 'week',
      })) || [],
    }));

  const amenities: Equipment[] = doc.amenities
    ?.filter((a: any) => a) // Filter out null references
    .map((a: any) => ({
      _id: a._id,
      name: a.name,
      icon: a.icon,
    })) || [];

  let mainImage = '';
  if (doc.mainImage?.asset?._ref) {
    // Hero/main image: 1600px wide for full-screen cover
    mainImage = buildImageUrl(doc.mainImage.asset._ref, 1600, 85);
  }

  let galleryImages: string[] = [];
  let fullResGalleryImages: string[] = [];
  if (doc.galleryImages?.length > 0 && doc.galleryImages[0]?.asset?._ref) {
    // Gallery thumbnails: 800px wide (displayed at ~25vw max)
    galleryImages = doc.galleryImages
      .map((img: any) => buildImageUrl(img.asset?._ref, 800, 80))
      .filter(Boolean);

    // Full-res images for viewer: 1600px wide matching mainImage quality
    fullResGalleryImages = doc.galleryImages
      .map((img: any) => buildImageUrl(img.asset?._ref, 1600, 85))
      .filter(Boolean);
  }

  return {
    id: doc._id,
    name: doc.name,
    location: doc.location || { _id: 'unknown', name: 'Non défini', order: 999 }, // Fallback for missing location
    listingType: doc.listingType,
    // Handle both old (string) and new (object) formats during migration
    description: typeof doc.description === 'string'
      ? { en: doc.description, fr: doc.description }
      : doc.description || { en: '', fr: '' },
    fullDescription: typeof doc.fullDescription === 'string'
      ? { en: doc.fullDescription, fr: doc.fullDescription }
      : doc.fullDescription || { en: '', fr: '' },
    pricePerNight: doc.pricePerNight,
    pricePerWeek: doc.pricePerWeek,
    currency: doc.currency || 'USD',
    salePrice: doc.salePrice,
    bedrooms: doc.bedrooms,
    bathrooms: doc.bathrooms,
    guests: doc.guests,
    surface: doc.surface,
    landSurface: doc.landSurface,
    propertyType: doc.propertyType || 'villa',
    pricingDetails: doc.pricingDetails || '',
    mainImage,
    galleryImages,
    fullResGalleryImages,
    videoUrl: doc.videoUrl,
    videoFileUrl: doc.videoFileUrl,
    amenities,
    tags: doc.tags || [],
    seasonalPrices,
    featuredOnHomepage: doc.featuredOnHomepage || false,
    homepageOrder: doc.homepageOrder,
    homeFeatures: doc.homeFeatures || [],
    geopoint: doc.geopoint,
    privateInfo: doc.privateInfo,
    brochurePdfUrl: doc.brochurePdfUrl,
    slug: doc.slug?.current,
  };
};

const villaFields = `
  _id,
  name,
  "slug": slug.current,
  location->{ _id, name, order },
  listingType,
  description,
  fullDescription,
  pricePerNight,
  pricePerWeek,
  currency,
  salePrice,
  bedrooms,
  bathrooms,
  guests,
  surface,
  landSurface,
  propertyType,
  pricingDetails,
  mainImage,
  galleryImages,
  videoUrl,
  "videoFileUrl": videoFile.asset->url,
  "brochurePdfUrl": brochurePdf.asset->url,
  amenities[]->{ _id, name, "name_en": name_en, icon },
  tags,
  featuredOnHomepage,
  homepageOrder,
  homeFeatures[] {
    title,
    description
  },
  seasonalPrices[] {
    _key,
    seasonName->{ _id, name, "name_en": name_en, order },
    dates,
    prices[] { _key, bedrooms, price, priceUnit }
  },
  geopoint,
  privateInfo
`;

// Lean projection for similar villa recommendation cards
// Only fetches what is rendered in cross-nav cards — ~10 fields vs ~30 in full query
const similarVillaFields = `
  _id,
  name,
  listingType,
  location->{ _id, name, order },
  guests,
  bedrooms,
  bathrooms,
  pricePerNight,
  pricePerWeek,
  currency,
  salePrice,
  mainImage
`;

export const CmsService = {
  getAllVillas: async (includeDrafts = false): Promise<Villa[]> => {
    const draftFilter = includeDrafts ? '' : '&& !(_id in path("drafts.**"))';
    const query = `*[_type == "villa" ${draftFilter}] | order(name asc) { ${villaFields} }`;
    try {
      const docs = await fetchSanity(query);
      return docs.map(mapSanityVilla);
    } catch (error) {
      console.error('Erreur CMS:', error);
      return [];
    }
  },

  getVillaById: async (id: string): Promise<Villa | undefined> => {
    const query = `*[_type == "villa" && _id == $id][0] { ${villaFields} }`;
    try {
      const doc = await fetchSanity(query, { id });
      return doc ? mapSanityVilla(doc) : undefined;
    } catch (error) {
      console.error('Erreur CMS:', error);
      return undefined;
    }
  },

  getVillaBySlug: async (slug: string): Promise<Villa | undefined> => {
    const query = `*[_type == "villa" && slug.current == $slug][0] { ${villaFields} }`;
    try {
      const doc = await fetchSanity(query, { slug });
      return doc ? mapSanityVilla(doc) : undefined;
    } catch (error) {
      console.error('Erreur CMS:', error);
      return undefined;
    }
  },

  /**
   * Universal resolver that handles both UUIDs and human-readable Slugs.
   * Crucial for SEO migrations and resolving GSC "legacy" URLs.
   */
  getVillaByIdOrSlug: async (idOrSlug: string): Promise<Villa | undefined> => {
    // 1. Try by ID (UUID format usually)
    let villa = await CmsService.getVillaById(idOrSlug);
    
    // 2. Fallback to Slug if not found by ID
    if (!villa) {
      villa = await CmsService.getVillaBySlug(idOrSlug);
    }
    
    return villa;
  },

  /**
   * Lean fetch for "Similar Villas" recommendation cards.
   * Fetches only the 7 fields needed for card rendering — avoids full villa over-fetch.
   */
  getSimilarVillas: async (excludeId: string, listingType: string, locationName: string): Promise<Villa[]> => {
    // order() with dereferencing (location->name) can cause 400 Bad Request in some cases.
    // Fetching 12 candidates sorted by name and filtering/tiering in JS for better reliability.
    const query = `*[_type == "villa" && !(_id in path("drafts.**")) && _id != $excludeId && listingType == $listingType] | order(name asc) [0...12] { ${similarVillaFields} }`;
    try {
      const docs = await fetchSanity(query, { excludeId, listingType, locationName });
      return docs.map(mapSanityVilla);
    } catch (error) {
      console.error('Erreur getSimilarVillas:', error);
      return [];
    }
  },

  getSitemapData: async (): Promise<{ id: string; slug?: string; updatedAt: string }[]> => {
    const query = `*[_type == "villa" && !(_id in path("drafts.**"))] | order(name asc) { "_id": _id, "slug": slug.current, "_updatedAt": _updatedAt }`;
    try {
      const docs = await fetchSanity(query);
      return docs.map((doc: any) => ({
        id: doc._id,
        slug: doc.slug,
        updatedAt: doc._updatedAt,
      }));
    } catch (error) {
      console.error('Erreur getSitemapData:', error);
      return [];
    }
  },
};
