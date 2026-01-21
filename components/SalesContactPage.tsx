'use client';
import React, { useState, useEffect } from 'react';
import { SalesInquiryParams } from '../types';
import { useVilla } from '../hooks/useCMS';
import { MapPin, ArrowRight, Check, BedDouble, Bath, Square, Mail } from 'lucide-react';
import { SunStamp } from './Decorations';
import { HoneypotField } from './HoneypotField';
import Image from 'next/image';

import { useSearchParams, useRouter } from 'next/navigation';

export const SalesContactPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const villaId = searchParams.get('villaId') || '';

  const onBack = () => router.back();
  const { villa, loading } = useVilla(villaId);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading || !villa) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-sbh-cream">
        <SunStamp className="w-16 h-16 text-sbh-green animate-spin-slower opacity-50" />
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Spam check
    const formData = new FormData(e.target as HTMLFormElement);
    if (formData.get('confirm_sales_inquiry')) return;

    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-sbh-cream flex flex-col items-center justify-center p-6 text-center animate-fade-in relative z-20">
        <div className="w-24 h-24 bg-sbh-green rounded-full flex items-center justify-center text-white mb-8 animate-slide-up">
          <Check size={48} />
        </div>
        <h2 className="font-serif text-4xl md:text-5xl italic text-sbh-charcoal mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Merci, {formData.firstName}.
        </h2>
        <p className="font-sans text-lg text-gray-600 max-w-lg mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          Votre demande d&apos;information pour la <strong>{villa.name}</strong> a bien été transmise à notre équipe commerciale.
          Valérie ou un de nos agents vous recontactera dans les plus brefs délais.
        </p>
        <button
          onClick={() => window.location.href = "/"}
          className="px-10 py-4 border border-sbh-charcoal text-sbh-charcoal font-sans text-xs uppercase tracking-[0.25em] hover:bg-sbh-charcoal hover:text-white transition-all rounded-full animate-slide-up" style={{ animationDelay: '0.3s' }}
        >
          Retour à l&apos;accueil
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white animate-fade-in pt-48 md:pt-64 pb-24 px-4 md:px-12 relative z-20">

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

        {/* LEFT COLUMN - VILLA RECAP */}
        <div className="lg:col-span-5 order-2 lg:order-1">
          <div className="sticky top-40 bg-sbh-cream/30 border border-gray-100 rounded-xl overflow-hidden p-6 md:p-8 shadow-xl shadow-gray-100/50">
            <h3 className="font-serif text-2xl italic text-sbh-charcoal mb-8 border-b border-gray-200 pb-4">
              Propriété concernée
            </h3>

            {/* Villa Mini Card */}
            <div className="mb-8">
              <div className="w-full h-48 rounded-lg overflow-hidden shrink-0 mb-6 relative">
                <Image src={villa.mainImage} alt={villa.name} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
              </div>
              <div>
                <h4 className="font-serif text-3xl text-sbh-charcoal mb-2">{villa.name}</h4>
                <span className="text-xs font-sans text-gray-500 uppercase tracking-widest flex items-center gap-1 mt-1">
                  <MapPin size={12} /> {villa.location.name}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-4 mb-8 text-sbh-charcoal/80">
              <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-100">
                <BedDouble size={18} className="mb-2 text-sbh-green" />
                <span className="text-sm font-bold">{villa.bedrooms}</span>
                <span className="text-[9px] uppercase tracking-widest">Chambres</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-100">
                <Bath size={18} className="mb-2 text-sbh-green" />
                <span className="text-sm font-bold">{villa.bathrooms}</span>
                <span className="text-[9px] uppercase tracking-widest">Bains</span>
              </div>
              <div className="flex flex-col items-center p-3 bg-white rounded-lg border border-gray-100">
                <Square size={18} className="mb-2 text-sbh-green" />
                <span className="text-sm font-bold">{villa.surface}</span>
                <span className="text-[9px] uppercase tracking-widest">m²</span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white p-6 rounded-lg border border-gray-100 text-center">
              <span className="block text-xs uppercase tracking-widest text-gray-400 mb-2">Prix de vente</span>
              <span className="font-serif text-2xl md:text-3xl italic text-sbh-charcoal">
                {villa.salePrice?.toLocaleString()} €
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - FORM */}
        <div className="lg:col-span-7 order-1 lg:order-2">
          <div className="mb-12">
            <button type="button" onClick={onBack} className="relative z-50 text-xs uppercase tracking-widest text-gray-400 hover:text-sbh-charcoal transition-colors mb-6 flex items-center gap-2 cursor-pointer hover:underline">
              <ArrowRight size={14} className="rotate-180" /> Retour à la fiche
            </button>
            <h1 className="font-serif text-4xl md:text-5xl italic text-sbh-charcoal mb-6">
              Demande d&apos;information
            </h1>
            <p className="font-sans text-gray-600 font-light">
              Vous souhaitez en savoir plus sur cette opportunité ? Remplissez ce formulaire pour recevoir le dossier complet ou organiser une visite privée.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Security Field - Bot Trap */}
            <HoneypotField fieldName="confirm_sales_inquiry" />

            {/* Personal Info Section */}
            <div className="space-y-8">
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-sbh-green font-bold border-b border-gray-100 pb-4">
                Vos Coordonnées
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative">
                  <input
                    type="text"
                    required
                    className="peer w-full border-b border-gray-200 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg placeholder-transparent"
                    placeholder="Prénom"
                    value={formData.firstName}
                    onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                  />
                  <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                    Prénom
                  </label>
                </div>
                <div className="group relative">
                  <input
                    type="text"
                    required
                    className="peer w-full border-b border-gray-200 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg placeholder-transparent"
                    placeholder="Nom"
                    value={formData.lastName}
                    onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                  />
                  <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                    Nom
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="group relative">
                  <input
                    type="email"
                    required
                    className="peer w-full border-b border-gray-200 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg placeholder-transparent"
                    placeholder="Email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                  <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                    Email
                  </label>
                </div>
                <div className="group relative">
                  <input
                    type="tel"
                    required
                    className="peer w-full border-b border-gray-200 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg placeholder-transparent"
                    placeholder="Téléphone"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  />
                  <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                    Téléphone
                  </label>
                </div>
              </div>
            </div>

            {/* Message Section */}
            <div className="space-y-8">
              <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-sbh-green font-bold border-b border-gray-100 pb-4">
                Votre Message
              </h3>
              <div className="group relative">
                <textarea
                  rows={4}
                  className="peer w-full border-b border-gray-200 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg placeholder-transparent resize-none"
                  placeholder="Votre message"
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
                <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                  Je suis intéressé par ce bien car...
                </label>
              </div>
            </div>

            <div className="pt-8">
              <button type="submit" className="w-full md:w-auto bg-sbh-charcoal text-white px-10 py-5 font-sans text-xs uppercase tracking-[0.25em] hover:bg-sbh-green transition-colors duration-500 rounded-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transform flex items-center justify-center gap-4 group">
                <Mail size={16} />
                Envoyer ma demande
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <p className="text-xs text-gray-400 mt-4 text-center md:text-left">
                Vos informations sont confidentielles et traitées par Sun Beach House uniquement.
              </p>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
