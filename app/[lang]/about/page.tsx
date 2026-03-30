import React from 'react';
import { AboutPage } from '@/components/AboutPage';
import { Metadata } from 'next';

import { getAlternates } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'L\'Esprit Sun Beach House | À Propos de Nous',
        en: 'The Sun Beach House Spirit | About Us',
        es: 'El Espíritu de Sun Beach House | Sobre Nosotros',
        pt: 'O Espírito da Sun Beach House | Sobre Nós',
    };
    const descriptions: Record<string, string> = {
        fr: 'Découvrez l\'histoire de Sun Beach House et la vision de Valérie pour l\'immobilier de luxe à Saint-Barthélemy.',
        en: 'Discover the story of Sun Beach House and Valérie\'s vision for luxury real estate in Saint-Barthélemy.',
        es: 'Descubra la historia de Sun Beach House et la visión de Valérie para el sector inmobiliario de lujo en San Bartolomé.',
        pt: 'Descubra a história da Sun Beach House e a visão da Valérie para o mercado imobiliário de luxo em Saint-Barthélemy.',
    };

    return {
        title: titles[lang] || titles.fr,
        description: descriptions[lang] || descriptions.fr,
        alternates: getAlternates(lang, '/about'),
    }
}

export default function Page() {
    return <AboutPage />;
}
