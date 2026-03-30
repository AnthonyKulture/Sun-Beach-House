import type { Metadata } from 'next'
import { Collections } from '@/components/Collections';

import { getAlternates } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Location de Villas de Luxe à St. Barth | Sun Beach House',
        en: 'Luxury Villa Rentals in St. Barth | Sun Beach House',
        es: 'Alquiler de Villas de Lujo en St. Barth | Sun Beach House',
        pt: 'Aluguel de Villas de Luxo em St. Barth | Sun Beach House',
    };
    const descriptions: Record<string, string> = {
        fr: 'Réservez votre séjour d\'exception à Saint-Barthélemy. Une collection exclusive de villas de luxe avec services de conciergerie personnalisés.',
        en: 'Book your exceptional stay in Saint-Barthélemy. An exclusive collection of luxury villas with personalized concierge services.',
        es: 'Reserve su estancia excepcional en San Bartolomé. Una colección exclusiva de villas de lujo con servicios de conserjería personalizados.',
        pt: 'Reserve sua estadia excepcional em Saint-Barthélemy. Uma coleção exclusiva de villas de luxo com serviços de concierge personalizados.',
    };

    return {
        title: titles[lang] || titles.fr,
        description: descriptions[lang] || descriptions.fr,
        alternates: getAlternates(lang, '/rentals'),
    }
}

import { Suspense } from 'react';

export default function RentalsPage() {
    return (
        <Suspense>
            <Collections mode="rent" />
        </Suspense>
    );
}
