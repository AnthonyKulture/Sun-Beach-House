import type { Metadata } from 'next'
import { Collections } from '@/components/Collections';

import { getAlternates } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Villas de Luxe à Vendre à St. Barth | Sun Beach House',
        en: 'Luxury Villas for Sale in St. Barth | Sun Beach House',
        es: 'Villas de Lujo en Venta en St. Barth | Sun Beach House', 
        pt: 'Villas de Luxo para Venda em St. Barth | Sun Beach House',
    };
    const descriptions: Record<string, string> = {
        fr: 'Investissez dans l\'exception à Saint-Barthélemy. Découvrez notre sélection exclusive de villas et propriétés de prestige.',
        en: 'Invest in the exceptional in Saint-Barthélemy. Discover our exclusive selection of prestige villas and properties.',
        es: 'Invierta en lo excepcional en San Bartolomé. Descubra nuestra exclusiva selección de villas y propiedades de prestigio.',
        pt: 'Invista no excepcional em Saint-Barthélemy. Descubra nossa seleção exclusiva de moradias e propriedades de prestígio.',
    };

    return {
        title: titles[lang] || titles.fr,
        description: descriptions[lang] || descriptions.fr,
        alternates: getAlternates(lang, '/sales'),
    }
}

import { Suspense } from 'react';

export default function SalesPage() {
    return (
        <Suspense>
            <Collections mode="sale" />
        </Suspense>
    );
}
