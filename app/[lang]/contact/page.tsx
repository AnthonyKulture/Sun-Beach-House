import React from 'react';
import { ContactPage } from '@/components/ContactPage';
import { Metadata } from 'next';

import { getAlternates, getOpenGraph } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Contactez-Nous',
        en: 'Contact Us',
        es: 'Contáctenos',
        pt: 'Contate-nos',
    };
    const descriptions: Record<string, string> = {
        fr: 'Une question sur un projet de location ou de vente ? Contactez Valérie et l\'équipe Sun Beach House pour un service sur mesure.',
        en: 'A question about a rental or sale project? Contact Valérie and the Sun Beach House team for a personalized service.',
        es: '¿Tiene alguna pregunta sobre un proyecto de alquiler o venta? Póngase en contacto con Valérie y el equipo de Sun Beach House para obtener un servicio a medida.',
        pt: 'Tem alguma dúvida sobre um projeto de aluguel ou venda? Entre em contato com a Valérie e a equipe da Sun Beach House para um serviço personalizado.',
    };
    const title = titles[lang] || titles.fr;
    const description = descriptions[lang] || descriptions.fr;

    return {
        title,
        description,
        alternates: getAlternates(lang, '/contact'),
        ...getOpenGraph(lang, '/contact', { title, description }),
    }
}

export default function Page() {
    return <ContactPage />;
}
