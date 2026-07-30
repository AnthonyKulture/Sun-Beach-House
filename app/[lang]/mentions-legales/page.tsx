import type { Metadata } from 'next';
import { getAlternates, getOpenGraph } from '@/utils/seo';
import { translations, Language } from '@/i18n/translations';
import MentionsLegalesContent from './MentionsLegalesContent';

export async function generateStaticParams() {
    return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'es' }, { lang: 'pt' }];
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const t = translations[(lang as Language) || 'fr'];
    const title = t.legalPage.title;
    const description = t.legalPage.metaDescription;
    return {
        title,
        description,
        alternates: getAlternates(lang, '/mentions-legales'),
        ...getOpenGraph(lang, '/mentions-legales', { title, description }),
    };
}

export default function MentionsLegales() {
    return <MentionsLegalesContent />;
}
