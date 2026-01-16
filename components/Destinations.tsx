/* eslint-disable @next/next/no-img-element */
'use client';
import React, { useEffect } from 'react';
import { NorthStar, SunStamp, OrganicLine, PalmLeaf } from './Decorations';
import { MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useRouter } from 'next/navigation';

interface DestinationsProps { }

export const Destinations: React.FC<DestinationsProps> = () => {
    const { t } = useLanguage();
    const router = useRouter();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Helper for navigation
    const handleNavigate = (path: string) => {
        router.push(path);
    };

    return (
        <div className="bg-sbh-cream min-h-screen animate-fade-in pb-24 text-sbh-charcoal overflow-hidden">

            {/* =======================
          HERO SECTION 
      ======================= */}
            <div className="relative h-[85vh] xl:h-[80vh] w-full overflow-hidden mb-24">
                <div
                    className="absolute inset-0 bg-cover bg-center animate-scale-slow"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2000&auto=format&fit=crop')" }}
                ></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-sbh-cream/90"></div>

                <div className="absolute inset-x-0 bottom-0 top-32 xl:top-0 flex flex-col items-center justify-center text-center z-10 px-6">
                    <span className="text-white text-xs md:text-sm uppercase tracking-[0.4em] mb-6 animate-slide-up">Saint-Barthélemy</span>
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl xl:text-8xl italic text-white drop-shadow-xl mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        {t.destinations.title}
                    </h1>
                    <div className="w-16 h-px bg-white/60 animate-slide-up" style={{ animationDelay: '0.2s' }}></div>
                    <p className="font-sans text-white/90 mt-6 text-base md:text-lg tracking-wide max-w-xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        {t.destinations.subtitle}
                    </p>
                </div>
            </div>

            {/* =======================
          INTRO 
      ======================= */}
            <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center mb-32 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 text-sbh-green">
                    <SunStamp className="w-48 h-48 animate-spin-slower" />
                </div>

                <p className="font-serif text-2xl md:text-4xl text-sbh-charcoal leading-tight mb-12 relative z-10 reveal-on-scroll">
                    {t.destinations.introQuote}
                </p>

                <div className="font-sans font-light text-lg text-gray-600 space-y-6 max-w-2xl mx-auto text-balance">
                    <p className="reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                        {t.destinations.introText}
                    </p>
                </div>
            </div>

            {/* =======================
          FRESCO: HISTORY
      ======================= */}
            <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-40 relative">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                    {/* Text Block (Left) */}
                    <div className="md:col-span-5 relative z-10 order-2 md:order-1">
                        <div className="w-12 h-px bg-sbh-terracotta mb-6 reveal-on-scroll"></div>
                        <h2 className="font-serif text-4xl md:text-5xl italic text-sbh-charcoal mb-8 reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                            {t.destinations.historyTitle}
                        </h2>
                        <div className="font-sans text-gray-600 leading-relaxed space-y-6 text-justify">
                            <p className="reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                                {t.destinations.historyP1}
                            </p>
                            <p className="reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
                                {t.destinations.historyP2}
                            </p>
                            <p className="text-sm italic text-sbh-charcoal/70 border-l-2 border-sbh-green pl-4 reveal-on-scroll" style={{ transitionDelay: '400ms' }}>
                                {t.destinations.historyP3}
                            </p>
                        </div>
                    </div>

                    {/* Visual Block (Right) - Offset */}
                    <div className="md:col-span-6 md:col-start-7 order-1 md:order-2 md:-mt-20">
                        <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl reveal-on-scroll group" style={{ transitionDelay: '200ms' }}>
                            <img
                                src="https://storage.googleapis.com/images-sbh/sbh-1.jpg"
                                alt="Gustavia Harbor Architecture"
                                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                            />
                            <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 text-xs font-sans tracking-widest uppercase">
                                {t.destinations.historyBadge}
                            </div>
                        </div>
                    </div>

                </div>

                {/* Decorative Line */}
                <div className="absolute top-1/2 left-0 w-full opacity-20 text-sbh-sand pointer-events-none -z-10">
                    <OrganicLine />
                </div>
            </section>

            {/* =======================
          FRESCO: CULTURE
      ======================= */}
            <section className="bg-sbh-green/10 py-32 mb-40 relative overflow-hidden">
                <div className="absolute top-[-100px] right-[-100px] text-sbh-green opacity-10 pointer-events-none">
                    <PalmLeaf className="w-[500px] h-[600px] rotate-45" />
                </div>

                <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">

                    {/* Visual Block (Left) - Wide */}
                    <div className="md:col-span-7">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-sm shadow-xl reveal-on-scroll">
                            <img
                                src="https://storage.googleapis.com/images-sbh/sbh-2.jpg"
                                alt="Gastronomy and Culture"
                                className="w-full h-full object-cover"
                            />
                            {/* Floating secondary image */}
                            <div className="absolute -bottom-12 -right-12 w-1/2 h-2/3 border-8 border-sbh-cream overflow-hidden shadow-lg hidden md:block reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                                <img
                                    src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop"
                                    alt="Artisanat"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Text Block (Right) */}
                    <div className="md:col-span-4 md:col-start-9 md:pl-8">
                        <h2 className="font-serif text-4xl italic text-sbh-charcoal mb-8 reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                            {t.destinations.cultureTitle}
                        </h2>
                        <div className="font-sans text-gray-600 leading-relaxed space-y-6 text-justify">
                            <p className="reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                                {t.destinations.cultureP1}
                            </p>
                            <p className="reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
                                {t.destinations.cultureP2}
                            </p>
                            <div className="pt-4 reveal-on-scroll" style={{ transitionDelay: '400ms' }}>
                                <button onClick={() => handleNavigate('/#services')} className="text-xs uppercase tracking-[0.2em] border-b border-sbh-charcoal pb-1 hover:text-sbh-terracotta hover:border-sbh-terracotta transition-colors">
                                    {t.destinations.cultureButton}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* =======================
          NEIGHBORHOODS (Vertical Scroll)
      ======================= */}
            <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-32">

                <div className="text-center mb-24 reveal-on-scroll">
                    <div className="flex items-center justify-center gap-4 mb-4">
                        <span className="h-px w-8 bg-sbh-charcoal/20"></span>
                        <NorthStar className="w-4 h-4 text-sbh-green" />
                        <span className="h-px w-8 bg-sbh-charcoal/20"></span>
                    </div>
                    <h2 className="font-serif text-4xl md:text-6xl text-sbh-charcoal">{t.destinations.neighborhoodsTitle}</h2>
                    <p className="font-sans text-gray-500 mt-4 uppercase tracking-widest text-xs">{t.destinations.neighborhoodsSubtitle}</p>
                </div>

                <div className="space-y-32 md:space-y-48">

                    {/* 1. Gustavia */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center group">
                        <div className="order-2 md:order-1 reveal-on-scroll">
                            <span className="font-sans text-xs font-bold text-sbh-green uppercase tracking-widest mb-2 block">{t.destinations.gustaviaNumber}</span>
                            <h3 className="font-serif text-4xl italic text-sbh-charcoal mb-6">{t.destinations.gustaviaTitle}</h3>
                            <p className="font-sans text-gray-600 leading-relaxed mb-8">
                                {t.destinations.gustaviaDescription}
                            </p>
                            <p className="text-sm font-serif italic text-sbh-charcoal/80">
                                {t.destinations.gustaviaQuote}
                            </p>
                            <button onClick={() => handleNavigate('/rentals')} className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest hover:text-sbh-green transition-colors">
                                {t.destinations.gustaviaButton} <ArrowRight size={14} />
                            </button>
                        </div>
                        <div className="order-1 md:order-2 relative aspect-[4/5] overflow-hidden rounded-t-[100px] border border-sbh-charcoal/5 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                            <img
                                src="https://storage.googleapis.com/images-sbh/sbh-3.jpg"
                                alt="Gustavia"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s]"
                            />
                        </div>
                    </div>

                    {/* 2. Saint-Jean (Inverted) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center group">
                        <div className="order-1 relative aspect-[4/5] overflow-hidden rounded-b-[100px] border border-sbh-charcoal/5 reveal-on-scroll">
                            <img
                                src="https://storage.googleapis.com/images-sbh/sbh-4.jpg"
                                alt="Saint-Jean"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s]"
                            />
                        </div>
                        <div className="order-2 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                            <span className="font-sans text-xs font-bold text-sbh-blue uppercase tracking-widest mb-2 block">{t.destinations.saintJeanNumber}</span>
                            <h3 className="font-serif text-4xl italic text-sbh-charcoal mb-6">{t.destinations.saintJeanTitle}</h3>
                            <p className="font-sans text-gray-600 leading-relaxed mb-8">
                                {t.destinations.saintJeanDescription}
                            </p>
                            <button onClick={() => handleNavigate('/rentals')} className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest hover:text-sbh-blue transition-colors">
                                {t.destinations.saintJeanButton} <ArrowRight size={14} />
                            </button>
                        </div>
                    </div>

                    {/* 3. Corossol */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center group">
                        <div className="order-2 md:order-1 reveal-on-scroll">
                            <span className="font-sans text-xs font-bold text-sbh-terracotta uppercase tracking-widest mb-2 block">{t.destinations.corossolNumber}</span>
                            <h3 className="font-serif text-4xl italic text-sbh-charcoal mb-6">{t.destinations.corossolTitle}</h3>
                            <p className="font-sans text-gray-600 leading-relaxed mb-8">
                                {t.destinations.corossolDescription}
                            </p>
                            <p className="text-sm font-serif italic text-sbh-charcoal/80">
                                {t.destinations.corossolQuote}
                            </p>
                            <button onClick={() => handleNavigate('/rentals')} className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest hover:text-sbh-terracotta transition-colors">
                                {t.destinations.corossolButton} <ArrowRight size={14} />
                            </button>
                        </div>
                        <div className="order-1 md:order-2 relative aspect-[16/9] md:aspect-[4/5] overflow-hidden rounded-sm reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                            <img
                                src="https://storage.googleapis.com/images-sbh/sbh-6.jpg"
                                alt="Corossol Boats"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s]"
                            />
                        </div>
                    </div>

                    {/* 4. Pointe Milou (Full Width Break) */}
                    <div className="relative h-[60vh] rounded-sm overflow-hidden group reveal-on-scroll">
                        <img
                            src="https://storage.googleapis.com/images-sbh/sbh-5.jpg"
                            alt="Sunset Pointe Milou"
                            className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                        <div className="absolute bottom-12 left-6 md:left-12 text-white">
                            <span className="font-sans text-xs font-bold uppercase tracking-widest mb-2 block">{t.destinations.pointeMillouNumber}</span>
                            <h3 className="font-serif text-4xl md:text-6xl italic mb-4">{t.destinations.pointeMillouTitle}</h3>
                            <p className="max-w-md font-sans text-white/90 leading-relaxed">
                                {t.destinations.pointeMillouDescription}
                            </p>
                        </div>
                    </div>

                </div>
            </section>

            {/* =======================
          CTA
      ======================= */}
            <section className="bg-white py-24 border-t border-sbh-charcoal/5">
                <div className="max-w-[800px] mx-auto text-center px-6">
                    <SunStamp className="w-16 h-16 text-sbh-green mx-auto mb-8 animate-spin-slow" />
                    <h2 className="font-serif text-3xl md:text-5xl text-sbh-charcoal mb-8 reveal-on-scroll">
                        {t.destinations.ctaTitle}
                    </h2>
                    <p className="font-sans text-gray-600 mb-12 reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                        {t.destinations.ctaDescription}
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-6 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                        <button onClick={() => handleNavigate('/rentals')} className="bg-sbh-charcoal text-white px-8 py-4 font-sans text-xs uppercase tracking-[0.25em] rounded-full hover:bg-sbh-green transition-colors">
                            {t.destinations.ctaExplore}
                        </button>
                        <button onClick={() => handleNavigate('/contact')} className="border border-sbh-charcoal text-sbh-charcoal px-8 py-4 font-sans text-xs uppercase tracking-[0.25em] rounded-full hover:bg-sbh-charcoal hover:text-white transition-colors">
                            {t.destinations.ctaContact}
                        </button>
                    </div>
                </div>
            </section>

        </div>
    );
};