import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import React from 'react';
import VillaSelectionEmail from '@/components/email/VillaSelectionEmail';
import { CmsService } from '@/services/cms';
import { getProxyImageURL } from '@/utils/email-images';
import { signPreviewToken } from '@/utils/previewToken';
import type { Villa } from '@/types';

// The Resend instance will be created inside the POST handler
// to prevent breaking the OPTIONS preflight request if the key is missing or loaded late.

const getCorsHeaders = (request: Request) => {
    const origin = request.headers.get('origin') || 'https://sbh-admin.sanity.studio';
    return {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
};

export async function OPTIONS(request: Request) {
    return new Response(null, {
        status: 200,
        headers: getCorsHeaders(request)
    });
}

export async function POST(request: Request) {
    const corsHeaders = getCorsHeaders(request);
    try {
        const body = await request.json();
        const { clientEmail, subject, message, villaIds, lang = 'fr' } = body;

        if (!clientEmail || !subject || !villaIds || !Array.isArray(villaIds) || villaIds.length === 0) {
            return NextResponse.json(
                { error: 'Champs manquants ou sélection de villas vide' },
                { status: 400, headers: corsHeaders }
            );
        }

        if (!process.env.RESEND_API_KEY) {
            return NextResponse.json(
                { error: 'La clé API Resend (RESEND_API_KEY) n\'est pas configurée dans les variables d\'environnement.' },
                { status: 500, headers: corsHeaders }
            );
        }

        const requestedIds: string[] = villaIds.map((id: string) => id.replace(/^drafts\./, ''));

        let allVillas: Villa[];
        let publishedIds: Set<string>;
        try {
            [allVillas, publishedIds] = await Promise.all([
                CmsService.getAllVillasWithDrafts(),
                CmsService.getPublishedVillaIds().then(ids => new Set(ids)),
            ]);
        } catch (draftError) {
            console.error('Lecture des brouillons impossible, repli sur les villas publiées:', draftError);
            allVillas = await CmsService.getAllVillas();
            publishedIds = new Set(allVillas.map(v => v.id));
        }

        const selectedVillas = allVillas.filter(v => requestedIds.includes(v.id));

        if (selectedVillas.length === 0) {
            return NextResponse.json(
                { error: 'Aucune des villas demandées n\'a été trouvée dans le système' },
                { status: 404, headers: corsHeaders }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sun-beach-house.com';

        const hasUnpublished = selectedVillas.some(v => !publishedIds.has(v.id));
        if (hasUnpublished && !process.env.PREVIEW_LINK_SECRET) {
            return NextResponse.json(
                { error: 'PREVIEW_LINK_SECRET n\'est pas configurée : impossible de générer des liens privés pour les villas non publiées.' },
                { status: 500, headers: corsHeaders }
            );
        }

        // Transform Sanity images to brand proxy URLs for email deliverability
        const villasWithProxiedImages = selectedVillas.map(villa => {
            const isPublished = publishedIds.has(villa.id);
            const target = villa.slug || villa.id;
            return {
                ...villa,
                mainImage: getProxyImageURL(villa.mainImage),
                shareUrl: isPublished
                    ? `${baseUrl}/${lang}/villas/${target}`
                    : `${baseUrl}/${lang}/villas/preview/${target}?t=${signPreviewToken(target)}`,
            };
        });

        // Générer le HTML de l'email avec React Email
        const html = await render(
            React.createElement(VillaSelectionEmail, {
                message,
                villas: villasWithProxiedImages as any,
                baseUrl,
                lang
            })
        );

        const resend = new Resend(process.env.RESEND_API_KEY);

        const { data, error } = await resend.emails.send({
            from: 'Sun-Beach-House <valerie@sun-beach-house.com>',
            to: [clientEmail],
            cc: ['Sun-Beach-House <valerie@sun-beach-house.com>'],
            replyTo: 'valerie@sun-beach-house.com',
            subject: subject,
            html: html,
        });

        if (error) {
            return NextResponse.json({ 
                error: error.message, 
                details: error,
                hint: "Si onboarding@resend.dev échoue aussi, le problème est au niveau de la création du compte Resend ou de la région API."
            }, { status: 400, headers: corsHeaders });
        }

        return NextResponse.json({ success: true, data }, { headers: corsHeaders });
    } catch (error: any) {
        console.error('Erreur lors de l\'envoi de l\'email:', error);
        return NextResponse.json(
            { error: error?.message || 'Une erreur inattendue est survenue lors de l\'envoi de l\'email' },
            { status: 500, headers: corsHeaders }
        );
    }
}
