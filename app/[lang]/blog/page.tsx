import type { Metadata } from 'next';
import { CmsService } from '@/services/cms';
import { BlogIndex } from '@/components/BlogIndex';
import { getAlternates } from '@/utils/seo';

type Props = { params: { lang: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { lang } = params;
    const titles: Record<string, string> = {
        fr: 'Magazine — Saint-Barth par Sun Beach House',
        en: 'Magazine — Saint-Barth by Sun Beach House',
        es: 'Magazine — Saint-Barth por Sun Beach House',
        pt: 'Magazine — Saint-Barth pela Sun Beach House',
    };
    const descriptions: Record<string, string> = {
        fr: 'Guides, saisons, services et art de vivre à Saint-Barthélemy par Sun Beach House. Articles fact-checkés, sourcés, mis à jour régulièrement.',
        en: 'Guides, seasons, services and lifestyle in Saint-Barthélemy by Sun Beach House. Fact-checked, sourced, regularly updated articles.',
        es: 'Guías, temporadas, servicios y arte de vivir en Saint-Barthélemy por Sun Beach House. Artículos verificados, con fuentes, actualizados regularmente.',
        pt: 'Guias, temporadas, serviços e arte de viver em Saint-Barthélemy pela Sun Beach House. Artigos verificados, com fontes, atualizados regularmente.',
    };

    return {
        title: titles[lang] || titles.fr,
        description: descriptions[lang] || descriptions.fr,
        alternates: getAlternates(lang, '/blog'),
        openGraph: {
            title: titles[lang] || titles.fr,
            description: descriptions[lang] || descriptions.fr,
            type: 'website',
            url: `https://www.sun-beach-house.com/${lang}/blog`,
        },
    };
}

export async function generateStaticParams() {
    return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'es' }, { lang: 'pt' }];
}

export const revalidate = 300;

export default async function BlogIndexPage({ params }: Props) {
    const { lang } = params;
    const supported = ['fr', 'en', 'es', 'pt'];
    if (!supported.includes(lang)) {
        return null;
    }

    const posts = await CmsService.getPublishedPosts();

    return <BlogIndex posts={posts} />;
}
