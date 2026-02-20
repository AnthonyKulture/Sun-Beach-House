'use client';

import React from 'react';
import { SunStamp } from './Decorations';
// import { useVillas } from '../hooks/useCMS';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from 'next/navigation';

export const Hero: React.FC = () => {
    // const { villas } = useVillas(); // Unused
    const { t } = useLanguage();
    const router = useRouter();

    return (
        <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-sbh-cream">

            {/* =========================================
          BACKGROUND IMAGE (FULL SCREEN)
      ========================================= */}
            <div className="absolute inset-0 w-full h-full z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center animate-fade-in duration-[2s]"
                    style={{
                        backgroundImage: "url('https://storage.googleapis.com/images-sbh/hero-sbh.jpg')",
                        backgroundPosition: "center center"
                    }}
                ></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
            </div>

            {/* =========================================
          CONTENT CONTAINER
      ========================================= */}
            <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6 md:px-12">

                <div className="mb-8 text-sbh-cream/90 animate-spin-slower opacity-90">
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
                    SIMPLIFIED SEARCH BAR (LOCATION + CAPACITY)
                ========================================= */}
                {/* =========================================
                    NEW HERO ACTIONS (COLLECTIONS + BUTTONS)
                ========================================= */}
                <div className="w-full max-w-4xl animate-slide-up relative z-50 flex flex-col items-center" style={{ animationDelay: '0.4s' }}>

                    <h2 className="font-serif text-2xl md:text-3xl text-sbh-cream mb-8 tracking-wide drop-shadow-md">
                        {t.hero.ourCollections}
                    </h2>

                    <div className="flex flex-col md:flex-row gap-6 w-full max-w-2xl justify-center items-center">
                        <button
                            onClick={() => router.push('/rentals')}
                            className="w-full md:w-80 bg-sbh-cream hover:bg-white text-sbh-charcoal px-8 py-4 rounded-full font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 group relative z-20 whitespace-nowrap"
                        >
                            {t.hero.seasonalRentals}
                        </button>

                        <button
                            onClick={() => router.push('/sales')}
                            className="w-full md:w-80 bg-sbh-cream hover:bg-white text-sbh-charcoal px-8 py-4 rounded-full font-sans text-xs md:text-sm tracking-[0.2em] uppercase font-bold transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 group relative z-20 whitespace-nowrap"
                        >
                            {t.hero.propertiesForSale}
                        </button>
                    </div>

                    <div className="mt-8 md:mt-10 text-center px-2 w-full">
                        <p className="font-sans font-medium text-xs md:text-base text-sbh-cream/95 max-w-2xl mx-auto whitespace-pre-line drop-shadow-lg leading-relaxed md:leading-loose">
                            {t.hero.disclaimerText}
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
};