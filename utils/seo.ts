export const getAlternates = (lang: string, path: string) => {
    const baseUrl = 'https://www.sun-beach-house.com';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    
    return {
        canonical: `${baseUrl}/${lang}${cleanPath}`,
        languages: {
            'fr-FR': `${baseUrl}/fr${cleanPath}`,
            'en-US': `${baseUrl}/en${cleanPath}`,
            'es-ES': `${baseUrl}/es${cleanPath}`,
            'pt-PT': `${baseUrl}/pt${cleanPath}`,
            'x-default': `${baseUrl}/fr${cleanPath}`,
        },
    };
};
