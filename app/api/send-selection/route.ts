import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { render } from '@react-email/render';
import React from 'react';
import VillaSelectionEmail from '@/components/email/VillaSelectionEmail';
import { CmsService } from '@/services/cms';
import { getProxyImageURL } from '@/utils/email-images';

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

        // Récupérer toutes les villas depuis Sanity pour garantir des données à jour
        const allVillas = await CmsService.getAllVillas();

        // Filtrer pour ne garder que les villas sélectionnées
        const selectedVillas = allVillas.filter(v => villaIds.includes(v.id));

        if (selectedVillas.length === 0) {
            return NextResponse.json(
                { error: 'Aucune des villas demandées n\'a été trouvée dans le système' },
                { status: 404, headers: corsHeaders }
            );
        }

        const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sun-beach-house.com';

        // Transform Sanity images to brand proxy URLs for email deliverability
        const villasWithProxiedImages = selectedVillas.map(villa => ({
            ...villa,
            mainImage: getProxyImageURL(villa.mainImage)
        }));

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
