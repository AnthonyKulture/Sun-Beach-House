import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { VillaBrochurePDF } from '../../../components/VillaBrochurePDF';
import { CmsService } from '../../../services/cms';
import { generatePDFFileName } from '../../../utils/pdfHelpers';
import React from 'react';

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
