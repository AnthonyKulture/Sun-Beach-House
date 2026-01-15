// Translation Service - Now uses server-side API route
// Client-side wrapper that calls /api/translate

import { translateWithGoogle } from './googleTranslation';

/**
 * Translate text with caching (handled server-side via API route)
 * @param text - French text to translate
 * @param targetLang - Target language (en, pt, es)
 * @returns Translated text
 */
export async function translateWithCache(
    text: string,
    targetLang: 'en' | 'pt' | 'es' | 'fr'
): Promise<string> {
    if (!text || text.trim().length === 0) {
        return text;
    }

    try {
        // Call our API route which handles both translation and caching
        const translated = await translateWithGoogle(text, { targetLang });
        return translated;
    } catch (error) {
        console.error('[Translation] Error:', error);
        // Return original text if translation fails
        return text;
    }
}

/**
 * Batch translate multiple texts (optimized)
 * @param texts - Array of French texts
 * @param targetLang - Target language
 * @returns Array of translated texts
 */
export async function batchTranslate(
    texts: string[],
    targetLang: 'en' | 'pt' | 'es' | 'fr'
): Promise<string[]> {
    return Promise.all(texts.map(text => translateWithCache(text, targetLang)));
}
