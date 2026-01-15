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
    const { targetLang } = options;

    try {
        const response = await fetch('/api/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text,
                targetLang,
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
 * Generate SHA-256 hash of text for cache indexing
 * @param text - Text to hash
 * @returns Hex string hash
 */
export async function hashText(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}
