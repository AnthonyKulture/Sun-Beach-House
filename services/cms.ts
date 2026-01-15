import { Villa, SeasonalPrice, BedroomPrice, Amenity } from '../types';

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
  'Star': 'Équipement',
};

// Configuration Sanity - Using environment variables
const PROJECT_ID = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'i6dkdu7j';
const DATASET = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const API_VERSION = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01';

const SANITY_API_URL = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}`;

// Fonction pour exécuter une requête GROQ
const fetchSanity = async (query: string, params?: Record<string, string>) => {
  const url = new URL(SANITY_API_URL);
  url.searchParams.set('query', query);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(`$${key}`, JSON.stringify(value));
    });
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Sanity API error: ${response.status}`);
  }
  const data = await response.json();
  return data.result;
};

// Helper pour construire les URLs d'images Sanity
const buildImageUrl = (ref: string) => {
  if (!ref) return '';
  const [, id, dimensions, format] = ref.split('-');
  if (!id || !dimensions || !format) return '';
  return `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${id}-${dimensions}.${format}`;
};

// Mapping des données Sanity vers le format Villa
const mapSanityVilla = (doc: any): Villa => {
  const seasonalPrices: SeasonalPrice[] | undefined = doc.seasonalPrices?.map((sp: any, index: number) => ({
    id: sp._key || `season-${index}`,
    seasonName: sp.seasonName,
    dates: sp.dates,
    prices: sp.prices?.map((p: any): BedroomPrice => ({
      bedrooms: p.bedrooms,
      price: p.price,
    })) || [],
  }));

  const amenities: Amenity[] = doc.amenities?.map((a: any) => ({
    icon: a.icon,
    label: a.label || EQUIPMENT_LABELS[a.icon] || a.icon,
  })) || [];

  let mainImage = doc.mainImageUrl || '';
  if (doc.mainImage?.asset?._ref) {
    mainImage = buildImageUrl(doc.mainImage.asset._ref);
  }

  let galleryImages: string[] = [];
  if (doc.galleryImages?.length > 0 && doc.galleryImages[0]?.asset?._ref) {
    galleryImages = doc.galleryImages
      .map((img: any) => buildImageUrl(img.asset?._ref))
      .filter(Boolean);
  } else if (doc.galleryImageUrls?.length > 0) {
    galleryImages = doc.galleryImageUrls;
  }

  return {
    id: doc._id,
    name: doc.name,
    location: doc.location,
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
    salePrice: doc.salePrice,
    bedrooms: doc.bedrooms,
    bathrooms: doc.bathrooms,
    guests: doc.guests,
    surface: doc.surface,
    viewType: doc.viewType,
    mainImage,
    galleryImages,
    amenities,
    tags: doc.tags || [],
    seasonalPrices,
    featuredOnHomepage: doc.featuredOnHomepage || false,
    homepageOrder: doc.homepageOrder,
    homeFeatures: doc.homeFeatures || [],
    pdfOptions: doc.pdfOptions || {},
    geopoint: doc.geopoint,
    privateInfo: doc.privateInfo,
  };
};

const villaFields = `
  _id,
  name,
  "slug": slug.current,
  location,
  listingType,
  description,
  fullDescription,
  pricePerNight,
  pricePerWeek,
  salePrice,
  bedrooms,
  bathrooms,
  guests,
  surface,
  viewType,
  mainImage,
  mainImageUrl,
  galleryImages,
  galleryImageUrls,
  amenities[] { _key, icon, label },
  tags,
  featuredOnHomepage,
  homepageOrder,
  homeFeatures[] {
    title,
    description
  },
  seasonalPrices[] {
    _key,
    seasonName,
    dates,
    prices[] { _key, bedrooms, price }
  },
  pdfOptions {
    includePrice,
    customFooterText,
    highlightedAmenities
  },
  geopoint,
  privateInfo
`;

export const CmsService = {
  getAllVillas: async (): Promise<Villa[]> => {
    const query = `*[_type == "villa" && !(_id in path("drafts.**"))] | order(name asc) { ${villaFields} }`;
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
};
