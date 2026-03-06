import { createClient } from '@sanity/client';

// Create Sanity client with write permissions (server-side only)
const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // Write token (server-side only)
    useCdn: false,
});

// Manual overrides to fix specific translation errors
// Format: { targetLang: { originalTextLowercase: translatedText } }
const MANUAL_TRANSLATIONS: Record<string, Record<string, string>> = {
    fr: {
        'thanksgiving': 'Thanksgiving',
        'thanksgiving ': 'Thanksgiving',
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

// Hash function for cache keys
async function hashText(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

interface TranslateParams {
    text: string;
    targetLang: string;
    sourceLang?: string;
}

export async function translateServerSide({ text, targetLang, sourceLang }: TranslateParams): Promise<string> {
    if (!text || !targetLang) {
        throw new Error('Missing text or targetLang');
    }

    // 1. Check Manual Overrides first
    const lowerText = text.toLowerCase().trim();
    const overrides = MANUAL_TRANSLATIONS[targetLang];
    if (overrides && overrides[lowerText]) {
        console.log(`[Translation Server] Manual override used for "${text}" -> "${overrides[lowerText]}"`);
        return overrides[lowerText];
    }

    // 2. We skip Sanity cache checking here to prevent Next.js deadlock during PDF generation
    // and go straight to Google Translate

    console.log('[Translation Server] Cache miss, calling Google Translate');

    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

    if (!apiKey) {
        throw new Error('Translation service not configured (Missing API Key)');
    }

    const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const googleBody: any = {
        q: text,
        target: targetLang,
        format: 'text',
    };

    if (sourceLang) {
        googleBody.source = sourceLang;
    }

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(googleBody),
    });

    if (!response.ok) {
        const errorData = await response.text();
        console.error('Google Translate API error:', errorData);
        throw new Error(`Google Translation failed: ${response.status}`);
    }

    const data = await response.json();
    const translatedText = data.data.translations[0].translatedText;
    const detectedSourceLanguage = data.data.translations[0].detectedSourceLanguage;

    // Skip caching write to prevent hanging the API route
    // The main website will cache translations as users browse

    console.log('[Translation Server] Translation complete (uncached for PDF)');
    return translatedText;
}
