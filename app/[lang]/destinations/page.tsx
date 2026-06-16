import React from 'react';
import { Destinations } from '@/components/Destinations';
import { Metadata } from 'next';

import { getAlternates, getOpenGraph } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Les Plus Beaux Quartiers',
        en: 'The Most Beautiful Areas',
        es: 'Las Zonas más Bellas',
        pt: 'As Áreas Mais Bonitas',
    };
    const descriptions: Record<string, string> = {
        fr: 'Explorez les plus beaux quartiers de Saint-Barthélemy : Gustavia, Saint-Jean, Flamands, et bien d\'autres avec Sun Beach House.',
        en: 'Explore the most beautiful neighborhoods of Saint-Barthélemy: Gustavia, Saint-Jean, Flamands, and many more with Sun Beach House.',
        es: 'Explore los barrios más bellos de San Bartolomé: Gustavia, San Juan, Flamands y muchos más con Sun Beach House.',
        pt: 'Explore os bairros mais bonitos de Saint-Barthélemy: Gustavia, Saint-Jean, Flamands e muitos mais com a Sun Beach House.',
    };
    const title = titles[lang] || titles.fr;
    const description = descriptions[lang] || descriptions.fr;

    return {
        title,
        description,
        alternates: getAlternates(lang, '/destinations'),
        ...getOpenGraph(lang, '/destinations', { title, description }),
    }
}

export default function Page() {
    return <Destinations />;
}
