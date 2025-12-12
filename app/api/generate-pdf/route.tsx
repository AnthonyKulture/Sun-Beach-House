import { NextRequest, NextResponse } from 'next/server';
import { renderToBuffer } from '@react-pdf/renderer';
import { VillaBrochurePDF } from '../../../components/VillaBrochurePDF';
import { CmsService } from '../../../services/cms';
import { generatePDFFileName } from '../../../utils/pdfHelpers';
import React from 'react';

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const villaId = searchParams.get('villaId');

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
        const pdfDocument = <VillaBrochurePDF villa={ villa } />;
        const pdfBuffer = await renderToBuffer(pdfDocument);

        // Generate filename
        const fileName = generatePDFFileName(villa);

        // Return PDF with proper headers
        return new NextResponse(pdfBuffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${fileName}"`,
                'Cache-Control': 'private, max-age=3600',
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
