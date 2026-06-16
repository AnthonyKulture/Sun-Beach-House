import type { Metadata } from 'next'
import { SalesContactPage } from '@/components/SalesContactPage';

import { getAlternates, getOpenGraph } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Contact Vente',
        en: 'Sales Contact',
        es: 'Contacto de Venta',
        pt: 'Contato de Venda',
    };
    const descriptions: Record<string, string> = {
        fr: 'Contactez notre équipe de vente pour vos projets immobiliers à Saint-Barthélemy.',
        en: 'Contact our sales team for your real estate projects in Saint-Barthélemy.',
        es: 'Contacte con nuestro equipo de ventas para sus proyectos inmobiliarios en San Bartolomé.',
        pt: 'Contacte a nossa equipa de vendas para os seus projetos imobiliários em Saint-Barthélemy.',
    };
    const title = titles[lang] || titles.fr;
    const description = descriptions[lang] || descriptions.fr;
    return {
        title,
        description,
        alternates: getAlternates(lang, '/sales-contact'),
        ...getOpenGraph(lang, '/sales-contact', { title, description }),
    }
}

import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense>
            <SalesContactPage />
        </Suspense>
    );
}
