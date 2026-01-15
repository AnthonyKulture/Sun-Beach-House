import React from 'react';
import { Destinations } from '@/components/Destinations';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Destination St Barth | Sun Beach House',
    description: 'Explorez les quartiers emblématiques de Saint-Barthélemy.',
};

export default function Page() {
    return <Destinations />;
}
