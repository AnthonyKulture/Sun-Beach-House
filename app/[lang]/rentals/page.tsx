import type { Metadata } from 'next'
import { Collections } from '@/components/Collections';

import { getAlternates } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Location de Villas de Luxe',
        en: 'Luxury Villa Rentals',
        es: 'Alquiler de Villas de Lujo',
        pt: 'Aluguel de Villas de Luxo',
    };
    const descriptions: Record<string, string> = {
        fr: 'Réservez votre séjour d\'exception à Saint-Barthélemy. Une collection exclusive de villas de luxe avec services de conciergerie personnalisés.',
        en: 'Book your exceptional stay in Saint-Barthélemy. An exclusive collection of luxury villas with personalized concierge services.',
        es: 'Reserve su estancia excepcional en San Bartolomé. Una colección exclusiva de villas de lujo con servicios de conserjería personalizados.',
        pt: 'Reserve sua estadia excepcional em Saint-Barthélemy. Uma coleção exclusiva de villas de luxo com serviços de concierge personalizados.',
    };

    return {
        title: titles[lang] || titles.fr,
        description: descriptions[lang] || descriptions.fr,
        alternates: getAlternates(lang, '/rentals'),
    }
}

import { CmsService } from '@/services/cms'
import { Suspense } from 'react';

export default async function RentalsPage() {
    const villas = await CmsService.getAllVillas();
    
    return (
        <Suspense>
            <Collections mode="rent" initialVillas={villas} />
        </Suspense>
    );
}
