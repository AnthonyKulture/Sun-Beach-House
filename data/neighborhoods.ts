import contentJson from './neighborhoods.content.json';

export type NeighborhoodLang = 'fr' | 'en' | 'es' | 'pt';
export type Localized = Record<NeighborhoodLang, string>;

export interface NeighborhoodFaq {
    q: Localized;
    a: Localized;
}

export interface NeighborhoodContent {
    geo: { lat: number; lng: number };
    intro: Localized;
    highlights: Record<NeighborhoodLang, string[]>;
    faq: NeighborhoodFaq[];
    /** Source URLs backing the editorial copy (anti-hallucination provenance). */
    sources: string[];
}

export interface Neighborhood extends NeighborhoodContent {
    /** URL slug → /[lang]/location-villa-{slug} */
    slug: string;
    /** Display name */
    name: string;
    /** Sanity `location->name` values to match (consolidates fragmented variants). */
    sanityLocations: string[];
    /** Curated hero image; falls back to the first villa's photo when unset. */
    heroImage?: string;
}

const content = contentJson as Record<string, NeighborhoodContent>;

/** Routing config; editorial content lives in neighborhoods.content.json (sbh-editorial, sourced). */
const CONFIG: Pick<Neighborhood, 'slug' | 'name' | 'sanityLocations' | 'heroImage'>[] = [
    { slug: 'gustavia', name: 'Gustavia', sanityLocations: ['Gustavia'], heroImage: '/images/optimized-dest-gustavia.jpg' },
    { slug: 'saint-jean', name: 'Saint-Jean', sanityLocations: ['St Jean', 'Saint-Jean Beach'], heroImage: '/images/optimized-dest-stjean.jpg' },
    { slug: 'flamands', name: 'Flamands', sanityLocations: ['Flamands', 'Flamands Beach'] },
    { slug: 'colombier', name: 'Colombier', sanityLocations: ['Colombier'] },
    { slug: 'lurin', name: 'Lurin', sanityLocations: ['Lurin'] },
    { slug: 'vitet', name: 'Vitet', sanityLocations: ['Vitet'] },
    { slug: 'marigot', name: 'Marigot', sanityLocations: ['Marigot'] },
    { slug: 'corossol', name: 'Corossol', sanityLocations: ['Corossol'], heroImage: '/images/optimized-dest-corossol.jpg' },
    { slug: 'petit-cul-de-sac', name: 'Petit Cul-de-Sac', sanityLocations: ['Petit Cul de Sac'] },
    { slug: 'pointe-milou', name: 'Pointe Milou', sanityLocations: ['Pointe Milou'], heroImage: '/images/optimized-dest-pointe-milou.jpg' },
    { slug: 'lorient', name: 'Lorient', sanityLocations: ['Lorient'] },
    { slug: 'grand-cul-de-sac', name: 'Grand Cul-de-Sac', sanityLocations: ['Grand Cul de Sac'] },
    { slug: 'gouverneur', name: 'Gouverneur', sanityLocations: ['Gouverneur'] },
    { slug: 'anse-des-cayes', name: 'Anse des Cayes', sanityLocations: ['Anse des Cayes'] },
    { slug: 'saline', name: 'Saline', sanityLocations: ['Saline'] },
];

export const NEIGHBORHOODS: Record<string, Neighborhood> = Object.fromEntries(
    CONFIG.map((c) => [c.slug, { ...c, ...content[c.slug] }])
);

export const NEIGHBORHOOD_SLUGS = CONFIG.map((c) => c.slug);

export const getNeighborhood = (slug: string): Neighborhood | undefined => NEIGHBORHOODS[slug];
