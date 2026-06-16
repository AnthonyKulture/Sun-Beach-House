import type { Metadata } from 'next';
import { NeighborhoodView, neighborhoodMetadata } from '@/components/NeighborhoodView';

const SLUG = 'saint-jean';

export const revalidate = 300;

export function generateStaticParams() {
    return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'es' }, { lang: 'pt' }];
}

export function generateMetadata({ params }: { params: { lang: string } }): Metadata {
    return neighborhoodMetadata(SLUG, params.lang);
}

export default function Page({ params }: { params: { lang: string } }) {
    return <NeighborhoodView slug={SLUG} lang={params.lang} />;
}
