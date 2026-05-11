export const getAlternates = (lang: string, path: string) => {
    const baseUrl = 'https://www.sun-beach-house.com';
    // Normalize path: ensure it starts with / and remove trailing / to match Next.js default behavior
    const normalizedPath = path.replace(/^\/+|\/+$/g, '');
    const finalPath = normalizedPath ? `/${normalizedPath}` : '';
    
    return {
        canonical: `${baseUrl}/${lang}${finalPath}`,
        languages: {
            'fr-FR': `${baseUrl}/fr${finalPath}`,
            'en-US': `${baseUrl}/en${finalPath}`,
            'es-ES': `${baseUrl}/es${finalPath}`,
            'pt-PT': `${baseUrl}/pt${finalPath}`,
            'x-default': `${baseUrl}/fr${finalPath}`,
        },
    };
};
