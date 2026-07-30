import type { Metadata } from 'next';
import { getAlternates, getOpenGraph } from '@/utils/seo';
import { translations, Language } from '@/i18n/translations';
import ConditionsContent from './ConditionsContent';

export async function generateStaticParams() {
    return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'es' }, { lang: 'pt' }];
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const t = translations[(lang as Language) || 'fr'];
    const title = t.conditionsPage.title;
    const description = t.conditionsPage.metaDescription;
    return {
        title,
        description,
        alternates: getAlternates(lang, '/conditions-generales'),
        ...getOpenGraph(lang, '/conditions-generales', { title, description }),
    };
}

export default function ConditionsGenerales() {
    return <ConditionsContent />;
}
