import React from 'react';
import { ContactPage } from '@/components/ContactPage';
import { Metadata } from 'next';

import { getAlternates } from '@/utils/seo';

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Contactez-Nous | Sun Beach House St. Barth',
        en: 'Contact Us | Sun Beach House St. Barth',
        es: 'Contáctenos | Sun Beach House St. Barth',
        pt: 'Contate-nos | Sun Beach House St. Barth',
    };
    const descriptions: Record<string, string> = {
        fr: 'Une question sur un projet de location ou de vente ? Contactez Valérie et l\'équipe Sun Beach House pour un service sur mesure.',
        en: 'A question about a rental or sale project? Contact Valérie and the Sun Beach House team for a personalized service.',
        es: '¿Tiene alguna pregunta sobre un proyecto de alquiler o venta? Póngase en contacto con Valérie y el equipo de Sun Beach House para obtener un servicio a medida.',
        pt: 'Tem alguma dúvida sobre um projeto de aluguel ou venda? Entre em contato com a Valérie e a equipe da Sun Beach House para um serviço personalizado.',
    };

    return {
        title: titles[lang] || titles.fr,
        description: descriptions[lang] || descriptions.fr,
        alternates: getAlternates(lang, '/contact'),
    }
}

export default function Page() {
    return <ContactPage />;
}
