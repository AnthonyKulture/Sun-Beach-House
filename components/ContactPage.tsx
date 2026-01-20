'use client';
import React, { useEffect } from 'react';
import { Mail, Phone, ArrowRight, Instagram, Linkedin } from 'lucide-react';
import { HoneypotField } from './HoneypotField';
import { EncryptedLink } from './EncryptedLink';
import { useLanguage } from '../contexts/LanguageContext';
import Image from 'next/image';

export const ContactPage: React.FC = () => {
    const { t } = useLanguage();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-white min-h-screen animate-fade-in relative z-10">

            <div className="flex flex-col lg:flex-row min-h-screen">

                {/* LEFT COLUMN: FORM */}
                <div className="lg:w-7/12 w-full px-6 md:px-12 lg:px-24 xl:px-32 pt-32 pb-12 lg:pt-48 lg:pb-32 flex flex-col justify-center order-2 lg:order-1 bg-white relative z-10">
                    <h1 className="font-serif text-4xl md:text-6xl italic text-sbh-charcoal mb-4">{t.contact.title}</h1>
                    <p className="font-sans text-sm text-gray-500 uppercase tracking-widest mb-12">
                        Un projet de vacances ou Conciergerie Luxe ?
                    </p>

                    <form className="space-y-12 max-w-xl" onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const honeypot = formData.get('confirm_website_url');
                        // Simple spam check: if honeypot is filled, do nothing (or pretend to succeed)
                        if (honeypot) {
                            console.log('Spam detected');
                            return;
                        }
                        // Continue with submission...
                        console.log('Form submitted');
                    }}>
                        {/* Security Field - Bot Trap */}
                        <HoneypotField />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="group relative">
                                <input name="name" type="text" placeholder=" " className="peer w-full border-b border-gray-300 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg" required />
                                <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                                    {t.contact.name}
                                </label>
                            </div>
                            <div className="group relative">
                                <input name="firstname" type="text" placeholder=" " className="peer w-full border-b border-gray-300 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg" />
                                <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                                    Prénom
                                </label>
                            </div>
                        </div>

                        <div className="group relative">
                            <input name="email" type="email" placeholder=" " className="peer w-full border-b border-gray-300 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg" required />
                            <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                                {t.contact.email}
                            </label>
                        </div>

                        <div className="group relative">
                            <textarea name="message" rows={4} placeholder=" " className="peer w-full border-b border-gray-300 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg resize-none" required></textarea>
                            <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                                {t.contact.message}
                            </label>
                        </div>

                        <div className="pt-8">
                            <button className="group flex items-center gap-4 text-sbh-charcoal font-sans text-xs uppercase tracking-[0.25em] font-bold hover:text-sbh-green transition-colors">
                                {t.contact.send}
                                <span className="p-2 rounded-full border border-sbh-charcoal/30 group-hover:border-sbh-green group-hover:bg-sbh-green group-hover:text-white transition-all">
                                    <ArrowRight size={16} />
                                </span>
                            </button>
                        </div>

                    </form>
                </div>

                {/* RIGHT COLUMN: INFO & VISUALS */}
                <div className="lg:w-5/12 w-full flex flex-col order-1 lg:order-2 h-auto lg:min-h-screen">

                    {/* Upper Visual */}
                    <div className="h-64 lg:h-1/2 relative overflow-hidden">
                        <Image
                            src="https://storage.googleapis.com/images-sbh/f7f7fd16-3e6c-43e6-93fd-b13f74bf9418.jpg"
                            alt="Atmosphere St Barth"
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover grayscale hover:grayscale-0 transition-all duration-[2s]"
                        />
                        <div className="absolute inset-0 bg-sbh-green/20 mix-blend-multiply"></div>

                        {/* Gradient Overlay for Navbar Visibility */}
                        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/90 via-white/50 to-transparent z-10 pointer-events-none"></div>
                    </div>

                    {/* Lower Info - Sage Green Block */}
                    <div className="flex-1 lg:h-1/2 bg-sbh-green text-sbh-charcoal p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden">
                        {/* Map texture background */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Saint_Barthelemy_map-fr.svg/1200px-Saint_Barthelemy_map-fr.svg.png')] bg-cover bg-center grayscale mix-blend-overlay"></div>

                        <div className="relative z-10 space-y-10">
                            <div>
                                <h3 className="font-serif text-2xl italic mb-4 text-sbh-charcoal">{t.contact.companyTitle}</h3>
                                <p className="font-sans text-sm leading-relaxed opacity-80 text-sbh-charcoal">
                                    65 RUE DE LA PAIX GUSTAVIA<br />
                                    97133 SAINT BARTHELEMY
                                </p>
                            </div>

                            <div>
                                <h3 className="font-serif text-2xl italic mb-4 text-sbh-charcoal">{t.contact.privateContact}</h3>
                                <ul className="space-y-3 font-sans text-sm opacity-80 text-sbh-charcoal">
                                    <li className="flex items-center gap-4">
                                        <Phone size={16} />
                                        <EncryptedLink type="phone" value="+590690634725" text="+590 690 63 47 25" className="hover:text-white transition-colors" />
                                    </li>
                                    <li className="flex items-center gap-4">
                                        <Mail size={16} />
                                        <EncryptedLink type="email" value="valerie@sun-beach-house.com" text="valerie@sun-beach-house.com" className="hover:text-white transition-colors" />
                                    </li>
                                </ul>
                            </div>

                            <div className="flex gap-6 pt-4">
                                <a href="https://www.instagram.com/sun.beach.house" target="_blank" rel="noopener noreferrer" className="p-3 border border-sbh-charcoal/20 rounded-full hover:bg-sbh-charcoal hover:text-white transition-all text-sbh-charcoal">
                                    <Instagram size={20} />
                                </a>
                                <a href="https://www.linkedin.com/company/sun-beach-house" target="_blank" rel="noopener noreferrer" className="p-3 border border-sbh-charcoal/20 rounded-full hover:bg-sbh-charcoal hover:text-white transition-all text-sbh-charcoal">
                                    <Linkedin size={20} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};