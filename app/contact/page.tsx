import React from 'react';
import { ContactPage } from '@/components/ContactPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact | Sun Beach House',
    description: 'Contactez-nous pour votre projet de vacances ou de conciergerie.',
};

export default function Page() {
    return <ContactPage />;
}
