'use client';
import React, { useEffect } from 'react';
import { SunStamp, PalmLeaf, NorthStar, OrganicLine } from './Decorations';
import { useLanguage } from '../contexts/LanguageContext';
import Image from 'next/image';

export const AboutPage: React.FC = () => {
    const { t } = useLanguage();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-sbh-cream min-h-screen animate-fade-in pb-24 text-sbh-charcoal relative overflow-hidden">

            {/* HERO SECTION */}
            <div className="relative h-[75vh] xl:h-[60vh] w-full overflow-hidden mb-20">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/images/optimized-esprit-hero.jpg')" }}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-x-0 bottom-0 top-32 xl:top-0 flex flex-col items-center justify-center text-white z-10 px-6">
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl xl:text-8xl italic drop-shadow-xl">
                        {t.aboutPage.title}
                    </h1>
                </div>
            </div>

            {/* Background décoration */}
            <div className="absolute top-[80vh] left-0 w-full opacity-20 pointer-events-none text-sbh-green/30">
                <OrganicLine className="w-full h-auto" />
            </div>

            {/* ===== SECTION 1 : INTRO + PORTRAIT ===== */}
            <div className="max-w-[1100px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-20 mb-24 items-start">

                {/* Portrait collé en sticky */}
                <div className="md:col-span-4 relative md:sticky md:top-28">
                    <div className="aspect-[3/4] overflow-hidden rounded-sm relative z-10 shadow-xl shadow-sbh-green/10">
                        <Image
                            src="/images/valerie-founder.jpg"
                            alt="Valérie - Fondatrice de Sun Beach House"
                            fill
                            sizes="(max-width: 768px) 100vw, 35vw"
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s]"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-full h-full border border-sbh-charcoal/5 z-0 hidden md:block" />
                </div>

                {/* Texte narratif */}
                <div className="md:col-span-8 relative z-20">

                    {/* — Accroche — */}
                    <div className="mb-8 pb-8 border-b border-sbh-charcoal/10">
                        <h2 className="font-serif text-2xl md:text-3xl italic text-sbh-charcoal mb-3">
                            Sun Beach House.
                        </h2>
                        <p className="font-serif text-lg italic text-sbh-charcoal/80 mb-4">
                            {t.aboutPage.intro.greeting}
                        </p>
                        <p className="font-sans font-light text-base leading-7 text-sbh-charcoal/80 text-justify">
                            {t.aboutPage.intro.p1}
                        </p>
                    </div>

                    {/* — Histoire — */}
                    <div className="mb-8 pb-8 border-b border-sbh-charcoal/10 space-y-4">
                        <p className="font-sans font-light text-base leading-7 text-sbh-charcoal/80 text-justify">
                            {t.aboutPage.story.p1}
                        </p>
                        <p className="font-sans font-light text-base leading-7 text-sbh-charcoal/80 text-justify">
                            {t.aboutPage.story.p2}
                        </p>
                        <p className="font-sans font-light text-base leading-7 text-sbh-charcoal/80 text-justify">
                            {t.aboutPage.story.p3}
                        </p>
                    </div>

                    {/* — Retour — */}
                    <div className="space-y-4 pl-4 border-l-2 border-sbh-green/30">
                        <p className="font-sans font-light text-base leading-7 text-sbh-charcoal/80 text-justify">
                            {t.aboutPage.return.p1}
                        </p>
                        <p className="font-sans font-light text-base leading-7 text-sbh-charcoal/80 text-justify">
                            {t.aboutPage.return.p2}
                        </p>
                        <p className="font-sans font-light text-base leading-7 text-sbh-charcoal/80 text-justify">
                            {t.aboutPage.return.p3}
                        </p>
                    </div>
                </div>
            </div>

            {/* ===== SECTION 2 : PHILOSOPHIE ===== */}
            <div className="bg-white py-20 md:py-28 relative overflow-hidden mb-20">
                <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                    <PalmLeaf className="w-96 h-96 text-sbh-charcoal" />
                </div>

                <div className="max-w-[800px] mx-auto px-6 text-center relative z-10">

                    {/* Citation principale */}
                    <p className="font-serif text-xl md:text-3xl italic text-sbh-charcoal mb-10 leading-snug">
                        &ldquo;{t.aboutPage.philosophy.quote}&rdquo;
                    </p>

                    {/* Intro + liste */}
                    <p className="font-sans font-light text-base text-gray-500 mb-6">
                        {t.aboutPage.philosophy.intro}
                    </p>
                    <ul className="flex flex-col md:flex-row justify-center gap-3 md:gap-8 font-serif italic text-base text-sbh-charcoal mb-8">
                        <li className="flex items-center gap-2 justify-center">
                            <NorthStar className="w-3.5 h-3.5 text-sbh-green flex-shrink-0" />
                            {t.aboutPage.philosophy.list1}
                        </li>
                        <li className="flex items-center gap-2 justify-center">
                            <NorthStar className="w-3.5 h-3.5 text-sbh-green flex-shrink-0" />
                            {t.aboutPage.philosophy.list2}
                        </li>
                        <li className="flex items-center gap-2 justify-center">
                            <NorthStar className="w-3.5 h-3.5 text-sbh-green flex-shrink-0" />
                            {t.aboutPage.philosophy.list3}
                        </li>
                    </ul>

                    <p className="font-sans font-light text-base text-gray-500 leading-7 max-w-2xl mx-auto mb-10 text-justify">
                        {t.aboutPage.philosophy.details}
                    </p>

                    <div className="w-12 h-px bg-sbh-charcoal/15 mx-auto mb-10" />

                    {/* Pourquoi SBH */}
                    <h4 className="font-serif text-xl italic text-sbh-charcoal mb-4">
                        {t.aboutPage.philosophy.whyTitle}
                    </h4>
                    <p className="font-sans text-base font-light text-gray-500 leading-7 mb-4">
                        {t.aboutPage.philosophy.whyP1}
                    </p>
                    <p className="font-sans text-base font-light text-gray-500 leading-7 max-w-2xl mx-auto">
                        {t.aboutPage.philosophy.whyP2}
                    </p>
                </div>
            </div>

            {/* ===== SECTION 3 : LE SECRET ===== */}
            <div className="max-w-[900px] mx-auto px-6 mb-24 relative">
                <div className="bg-sbh-green/8 border border-sbh-green/15 p-10 md:p-16 rounded-sm relative overflow-hidden">
                    <div className="absolute -top-16 -left-16 opacity-10 text-sbh-green">
                        <SunStamp className="w-48 h-48" />
                    </div>

                    <div className="relative z-10 text-center max-w-xl mx-auto">
                        <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-sbh-charcoal/40 mb-4 block">
                            {t.aboutPage.secret.label}
                        </span>
                        <h3 className="font-serif text-2xl md:text-3xl italic text-sbh-charcoal mb-6">
                            {t.aboutPage.secret.title}
                        </h3>
                        <div className="font-sans font-light text-base text-sbh-charcoal/70 space-y-4 leading-7">
                            <p>{t.aboutPage.secret.p1}</p>
                            <p>{t.aboutPage.secret.p2}</p>
                            <p className="italic font-serif text-lg pt-2">
                                &ldquo;{t.aboutPage.secret.quote}&rdquo;
                            </p>
                            <p className="text-xs uppercase tracking-widest pt-2 opacity-60">
                                {t.aboutPage.secret.closing}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ===== SECTION 4 : CONCLUSION + SIGNATURE ===== */}
            <div className="max-w-[700px] mx-auto px-6 text-center mb-20">
                <p className="font-serif text-2xl md:text-4xl italic text-sbh-charcoal mb-6 leading-snug">
                    &ldquo;{t.aboutPage.conclusion.quote}&rdquo;
                </p>
                <p className="font-sans font-light text-base text-gray-500 leading-7 mb-10">
                    {t.aboutPage.conclusion.text}
                </p>

                <div className="flex flex-col items-center gap-1">
                    <span className="font-serif text-xl italic text-sbh-charcoal">{t.about.welcome}</span>
                    <p className="font-signature text-7xl md:text-8xl text-sbh-charcoal/70 -rotate-6 py-3">Valérie</p>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400">{t.about.founder}</span>
                </div>
            </div>

        </div>
    );
};