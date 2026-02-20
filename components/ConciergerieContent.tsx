'use client';

import React from 'react';
import { SunStamp, NorthStar } from './Decorations';
import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';

const serviceImages = {
    chef: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=2000&auto=format&fit=crop',
    spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=2000&auto=format&fit=crop',
    transfer: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000&auto=format&fit=crop',
    reservations: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000&auto=format&fit=crop',
    nautical: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=2000&auto=format&fit=crop',
    travel: 'https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?q=80&w=2000&auto=format&fit=crop',
    vip: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop'
};

export const ConciergerieContent: React.FC = () => {
    const { t } = useLanguage();

    const services = ['chef', 'spa', 'transfer', 'reservations', 'nautical'] as const;



    return (
        <div className="bg-sbh-cream min-h-screen animate-fade-in pb-24 text-sbh-charcoal relative overflow-hidden">

            {/* HERO SECTION */}
            <div className="relative h-[80vh] xl:h-[70vh] w-full overflow-hidden mb-16">
                <Image
                    src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2000&auto=format&fit=crop"
                    alt="Conciergerie Service"
                    fill
                    sizes="100vw"
                    priority
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-sbh-cream"></div>
                <div className="absolute inset-x-0 bottom-0 top-32 xl:top-0 flex flex-col items-center justify-center text-white z-10 px-6">
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic drop-shadow-xl text-center mb-4 leading-tight max-w-5xl">
                        {t.conciergeriePage.title}
                    </h1>
                    <p className="font-sans text-base sm:text-lg md:text-xl lg:text-2xl tracking-wide text-center max-w-3xl opacity-90 px-4">
                        {t.conciergeriePage.subtitle}
                    </p>
                </div>
            </div>

            {/* Decorative Element */}
            <div className="absolute top-[80vh] right-0 opacity-5 pointer-events-none">
                <SunStamp className="w-96 h-96 text-sbh-green" />
            </div>

            {/* INTRODUCTION */}
            <div className="max-w-[900px] mx-auto px-6 md:px-12 mb-24 text-center">
                <p className="font-sans text-lg md:text-xl leading-relaxed text-sbh-charcoal/80">
                    {t.conciergeriePage.intro}
                </p>
            </div>

            {/* SERVICES TITLE */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-16">
                <h2 className="font-serif text-4xl md:text-5xl italic text-sbh-charcoal text-center mb-4">
                    {t.conciergeriePage.servicesTitle}
                </h2>
                <div className="w-px h-16 bg-sbh-charcoal/20 mx-auto"></div>
            </div>

            {/* SERVICES LIST (First 5 services) */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 mb-32">
                <div className="space-y-6">
                    {services.map((serviceKey, index) => {
                        const service = t.conciergeriePage[serviceKey];

                        return (
                            <div
                                key={serviceKey}
                                id={serviceKey}
                                className="group bg-white rounded-sm shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden reveal-on-scroll"
                                style={{ transitionDelay: `${index * 50}ms` }}
                            >
                                {/* Image Header - Reduced height on mobile */}
                                <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                                    <Image
                                        src={serviceImages[serviceKey]}
                                        alt={service.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px"
                                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                    <div className="absolute top-4 left-4 sm:top-6 sm:left-6">
                                        <span className="font-sans text-xs tracking-widest px-3 py-1 rounded-full bg-sbh-green text-white">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>

                                {/* Content - Improved mobile readability */}
                                <div className="p-5 sm:p-6 md:p-8">
                                    <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-sbh-charcoal group-hover:text-sbh-green transition-colors duration-300 mb-2 sm:mb-3">
                                        {service.title}
                                    </h3>

                                    <p className="font-sans text-xs sm:text-sm md:text-base tracking-wide uppercase text-sbh-green font-medium mb-3 sm:mb-4">
                                        {service.shortDesc}
                                    </p>

                                    <p className="font-sans text-sm sm:text-base text-gray-700 leading-relaxed mb-4 sm:mb-5">
                                        {service.longDesc}
                                    </p>

                                    {/* Features - Better mobile display */}
                                    <ul className="border-t border-gray-100 pt-4 sm:pt-5 space-y-2 sm:space-y-2.5 grid grid-cols-1 sm:grid-cols-2 gap-x-6">
                                        {service.features && service.features.map((feature: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                                                <NorthStar className="w-3.5 h-3.5 sm:w-3 sm:h-3 text-sbh-green shrink-0 mt-0.5" />
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* PREMIUM SERVICES - Travel & VIP (Dedicated Sections) */}
            <div className="bg-sbh-green/5 py-16 md:py-24">
                <div className="max-w-[1200px] mx-auto px-6 md:px-12">
                    <h2 className="font-serif text-3xl md:text-4xl italic text-sbh-charcoal text-center mb-3">
                        Services Premium
                    </h2>
                    <p className="text-center text-sm md:text-base text-gray-600 mb-12 md:mb-16 max-w-2xl mx-auto">
                        Des prestations d&apos;exception pour une expérience de voyage sans égale
                    </p>

                    <div className="space-y-12 md:space-y-16">
                        {/* Travel Service */}
                        <div id="travel" className="bg-white rounded-sm overflow-hidden shadow-xl">
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Image */}
                                <div className="relative h-64 md:h-auto min-h-[300px]">
                                    <Image
                                        src={serviceImages.travel}
                                        alt="Travel Service"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-sbh-green text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-sans text-xs uppercase tracking-wider">
                                        06
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center">
                                    <h3 className="font-serif text-2xl md:text-3xl italic text-sbh-charcoal mb-2 md:mb-3">
                                        {t.conciergeriePage.travel.title}
                                    </h3>
                                    <p className="font-sans text-xs md:text-sm uppercase tracking-wider text-sbh-green mb-4 md:mb-6">
                                        {t.conciergeriePage.travel.shortDesc}
                                    </p>
                                    <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6">
                                        {t.conciergeriePage.travel.intro}
                                    </p>

                                    <h4 className="font-serif text-lg md:text-xl italic text-sbh-charcoal mb-3 md:mb-4">
                                        {t.conciergeriePage.travel.solutionsTitle}
                                    </h4>
                                    <ul className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                                        {t.conciergeriePage.travel.solutions.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm text-gray-700">
                                                <NorthStar className="w-3 h-3 md:w-4 md:h-4 text-sbh-green shrink-0 mt-0.5 md:mt-1" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <p className="text-xs text-gray-500 italic border-t border-gray-100 pt-4 md:pt-6">
                                        {t.conciergeriePage.travel.partnersNote}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* VIP Airport Service */}
                        <div id="vip" className="bg-white rounded-sm overflow-hidden shadow-xl">
                            <div className="grid md:grid-cols-2 gap-0">
                                {/* Content First on Desktop */}
                                <div className="p-6 md:p-8 lg:p-12 flex flex-col justify-center order-2 md:order-1">
                                    <h3 className="font-serif text-2xl md:text-3xl italic text-sbh-charcoal mb-2 md:mb-3">
                                        {t.conciergeriePage.vip.title}
                                    </h3>
                                    <p className="font-sans text-xs md:text-sm uppercase tracking-wider text-sbh-green mb-4 md:mb-6">
                                        {t.conciergeriePage.vip.shortDesc}
                                    </p>
                                    <p className="font-sans text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-6">
                                        {t.conciergeriePage.vip.intro}
                                    </p>

                                    <h4 className="font-serif text-base md:text-lg italic text-sbh-charcoal mb-2 md:mb-3">
                                        {t.conciergeriePage.vip.whyTitle}
                                    </h4>
                                    <ul className="space-y-1.5 md:space-y-2 mb-4 md:mb-6 grid grid-cols-1 gap-2 md:gap-3">
                                        {t.conciergeriePage.vip.whyItems.map((item: string, i: number) => (
                                            <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                                                <NorthStar className="w-3 h-3 text-sbh-green shrink-0 mt-0.5" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="bg-sbh-cream/30 p-3 md:p-4 rounded-sm">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 text-xs">
                                            <div>
                                                <h5 className="font-sans font-bold uppercase tracking-wider text-sbh-green mb-2">
                                                    {t.conciergeriePage.vip.arrivalTitle}
                                                </h5>
                                                <ul className="space-y-1 text-gray-600">
                                                    {t.conciergeriePage.vip.arrivalItems.slice(0, 3).map((item: string, i: number) => (
                                                        <li key={i} className="flex gap-1.5">
                                                            <span className="text-sbh-green">•</span> {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <div>
                                                <h5 className="font-sans font-bold uppercase tracking-wider text-sbh-green mb-2">
                                                    {t.conciergeriePage.vip.departureTitle}
                                                </h5>
                                                <ul className="space-y-1 text-gray-600">
                                                    {t.conciergeriePage.vip.departureItems.slice(0, 3).map((item: string, i: number) => (
                                                        <li key={i} className="flex gap-1.5">
                                                            <span className="text-sbh-green">•</span> {item}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <p className="text-xs text-gray-500 italic mt-4 md:mt-6">
                                        {t.conciergeriePage.vip.optionalNote}
                                    </p>
                                </div>

                                {/* Image */}
                                <div className="relative h-64 md:h-auto min-h-[300px] order-1 md:order-2">
                                    <Image
                                        src={serviceImages.vip}
                                        alt="VIP Airport Service"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-sbh-green text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-sans text-xs uppercase tracking-wider">
                                        07
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA SECTION */}
            <div className="max-w-[900px] mx-auto px-6 text-center my-16 md:my-24">
                <div className="bg-sbh-green/10 p-8 md:p-12 lg:p-16 rounded-sm relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 opacity-5">
                        <SunStamp className="w-48 h-48 text-sbh-charcoal" />
                    </div>
                    <div className="relative z-10">
                        <p className="font-serif text-xl md:text-2xl lg:text-3xl italic text-sbh-charcoal mb-6 md:mb-8">
                            &ldquo;{t.services.quote}&rdquo;
                        </p>
                        <Link
                            href="/contact"
                            className="inline-block px-8 md:px-10 py-3 md:py-4 bg-sbh-charcoal text-white font-sans text-xs md:text-sm uppercase tracking-[0.25em] hover:bg-sbh-green transition-all duration-500 rounded-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transform"
                        >
                            {t.conciergeriePage.cta}
                        </Link>
                    </div>
                </div>
            </div>

        </div>
    );
};
