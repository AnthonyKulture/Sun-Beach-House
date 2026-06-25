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
const GOOGLE_TRANSLATE_ENDPOINT = 'https://translation.googleapis.com/language/translate/v2';
const MAX_BATCH = 100; // Google v2 allows up to 128 q segments per request

async function callGoogle(
    texts: string[],
    targetLang: string,
    sourceLang: string | undefined,
    apiKey: string
): Promise<string[]> {
    const body: Record<string, unknown> = { q: texts, target: targetLang, format: 'text' };
    if (sourceLang) {
        body.source = sourceLang;
    }

    const response = await fetch(`${GOOGLE_TRANSLATE_ENDPOINT}?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error('Google Translate API error:', errorData);
        throw new Error(`Google Translation failed: ${response.status}`);
    }

    const data = await response.json();
    return (data.data.translations as { translatedText: string }[]).map(t => t.translatedText);
}

/**
 * Server-side batch translation. Sends every text in a single Google request
 * (chunked at 100) to avoid per-user rate-limit bursts. Manual overrides and
 * empty strings are resolved locally and never sent to Google.
 */
export async function translateManyServerSide(
    texts: string[],
    targetLang: string,
    sourceLang?: string
): Promise<string[]> {
    if (!targetLang) {
        throw new Error('Missing targetLang');
    }

    const results: string[] = new Array(texts.length);
    const pending: { idx: number; text: string }[] = [];

    texts.forEach((text, i) => {
        if (!text || !text.trim()) {
            results[i] = text ?? '';
            return;
        }
        const manual = getManualTranslation(text, targetLang);
        if (manual) {
            results[i] = manual;
            return;
        }
        pending.push({ idx: i, text });
    });

    if (pending.length === 0) {
        return results;
    }

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    if (!apiKey) {
        throw new Error('Translation service not configured (missing GOOGLE_TRANSLATE_API_KEY)');
    }

    for (let start = 0; start < pending.length; start += MAX_BATCH) {
        const chunk = pending.slice(start, start + MAX_BATCH);
        const translated = await callGoogle(chunk.map(c => c.text), targetLang, sourceLang, apiKey);
        chunk.forEach((c, j) => {
            results[c.idx] = translated[j];
        });
    }

    return results;
}

/**
 * Server-side translation of a single string. Thin wrapper over the batch path.
 */
export async function translateServerSide({ text, targetLang, sourceLang }: TranslateParams): Promise<string> {
    if (!text || !targetLang) {
        throw new Error('Missing text or targetLang');
    }
    const [result] = await translateManyServerSide([text], targetLang, sourceLang);
    return result;
}
