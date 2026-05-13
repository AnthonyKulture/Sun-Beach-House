'use client';

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

export const HomepageIntro: React.FC = () => {
    const { t } = useLanguage();

    return (
        <section className="bg-sbh-cream py-20 md:py-28 px-6 md:px-12 text-sbh-charcoal">
            <div className="max-w-[900px] mx-auto text-center">
                <p className="font-sans text-[10px] md:text-xs tracking-[0.4em] uppercase text-sbh-stone mb-6">
                    {t.homepageIntro.eyebrow}
                </p>
                <h2 className="font-serif text-2xl md:text-4xl italic leading-tight mb-10 reveal-on-scroll">
                    {t.homepageIntro.h2}
                </h2>
                <p className="font-sans font-light text-base md:text-lg text-sbh-charcoal/80 leading-relaxed text-balance reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                    {t.homepageIntro.body}
                </p>
            </div>
        </section>
    );
};
