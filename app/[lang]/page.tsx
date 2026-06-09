import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { HomepageIntro } from '@/components/HomepageIntro';
import { About } from '@/components/About';
import { Villas } from '@/components/Villas';
import { Services } from '@/components/Services';
import { Experience } from '@/components/Experience';
import { getAlternates } from '@/utils/seo';

type Props = {
    params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = params;

    const titles: Record<string, { absolute: string }> = {
        fr: { absolute: 'Location de villa de luxe à Saint-Barth - Sun Beach House' },
        en: { absolute: 'Luxury Villa Rental in St. Barth - Sun Beach House' },
        es: { absolute: 'Alquiler de villas de lujo en St. Barth - Sun Beach House' },
        pt: { absolute: 'Aluguel de villas de luxo em St. Barth - Sun Beach House' },
    };

    const descriptions: Record<string, string> = {
        fr: "Découvrez une collection exclusive de villas de luxe à Saint-Barthélemy. Location saisonnière, vente et conciergerie sur-mesure avec l'équipe Sun Beach House.",
        en: 'Discover an exclusive collection of luxury villas in Saint-Barthélemy. Seasonal rentals, sales, and bespoke concierge services with the Sun Beach House team.',
        es: 'Descubra una colección exclusiva de villas de lujo en San Bartolomé. Alquileres vacacionales, ventas y servicios de conserjería a medida con Sun Beach House.',
        pt: 'Descubra uma coleção exclusiva de villas de luxo em Saint-Barthélemy. Aluguéis de temporada, vendas e serviços de concierge personalizados com a Sun Beach House.',
    };

    return {
        title: titles[lang] || titles.fr,
        description: descriptions[lang] || descriptions.fr,
        alternates: getAlternates(lang, ''),
    };
}

export async function generateStaticParams() {
    return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'es' }, { lang: 'pt' }];
}

import { CmsService } from '@/services/cms'
import { notFound } from 'next/navigation';

export default async function HomePage({ params }: Props) {
    const { lang } = params;

    // Validate locale against supported list
    const supportedLocales = ['fr', 'en', 'es', 'pt'];
    if (!supportedLocales.includes(lang)) {
        notFound();
    }

    try {
        // Fetch villas on the server for better performance and SEO
        const villas = await CmsService.getAllVillas();

        return (
            <>
                <Hero />
                <HomepageIntro />
                <About />
                <Villas initialVillas={villas} />
                <Services />
                <Experience />
            </>
        );
    } catch (error) {
        console.error(`[HomePage] Error rendering for lang ${lang}:`, error);
        // Fallback or throw to trigger error.tsx
        throw error;
    }
}
