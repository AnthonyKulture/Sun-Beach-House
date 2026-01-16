'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-sbh-cream">
            <div className="text-center p-8">
                <h2 className="text-2xl font-serif text-sbh-darkgreen mb-4">
                    Une erreur est survenue
                </h2>
                <p className="text-sbh-green/70 mb-6">
                    Nous nous excusons pour ce désagrément.
                </p>
                <button
                    onClick={() => reset()}
                    className="px-6 py-3 bg-sbh-green text-sbh-cream rounded-sm hover:bg-sbh-darkgreen transition-colors"
                >
                    Réessayer
                </button>
            </div>
        </div>
    );
}
