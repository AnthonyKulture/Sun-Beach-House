/**
 * Utility to convert Sanity CDN URLs to brand-proxy URLs for emails.
 * This helps avoid deliverability issues where Sanity's domain might be flagged by providers like Gmail.
 */
export function getProxyImageURL(originalUrl: string | undefined): string | undefined {
    if (!originalUrl) return undefined;
    
    // Sanity CDN hostname and project path
    const SANITY_HOSTNAME = 'cdn.sanity.io';
    const PROJECT_ID = 'i6dkdu7j';
    const PROXY_PATH = '/sanity-assets/';
    
    // Website absolute URL (required for emails)
    const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.sun-beach-house.com';

    // If the URL is already absolute but from Sanity, swap the hostname part
    if (originalUrl.includes(SANITY_HOSTNAME) && originalUrl.includes(PROJECT_ID)) {
        // Find the part after /images/{projectId}/
        const searchString = `/images/${PROJECT_ID}/`;
        const index = originalUrl.indexOf(searchString);
        
        if (index !== -1) {
            const pathAfterProject = originalUrl.slice(index + searchString.length);
            // Ensure we don't have double slashes if SITE_URL ends with one
            const normalizedSiteUrl = SITE_URL.endsWith('/') ? SITE_URL.slice(0, -1) : SITE_URL;
            return `${normalizedSiteUrl}${PROXY_PATH}${pathAfterProject}`;
        }
    }

    return originalUrl;
}
