import { ConciergerieContent } from '@/components/ConciergerieContent';
import { Metadata } from 'next';

import { getAlternates } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Conciergerie de Luxe à Saint-Barthélemy | Sun Beach House',
        en: 'Luxury Concierge Services in Saint-Barthélemy | Sun Beach House',
        es: 'Servicios de Conserjería de Lujo en San Bartolomé | Sun Beach House',
        pt: 'Serviços de Concierge de Luxo em Saint-Barthélemy | Sun Beach House',
    };
    const descriptions: Record<string, string> = {
        fr: 'Services de conciergerie haut de gamme à Saint-Barth: chefs privés, spa, transferts VIP, yachting, réservations restaurants, services aéroport. Une expérience sur mesure par Valérie.',
        en: 'Premium concierge services in Saint-Barth: private chefs, spa, VIP transfers, yachting, restaurant reservations, airport services. A bespoke experience by Valérie.',
        es: 'Servicios de conserjería premium en San Bartolomé: chefs privados, spa, traslados VIP, yates, reservas de restaurantes, servicios aeroportuarios.',
        pt: 'Serviços de concierge premium em Saint-Barthélemy: chefs privados, spa, traslados VIP, iatismo, reservas em restaurantes, serviços de aeroporto.',
    };

    return {
        title: titles[lang] || titles.fr,
        description: descriptions[lang] || descriptions.fr,
        keywords: 'conciergerie luxe saint barth, chef privé st barth, spa villa saint barthélemy, transfert vip sbh, service aéroport premium, yacht charter caribbean, concierge service st barts',
        openGraph: {
            title: titles[lang] || titles.fr,
            description: descriptions[lang] || descriptions.fr,
            images: [{
                url: '/images/optimized-conciergerie-hero.jpg',
                width: 1200,
                height: 630,
                alt: 'Conciergerie Services Sun Beach House'
            }],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: titles[lang] || titles.fr,
            description: descriptions[lang] || descriptions.fr,
            images: ['/images/optimized-conciergerie-hero.jpg'],
        },
        alternates: getAlternates(lang, '/conciergerie')
    };
}

export default function ConciergeriePage() {
    return <ConciergerieContent />;
}
