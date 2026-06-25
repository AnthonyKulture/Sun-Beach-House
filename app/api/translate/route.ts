import { NextRequest, NextResponse } from 'next/server';
import { translateServerSide, translateManyServerSide } from '../../../utils/translateServerSide';

export async function POST(request: NextRequest) {
    try {
        const { text, texts, targetLang, sourceLang } = await request.json();

        if (!targetLang || (!text && !Array.isArray(texts))) {
            return NextResponse.json(
                { error: 'Missing text/texts or targetLang' },
                { status: 400 }
            );
        }

        if (Array.isArray(texts)) {
            const translatedTexts = await translateManyServerSide(texts, targetLang, sourceLang);
            return NextResponse.json({ translatedTexts });
        }

        const translatedText = await translateServerSide({ text, targetLang, sourceLang });

        return NextResponse.json({ translatedText });
    } catch (error: any) {
        console.error('Translation API error:', error);
        return NextResponse.json(
            { error: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
