/**
 * Shared utilities for Sanity Studio document actions.
 */

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
