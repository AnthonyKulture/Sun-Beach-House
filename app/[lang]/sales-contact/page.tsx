import type { Metadata } from 'next'
import { SalesContactPage } from '@/components/SalesContactPage';

import { getAlternates } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Contact Vente | Sun Beach House',
        en: 'Sales Contact | Sun Beach House',
        es: 'Contacto de Venta | Sun Beach House',
        pt: 'Contato de Venda | Sun Beach House',
    };
    return {
        title: titles[lang] || titles.fr,
        description: 'Contactez notre équipe de vente pour vos projets immobiliers à Saint-Barthélemy.',
        alternates: getAlternates(lang, '/sales-contact'),
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
