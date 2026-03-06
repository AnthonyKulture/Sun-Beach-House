import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { VillaBrochurePDF } from '../../../components/VillaBrochurePDF';
import { CmsService } from '../../../services/cms';
import { generatePDFFileName } from '../../../utils/pdfHelpers';
import React from 'react';
import { translateServerSide } from '../../../utils/translateServerSide';
import { Villa } from '../../../types';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        },
    });
}

/**
 * Translates villa content (description + amenities) into English for PDF generation.
 * Mutates the villa object in place for simplicity; villa data is fetched fresh each request.
 */
async function translateVillaForPDF(villa: Villa): Promise<void> {
    // 1. Translate description
    let descriptionToTranslate = '';
    if (typeof villa.fullDescription === 'string') {
        descriptionToTranslate = villa.fullDescription;
    } else if (villa.fullDescription && typeof villa.fullDescription === 'object') {
        descriptionToTranslate = villa.fullDescription.fr || '';
    }

    if (descriptionToTranslate) {
        const translatedDesc = await translateServerSide({ text: descriptionToTranslate, targetLang: 'en' });
        if (typeof villa.fullDescription === 'object') {
            villa.fullDescription.en = translatedDesc;
        } else {
            villa.fullDescription = { fr: descriptionToTranslate, en: translatedDesc };
        }
    }

    // 2. Translate amenities that don't have an English name yet
    if (villa.amenities && Array.isArray(villa.amenities)) {
        villa.amenities = await Promise.all(
            villa.amenities.map(async (amenity) => {
                if (!amenity.name_en && amenity.name) {
                    try {
                        const translatedName = await translateServerSide({ text: amenity.name, targetLang: 'en' });
                        return { ...amenity, name_en: translatedName };
                    } catch {
                        return amenity; // Gracefully fall back to French name
                    }
                }
                return amenity;
            })
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const villaId = searchParams.get('villaId');
        const lang = (searchParams.get('lang') as 'fr' | 'en') || 'fr';
        const includePricing = searchParams.get('includePricing') === 'true';

        if (!villaId) {
            return NextResponse.json({ error: 'Villa ID is required' }, { status: 400 });
        }

        const villa = await CmsService.getVillaById(villaId);
        if (!villa) {
            return NextResponse.json({ error: 'Villa not found' }, { status: 404 });
        }

        if (lang === 'en') {
            try {
                await translateVillaForPDF(villa);
            } catch (translationError) {
                console.error('Error translating PDF content:', translationError);
                // Continue generating the PDF even if translation fails
            }
        }

        const pdfDocument = <VillaBrochurePDF villa={villa} language={lang} includePricing={includePricing} />;
        const pdfBuffer = await renderToBuffer(pdfDocument);
        const fileName = generatePDFFileName(villa);

        const CORS_HEADERS = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        return new NextResponse(pdfBuffer as unknown as BodyInit, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Cache-Control': 'no-store, max-age=0',
                ...CORS_HEADERS,
            },
        });
    } catch (error) {
        console.error('PDF Generation Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        );
    }
}
