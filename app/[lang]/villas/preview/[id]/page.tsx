import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { VillaDetails } from '@/components/VillaDetails';
import { CmsService } from '@/services/cms';
import { verifyPreviewToken } from '@/utils/previewToken';

export const dynamic = 'force-dynamic';

type Props = {
    params: { id: string; lang: string };
    searchParams: { t?: string };
};

const bannerText: Record<string, string> = {
    fr: 'Aperçu privé — cette page est réservée aux destinataires de ce lien.',
    en: 'Private preview — this page is reserved for recipients of this link.',
    es: 'Vista previa privada — esta página está reservada a los destinatarios de este enlace.',
    pt: 'Pré-visualização privada — esta página é reservada aos destinatários deste link.',
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
    const base: Metadata = {
        robots: { index: false, follow: false, noarchive: true },
    };

    const token = searchParams.t;
    if (!token || !verifyPreviewToken(params.id, token)) {
        return { ...base, title: 'Villa Introuvable' };
    }

    try {
        const villa = await CmsService.getVillaPreviewByIdOrSlug(params.id);
        if (villa) {
            return { ...base, title: villa.name };
        }
    } catch {
        // fall through to the not-found title
    }
    return { ...base, title: 'Villa Introuvable' };
}

export default async function VillaPreviewPage({ params, searchParams }: Props) {
    const { id, lang } = params;

    const token = searchParams.t;
    if (!token || !verifyPreviewToken(id, token)) {
        notFound();
    }

    let villa;
    try {
        villa = await CmsService.getVillaPreviewByIdOrSlug(id);
    } catch (error) {
        console.error('Erreur preview villa:', error);
        notFound();
    }
    if (!villa) {
        notFound();
    }

    return (
        <>
            <div className="bg-sbh-charcoal text-white text-center px-6 py-3">
                <p className="font-sans uppercase tracking-widest text-[11px]">
                    {bannerText[lang] || bannerText.fr}
                </p>
            </div>
            <VillaDetails villaId={villa.id} slug={villa.slug} initialVilla={villa} />
        </>
    );
}
