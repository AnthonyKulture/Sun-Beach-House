import { getManualTranslation } from './translationService';

interface TranslateParams {
    text: string;
    targetLang: string;
    sourceLang?: string;
}

/**
 * Server-side translation via Google Cloud Translation API.
 * Checks manual overrides first, then calls Google Translate directly.
 * Sanity cache is intentionally bypassed to prevent Next.js request deadlock during PDF generation.
 */
export async function translateServerSide({ text, targetLang, sourceLang }: TranslateParams): Promise<string> {
    if (!text || !targetLang) {
        throw new Error('Missing text or targetLang');
    }

    // 1. Check manual overrides first
    const manual = getManualTranslation(text, targetLang);
    if (manual) {
        return manual;
    }

    // 2. Call Google Translate directly (cache disabled to prevent Next.js deadlock)
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey) {
        throw new Error('Translation service not configured (missing GOOGLE_TRANSLATE_API_KEY)');
    }

    const googleBody: Record<string, string> = {
        q: text,
        target: targetLang,
        format: 'text',
    };

    if (sourceLang) {
        googleBody.source = sourceLang;
    }

    const response = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(googleBody),
        }
    );

    if (!response.ok) {
        const errorData = await response.text();
        console.error('Google Translate API error:', errorData);
        throw new Error(`Google Translation failed: ${response.status}`);
    }

    const data = await response.json();
    return data.data.translations[0].translatedText as string;
}
