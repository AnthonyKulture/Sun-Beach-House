
import React, { useState, useEffect } from 'react';
import { BookingParams } from '../types';
import { useVilla } from '../hooks/useCMS';
import { Calendar, Users, MapPin, Check, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { Logo } from './Logo';
import { SunStamp } from './Decorations';
import { useLanguage } from '../contexts/LanguageContext';

interface BookingPageProps {
   bookingParams: BookingParams;
   onBack: () => void;
}

export const BookingPage: React.FC<BookingPageProps> = ({ bookingParams, onBack }) => {
   const { t, language } = useLanguage();
   const { villa, loading } = useVilla(bookingParams.villaId);
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

   // Calculate nights and total
   const start = new Date(bookingParams.arrival);
   const end = new Date(bookingParams.departure);
   const diffTime = Math.abs(end.getTime() - start.getTime());
   const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
   // Fallback to 1 night if dates are invalid or same
   const nights = isNaN(diffDays) ? 1 : diffDays;

   // Use price per night (simplified, ignoring seasonality for the prototype display)
   const pricePerNight = villa.pricePerNight || 0;
   const total = pricePerNight * nights;
   const serviceFee = Math.round(total * 0.10); // 10% service fee
   const taxes = Math.round(total * 0.05); // 5% tourism tax
   const grandTotal = total + serviceFee + taxes;

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      // Simulate API call
      setTimeout(() => {
         setIsSubmitted(true);
         window.scrollTo(0, 0);
      }, 800);
   };

   const formatDate = (dateStr: string) => {
      if (!dateStr) return t.booking.selectDate;
      return new Date(dateStr).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
   };

   if (isSubmitted) {
      return (
         <div className="min-h-screen bg-sbh-cream flex flex-col items-center justify-center p-6 text-center animate-fade-in relative z-20">
            <div className="w-24 h-24 bg-sbh-green rounded-full flex items-center justify-center text-white mb-8 animate-slide-up">
               <Check size={48} />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl italic text-sbh-charcoal mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
               {t.booking.thankYou.replace('{name}', formData.firstName)}
            </h2>
            <p className="font-sans text-lg text-gray-600 max-w-lg mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
               {t.booking.requestReceived.replace('{villa}', villa.name)}
               {t.booking.staffWillContact}
            </p>
            <button
               onClick={() => window.location.href = "/"} // Force refresh to home or use navigation prop
               className="px-10 py-4 border border-sbh-charcoal text-sbh-charcoal font-sans text-xs uppercase tracking-[0.25em] hover:bg-sbh-charcoal hover:text-white transition-all rounded-full animate-slide-up" style={{ animationDelay: '0.3s' }}
            >
               {t.booking.backToHome}
            </button>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-white animate-fade-in pt-48 md:pt-64 pb-24 px-4 md:px-12 relative z-20">

         <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">

            {/* LEFT COLUMN - RECAP CARD */}
            <div className="lg:col-span-5 order-2 lg:order-1">
               <div className="sticky top-40 bg-sbh-cream/30 border border-gray-100 rounded-xl overflow-hidden p-6 md:p-8 shadow-xl shadow-gray-100/50">
                  <h3 className="font-serif text-2xl italic text-sbh-charcoal mb-8 border-b border-gray-200 pb-4">
                     {t.booking.yourStay}
                  </h3>

                  {/* Villa Mini Card */}
                  <div className="flex gap-4 mb-8">
                     <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0">
                        <img src={villa.mainImage} alt={villa.name} className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <h4 className="font-serif text-xl text-sbh-charcoal">{villa.name}</h4>
                        <span className="text-xs font-sans text-gray-500 uppercase tracking-widest flex items-center gap-1 mt-1">
                           <MapPin size={10} /> {villa.location}
                        </span>
                        <div className="flex items-center gap-1 text-sbh-green text-xs mt-2">
                           <Star size={12} fill="currentColor" /> 5.0 (Exceptionnel)
                        </div>
                     </div>
                  </div>

                  {/* Details List */}
                  <div className="space-y-4 mb-8 text-sm font-sans text-sbh-charcoal/80">
                     <div className="flex justify-between items-center py-3 border-t border-gray-200/50">
                        <span className="text-gray-500 uppercase text-[10px] tracking-widest">{t.booking.arrival}</span>
                        <span className="font-medium">{formatDate(bookingParams.arrival)}</span>
                     </div>
                     <div className="flex justify-between items-center py-3 border-t border-gray-200/50">
                        <span className="text-gray-500 uppercase text-[10px] tracking-widest">{t.booking.departure}</span>
                        <span className="font-medium">{formatDate(bookingParams.departure)}</span>
                     </div>
                     <div className="flex justify-between items-center py-3 border-t border-gray-200/50">
                        <span className="text-gray-500 uppercase text-[10px] tracking-widest">{t.booking.travelers}</span>
                        <span className="font-medium">{bookingParams.guests} {t.booking.guests}</span>
                     </div>
                  </div>

                  {/* Pricing Information */}
                  <div className="bg-sbh-cream/30 p-6 rounded-lg border border-sbh-green/20 space-y-4 mb-6">
                     <div className="flex items-start gap-3">
                        <ShieldCheck size={20} className="shrink-0 text-sbh-green mt-0.5" />
                        <div className="space-y-2">
                           <h4 className="font-serif text-base text-sbh-charcoal font-medium">{t.booking.customQuote}</h4>
                           <p className="text-sm text-gray-600 leading-relaxed">
                              {t.booking.quoteDescription}
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-start gap-3 text-[10px] text-gray-400 font-sans leading-relaxed">
                     <ShieldCheck size={14} className="shrink-0 text-sbh-green" />
                     <p>{t.booking.noImmediateCharge}</p>
                  </div>
               </div>
            </div>

            {/* RIGHT COLUMN - FORM */}
            <div className="lg:col-span-7 order-1 lg:order-2">
               <div className="mb-12">
                  <button type="button" onClick={onBack} className="relative z-50 text-xs uppercase tracking-widest text-gray-400 hover:text-sbh-charcoal transition-colors mb-6 flex items-center gap-2 cursor-pointer hover:underline">
                     <ArrowRight size={14} className="rotate-180" /> {t.booking.backToVilla}
                  </button>
                  <h1 className="font-serif text-4xl md:text-5xl italic text-sbh-charcoal mb-6">
                     {t.booking.confirmRequest}
                  </h1>
                  <p className="font-sans text-gray-600 font-light">
                     {t.booking.fillForm}
                  </p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-12">

                  {/* Personal Info Section */}
                  <div className="space-y-8">
                     <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-sbh-green font-bold border-b border-gray-100 pb-4">
                        {t.booking.yourDetails}
                     </h3>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group relative">
                           <input
                              type="text"
                              required
                              className="peer w-full border-b border-gray-200 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg placeholder-transparent"
                              placeholder={t.booking.firstName}
                              value={formData.firstName}
                              onChange={e => setFormData({ ...formData, firstName: e.target.value })}
                           />
                           <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                              {t.booking.firstName}
                           </label>
                        </div>
                        <div className="group relative">
                           <input
                              type="text"
                              required
                              className="peer w-full border-b border-gray-200 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg placeholder-transparent"
                              placeholder={t.booking.lastName}
                              value={formData.lastName}
                              onChange={e => setFormData({ ...formData, lastName: e.target.value })}
                           />
                           <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                              {t.booking.lastName}
                           </label>
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="group relative">
                           <input
                              type="email"
                              required
                              className="peer w-full border-b border-gray-200 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg placeholder-transparent"
                              placeholder={t.booking.email}
                              value={formData.email}
                              onChange={e => setFormData({ ...formData, email: e.target.value })}
                           />
                           <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                              {t.booking.email}
                           </label>
                        </div>
                        <div className="group relative">
                           <input
                              type="tel"
                              required
                              className="peer w-full border-b border-gray-200 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg placeholder-transparent"
                              placeholder={t.booking.phone}
                              value={formData.phone}
                              onChange={e => setFormData({ ...formData, phone: e.target.value })}
                           />
                           <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                              {t.booking.phone}
                           </label>
                        </div>
                     </div>
                  </div>

                  {/* Message Section */}
                  <div className="space-y-8">
                     <h3 className="font-sans text-xs uppercase tracking-[0.2em] text-sbh-green font-bold border-b border-gray-100 pb-4">
                        {t.booking.specialRequest}
                     </h3>
                     <div className="group relative">
                        <textarea
                           rows={4}
                           className="peer w-full border-b border-gray-200 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg placeholder-transparent resize-none"
                           placeholder={t.booking.yourMessage}
                           value={formData.message}
                           onChange={e => setFormData({ ...formData, message: e.target.value })}
                        ></textarea>
                        <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                           {t.booking.preferencesPlaceholder}
                        </label>
                     </div>
                  </div>

                  <div className="pt-8">
                     <button type="submit" className="w-full md:w-auto bg-sbh-charcoal text-white px-10 py-5 font-sans text-xs uppercase tracking-[0.25em] hover:bg-sbh-green transition-colors duration-500 rounded-sm shadow-xl hover:shadow-2xl hover:-translate-y-1 transform flex items-center justify-center gap-4 group">
                        {t.booking.finalizeRequest}
                        <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                     </button>
                     <p className="text-xs text-gray-400 mt-4 text-center md:text-left">
                        {t.booking.termsAgreement}
                     </p>
                  </div>

               </form>
            </div>
         </div>
      </div>
   );
};
