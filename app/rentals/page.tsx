import type { Metadata } from 'next'
import { Collections } from '@/components/Collections';

export const metadata: Metadata = {
    title: 'Luxury Rentals | Sun Beach House',
    description: 'Explore our exclusive collection of luxury villas for rent in St. Barth.',
}

import { Suspense } from 'react';

export default function RentalsPage() {
    return (
        <Suspense>
            <Collections mode="rent" />
        </Suspense>
    );
}
