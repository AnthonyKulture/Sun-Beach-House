import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@sanity/client';

// Create Sanity client with write permissions (server-side only)
const sanityClient = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    token: process.env.SANITY_API_TOKEN, // Write token (server-side only)
    useCdn: false,
});

// Hash function for cache keys
async function hashText(text: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function POST(request: NextRequest) {
    try {
        const { text, targetLang, sourceLang } = await request.json();

        if (!text || !targetLang) {
            return NextResponse.json(
                { error: 'Missing text or targetLang' },
                { status: 400 }
            );
        }

        // Check cache first
        const textHash = await hashText(text);
        // Cache now considers sourceLang too (if provided) or defaults to 'fr' for backward compat in query if needed,
        // but mostly we rely on textHash+targetLang.
        // Actually, if we change source, the hash is the same, but the result might differ? 
        // No, same text hash means same source text. 
        // CAUTION: If we have "High" (EN) and "High" (FR - not likely), hash is same.
        // But usually text implies language.
        const cacheQuery = `*[_type == "translationCache" && textHash == $textHash && targetLang == $targetLang][0]`;

        const cached = await sanityClient.fetch(cacheQuery, { textHash, targetLang });

        if (cached) {
            console.log('[Translation API] Cache hit:', targetLang);
            return NextResponse.json({ translatedText: cached.translatedText });
        }

        console.log('[Translation API] Cache miss, calling Google Translate');

        const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;

        if (!apiKey) {
            console.error('GOOGLE_TRANSLATE_API_KEY not configured');
            return NextResponse.json(
                { error: 'Translation service not configured' },
                { status: 500 }
            );
        }

        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

        const googleBody: any = {
            q: text,
            target: targetLang,
            format: 'text',
        };

        // Only explicitly set source if provided, otherwise let Google auto-detect
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
            return NextResponse.json(
                { error: 'Translation failed' },
                { status: response.status }
            );
        }

        const data = await response.json();
        const translatedText = data.data.translations[0].translatedText;
        const detectedSourceLanguage = data.data.translations[0].detectedSourceLanguage;

        // Store in cache (fire and forget - don't wait)
        sanityClient.create({
            _type: 'translationCache',
            textHash,
            originalText: text,
            translatedText,
            targetLang,
            sourceLang: sourceLang || detectedSourceLanguage || 'unknown',
            createdAt: new Date().toISOString(),
        }).catch(err => console.error('Failed to cache translation:', err));

        console.log('[Translation API] Translation complete and cached');

        return NextResponse.json({ translatedText });
    } catch (error) {
        console.error('Translation API error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
