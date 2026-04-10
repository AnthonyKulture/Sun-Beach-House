'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { SunStamp } from './Decorations';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from 'next/navigation';

// Dynamically load the lightweight background video component to unblock the main thread
const MuxBackgroundVideo = dynamic(
    () => import('@mux/mux-background-video/react'),
    { ssr: false }
);

export const Hero: React.FC = () => {
    const { language, t } = useLanguage();
    const router = useRouter();

    const playbackId = "oXL4cy02saoCX5kH6L00J2E1r2dkQO4n8a01GMxDe4NThw";
    // Optimized poster URL: using a smaller default width for mobile first
    const posterUrl = `https://image.mux.com/${playbackId}/thumbnail.webp?time=0`;

    return (
        <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-sbh-cream">

            {/* =========================================
                BACKGROUND (FULL SCREEN) — Lightweight Video + Responsive Poster
            ========================================= */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden" style={{ contain: 'layout style' }}>
                {/* 
                    Background Poster Image (Initial Paint)
                    Optimized with sizes to ensure mobile devices load a smaller version (800px)
                    while desktop gets the full 1920px version.
                */}
                <Image
                    src={posterUrl}
                    alt="Sun Beach House Background"
                    fill
                    priority
                    sizes="(max-width: 768px) 800px, 1920px"
                    fetchPriority="high"
                    className="object-cover z-0"
                    unoptimized={false}
                />
                
                {/* 
                    MuxBackgroundVideo for High Performance looping background
                    - PlaysInline, Muted, AutoPlay, Loop are handled by default
                    - No heavy player UI or controls
                */}
                <MuxBackgroundVideo
                    playbackId={playbackId}
                    metadataVideoTitle="Sun Beach House Hero"
                    className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none z-10"
                />

                <div className="absolute inset-0 bg-black/20 z-20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-20"></div>
            </div>

            {/* =========================================
          CONTENT CONTAINER
      ========================================= */}
            <div className="relative z-30 w-full h-full flex flex-col justify-center items-center px-6 md:px-12">

                <div className="mb-8 text-sbh-cream/90 animate-spin-slower opacity-90" style={{ willChange: 'transform' }}>
                    <SunStamp className="w-24 h-24 md:w-32 md:h-32" />
                </div>

                <div className="text-center mb-12 md:mb-16 animate-slide-up" style={{ animationDelay: '0.2s', willChange: 'opacity, transform' }}>
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="h-px w-8 bg-sbh-cream/80"></span>
                        <span className="font-sans text-[10px] md:text-sm tracking-[0.4em] uppercase text-sbh-cream font-medium drop-shadow-md">
                            {t.hero.subtitle}
                        </span>
                        <span className="h-px w-8 bg-sbh-cream/80"></span>
                    </div>

                    <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-sbh-cream font-light leading-[1.1] drop-shadow-xl tracking-tight">
                        {t.hero.mainTitle} <br className="md:hidden" />
                        <span className="italic text-4xl md:text-6xl lg:text-7xl ml-2">{t.hero.mainTitleAccent}</span>
                    </h1>
                </div>

                {/* =========================================
                    NEW HERO ACTIONS (COLLECTIONS + BUTTONS)
                ========================================= */}
                <div className="w-full max-w-4xl animate-slide-up relative z-50 flex flex-col items-center" style={{ animationDelay: '0.4s', willChange: 'opacity, transform' }}>

                    <h2 className="font-serif text-2xl md:text-3xl text-sbh-cream mb-8 tracking-wide drop-shadow-md">
                        {t.hero.ourCollections}
                    </h2>

                    <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl justify-center items-center">
                        <button
                            onClick={() => router.push(`/${language}/rentals`)}
                            className="w-full md:w-80 bg-sbh-cream hover:bg-white text-sbh-charcoal px-8 py-4 rounded-full font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 group relative z-20 whitespace-nowrap"
                        >
                            {t.hero.seasonalRentals}
                        </button>

                        <button
                            onClick={() => router.push(`/${language}/sales`)}
                            className="w-full md:w-80 bg-sbh-cream hover:bg-white text-sbh-charcoal px-8 py-4 rounded-full font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 group relative z-20 whitespace-nowrap"
                        >
                            {t.hero.propertiesForSale}
                        </button>
                    </div>

                    <div className="mt-8 md:mt-10 text-center px-2 w-full">
                        <p className="font-sans font-medium text-xs md:text-base text-sbh-cream/95 max-w-2xl mx-auto drop-shadow-lg leading-relaxed md:leading-loose whitespace-pre-line">
                            {t.hero.disclaimerText}
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
};