// Translation Service — canonical public entrypoint for client-side translation.
// Components should import from here, not directly from googleTranslation.ts.

import { translateWithGoogle } from './googleTranslation';

/**
 * Manual overrides to fix specific translation errors across the site.
 * Shared between client-side and server-side (PDF) translation logic.
 */
export const MANUAL_TRANSLATIONS: Record<string, Record<string, string>> = {
    fr: {
        'thanksgiving': 'Thanksgiving',
        'kitchen': 'Cuisine',
        'living room': 'Salon',
        'bedroom': 'Chambre',
        'bathroom': 'Salle de bain',
        'pool': 'Piscine',
        'view': 'Vue',
        'sea view': 'Vue mer',
    },
    en: {
        'cuisine': 'Kitchen',
        'salon': 'Living Room',
    },
};

/**
 * Checks for a manual override for a given text and target language.
 */
export function getManualTranslation(text: string, targetLang: string): string | null {
    if (!text) return null;
    const lowerText = text.toLowerCase().trim();
    const overrides = MANUAL_TRANSLATIONS[targetLang];
    return overrides?.[lowerText] || null;
}

/**
 * Translate text using the secure server-side API route (handles caching).
 * @param text - Source text to translate
 * @param targetLang - Target language code
 * @returns Translated text, or original text if translation fails
 */
export async function translateWithCache(
    text: string,
    targetLang: 'en' | 'pt' | 'es' | 'fr'
): Promise<string> {
    if (!text || text.trim().length === 0) {
        return text;
    }

    // Check manual overrides first (client-side)
    const manual = getManualTranslation(text, targetLang);
    if (manual) return manual;

    try {
        return await translateWithGoogle(text, { targetLang });
    } catch (error) {
        console.error('[Translation] Error:', error);
        return text; // Graceful fallback: return original text
    }
}

/**
 * Batch translate multiple texts in parallel.
 * @param texts - Array of source texts
 * @param targetLang - Target language code
 * @returns Array of translated texts (same order as input)
 */
export async function batchTranslate(
    texts: string[],
    targetLang: 'en' | 'pt' | 'es' | 'fr'
): Promise<string[]> {
    return Promise.all(texts.map(text => translateWithCache(text, targetLang)));
}
