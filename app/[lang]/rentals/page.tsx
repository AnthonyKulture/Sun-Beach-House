import type { Metadata } from 'next'
import { Collections } from '@/components/Collections';
import { CollectionsHero, CollectionsIntro, VillaLinkIndex } from '@/components/CollectionsServerSections';

import { getAlternates, getOpenGraph } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Location de Villas de Luxe à Saint-Barth',
        en: 'St Barts Luxury Villa Rentals & Vacation Villas',
        es: 'Alquiler de Villas de Lujo en St. Barth',
        pt: 'Aluguel de Villas de Luxo em St. Barth',
    };
    const descriptions: Record<string, string> = {
        fr: 'Plus de 150 villas de luxe à louer à Saint-Barth, sélectionnées à la main : bord de mer, vue mer, familiales. Conciergerie personnalisée incluse.',
        en: '150+ hand-picked luxury villas for rent in St Barts: beachfront, ocean view and family villas, with personalized concierge service included.',
        es: 'Más de 150 villas de lujo en alquiler en St. Barth, seleccionadas a mano: frente al mar, vista al mar y familiares. Conserjería personalizada incluida.',
        pt: 'Mais de 150 villas de luxo para alugar em St. Barth, selecionadas a dedo: beira-mar, vista para o mar e familiares. Concierge personalizado incluído.',
    };
    const title = titles[lang] || titles.fr;
    const description = descriptions[lang] || descriptions.fr;

    return {
        title,
        description,
        alternates: getAlternates(lang, '/rentals'),
        ...getOpenGraph(lang, '/rentals', { title, description }),
    }
}

export const revalidate = 300;

import { CmsService } from '@/services/cms'
import { Suspense } from 'react';

export default async function RentalsPage({ params }: { params: { lang: string } }) {
    const villas = await CmsService.getAllVillas();

    return (
        <>
            <CollectionsHero mode="rent" lang={params.lang} />
            <Suspense>
                <Collections mode="rent" initialVillas={villas} hideHero overlapHero hideIntro />
            </Suspense>
            <CollectionsIntro mode="rent" lang={params.lang} />
            <VillaLinkIndex mode="rent" lang={params.lang} villas={villas} />
        </>
    );
}
