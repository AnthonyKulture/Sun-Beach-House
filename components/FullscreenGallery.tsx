import React, { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface FullscreenGalleryProps {
    images: string[];
    initialIndex: number;
    onClose: () => void;
}

export const FullscreenGallery: React.FC<FullscreenGalleryProps> = ({ images, initialIndex, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') goToPrevious();
            if (e.key === 'ArrowRight') goToNext();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentIndex]);

    // Prevent body scroll
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[100000] animate-fade-in">
            {/* Background Overlay - Clickable to close */}
            <div
                className="absolute inset-0 bg-black/95 backdrop-blur-sm cursor-pointer"
                onClick={onClose}
                aria-label="Cliquez pour fermer"
            />

            {/* Close Button - Larger and more visible */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
                className="fixed top-4 right-4 md:top-6 md:right-6 z-[100002] bg-white/90 hover:bg-white text-sbh-charcoal p-4 rounded-full transition-all hover:scale-110 active:scale-95 shadow-2xl cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                aria-label="Fermer la galerie"
            >
                <X size={28} strokeWidth={2.5} />
            </button>

            {/* Image Counter */}
            <div className="fixed top-4 left-4 md:top-6 md:left-6 z-[100002] bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full font-sans text-sm pointer-events-none">
                {currentIndex + 1} / {images.length}
            </div>

            {/* Previous Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                }}
                className="fixed left-4 md:left-6 top-1/2 -translate-y-1/2 z-[100002] bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all hover:scale-110 active:scale-95 hidden md:flex items-center justify-center cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                aria-label="Image précédente"
            >
                <ChevronLeft size={32} />
            </button>

            {/* Next Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                }}
                className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-[100002] bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all hover:scale-110 active:scale-95 hidden md:flex items-center justify-center cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                aria-label="Image suivante"
            >
                <ChevronRight size={32} />
            </button>

            {/* Main Image Container */}
            <div
                className="relative w-full h-full flex items-center justify-center p-4 md:p-12 z-[100001] pointer-events-none"
            >
                <img
                    src={images[currentIndex]}
                    alt={`Gallery image ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain pointer-events-none select-none"
                    onClick={(e) => e.stopPropagation()}
                />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100002] flex gap-4">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        goToPrevious();
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all active:scale-95 cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                    aria-label="Image précédente"
                >
                    <ChevronLeft size={24} />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        goToNext();
                    }}
                    className="bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all active:scale-95 cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                    aria-label="Image suivante"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    );
};
