import { NextRequest, NextResponse } from 'next/server';
import { translateServerSide } from '../../../utils/translateServerSide';

export async function POST(request: NextRequest) {
    try {
        const { text, targetLang, sourceLang } = await request.json();

        if (!text || !targetLang) {
            return NextResponse.json(
                { error: 'Missing text or targetLang' },
                { status: 400 }
            );
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
