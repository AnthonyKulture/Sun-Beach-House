'use client';

import React, { useState } from 'react';
import { SunStamp, NorthStar } from './Decorations';
import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';

const services = [
    {
        title: "Chefs à Domicile",
        desc: "Gastronomie sur mesure en villa",
        img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop"
    },
    {
        title: "Bien-être & Spa",
        desc: "Soins et massages privés",
        img: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=1600&auto=format&fit=crop"
    },
    {
        title: "Transferts & Chauffeur",
        desc: "Organisation de vos déplacements",
        img: "https://images.unsplash.com/photo-1562141993-9c8cb8519c5c?q=80&w=1600&auto=format&fit=crop"
    },
    {
        title: "Réservations",
        desc: "Accès aux meilleurs restaurants",
        img: "https://images.unsplash.com/photo-1550966871-3ed3c47e2ce2?q=80&w=1600&auto=format&fit=crop"
    },
    {
        title: "Activités Nautiques",
        desc: "Yachting et découverte de l'île",
        img: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?q=80&w=1600&auto=format&fit=crop"
    }
];

export const Services: React.FC = () => {
    const { t } = useLanguage();
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section id="services" className="bg-sbh-green py-24 md:py-32 px-6 md:px-12 text-sbh-charcoal relative overflow-hidden min-h-[90vh] flex flex-col justify-center">

            {/* Dynamic Background Image on Hover */}
            <div className="absolute inset-0 z-0 transition-opacity duration-700 ease-in-out pointer-events-none mix-blend-overlay opacity-20">
                {services.map((service, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url('${service.img}')` }}
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
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="group flex flex-col md:flex-row items-start md:items-center justify-between border-b border-sbh-charcoal/10 pb-8 md:pb-6 transition-all duration-300 relative cursor-pointer"
                            onMouseEnter={() => setHoveredIndex(index)}
                        >
                            <div className="flex items-baseline gap-6 md:gap-8 mb-4 md:mb-0">
                                <span className={`font-sans text-xs tracking-widest px-3 py-1 rounded-full transition-colors duration-300 ${hoveredIndex === index ? 'bg-sbh-charcoal text-white' : 'bg-sbh-charcoal/5 text-sbh-charcoal'}`}>
                                    0{index + 1}
                                </span>
                                <h3 className={`font-serif text-2xl md:text-3xl font-light transition-all duration-500 ${hoveredIndex === index ? 'md:translate-x-4 md:text-white md:drop-shadow-md' : 'text-sbh-charcoal'}`}>
                                    {index === 0 ? t.services.chef.title : index === 1 ? t.services.spa.title : index === 2 ? t.services.transfer.title : index === 3 ? t.services.reservations.title : t.services.nautical.title}
                                </h3>
                            </div>

                            <div className="flex items-center gap-4 pl-12 md:pl-0">
                                <p className={`font-sans text-xs md:text-sm tracking-[0.2em] uppercase transition-colors duration-300 ${hoveredIndex === index ? 'md:text-white' : 'text-sbh-charcoal/70'}`}>
                                    {index === 0 ? t.services.chef.desc : index === 1 ? t.services.spa.desc : index === 2 ? t.services.transfer.desc : index === 3 ? t.services.reservations.desc : t.services.nautical.desc}
                                </p>
                                <span className={`transition-all duration-300 hidden md:block ${hoveredIndex === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                                    <NorthStar className="w-3 h-3 text-white" />
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-24 text-center">
                    <p className="font-serif italic text-2xl text-sbh-charcoal/80 mb-10">
                        {t.services.quote}
                    </p>
                    <Link
                        href="/contact"
                        className="px-10 py-4 border border-sbh-charcoal/30 rounded-full font-sans text-sm uppercase tracking-[0.25em] hover:bg-sbh-charcoal hover:text-white hover:border-sbh-charcoal transition-all duration-500 bg-transparent relative overflow-hidden group touch-target inline-block"
                    >
                        <span className="relative z-10">{t.services.contactButton}</span>
                    </Link>
                </div>

            </div>
        </section>
    );
};