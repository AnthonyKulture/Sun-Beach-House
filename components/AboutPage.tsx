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
            <div className="relative h-[60vh] w-full overflow-hidden mb-16">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://storage.googleapis.com/images-sbh/besoin-d-une-image-r-alistes-cin-matique-pour-la-s.jpg')" }}
                ></div>
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                    <h1 className="font-serif text-5xl md:text-8xl italic drop-shadow-xl">{t.aboutPage.title}</h1>
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute top-[80vh] left-0 w-full opacity-20 pointer-events-none text-sbh-green/30">
                <OrganicLine className="w-full h-auto" />
            </div>

            {/* INTRO & HISTORY SECTION - Split Layout */}
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 mb-32 items-start">

                {/* Left: Portrait Image */}
                <div className="md:col-span-5 relative md:sticky md:top-32">
                    <div className="aspect-[3/4] overflow-hidden rounded-sm relative z-10 shadow-xl shadow-sbh-green/10">
                        <Image
                            src="https://images.unsplash.com/photo-1573599971936-8a79854743c6?q=80&w=1200&auto=format&fit=crop"
                            alt="Valérie - Founder"
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s]"
                        />
                        <div className="absolute inset-0 ring-1 ring-inset ring-white/10"></div>
                    </div>
                    <div className="absolute -bottom-6 -left-6 w-full h-full border border-sbh-charcoal/5 z-0 hidden md:block"></div>
                </div>

                {/* Right: Narrative Text */}
                <div className="md:col-span-7 space-y-12 font-sans font-light text-lg leading-relaxed text-sbh-charcoal/90 text-justify relative z-20">

                    {/* Intro */}
                    <div className="space-y-6">
                        <h2 className="font-serif text-3xl italic text-sbh-charcoal mb-8">
                            Sun Beach House.
                        </h2>
                        <p className="font-serif text-2xl italic text-sbh-charcoal">
                            {t.aboutPage.intro.greeting}
                        </p>
                        <p>
                            {t.aboutPage.intro.p1}
                        </p>
                    </div>

                    {/* The Story */}
                    <div className="space-y-6 relative">
                        <div className="absolute -left-8 top-0 text-sbh-green/20 -z-10 hidden md:block">
                            <NorthStar className="w-12 h-12" />
                        </div>
                        <p>
                            {t.aboutPage.story.p1}
                        </p>
                        <p>
                            {t.aboutPage.story.p2}
                        </p>
                        <p>
                            {t.aboutPage.story.p3}
                        </p>
                    </div>

                    {/* The Return */}
                    <div className="space-y-6 border-l-2 border-sbh-green/20 pl-6">
                        <p>
                            {t.aboutPage.return.p1}
                        </p>
                        <p>
                            {t.aboutPage.return.p2}
                        </p>
                        <p>
                            {t.aboutPage.return.p3}
                        </p>
                    </div>
                </div>
            </div>

            {/* PHILOSOPHY SECTION - Centered Visual Block */}
            <div className="bg-white py-24 md:py-32 relative overflow-hidden mb-24">
                <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                    <PalmLeaf className="w-96 h-96 text-sbh-charcoal" />
                </div>

                <div className="max-w-[900px] mx-auto px-6 text-center relative z-10">
                    <h3 className="font-serif text-3xl md:text-5xl italic text-sbh-charcoal mb-12 leading-tight">
                        &ldquo;{t.aboutPage.philosophy.quote.split('.')[0]}. <br />
                        <span className="text-sbh-green">{t.aboutPage.philosophy.quote.split('.')[1]}.</span>&rdquo;
                    </h3>

                    <div className="font-sans font-light text-lg leading-relaxed text-gray-600 space-y-8 mb-16">
                        <p>
                            {t.aboutPage.philosophy.intro}
                        </p>
                        <ul className="flex flex-col md:flex-row justify-center gap-6 md:gap-12 font-serif italic text-xl text-sbh-charcoal">
                            <li className="flex items-center gap-2 justify-center"><NorthStar className="w-4 h-4 text-sbh-green" /> {t.aboutPage.philosophy.list1}</li>
                            <li className="flex items-center gap-2 justify-center"><NorthStar className="w-4 h-4 text-sbh-green" /> {t.aboutPage.philosophy.list2}</li>
                            <li className="flex items-center gap-2 justify-center"><NorthStar className="w-4 h-4 text-sbh-green" /> {t.aboutPage.philosophy.list3}</li>
                        </ul>
                        <p className="max-w-2xl mx-auto pt-8">
                            {t.aboutPage.philosophy.details}
                        </p>
                    </div>

                    <div className="w-16 h-px bg-sbh-charcoal/20 mx-auto mb-12"></div>

                    <div className="space-y-6">
                        <h4 className="font-serif text-2xl text-sbh-charcoal">{t.aboutPage.philosophy.whyTitle}</h4>
                        <p className="font-sans text-lg text-gray-600">
                            {t.aboutPage.philosophy.whyP1.split('.')[0]}. <br />
                            <strong className="text-sbh-charcoal font-medium">{t.aboutPage.philosophy.whyP1.split('.')[1]}.</strong>
                        </p>
                        <p className="font-sans text-gray-600 max-w-2xl mx-auto">
                            {t.aboutPage.philosophy.whyP2}
                        </p>
                    </div>
                </div>
            </div>

            {/* THE SECRET PROJECT - Distinct Visual Section */}
            <div className="max-w-[1000px] mx-auto px-6 mb-32 relative">
                <div className="bg-sbh-green/10 p-10 md:p-20 rounded-sm relative overflow-hidden">
                    {/* Decorative background within box */}
                    <div className="absolute -top-20 -left-20 opacity-10 text-sbh-green">
                        <SunStamp className="w-64 h-64" />
                    </div>

                    <div className="relative z-10 text-center">
                        <span className="font-sans text-xs uppercase tracking-[0.3em] text-sbh-charcoal/60 mb-6 block">
                            {t.aboutPage.secret.label}
                        </span>
                        <h3 className="font-serif text-3xl md:text-4xl italic text-sbh-charcoal mb-8">
                            {t.aboutPage.secret.title}
                        </h3>
                        <div className="font-sans font-light text-lg text-sbh-charcoal/80 space-y-6 leading-relaxed max-w-2xl mx-auto">
                            <p>
                                {t.aboutPage.secret.p1}
                            </p>
                            <p>
                                {t.aboutPage.secret.p2}
                            </p>
                            <p className="italic font-serif text-xl pt-4">
                                &ldquo;{t.aboutPage.secret.quote}&rdquo;
                            </p>
                            <p className="text-sm uppercase tracking-widest pt-4 opacity-70">
                                {t.aboutPage.secret.closing}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONCLUSION & SIGNATURE */}
            <div className="max-w-[800px] mx-auto px-6 text-center mb-24">
                <h3 className="font-serif text-3xl md:text-5xl text-sbh-charcoal mb-8 leading-tight">
                    &ldquo;{t.aboutPage.conclusion.quote.split('.')[0]}. <br />
                    <span className="italic text-gray-400 text-2xl md:text-4xl">{t.aboutPage.conclusion.quote.split('.')[1]}.&rdquo;</span>
                </h3>
                <p className="font-sans text-lg text-gray-600 mb-12">
                    {t.aboutPage.conclusion.text}
                </p>

                <div className="flex flex-col items-center gap-2">
                    <span className="font-serif text-2xl italic text-sbh-charcoal">{t.about.welcome}</span>
                    <p className="font-signature text-7xl md:text-8xl text-sbh-charcoal/80 -rotate-6 py-4">Valérie</p>
                    <span className="text-[10px] uppercase tracking-widest text-gray-400">{t.about.founder}</span>
                </div>
            </div>

        </div>
    );
};