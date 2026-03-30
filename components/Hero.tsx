'use client';

import React from 'react';
import Image from 'next/image';
import { SunStamp } from './Decorations';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from 'next/navigation';

export const Hero: React.FC = () => {
    const { language, t } = useLanguage();
    const router = useRouter();

    return (
        <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-sbh-cream">

            {/* =========================================
          BACKGROUND IMAGE (FULL SCREEN) — next/image for LCP
      ========================================= */}
            <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
                <iframe
                    src="https://player.mux.com/oXL4cy02saoCX5kH6L00J2E1r2dkQO4n8a01GMxDe4NThw?background=true&muted=true&loop=true&autoplay=true&controls=false&poster-width=1280"
                    className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 object-cover pointer-events-none z-0 animate-fade-in"
                    allow="autoplay; encrypted-media"
                    title="Sun Beach House"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
            </div>

            {/* =========================================
          CONTENT CONTAINER
      ========================================= */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6 md:px-12">

                <div className="mb-8 text-sbh-cream/90 animate-spin-slower opacity-90" style={{ willChange: 'transform' }}>
                    <SunStamp className="w-24 h-24 md:w-32 md:h-32" />
                </div>

                <div className="text-center mb-12 md:mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
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
                <div className="w-full max-w-4xl animate-slide-up relative z-50 flex flex-col items-center" style={{ animationDelay: '0.4s' }}>

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