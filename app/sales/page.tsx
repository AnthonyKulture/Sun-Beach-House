import type { Metadata } from 'next'
import { Collections } from '@/components/Collections';

export const metadata: Metadata = {
    title: 'Villas for Sale | Sun Beach House',
    description: 'Find your dream home in St. Barth with our exclusive portfolio of villas for sale.',
}

import { Suspense } from 'react';

export default function SalesPage() {
    return (
        <Suspense>
            <Collections mode="sale" />
        </Suspense>
    );
}
