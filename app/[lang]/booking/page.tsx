import type { Metadata } from 'next'
import { BookingPage } from '@/components/BookingPage';

import { getAlternates, getOpenGraph } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Demande de Réservation',
        en: 'Booking Request',
        es: 'Solicitud de Reserva',
        pt: 'Pedido de Reserva',
    };
    const descriptions: Record<string, string> = {
        fr: 'Finalisez votre demande de réservation pour une villa de luxe à Saint-Barthélemy.',
        en: 'Complete your booking request for a luxury villa in Saint-Barthélemy.',
        es: 'Complete su solicitud de reserva para una villa de lujo en San Bartolomé.',
        pt: 'Finalize o seu pedido de reserva para uma villa de luxo em Saint-Barthélemy.',
    };
    const title = titles[lang] || titles.fr;
    const description = descriptions[lang] || descriptions.fr;
    return {
        title,
        description,
        alternates: getAlternates(lang, '/booking'),
        ...getOpenGraph(lang, '/booking', { title, description }),
    }
}

import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense>
            <BookingPage />
        </Suspense>
    );
}
