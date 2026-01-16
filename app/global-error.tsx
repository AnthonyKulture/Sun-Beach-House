'use client';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    return (
        <html>
            <body>
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f5f3ef',
                    fontFamily: 'system-ui, sans-serif'
                }}>
                    <div style={{ textAlign: 'center', padding: '2rem' }}>
                        <h2 style={{
                            fontSize: '1.5rem',
                            color: '#1a2e1a',
                            marginBottom: '1rem'
                        }}>
                            Une erreur critique est survenue
                        </h2>
                        <p style={{
                            color: 'rgba(58, 90, 64, 0.7)',
                            marginBottom: '1.5rem'
                        }}>
                            Nous nous excusons pour ce désagrément.
                        </p>
                        <button
                            onClick={() => reset()}
                            style={{
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#3a5a40',
                                color: '#f5f3ef',
                                border: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            Réessayer
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
