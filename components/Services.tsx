'use client';

import React, { useState } from 'react';
import { SunStamp, NorthStar } from './Decorations';
import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';

const serviceKeys = ['chef', 'spa', 'transfer', 'reservations', 'nautical', 'travel', 'vip'] as const;

const serviceImages: Record<string, string> = {
    chef: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop",
    spa: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop",
    transfer: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1600&auto=format&fit=crop",
    reservations: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1600&auto=format&fit=crop",
    nautical: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1600&auto=format&fit=crop",
    travel: "https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=1600&auto=format&fit=crop",
    vip: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1600&auto=format&fit=crop"
};

export const Services: React.FC = () => {
    const { t } = useLanguage();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Get service title and description from translations
    // Use shorter titles for travel and vip on homepage display
    const getServiceInfo = (key: string) => {
        const serviceTranslations: Record<string, { title: string; desc: string }> = {
            chef: t.services.chef,
            spa: t.services.spa,
            transfer: t.services.transfer,
            reservations: t.services.reservations,
            nautical: t.services.nautical,
            travel: { title: 'Voyage & Transport', desc: t.conciergeriePage.travel.shortDesc },
            vip: { title: 'VIP Aéroport', desc: t.conciergeriePage.vip.shortDesc }
        };
        return serviceTranslations[key] || { title: '', desc: '' };
    };

    return (
        <section id="services" className="bg-sbh-green py-24 md:py-32 px-6 md:px-12 text-sbh-charcoal relative overflow-hidden min-h-[90vh] flex flex-col justify-center">

            {/* Dynamic Background Image on Hover */}
            <div className="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out pointer-events-none mix-blend-overlay opacity-20">
                {serviceKeys.map((key, index) => (
                    <div
                        key={key}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url('${serviceImages[key]}')` }}
                    ></div>
                ))}
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-20 -left-20 w-[600px] h-[600px] text-white opacity-5 animate-spin-slower pointer-events-none z-0">
                <SunStamp className="w-full h-full" />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10 w-full">

                <div className="text-center mb-24 reveal-on-scroll">
                    <h2 className="font-serif text-3xl md:text-5xl italic font-light text-sbh-charcoal mb-4 relative inline-block">
                        {t.services.title}
                        <span className="absolute -top-4 -right-6 text-white opacity-50 hidden md:block">
                            <NorthStar className="w-6 h-6" />
                        </span>
                    </h2>
                    <div className="w-px h-16 bg-sbh-charcoal/20 mx-auto mt-8"></div>
                </div>

                {/* Interactive List Layout */}
                <div className="space-y-8 md:space-y-6" onMouseLeave={() => setHoveredIndex(null)}>
                    {serviceKeys.map((key, index) => {
                        const serviceInfo = getServiceInfo(key);
                        return (
                            <Link
                                key={key}
                                href={`/conciergerie#${key}`}
                                className="group flex flex-col md:flex-row items-start md:items-center justify-between border-b border-sbh-charcoal/10 pb-8 md:pb-6 transition-all duration-300 relative cursor-pointer block"
                                onMouseEnter={() => setHoveredIndex(index)}
                            >
                                <div className="flex items-baseline gap-6 md:gap-8 mb-4 md:mb-0">
                                    <span className={`font-sans text-xs tracking-widest px-3 py-1 rounded-full transition-colors duration-300 ${hoveredIndex === index ? 'bg-sbh-charcoal text-white' : 'bg-sbh-charcoal/5 text-sbh-charcoal'}`}>
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                    <h3 className={`font-serif text-2xl md:text-3xl font-light transition-all duration-500 ${hoveredIndex === index ? 'md:translate-x-4 md:text-white md:drop-shadow-md' : 'text-sbh-charcoal'}`}>
                                        {serviceInfo.title}
                                    </h3>
                                </div>

                                <div className="flex items-center gap-4 pl-12 md:pl-0">
                                    <p className={`font-sans text-xs md:text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${hoveredIndex === index ? 'md:text-white' : 'text-sbh-charcoal/70'}`}>
                                        {serviceInfo.desc}
                                    </p>
                                    <span className={`transition-all duration-300 hidden md:block ${hoveredIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                        <NorthStar className="w-3 h-3 text-white" />
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>

                <div className="mt-24 text-center">
                    <p className="font-serif italic text-2xl text-sbh-charcoal/80 mb-10">
                        {t.services.quote}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link
                            href="/conciergerie"
                            className="px-10 py-4 bg-sbh-charcoal text-white rounded-full font-sans text-sm uppercase tracking-[0.25em] hover:bg-white hover:text-sbh-charcoal transition-all duration-500 relative overflow-hidden group touch-target inline-block shadow-lg hover:shadow-xl"
                        >
                            <span className="relative z-10">{t.collections.discover}</span>
                        </Link>
                        <Link
                            href="/contact"
                            className="px-10 py-4 border border-sbh-charcoal/30 rounded-full font-sans text-sm uppercase tracking-[0.25em] hover:bg-sbh-charcoal hover:text-white hover:border-sbh-charcoal transition-all duration-500 bg-transparent relative overflow-hidden group touch-target inline-block"
                        >
                            <span className="relative z-10">{t.services.contactButton}</span>
                        </Link>
                    </div>
                </div>

            </div>
        </section>
    );
};