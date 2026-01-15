import type { Metadata } from 'next'
import { SalesContactPage } from '@/components/SalesContactPage';

export const metadata: Metadata = {
    title: 'Sales Inquiry | Sun Beach House',
}

import { Suspense } from 'react';

export default function Page() {
    return (
        <Suspense>
            <SalesContactPage />
        </Suspense>
    );
}
