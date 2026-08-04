'use client';

interface LoaderParams {
    src: string;
    width: number;
    quality?: number;
}

export default function imageLoader({ src, width, quality }: LoaderParams): string {
    if (src.startsWith('https://cdn.sanity.io/')) {
        const url = new URL(src);
        url.searchParams.set('auto', 'format');
        url.searchParams.set('w', String(width));
        url.searchParams.set('q', String(quality || 80));
        url.searchParams.set('fit', 'max');
        return url.toString();
    }
    if (src.startsWith('https://image.mux.com/')) {
        const url = new URL(src);
        url.searchParams.set('width', String(width));
        return url.toString();
    }
    return src;
}
