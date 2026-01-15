import React from 'react';
import { AboutPage } from '@/components/AboutPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'L\'Esprit | Sun Beach House',
    description: 'Découvrez l\'esprit Sun Beach House et notre philosophie.',
};

export default function Page() {
    return <AboutPage />;
}
