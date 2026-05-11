import type { Metadata } from 'next'
import { BookingPage } from '@/components/BookingPage';

import { getAlternates } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Demande de Réservation',
        en: 'Booking Request',
        es: 'Solicitud de Reserva',
        pt: 'Pedido de Reserva',
    };
    return {
        title: titles[lang] || titles.fr,
        description: 'Finalisez votre demande de réservation pour une villa de luxe à Saint-Barthélemy.',
        alternates: getAlternates(lang, '/booking'),
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
