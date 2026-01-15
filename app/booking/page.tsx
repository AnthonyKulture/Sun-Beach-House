import type { Metadata } from 'next'
import { BookingPage } from '@/components/BookingPage';

export const metadata: Metadata = {
    title: 'Booking Request | Sun Beach House',
}

import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense>
            <BookingPage />
        </Suspense>
    );
}
