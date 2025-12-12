import React, { useState, useRef } from 'react';
import { Search, Calendar, Users, ChevronDown, Plus, Minus } from 'lucide-react';
import { SunStamp } from './Decorations';

interface HeroProps {
  onSearch?: (arrival: string, departure: string, guests: number) => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [guests, setGuests] = useState(2);
  const [isGuestOpen, setIsGuestOpen] = useState(false);
  const [arrivalDate, setArrivalDate] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  
  const arrivalRef = useRef<HTMLInputElement>(null);
  const departureRef = useRef<HTMLInputElement>(null);

  const handleSearchClick = () => {
    if (onSearch) {
      onSearch(arrivalDate, departureDate, guests);
    }
  };

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <section className="relative w-full h-screen min-h-[700px] overflow-hidden bg-sbh-cream">
      
      {/* =========================================
          BACKGROUND IMAGE (FULL SCREEN)
      ========================================= */}
      <div className="absolute inset-0 w-full h-full z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center animate-fade-in duration-[2s]"
            style={{ 
                backgroundImage: "url('https://storage.googleapis.com/images-sbh/hero-sbh.jpg')",
                backgroundPosition: "center center"
            }}
          ></div>
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
      </div>

      {/* =========================================
          CONTENT CONTAINER
      ========================================= */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-6 md:px-12">
        
        <div className="mb-8 text-sbh-cream/90 animate-spin-slower opacity-90">
            <SunStamp className="w-24 h-24 md:w-32 md:h-32" />
        </div>

        <div className="text-center mb-12 md:mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center justify-center gap-4 mb-4">
                <span className="h-px w-8 bg-sbh-cream/80"></span>
                <span className="font-sans text-[10px] md:text-sm tracking-[0.4em] uppercase text-sbh-cream font-medium drop-shadow-md">
                    Saint-Barthélemy
                </span>
                <span className="h-px w-8 bg-sbh-cream/80"></span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-sbh-cream font-light leading-[1.1] drop-shadow-xl tracking-tight">
              L'élégance <br className="md:hidden" />
              <span className="italic text-4xl md:text-6xl lg:text-7xl ml-2">française</span>
            </h1>
        </div>

        {/* =========================================
            SEARCH BAR (FLOATING WIDGET)
        ========================================= */}
        <div className="w-full max-w-4xl animate-slide-up relative z-50 flex justify-center" style={{ animationDelay: '0.4s' }}>
            
            {/* Desktop / Tablet Bar - Optimized for Tablet (md) to be smaller */}
            <div className="hidden md:flex w-full bg-sbh-dark/60 backdrop-blur-xl border border-sbh-cream/20 rounded-full p-1.5 shadow-2xl items-center relative">
                
                {/* Arrival Date */}
                <div className="flex-1 px-4 lg:px-6 border-r border-sbh-cream/10 hover:bg-white/5 transition-colors rounded-l-full cursor-pointer group py-2 relative h-14 flex flex-col justify-center">
                    <label className="block text-[8px] lg:text-[9px] uppercase tracking-widest text-sbh-green mb-0.5 font-medium drop-shadow-sm opacity-90 cursor-pointer">Arrivée</label>
                    <div className="flex items-center gap-2 text-sbh-cream">
                        <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-sbh-blue opacity-80" />
                        <span className="font-serif text-sm lg:text-base font-normal tracking-wide drop-shadow-md truncate">
                            {arrivalDate ? new Date(arrivalDate).toLocaleDateString('fr-FR', {day: 'numeric', month: 'short'}) : 'Date'}
                        </span>
                    </div>
                    {/* Interactive Input Overlay */}
                    <input 
                        ref={arrivalRef}
                        type="date" 
                        min={today}
                        className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer appearance-none"
                        value={arrivalDate}
                        onChange={(e) => setArrivalDate(e.target.value)}
                    />
                </div>

                {/* Departure Date */}
                <div className="flex-1 px-4 lg:px-6 border-r border-sbh-cream/10 hover:bg-white/5 transition-colors cursor-pointer group py-2 relative h-14 flex flex-col justify-center">
                    <label className="block text-[8px] lg:text-[9px] uppercase tracking-widest text-sbh-green mb-0.5 font-medium drop-shadow-sm opacity-90 cursor-pointer">Départ</label>
                    <div className="flex items-center gap-2 text-sbh-cream">
                        <Calendar className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-sbh-blue opacity-80" />
                        <span className="font-serif text-sm lg:text-base font-normal tracking-wide drop-shadow-md truncate">
                             {departureDate ? new Date(departureDate).toLocaleDateString('fr-FR', {day: 'numeric', month: 'short'}) : 'Date'}
                        </span>
                    </div>
                    {/* Interactive Input Overlay */}
                    <input 
                        ref={departureRef}
                        type="date" 
                        min={arrivalDate || today}
                        className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer appearance-none"
                        value={departureDate}
                        onChange={(e) => setDepartureDate(e.target.value)}
                    />
                </div>

                {/* Guests */}
                <div className="flex-1 px-4 lg:px-6 hover:bg-white/5 transition-colors cursor-pointer group py-2 relative h-14 flex flex-col justify-center">
                    <div onClick={() => setIsGuestOpen(!isGuestOpen)} className="h-full w-full flex flex-col justify-center relative z-20">
                        <label className="block text-[8px] lg:text-[9px] uppercase tracking-widest text-sbh-green mb-0.5 font-medium drop-shadow-sm opacity-90 cursor-pointer">Invités</label>
                        <div className="flex items-center justify-between text-sbh-cream">
                            <div className="flex items-center gap-2">
                                <Users className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-sbh-blue opacity-80" />
                                <span className="font-serif text-sm lg:text-base font-normal tracking-wide drop-shadow-md truncate">{guests} Voyageurs</span>
                            </div>
                            <ChevronDown size={12} className={`opacity-60 transition-transform ${isGuestOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </div>

                    {/* Dropdown Panel */}
                    {isGuestOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsGuestOpen(false)}></div>
                            <div className="absolute top-[120%] left-0 w-full bg-white rounded-xl shadow-2xl border border-gray-100 p-4 animate-fade-in text-sbh-charcoal z-40">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-sans font-medium uppercase tracking-wider">Adultes</span>
                                    <div className="flex items-center gap-3">
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setGuests(Math.max(1, guests - 1)); }}
                                            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-sbh-cream hover:border-sbh-green transition-colors touch-target"
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <span className="text-sm font-medium w-4 text-center">{guests}</span>
                                        <button 
                                            onClick={(e) => { e.stopPropagation(); setGuests(guests + 1); }}
                                            className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-sbh-cream hover:border-sbh-green transition-colors touch-target"
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Search Button */}
                <button 
                    onClick={handleSearchClick}
                    className="bg-sbh-cream hover:bg-white text-sbh-charcoal px-4 lg:px-6 rounded-full font-sans text-[9px] lg:text-[10px] uppercase tracking-[0.2em] font-bold transition-all duration-300 flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 group ml-1 h-11 relative z-20 whitespace-nowrap"
                >
                    <Search className="w-3.5 h-3.5 lg:w-4 lg:h-4 text-sbh-blue group-hover:scale-110 transition-transform" />
                    <span className="mt-px">Rechercher</span>
                </button>
            </div>

            {/* Mobile Stack */}
            <div className="md:hidden w-full max-w-[320px]">
                 <div className="bg-sbh-dark/80 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl overflow-hidden">
                    
                    {/* Row 1: Dates */}
                    <div className="flex border-b border-white/5">
                        <div className="flex-1 p-3 border-r border-white/5 relative active:bg-white/5 transition-colors">
                             <label className="block text-[9px] uppercase tracking-widest text-sbh-green/70 mb-1">Arrivée</label>
                             <div className="text-sbh-cream text-sm font-serif font-normal truncate">
                                {arrivalDate ? new Date(arrivalDate).toLocaleDateString('fr-FR', {day: 'numeric', month: 'short'}) : 'Date'}
                             </div>
                             <input 
                                ref={arrivalRef}
                                type="date" 
                                min={today}
                                className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer appearance-none" 
                                value={arrivalDate}
                                onChange={(e) => setArrivalDate(e.target.value)}
                            />
                        </div>
                        
                        <div className="flex-1 p-3 relative active:bg-white/5 transition-colors">
                             <label className="block text-[9px] uppercase tracking-widest text-sbh-green/70 mb-1">Départ</label>
                             <div className="text-sbh-cream text-sm font-serif font-normal truncate">
                                {departureDate ? new Date(departureDate).toLocaleDateString('fr-FR', {day: 'numeric', month: 'short'}) : 'Date'}
                             </div>
                             <input 
                                ref={departureRef}
                                type="date" 
                                min={arrivalDate || today}
                                className="absolute inset-0 w-full h-full opacity-0 z-30 cursor-pointer appearance-none" 
                                value={departureDate}
                                onChange={(e) => setDepartureDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Row 2: Guests & Action */}
                    <div className="flex h-12">
                        <div 
                            className="flex-[1.5] p-3 relative flex flex-col justify-center active:bg-white/5 transition-colors border-r border-white/5"
                            onClick={() => setIsGuestOpen(!isGuestOpen)}
                        >
                             <label className="block text-[9px] uppercase tracking-widest text-sbh-green/70 mb-1">Invités</label>
                             <div className="text-sbh-cream text-sm font-serif font-normal flex items-center justify-between">
                                <span>{guests} Voyageurs</span>
                             </div>
                        </div>

                        <button 
                            onClick={handleSearchClick}
                            className="flex-1 bg-sbh-cream hover:bg-white text-sbh-charcoal font-sans text-[10px] uppercase tracking-widest font-bold transition-colors flex items-center justify-center gap-2"
                        >
                            <Search size={14} />
                            <span className="hidden sm:inline">Go</span>
                        </button>
                    </div>

                    {/* Guest Dropdown (Mobile) */}
                    {isGuestOpen && (
                        <div className="bg-white p-4 border-t border-gray-100 flex justify-between items-center text-sbh-charcoal animate-fade-in relative z-30">
                            <span className="text-xs uppercase font-bold tracking-widest">Adultes</span>
                            <div className="flex gap-4 items-center">
                                <button 
                                    onClick={(e) => {e.stopPropagation(); setGuests(Math.max(1, guests-1))}} 
                                    className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all touch-target"
                                >
                                    <Minus size={12}/>
                                </button>
                                <span className="text-base font-serif w-4 text-center">{guests}</span>
                                <button 
                                    onClick={(e) => {e.stopPropagation(); setGuests(guests+1)}} 
                                    className="w-8 h-8 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 active:scale-95 transition-all touch-target"
                                >
                                    <Plus size={12}/>
                                </button>
                            </div>
                        </div>
                    )}
                 </div>
            </div>

        </div>

        <div className="absolute bottom-8 text-sbh-cream/70 font-sans text-xs tracking-widest uppercase animate-fade-in hidden md:block drop-shadow-md">
            Collection Exclusive 2025
        </div>

      </div>
    </section>
  );
};