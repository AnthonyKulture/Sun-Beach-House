'use client';

import React from 'react';
import { Logo } from './Logo';
import { Instagram, Facebook, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';
import { SunStamp } from './Decorations';
import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';

export const Footer: React.FC = () => {
    const { t } = useLanguage();

    return (
        <footer className="bg-sbh-darkgreen text-sbh-cream relative overflow-hidden pt-24 pb-12">

            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 p-0 pointer-events-none opacity-[0.03] -translate-y-1/2 translate-x-1/4 select-none">
                <SunStamp className="w-[600px] h-[600px] text-sbh-sand" />
            </div>

            <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">

                {/* Main Grid: Mobile (1 col), Tablet (2 cols), Desktop (4 cols) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-24">

                    {/* Column 1: Brand Identity - Centered on Mobile */}
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-8 reveal-on-scroll">
                        <Link
                            href="/"
                            className="hover:opacity-80 transition-opacity w-full flex justify-center md:justify-start"
                            aria-label="Retour à l'accueil"
                        >
                            <Logo className="text-sbh-cream h-48 md:h-24 w-auto" />
                        </Link>
                        <p className="font-sans text-base md:text-lg font-light leading-relaxed text-sbh-green/80 max-w-sm text-balance mx-auto md:mx-0">
                            L&apos;art de vivre à Saint-Barthélemy. <br />
                            Une collection de villas d&apos;exception et un service de conciergerie sur-mesure par Valérie.
                        </p>
                        <div className="flex gap-4 pt-2 justify-center md:justify-start">
                            <a href="#" aria-label="Suivez-nous sur Instagram" className="p-3 rounded-full border border-sbh-green/20 text-sbh-green hover:border-sbh-cream hover:text-sbh-cream hover:bg-white/5 transition-all duration-300 group touch-target">
                                <Instagram size={20} strokeWidth={1.5} />
                            </a>
                            <a href="#" aria-label="Suivez-nous sur Facebook" className="p-3 rounded-full border border-sbh-green/20 text-sbh-green hover:border-sbh-cream hover:text-sbh-cream hover:bg-white/5 transition-all duration-300 group touch-target">
                                <Facebook size={20} strokeWidth={1.5} />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Navigation */}
                    <div className="reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                        <h4 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-sbh-sand mb-8 text-center md:text-left">{t.footer.explore}</h4>
                        <nav>
                            <ul className="space-y-4 font-serif text-lg md:text-xl text-sbh-cream/90 flex flex-col items-center md:items-start">
                                <li>
                                    <Link href="/" className="hover:text-sbh-blue hover:translate-x-2 transition-all duration-300 flex items-center gap-2">
                                        {t.footer.home}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/rentals" className="hover:text-sbh-blue hover:translate-x-2 transition-all duration-300 flex items-center gap-2">
                                        {t.footer.ourCollections}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/destinations" className="hover:text-sbh-blue hover:translate-x-2 transition-all duration-300 flex items-center gap-2">
                                        {t.footer.destination}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="hover:text-sbh-blue hover:translate-x-2 transition-all duration-300 flex items-center gap-2">
                                        {t.footer.about}
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:text-sbh-blue hover:translate-x-2 transition-all duration-300 flex items-center gap-2">
                                        {t.footer.contact}
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                        <h4 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-sbh-sand mb-8 text-center md:text-left">{t.footer.findUs}</h4>
                        <ul className="space-y-6 font-sans text-base font-light text-sbh-green/80 flex flex-col items-center md:items-start">
                            <li className="flex items-start gap-4 group">
                                <div className="mt-1 text-sbh-green group-hover:text-sbh-cream transition-colors duration-300 shrink-0">
                                    <MapPin size={20} strokeWidth={1.5} />
                                </div>
                                <span className="leading-relaxed group-hover:text-sbh-cream transition-colors duration-300 text-left">
                                    Gustavia Harbor<br />
                                    Rue de la République<br />
                                    97133 Saint-Barthélemy
                                </span>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="text-sbh-green group-hover:text-sbh-cream transition-colors duration-300 shrink-0">
                                    <Phone size={20} strokeWidth={1.5} />
                                </div>
                                <a href="tel:+590690000000" className="hover:text-sbh-cream transition-colors duration-300 tracking-wide">
                                    +590 690 00 00 00
                                </a>
                            </li>
                            <li className="flex items-center gap-4 group">
                                <div className="text-sbh-green group-hover:text-sbh-cream transition-colors duration-300 shrink-0">
                                    <Mail size={20} strokeWidth={1.5} />
                                </div>
                                <a href="mailto:hello@sunbeachhouse.com" className="hover:text-sbh-cream transition-colors duration-300 tracking-wide">
                                    hello@sunbeachhouse.com
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 4: Newsletter */}
                    <div className="flex flex-col items-center md:items-start reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
                        <h4 className="font-sans text-sm font-bold uppercase tracking-[0.2em] text-sbh-sand mb-8 text-center md:text-left">{t.footer.newsletter}</h4>
                        <p className="font-sans text-base text-sbh-green/80 mb-8 leading-relaxed text-center md:text-left">
                            {t.footer.newsletterSubtitle}
                        </p>
                        <form className="relative group max-w-sm w-full" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder={t.footer.emailPlaceholder}
                                className="w-full bg-white/5 border border-sbh-green/20 rounded-sm py-4 px-4 text-sbh-cream placeholder:text-sbh-green/30 outline-none focus:border-sbh-sand focus:bg-white/10 transition-all duration-300 font-sans text-sm tracking-wide"
                                aria-label="Adresse email pour la newsletter"
                            />
                            <button
                                type="submit"
                                aria-label="S'inscrire"
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-sbh-green hover:text-white p-2 transition-all duration-300"
                            >
                                <ArrowRight size={20} strokeWidth={1.5} />
                            </button>
                        </form>
                    </div>

                </div>

                {/* Footer Bottom */}
                <div className="border-t border-sbh-green/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left reveal-on-scroll" style={{ transitionDelay: '400ms' }}>
                    <div className="flex flex-col gap-2">
                        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-sbh-green/50">
                            {t.footer.rights}
                        </p>
                        <p className="font-sans text-[10px] tracking-widest text-sbh-green/30 hover:text-sbh-green/60 transition-colors flex items-center justify-center md:justify-start gap-1">
                            {t.footer.madeWith} <Heart size={10} fill="currentColor" className="text-sbh-terracotta/80" /> by <a href="https://www.kulturecom.fr" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Anthony PROFIT - www.kulturecom.fr</a>
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-8 font-sans text-[10px] uppercase tracking-[0.2em] text-sbh-green/50">
                        <a href="#" className="hover:text-sbh-sand transition-colors duration-300">{t.footer.legalNotice}</a>
                        <a href="#" className="hover:text-sbh-sand transition-colors duration-300">{t.footer.privacy}</a>
                        <a href="#" className="hover:text-sbh-sand transition-colors duration-300">CGV</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};