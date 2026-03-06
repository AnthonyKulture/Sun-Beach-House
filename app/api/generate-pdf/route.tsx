import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { VillaBrochurePDF } from '../../../components/VillaBrochurePDF';
import { CmsService } from '../../../services/cms';
import { generatePDFFileName } from '../../../utils/pdfHelpers';
import React from 'react';
import { translateServerSide } from '../../../utils/translateServerSide';

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

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const villaId = searchParams.get('villaId');
        const lang = (searchParams.get('lang') as 'fr' | 'en') || 'fr';
        const includePricing = searchParams.get('includePricing') === 'true';

        if (!villaId) {
            return NextResponse.json(
                { error: 'Villa ID is required' },
                { status: 400 }
            );
        }

        // Fetch villa data from CMS
        const villa = await CmsService.getVillaById(villaId);

        if (!villa) {
            return NextResponse.json(
                { error: 'Villa not found' },
                { status: 404 }
            );
        }

        // --- TRANSLATE CONTENT FOR PDF ---
        // If the language is English, we translate the dynamic content
        if (lang === 'en') {
            try {
                // 1. Translate Description
                // Handle both legacy string format and new object format {fr, en}
                let descriptionToTranslate = '';
                if (typeof villa.fullDescription === 'string') {
                    descriptionToTranslate = villa.fullDescription;
                } else if (villa.fullDescription && typeof villa.fullDescription === 'object') {
                    descriptionToTranslate = villa.fullDescription.fr || '';
                }

                if (descriptionToTranslate) {
                    console.log(`[PDF Gen] Translating description...`);
                    const translatedDesc = await translateServerSide({ text: descriptionToTranslate, targetLang: 'en' });
                    console.log(`[PDF Gen] Description translated!`);
                    // Ensure the translated string is set on the 'en' property, 
                    // which is what VillaBrochurePDF expects
                    if (typeof villa.fullDescription === 'object') {
                        villa.fullDescription.en = translatedDesc;
                    } else {
                        villa.fullDescription = { fr: descriptionToTranslate, en: translatedDesc };
                    }
                }

                // 2. Translate Amenities
                if (villa.amenities && Array.isArray(villa.amenities)) {
                    console.log(`[PDF Gen] Translating ${villa.amenities.length} amenities...`);
                    // Translate each amenity that doesn't natively have an English name
                    const translatedAmenities = await Promise.all(
                        villa.amenities.map(async (amenity: any) => {
                            if (!amenity.name_en && amenity.name) {
                                try {
                                    console.log(`[PDF Gen] Translating amenity: ${amenity.name}`);
                                    const translatedName = await translateServerSide({ text: amenity.name, targetLang: 'en' });
                                    console.log(`[PDF Gen] Translated amenity: ${amenity.name} -> ${translatedName}`);
                                    return { ...amenity, name_en: translatedName };
                                } catch (err) {
                                    console.error(`Failed to translate amenity ${amenity.name}`, err);
                                    return amenity;
                                }
                            }
                            return amenity;
                        })
                    );
                    villa.amenities = translatedAmenities;
                    console.log(`[PDF Gen] All amenities translated!`);
                }
            } catch (translationError) {
                console.error('Error translating PDF content:', translationError);
                // Continue generating the PDF even if translation fails partially
            }
        }
        // --- END TRANSLATE CONTENT ---

        // Generate PDF
        const pdfDocument = <VillaBrochurePDF villa={villa} language={lang} includePricing={includePricing} />;
        const pdfBuffer = await renderToBuffer(pdfDocument);

        // Generate filename
        const fileName = generatePDFFileName(villa);

        // Return PDF with proper headers (including CORS for Sanity Studio)
        return new NextResponse(pdfBuffer as unknown as BodyInit, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Cache-Control': 'no-store, max-age=0',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
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
