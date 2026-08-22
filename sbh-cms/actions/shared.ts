/**
 * Shared utilities for Sanity Studio document actions.
 */

/**
 * Base URL of the Next.js API. SANITY_STUDIO_PREVIEW_URL is baked at build
 * time, so a localhost value must be ignored when the studio runs deployed.
 */
export function getApiUrl(): string {
    const envUrl = (process.env.SANITY_STUDIO_PREVIEW_URL || '').replace(/\/$/, '');
    const isLocalStudio = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (envUrl && (isLocalStudio || !/localhost|127\.0\.0\.1/.test(envUrl))) {
        return envUrl;
    }
    return isLocalStudio ? 'http://localhost:3000' : 'https://www.sun-beach-house.com';
}

/**
 * Triggers a browser download of a PDF Blob using a temporary anchor element.
 * Cleans up the object URL and DOM element after the download is initiated.
 */
export function downloadPdfBlob(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    window.URL.revokeObjectURL(url);
}
