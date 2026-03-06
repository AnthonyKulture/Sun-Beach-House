// Translation Service — canonical public entrypoint for client-side translation.
// Components should import from here, not directly from googleTranslation.ts.

import { translateWithGoogle } from './googleTranslation';

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
