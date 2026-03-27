import { ConciergerieContent } from '@/components/ConciergerieContent';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Conciergerie de Luxe à Saint-Barthélemy | Sun Beach House',
    description: 'Services de conciergerie haut de gamme à Saint-Barth: chefs privés, spa, transferts VIP, yachting, réservations restaurants, services aéroport. Une expérience sur mesure par Valérie.',
    keywords: 'conciergerie luxe saint barth, chef privé st barth, spa villa saint barthélemy, transfert vip sbh, service aéroport premium, yacht charter caribbean, concierge service st barts',
    openGraph: {
        title: 'Conciergerie de Luxe | Sun Beach House Saint-Barthélemy',
        description: 'Services de conciergerie premium à Saint-Barthélemy: chefs, spa, transferts, yachting, VIP airport',
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
        title: 'Conciergerie de Luxe à Saint-Barthélemy',
        description: 'Services de conciergerie haut de gamme par Sun Beach House',
        images: ['/images/optimized-conciergerie-hero.jpg'],
    },
    alternates: {
        canonical: '/conciergerie'
    }
};

export default function ConciergeriePage() {
    return <ConciergerieContent />;
}
