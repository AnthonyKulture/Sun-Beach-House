import React, { useEffect, useState, useRef } from 'react';
import { Villa, HomeFeature } from '../types';
import { useVillas } from '../hooks/useCMS';
import { MapPin, Users, BedDouble, Bath, Square, ArrowLeft, Minus, Plus, Calendar, Star, Mail, Check, X } from 'lucide-react';
import { SunStamp } from './Decorations';
import { DownloadBrochureButton } from './DownloadBrochureButton';
import { VillaMap } from './VillaMap';
import { FullscreenGallery } from './FullscreenGallery';
import { VillaImagePlaceholder } from './VillaImagePlaceholder';
import { FeatureAccordion } from './FeatureAccordion';
import { IconMap } from './IconMap';
import { useLanguage } from '../contexts/LanguageContext';

interface VillaDetailsProps {
    villa: Villa;
    onNavigateToVilla: (id: string) => void;
    onBook: (villaId: string, arrival: string, departure: string, guests: number) => void;
    onContact: (villaId: string) => void;
    onBack: () => void;
}

export const VillaDetails: React.FC<VillaDetailsProps> = ({ villa, onNavigateToVilla, onBook, onContact, onBack }) => {
    const { language, t } = useLanguage();
    const { villas } = useVillas(); // Fetch all villas to determine similarities
    const [arrivalDate, setArrivalDate] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [guests, setGuests] = useState(2);
    const [isGuestsOpen, setIsGuestsOpen] = useState(false);
    const [openSeasonId, setOpenSeasonId] = useState<string | null>(null);

    // Mobile Booking Sheet State
    const [isMobileBookingOpen, setIsMobileBookingOpen] = useState(false);

    // Fullscreen Gallery State
    const [isGalleryOpen, setIsGalleryOpen] = useState(false);
    const [galleryStartIndex, setGalleryStartIndex] = useState(0);

    const arrivalRef = useRef<HTMLInputElement>(null);
    const departureRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        setArrivalDate("");
        setDepartureDate("");
        setGuests(2);
        setIsMobileBookingOpen(false);
        setOpenSeasonId(null);
    }, [villa.id]);

    // Only show similar villas of same type
    const similarVillas = villas.filter(v => v.id !== villa.id && v.listingType === villa.listingType).slice(0, 3);
    const today = new Date().toISOString().split('T')[0];

    const handleBookingClick = () => {
        if (arrivalDate && departureDate) {
            onBook(villa.id, arrivalDate, departureDate, guests);
        } else {
            // Focus the inputs if empty
            if (!arrivalDate && arrivalRef.current) {
                arrivalRef.current.focus();
                // Scroll to sidebar on desktop
                arrivalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            if (!departureDate && departureRef.current) {
                departureRef.current.focus();
                departureRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
        }
    };

    const handleMobileBookClick = () => {
        if (arrivalDate && departureDate) {
            onBook(villa.id, arrivalDate, departureDate, guests);
        } else {
            setIsMobileBookingOpen(true);
        }
    };

    const schemaData = {
        "@context": "https://schema.org",
        "@type": "VacationRental",
        "name": villa.name,
        "description": villa.description[language],
        "image": [villa.mainImage, ...villa.galleryImages],
        "priceRange": villa.listingType === 'rent' ? `${villa.pricePerNight} EUR` : `${villa.salePrice} EUR`,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Saint-Barthélemy",
            "addressRegion": villa.location,
            "addressCountry": "BL"
        },
        "numberOfRooms": villa.bedrooms,
        "occupancy": {
            "@type": "QuantitativeValue",
            "value": villa.guests
        },
        "amenityFeature": villa.amenities.map(a => ({
            "@type": "LocationFeatureSpecification",
            "name": a.label,
            "value": true
        }))
    };

    const isSale = villa.listingType === 'sale';

    // Determine display price with fallback to "Prix sur demande"
    const getDisplayPrice = () => {
        if (isSale) {
            return villa.salePrice && villa.salePrice > 0 ? villa.salePrice.toLocaleString('fr-FR') : null;
        }
        // For rentals: prioritize pricePerWeek, fallback to pricePerNight
        if (villa.pricePerWeek && villa.pricePerWeek > 0) {
            return villa.pricePerWeek.toLocaleString('fr-FR');
        }
        if (villa.pricePerNight && villa.pricePerNight > 0) {
            return villa.pricePerNight.toLocaleString('fr-FR');
        }
        return null;
    };

    const displayPrice = getDisplayPrice();
    const hasValidPrice = displayPrice !== null;

    const toggleSeason = (id: string) => {
        setOpenSeasonId(openSeasonId === id ? null : id);
    };

    return (
        <div className="bg-white min-h-screen animate-fade-in relative pb-32 xl:pb-0">
            <script type="application/ld+json">
                {JSON.stringify(schemaData)}
            </script>

            {/* 
          FIXED BACK BUTTON 
      */}
            <button
                onClick={onBack}
                className="fixed z-[10002] transition-all duration-300
                   xl:bottom-8 xl:left-8 xl:top-auto xl:right-auto
                   top-32 left-6
                   bg-white text-sbh-charcoal 
                   px-5 py-3 rounded-full shadow-2xl border border-gray-100
                   hover:bg-sbh-charcoal hover:text-white group
                   flex items-center gap-3 transform hover:scale-105 active:scale-95"
            >
                <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] font-bold">{t.villa.back}</span>
            </button>

            {/* HERO SECTION */}
            <div className="relative h-[50vh] md:h-[80vh] w-full overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[2s] scale-105"
                    style={{ backgroundImage: `url('${villa.mainImage}')` }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/10 to-black/90"></div>

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-16 text-white flex flex-col md:flex-row items-end justify-between z-10">
                    <div className="mb-2 md:mb-0 animate-slide-up w-full md:w-auto">
                        <div className="flex items-center gap-2 mb-2 md:mb-4 text-sbh-cream/90 font-sans tracking-widest text-[10px] md:text-xs uppercase drop-shadow-lg font-medium">
                            <MapPin size={14} className="text-sbh-green" />
                            {villa.location}, Saint-Barthélemy
                        </div>
                        <h1 className="font-serif text-4xl md:text-7xl lg:text-8xl italic mb-2 leading-none drop-shadow-lg">
                            {villa.name}
                        </h1>
                        <div className="flex items-center gap-4 mt-2 md:mt-4 drop-shadow-lg">
                            <div className="flex text-sbh-green">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <span className="text-sm font-sans opacity-90 font-medium">{isSale ? t.villa.opportunity : t.villa.exceptional}</span>
                        </div>
                    </div>

                    <div className="text-right hidden md:block animate-slide-up drop-shadow-lg" style={{ animationDelay: '0.2s' }}>
                        {hasValidPrice ? (
                            <>
                                <span className="block text-3xl font-serif italic">{displayPrice}€</span>
                                <span className="text-sm font-sans opacity-90 uppercase tracking-widest">
                                    {isSale ? t.villa.salePrice : (villa.pricePerWeek ? t.villa.perWeek : t.villa.perNight)}
                                </span>
                            </>
                        ) : (
                            <span className="block text-2xl font-serif italic">{t.villa.priceOnRequest}</span>
                        )}
                    </div>
                </div>
            </div>

            {/* META INFO STRIP */}
            <div className="bg-sbh-cream border-b border-sbh-charcoal/10 py-6 md:py-8 px-6 md:px-12 relative z-10">
                <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:flex md:justify-start gap-y-4 gap-x-8 md:gap-24">

                    <div className="flex items-center gap-3 text-sbh-charcoal/80 reveal-on-scroll">
                        <Users size={16} className="text-sbh-stone" strokeWidth={1.5} />
                        <span className="text-xs md:text-sm font-sans uppercase tracking-widest">
                            <strong className="text-sbh-charcoal">{villa.guests}</strong> {isSale ? t.villa.sleeps : t.villa.guests}
                        </span>
                    </div>

                    <div className="flex items-center gap-3 text-sbh-charcoal/80 reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                        <BedDouble size={16} className="text-sbh-stone" strokeWidth={1.5} />
                        <span className="text-xs md:text-sm font-sans uppercase tracking-widest"><strong className="text-sbh-charcoal">{villa.bedrooms}</strong> {t.villa.bedrooms}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sbh-charcoal/80 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                        <Bath size={16} className="text-sbh-stone" strokeWidth={1.5} />
                        <span className="text-xs md:text-sm font-sans uppercase tracking-widest"><strong className="text-sbh-charcoal">{villa.bathrooms}</strong> {t.villa.bathrooms}</span>
                    </div>

                    {/* Hide Surface Area for Rentals */}
                    {isSale && (
                        <div className="flex items-center gap-3 text-sbh-charcoal/80 reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
                            <Square size={16} className="text-sbh-stone" strokeWidth={1.5} />
                            <span className="text-xs md:text-sm font-sans uppercase tracking-widest"><strong className="text-sbh-charcoal">{villa.surface}</strong> m²</span>
                        </div>
                    )}

                </div>
            </div>

            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 md:py-24 grid grid-cols-1 xl:grid-cols-12 gap-16 relative">

                {/* LEFT CONTENT COLUMN */}
                <div className="xl:col-span-8 order-1">

                    {/* STORYTELLING */}
                    <div className="mb-16 md:mb-24 reveal-on-scroll">
                        <h2 className="font-serif text-2xl md:text-3xl text-sbh-charcoal mb-8 leading-tight">
                            {villa.description[language]}                        </h2>
                        <div className="prose prose-lg text-gray-600 font-sans font-light leading-relaxed whitespace-pre-line text-justify">
                            {villa.fullDescription[language]}
                        </div>
                    </div>

                    {/* CARACTÉRISTIQUES DE LA MAISON */}
                    {villa.homeFeatures && villa.homeFeatures.length > 0 && (
                        <div className="mb-16 md:mb-24 reveal-on-scroll">
                            <h3 className="font-serif text-2xl italic text-sbh-charcoal mb-8 flex items-center gap-4">
                                {t.villa.features}
                                <span className="h-px flex-1 bg-sbh-charcoal/10"></span>
                            </h3>

                            <div className="space-y-2">
                                {villa.homeFeatures.map((feature, idx) => (
                                    <FeatureAccordion key={idx} feature={feature} index={idx} />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* GALLERY */}
                    <div className="mb-16 md:mb-24 w-full">
                        <h3 className="font-serif text-2xl italic text-sbh-charcoal mb-8 flex items-center gap-4 reveal-on-scroll">
                            {t.villa.gallery} <span className="h-px flex-1 bg-sbh-charcoal/10"></span>
                        </h3>

                        {/* Desktop Gallery - Height increased by 70% (800px -> 1360px) */}
                        <div className="hidden md:grid grid-cols-2 gap-4 h-[1360px]">
                            <div
                                className="col-span-2 row-span-2 relative group overflow-hidden rounded-sm cursor-pointer reveal-on-scroll"
                                onClick={() => { setGalleryStartIndex(0); setIsGalleryOpen(true); }}
                            >
                                {villa.mainImage ? (
                                    <img src={villa.mainImage} alt="Main view" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                ) : (
                                    <VillaImagePlaceholder className="w-full h-full" />
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-sans uppercase tracking-wider">
                                        {t.villa.viewFullscreen}
                                    </div>
                                </div>
                            </div>
                            {villa.galleryImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="relative group overflow-hidden rounded-sm cursor-pointer reveal-on-scroll"
                                    style={{ transitionDelay: `${100 * (idx + 1)}ms` }}
                                    onClick={() => { setGalleryStartIndex(idx + 1); setIsGalleryOpen(true); }}
                                >
                                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-sans uppercase tracking-wider">
                                            {t.villa.viewFullscreen}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Mobile Gallery - Height increased by 70% (400px -> 680px) */}
                        <div className="md:hidden flex overflow-x-auto gap-4 snap-x snap-mandatory -mx-6 px-6 pb-6 reveal-on-scroll" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                            <div
                                className="min-w-[85vw] h-[680px] snap-center rounded-sm overflow-hidden relative shadow-lg cursor-pointer"
                                onClick={() => { setGalleryStartIndex(0); setIsGalleryOpen(true); }}
                            >
                                {villa.mainImage ? (
                                    <img src={villa.mainImage} alt="Main" className="w-full h-full object-cover" />
                                ) : (
                                    <VillaImagePlaceholder className="w-full h-full" />
                                )}
                            </div>
                            {villa.galleryImages.map((img, idx) => (
                                <div
                                    key={idx}
                                    className="min-w-[85vw] h-[680px] snap-center rounded-sm overflow-hidden relative shadow-lg cursor-pointer"
                                    onClick={() => { setGalleryStartIndex(idx + 1); setIsGalleryOpen(true); }}
                                >
                                    <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* LOCATION & MAP */}
                    <div className="mb-16 md:mb-24">
                        <h3 className="font-serif text-2xl italic text-sbh-charcoal mb-8 flex items-center gap-4 reveal-on-scroll">
                            {t.villa.location} <span className="h-px flex-1 bg-sbh-charcoal/10"></span>
                        </h3>
                        <div className="reveal-on-scroll">
                            <VillaMap villa={villa} />
                        </div>
                    </div>

                    {/* AMENITIES */}
                    <div className="mb-16 md:mb-24">
                        <h3 className="font-serif text-2xl italic text-sbh-charcoal mb-8 flex items-center gap-4 reveal-on-scroll">
                            {isSale ? t.villa.features : t.villa.amenities} <span className="h-px flex-1 bg-sbh-charcoal/10"></span>
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-4">
                            {villa.amenities.map((item, idx) => {
                                const Icon = IconMap[item.icon] || Star;
                                return (
                                    <div key={idx} className="flex items-center gap-4 group reveal-on-scroll" style={{ transitionDelay: `${idx * 50}ms` }}>
                                        <div className="w-10 h-10 rounded-full bg-sbh-cream flex items-center justify-center text-sbh-charcoal group-hover:bg-sbh-green group-hover:text-white transition-colors flex-shrink-0">
                                            <Icon size={18} strokeWidth={1.5} />
                                        </div>
                                        <span className="text-sm font-sans tracking-wide text-gray-600 leading-tight">{item.label}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* SEASONAL PRICING ACCORDION (RENTAL ONLY) */}
                    {!isSale && villa.seasonalPrices && (
                        <div className="mb-12 border-t border-sbh-charcoal/10 pt-12 reveal-on-scroll">
                            <h3 className="font-serif text-3xl italic text-sbh-charcoal mb-8">
                                {t.villa.seasonalRates}
                            </h3>

                            <div className="space-y-0">
                                {villa.seasonalPrices.map((season) => {
                                    const isOpen = openSeasonId === season.id;
                                    return (
                                        <div key={season.id} className="border-b border-gray-100 last:border-b-0 group">
                                            <button
                                                onClick={() => toggleSeason(season.id)}
                                                className="w-full flex items-center justify-between py-6 group-hover:pl-2 transition-all duration-500 ease-out"
                                            >
                                                <div className="flex flex-col md:flex-row md:items-baseline md:gap-4 text-left">
                                                    <span className={`font-sans text-lg tracking-wide transition-colors duration-300 ${isOpen ? 'text-sbh-blue font-medium' : 'text-sbh-charcoal font-light'}`}>
                                                        {season.seasonName}
                                                    </span>
                                                    <span className="font-sans text-xs uppercase tracking-widest text-gray-400">
                                                        {season.dates}
                                                    </span>
                                                </div>
                                                <div className={`transform transition-transform duration-500 ${isOpen ? 'rotate-180 text-sbh-blue' : 'text-gray-300'}`}>
                                                    {isOpen ? <Minus size={14} strokeWidth={1} /> : <Plus size={14} strokeWidth={1} />}
                                                </div>
                                            </button>

                                            <div
                                                className={`overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}
                                            >
                                                <div className="pb-8 pt-2 space-y-3">
                                                    {season.prices.map((tier, idx) => (
                                                        <div key={idx} className="flex items-center justify-between md:justify-start md:gap-24 pl-0 md:pl-4 text-sm font-sans">
                                                            <div className="flex items-center gap-3 text-sbh-charcoal/80">
                                                                <BedDouble size={16} strokeWidth={1} />
                                                                <span>{tier.bedrooms} {tier.bedrooms > 1 ? t.villa.bedrooms : t.villa.bedroom}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-medium text-lg text-sbh-charcoal">
                                                                    {tier.price.toLocaleString('fr-FR')} €
                                                                </span>
                                                                <span className="text-[10px] text-gray-400 uppercase tracking-widest">{t.villa.week}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <p className="mt-8 text-[10px] text-gray-400 font-sans tracking-wide leading-relaxed italic">
                                {t.villa.serviceAndTax}<br />
                                {t.villa.minStay}
                            </p>
                        </div>
                    )}
                </div>

                {/* RIGHT SIDEBAR (BOOKING DESKTOP - Visible from XL upwards) */}
                <div className="hidden xl:block xl:col-span-4 order-2 relative h-full">
                    <div className="sticky top-32 z-[30] reveal-on-scroll">
                        <div className="bg-white border border-sbh-charcoal/10 p-5 lg:p-6 xl:p-8 shadow-2xl shadow-gray-200/50 rounded-xl relative z-20">

                            <div className="flex justify-between items-baseline mb-4 lg:mb-4 border-b border-gray-100 pb-4">
                                <div>
                                    <span className="block text-2xl lg:text-2xl xl:text-3xl font-serif text-sbh-charcoal">
                                        {!hasValidPrice ? t.villa.priceOnRequest :
                                            (isSale ? `${displayPrice}€` :
                                                `${t.villa.fromPrice} ${villa.seasonalPrices?.[0]?.prices?.[0]?.price?.toLocaleString()
                                                || displayPrice}€`)
                                        }
                                    </span>
                                    {!isSale && hasValidPrice && <span className="text-[10px] xl:text-xs text-gray-400 uppercase tracking-widest">{villa.pricePerWeek ? t.villa.week : t.villa.perNight}</span>}
                                </div>
                                {!isSale && (
                                    <div className="flex items-center gap-1 text-sbh-green text-sm">
                                        <Star size={14} fill="currentColor" /> 5.0
                                    </div>
                                )}
                            </div>

                            {isSale ? (
                                // SALE SIDEBAR CONTENT
                                <div className="space-y-6">
                                    <p className="font-sans text-gray-600 text-sm leading-relaxed">
                                        {t.villa.interestedProperty}
                                    </p>
                                    <button
                                        onClick={() => onContact(villa.id)}
                                        className="w-full bg-sbh-charcoal text-white py-4 font-sans text-xs uppercase tracking-[0.25em] hover:bg-sbh-green transition-colors duration-500 rounded-sm flex items-center justify-center gap-2"
                                    >
                                        <Mail size={16} /> {t.villa.contactAgent}
                                    </button>
                                    <div className="mt-4">
                                        <DownloadBrochureButton villa={villa} />
                                    </div>
                                    <div className="border-t border-gray-100 pt-4 mt-4">
                                        <div className="flex items-center gap-4 mb-2">
                                            <div className="w-12 h-12 rounded-full bg-gray-200 overflow-hidden">
                                                <img src="https://images.unsplash.com/photo-1573599971936-8a79854743c6?q=80&w=200&auto=format&fit=crop" alt="Agent" className="w-full h-full object-cover" />
                                            </div>
                                            <div>
                                                <p className="font-serif text-sbh-charcoal">{t.villa.valerie}</p>
                                                <p className="text-[10px] uppercase text-gray-400 tracking-widest">{t.villa.exclusiveAgent}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                // RENTAL SIDEBAR CONTENT
                                <>
                                    <div className="space-y-4 lg:space-y-3 xl:space-y-4 mb-6 lg:mb-4 xl:mb-8">
                                        <div className="grid grid-cols-2 gap-2">
                                            <div className="border border-gray-200 p-2 xl:p-3 rounded-lg cursor-pointer hover:border-sbh-green transition-colors relative group">
                                                <label className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1 cursor-pointer">{t.villa.arrival}</label>
                                                <div className="text-xs xl:text-sm text-sbh-charcoal flex justify-between items-center">
                                                    <span>{arrivalDate ? new Date(arrivalDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short' }) : t.villa.date}</span>
                                                    <Calendar size={14} className="opacity-50" />
                                                </div>
                                                <input
                                                    ref={arrivalRef}
                                                    type="date"
                                                    min={today}
                                                    value={arrivalDate}
                                                    onChange={(e) => setArrivalDate(e.target.value)}
                                                    className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer appearance-none"
                                                />
                                            </div>
                                            <div className="border border-gray-200 p-2 xl:p-3 rounded-lg cursor-pointer hover:border-sbh-green transition-colors relative group">
                                                <label className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1 cursor-pointer">{t.villa.departure}</label>
                                                <div className="text-xs xl:text-sm text-sbh-charcoal flex justify-between items-center">
                                                    <span>{departureDate ? new Date(departureDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'short' }) : t.villa.date}</span>
                                                    <Calendar size={14} className="opacity-50" />
                                                </div>
                                                <input
                                                    ref={departureRef}
                                                    type="date"
                                                    min={arrivalDate || today}
                                                    value={departureDate}
                                                    onChange={(e) => setDepartureDate(e.target.value)}
                                                    className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer appearance-none"
                                                />
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <div
                                                className="border border-gray-200 p-2 xl:p-3 rounded-lg cursor-pointer hover:border-sbh-green transition-colors flex justify-between items-center"
                                                onClick={() => setIsGuestsOpen(!isGuestsOpen)}
                                            >
                                                <div>
                                                    <label className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">{t.villa.travelers}</label>
                                                    <span className="text-xs xl:text-sm text-sbh-charcoal">{guests} {t.villa.travelers}</span>
                                                </div>
                                                <Users size={16} className="text-gray-400" />
                                            </div>
                                            {isGuestsOpen && (
                                                <div className="absolute top-[110%] left-0 w-full bg-white border border-gray-100 shadow-xl rounded-lg p-4 z-50">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-medium">{t.villa.numberOfPeople}</span>
                                                        <div className="flex items-center gap-3">
                                                            <button onClick={() => setGuests(Math.max(1, guests - 1))} className="p-1 border rounded-full hover:bg-gray-50"><Minus size={12} /></button>
                                                            <span className="text-sm font-serif w-4 text-center">{guests}</span>
                                                            <button onClick={() => setGuests(Math.min(villa.guests, guests + 1))} className="p-1 border rounded-full hover:bg-gray-50"><Plus size={12} /></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                            {isGuestsOpen && <div className="fixed inset-0 z-40" onClick={() => setIsGuestsOpen(false)}></div>}
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleBookingClick}
                                        className="w-full bg-sbh-charcoal text-white py-3 lg:py-3 xl:py-4 font-sans text-[10px] xl:text-xs uppercase tracking-[0.25em] hover:bg-sbh-green transition-colors duration-500 rounded-sm"
                                    >
                                        {t.villa.reserve}
                                    </button>

                                    <p className="text-center text-[10px] text-gray-400 mt-3 lg:mt-2 xl:mt-4 italic font-serif">
                                        Aucun débit immédiat
                                    </p>

                                    <div className="mt-6 lg:mt-4 xl:mt-6">
                                        <DownloadBrochureButton villa={villa} />
                                    </div>

                                    <div className="mt-6 lg:mt-4 xl:mt-8 pt-6 lg:pt-4 xl:pt-6 border-t border-gray-100 space-y-2 lg:space-y-1.5 xl:space-y-3">
                                        <div className="flex items-center justify-between text-xs xl:text-sm text-gray-500">
                                            <span className="flex items-center gap-2"><Check size={14} className="text-sbh-green" /> {t.villa.bestRateGuaranteed}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs xl:text-sm text-gray-500">
                                            <span className="flex items-center gap-2"><Check size={14} className="text-sbh-green" /> {t.villa.conciergeIncluded}</span>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        <div className="absolute -top-12 -right-12 text-sbh-cream pointer-events-none z-0 animate-spin-slower hidden xl:block">
                            <SunStamp className="w-40 h-40" />
                        </div>
                    </div>
                </div>
            </div>

            {/* CROSS NAVIGATION */}
            <div className="bg-sbh-cream py-24 px-6 md:px-12 border-t border-sbh-charcoal/5">
                <div className="max-w-[1400px] mx-auto">
                    <h3 className="font-serif text-3xl italic text-sbh-charcoal mb-12 text-center reveal-on-scroll">
                        {isSale ? t.villa.otherOpportunities : t.villa.otherCollections}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {similarVillas.map((v, idx) => (
                            <div key={v.id} className="group cursor-pointer reveal-on-scroll" onClick={() => onNavigateToVilla(v.id)} style={{ transitionDelay: `${idx * 100}ms` }}>
                                <div className="aspect-[4/3] overflow-hidden rounded-sm mb-4 relative">
                                    <img src={v.mainImage} alt={v.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 text-xs font-sans tracking-widest uppercase rounded-sm">
                                        {v.listingType === 'rent' ? `${v.pricePerNight}€ /" + t.villa.perNight + "` : `${v.salePrice?.toLocaleString()}€`}
                                    </div>
                                </div>
                                <h4 className="font-serif text-xl text-sbh-charcoal group-hover:text-sbh-blue transition-colors">
                                    {v.name}
                                </h4>
                                <span className="text-xs font-sans text-gray-500 uppercase tracking-widest">{v.location}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="xl:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-4 z-[10002] flex justify-between items-center shadow-[0_-5px_20px_rgba(0,0,0,0.05)] pb-6 animate-slide-up">
                <div>
                    {hasValidPrice ? (
                        <>
                            <span className="block font-serif text-xl text-sbh-charcoal">{displayPrice}€</span>
                            <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                                {isSale ? t.villa.salePrice : (villa.pricePerWeek ? t.villa.week : t.villa.perNight)}
                            </span>
                        </>
                    ) : (
                        <span className="block font-serif text-lg text-sbh-charcoal">{t.villa.priceOnRequest}</span>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    <DownloadBrochureButton villa={villa} compact />
                    <button
                        onClick={isSale ? () => onContact(villa.id) : handleMobileBookClick}
                        className="bg-sbh-charcoal text-white px-8 py-3.5 font-sans text-xs uppercase tracking-[0.2em] hover:bg-sbh-green transition-colors rounded-sm shadow-lg"
                    >
                        {isSale ? t.villa.contact : t.villa.reserve}
                    </button>
                </div>
            </div>

            {/* MOBILE BOOKING SHEET (DRAWER) - Only for rentals */}
            {!isSale && isMobileBookingOpen && (
                <div className="fixed inset-0 z-[10003] flex items-end justify-center xl:hidden">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity" onClick={() => setIsMobileBookingOpen(false)}></div>
                    <div className="bg-white w-full rounded-t-2xl p-6 relative animate-slide-up shadow-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-serif text-2xl italic text-sbh-charcoal">{t.villa.yourStay}</h3>
                            <button onClick={() => setIsMobileBookingOpen(false)} className="p-2 bg-gray-100 rounded-full">
                                <X size={20} className="text-sbh-charcoal" />
                            </button>
                        </div>

                        <div className="space-y-4 mb-6">
                            {/* Arrival */}
                            <div className="border border-gray-200 rounded-lg p-3 relative">
                                <label className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">{t.villa.arrival}</label>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-sbh-charcoal">
                                        {arrivalDate ? new Date(arrivalDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long' }) : t.villa.selectDate}
                                    </span>
                                    <Calendar size={16} className="text-sbh-green" />
                                </div>
                                <input
                                    type="date"
                                    min={today}
                                    value={arrivalDate}
                                    onChange={(e) => setArrivalDate(e.target.value)}
                                    className="absolute inset-0 w-full h-full opacity-0 z-10"
                                />
                            </div>

                            {/* Departure */}
                            <div className="border border-gray-200 rounded-lg p-3 relative">
                                <label className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">{t.villa.departure}</label>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-sbh-charcoal">
                                        {departureDate ? new Date(departureDate).toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', { day: 'numeric', month: 'long' }) : t.villa.selectDate}
                                    </span>
                                    <Calendar size={16} className="text-sbh-green" />
                                </div>
                                <input
                                    type="date"
                                    min={arrivalDate || today}
                                    value={departureDate}
                                    onChange={(e) => setDepartureDate(e.target.value)}
                                    className="absolute inset-0 w-full h-full opacity-0 z-10"
                                />
                            </div>

                            {/* Guests */}
                            <div className="border border-gray-200 rounded-lg p-3 flex justify-between items-center">
                                <div>
                                    <label className="block text-[9px] uppercase tracking-widest text-gray-400 mb-1">{t.villa.travelers}</label>
                                    <span className="text-sm font-medium text-sbh-charcoal">{guests} {t.villa.persons}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"><Minus size={14} /></button>
                                    <button onClick={() => setGuests(Math.min(villa.guests, guests + 1))} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50"><Plus size={14} /></button>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleBookingClick}
                            className="w-full bg-sbh-charcoal text-white py-4 font-sans text-xs uppercase tracking-[0.25em] hover:bg-sbh-green transition-colors rounded-sm shadow-lg mb-4"
                        >
                            {t.villa.confirmDates}
                        </button>
                    </div>
                </div>
            )}

            {/* Fullscreen Gallery */}
            {isGalleryOpen && (
                <FullscreenGallery
                    images={[villa.mainImage, ...villa.galleryImages].filter(Boolean)}
                    initialIndex={galleryStartIndex}
                    onClose={() => setIsGalleryOpen(false)}
                />
            )}

        </div>
    );
};


