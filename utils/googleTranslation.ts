// Google Cloud Translation API Integration for Dynamic Content Translation
// Uses Google Cloud Translation API v2 (pay-as-you-go: $20 per 1M characters)

interface GoogleTranslationResponse {
    data: {
        translations: Array<{
            translatedText: string;
            detectedSourceLanguage?: string;
        }>;
    };
}

interface TranslationOptions {
    targetLang: 'en' | 'pt' | 'es' | 'fr';
    sourceLang?: 'fr' | 'en';
}

/**
 * Translate text using Google Cloud Translation API via our secure API route
 */
export async function translateWithGoogle(
    text: string,
    options: TranslationOptions
): Promise<string> {
    try {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                targetLang: options.targetLang,
                sourceLang: options.sourceLang,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Translation failed');
        }

        const data = await response.json();
        return data.translatedText;
    } catch (error) {
        console.error('[Translation] Error:', error);
        throw error;
    }
}

/**
 * Batch-translate many texts in a SINGLE request to our API route.
 * Collapses N per-field calls into one to avoid Google per-user rate limits.
 */
export async function translateManyWithGoogle(
    texts: string[],
    options: TranslationOptions
): Promise<string[]> {
    try {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                texts,
                targetLang: options.targetLang,
                sourceLang: options.sourceLang,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Translation failed');
        }

        const data = await response.json();
        return data.translatedTexts as string[];
    } catch (error) {
        console.error('[Translation] Batch error:', error);
        throw error;
    }
}
