const BASE_URL = 'https://www.sun-beach-house.com';

export const OG_LOCALES: Record<string, string> = {
    fr: 'fr_FR',
    en: 'en_US',
    es: 'es_ES',
    pt: 'pt_PT',
};

const normalize = (path: string) => {
    const normalizedPath = path.replace(/^\/+|\/+$/g, '');
    return normalizedPath ? `/${normalizedPath}` : '';
};

export const getAlternates = (lang: string, path: string) => {
    const finalPath = normalize(path);

    return {
        canonical: `${BASE_URL}/${lang}${finalPath}`,
        languages: {
            'fr-FR': `${BASE_URL}/fr${finalPath}`,
            'en-US': `${BASE_URL}/en${finalPath}`,
            'es-ES': `${BASE_URL}/es${finalPath}`,
            'pt-PT': `${BASE_URL}/pt${finalPath}`,
            'x-default': `${BASE_URL}/fr${finalPath}`,
        },
    };
};

/**
 * Localized Open Graph + Twitter metadata.
 * Mirrors getAlternates: og:url is the per-locale canonical and og:locale follows the route language,
 * fixing the FR-pinned defaults inherited from the root layout.
 */
export const getOpenGraph = (
    lang: string,
    path: string,
    { title, description, image = '/og-image.jpg' }: { title: string; description: string; image?: string }
) => {
    const url = `${BASE_URL}/${lang}${normalize(path)}`;
    const images = [image];

    return {
        openGraph: {
            type: 'website' as const,
            locale: OG_LOCALES[lang] || OG_LOCALES.fr,
            url,
            siteName: 'Sun Beach House',
            title,
            description,
            images,
        },
        twitter: {
            card: 'summary_large_image' as const,
            title,
            description,
            images,
        },
    };
};
