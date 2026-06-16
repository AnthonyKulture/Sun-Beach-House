import type { Metadata } from 'next'
import { Collections } from '@/components/Collections';

import { getAlternates, getOpenGraph } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Villas de Luxe à Vendre',
        en: 'Luxury Villas for Sale',
        es: 'Villas de Lujo en Venta',
        pt: 'Villas de Luxo para Venda',
    };
    const descriptions: Record<string, string> = {
        fr: 'Investissez dans l\'exception à Saint-Barthélemy. Découvrez notre sélection exclusive de villas et propriétés de prestige.',
        en: 'Invest in the exceptional in Saint-Barthélemy. Discover our exclusive selection of prestige villas and properties.',
        es: 'Invierta en lo excepcional en San Bartolomé. Descubra nuestra exclusiva selección de villas y propiedades de prestigio.',
        pt: 'Invista no excepcional em Saint-Barthélemy. Descubra nossa seleção exclusiva de moradias e propriedades de prestígio.',
    };
    const title = titles[lang] || titles.fr;
    const description = descriptions[lang] || descriptions.fr;

    return {
        title,
        description,
        alternates: getAlternates(lang, '/sales'),
        ...getOpenGraph(lang, '/sales', { title, description }),
    }
}

export const revalidate = 300;

import { CmsService } from '@/services/cms'
import { Suspense } from 'react';

export default async function SalesPage() {
    const villas = await CmsService.getAllVillas();
    
    return (
        <Suspense>
            <Collections mode="sale" initialVillas={villas} />
        </Suspense>
    );
}
