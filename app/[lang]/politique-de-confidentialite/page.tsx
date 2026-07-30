import type { Metadata } from 'next';
import { getAlternates, getOpenGraph } from '@/utils/seo';
import { translations, Language } from '@/i18n/translations';
import ConfidentialiteContent from './ConfidentialiteContent';

export async function generateStaticParams() {
    return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'es' }, { lang: 'pt' }];
}

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const t = translations[(lang as Language) || 'fr'];
    const title = t.privacyPage.title;
    const description = t.privacyPage.metaDescription;
    return {
        title,
        description,
        alternates: getAlternates(lang, '/politique-de-confidentialite'),
        ...getOpenGraph(lang, '/politique-de-confidentialite', { title, description }),
    };
}

export default function PolitiqueConfidentialite() {
    return <ConfidentialiteContent />;
}
