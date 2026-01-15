import React from 'react';

interface VillaImagePlaceholderProps {
    className?: string;
    text?: string;
}

export const VillaImagePlaceholder: React.FC<VillaImagePlaceholderProps> = ({
    className = '',
    text = 'Photo non disponible'
}) => {
    return (
        <div className={`relative overflow-hidden ${className}`}>
            {/* Blurred St Barth background */}
            <div
                className="absolute inset-0 bg-cover bg-center blur-md scale-110"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1200&auto=format&fit=crop')",
                }}
            />

            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Text overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white">
                    <svg
                        className="w-16 h-16 mx-auto mb-4 opacity-60"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    <p className="font-sans text-sm uppercase tracking-widest font-medium drop-shadow-lg">
                        {text}
                    </p>
                </div>
            </div>
        </div>
    );
};
