import { ConciergerieContent } from '@/components/ConciergerieContent';
import { Metadata } from 'next';

import { getAlternates, getOpenGraph } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Conciergerie de Luxe',
        en: 'Luxury Concierge Services',
        es: 'Servicios de Conserjería de Lujo',
        pt: 'Serviços de Concierge de Luxo',
    };
    const descriptions: Record<string, string> = {
        fr: 'Services de conciergerie haut de gamme à Saint-Barth: chefs privés, spa, transferts VIP, yachting, réservations restaurants, services aéroport. Une expérience sur mesure par Valérie.',
        en: 'Premium concierge services in Saint-Barth: private chefs, spa, VIP transfers, yachting, restaurant reservations, airport services. A bespoke experience by Valérie.',
        es: 'Servicios de conserjería premium en San Bartolomé: chefs privados, spa, traslados VIP, yates, reservas de restaurantes, servicios aeroportuarios.',
        pt: 'Serviços de concierge premium em Saint-Barthélemy: chefs privados, spa, traslados VIP, iatismo, reservas em restaurantes, serviços de aeroporto.',
    };
    const title = `${titles[lang] || titles.fr} | St-Barth`;
    const description = descriptions[lang] || descriptions.fr;

    return {
        title: titles[lang] || titles.fr,
        description,
        keywords: 'conciergerie luxe saint barth, chef privé st barth, spa villa saint barthélemy, transfert vip sbh, service aéroport premium, yacht charter caribbean, concierge service st barts',
        alternates: getAlternates(lang, '/conciergerie'),
        ...getOpenGraph(lang, '/conciergerie', { title, description, image: '/images/optimized-conciergerie-hero.jpg' }),
    };
}

export default function ConciergeriePage() {
    return <ConciergerieContent />;
}
