
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useVillas } from '../hooks/useCMS';
import { MapPin, Users, Euro, Search, SlidersHorizontal, Plus, Check } from 'lucide-react';
import { SunStamp } from './Decorations';
import { SearchParams } from '../App';
import { FilterState } from '../types';

interface CollectionsProps {
  onViewDetails: (id: string) => void;
  searchParams?: SearchParams | null;
  filters: FilterState;
  onUpdateFilters: (filters: FilterState) => void;
  mode: 'rent' | 'sale'; // New prop
}

const POPULAR_AMENITIES = [
  "Piscine Chauffée",
  "Salle de Fitness",
  "Accès Plage Direct",
  "Sunset View",
  "Jardin Tropical",
  "Cinéma Plein Air"
];

export const Collections: React.FC<CollectionsProps> = ({ onViewDetails, searchParams, filters, onUpdateFilters, mode }) => {
  const { villas, loading } = useVillas();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
  const amenitiesRef = useRef<HTMLDivElement>(null);

  // Reset filters when mode changes
  useEffect(() => {
     onUpdateFilters({
         location: 'all',
         guests: 1,
         price: mode === 'rent' ? 5000 : 25000000,
         amenities: []
     });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Close amenities dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (amenitiesRef.current && !amenitiesRef.current.contains(event.target as Node)) {
        setIsAmenitiesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Extract unique locations for dropdown (filtered by mode)
  const locations = useMemo(() => {
    const locs = new Set(villas.filter(v => v.listingType === mode).map(v => v.location));
    return ['all', ...Array.from(locs)];
  }, [mode, villas]);

  // Filter Logic
  const filteredVillas = useMemo(() => {
    return villas.filter(villa => {
      // First, filter by mode
      if (villa.listingType !== mode) return false;

      const matchLocation = filters.location === 'all' || villa.location === filters.location;
      
      // Filter by capacity (villa must accommodate at least 'guests' people)
      const matchGuests = villa.guests >= filters.guests;
      
      // Price Filter
      let matchPrice = true;
      if (mode === 'rent') {
          // Rental logic: <= max price per night
          matchPrice = (villa.pricePerNight || 0) <= filters.price;
          // Special case for max value (5000+)
          if (filters.price >= 5000) matchPrice = true;
      } else {
          // Sale logic: <= max price
          matchPrice = (villa.salePrice || 0) <= filters.price;
          if (filters.price >= 25000000) matchPrice = true;
      }

      // Amenities Filter (AND logic)
      const villaAmenityLabels = villa.amenities.map(a => a.label);
      const matchAmenities = filters.amenities.length === 0 || 
         filters.amenities.every(filter => villaAmenityLabels.includes(filter));

      return matchLocation && matchGuests && matchPrice && matchAmenities;
    });
  }, [filters, mode, villas]);

  const toggleAmenity = (amenity: string) => {
      const current = filters.amenities;
      if (current.includes(amenity)) {
          onUpdateFilters({ ...filters, amenities: current.filter(a => a !== amenity) });
      } else {
          onUpdateFilters({ ...filters, amenities: [...current, amenity] });
      }
  };

  // Scroll effect
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper for safe date formatting
  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return dateStr;
        return date.toLocaleDateString('fr-FR', {day: 'numeric', month: 'short'});
    } catch (e) {
        return dateStr;
    }
  };

  // Determine Hero Text based on Search & Mode
  const isSearchActive = !!searchParams?.arrival && !!searchParams?.departure && mode === 'rent';
  
  let heroTitle = "";
  let heroSubtitle = "";

  if (mode === 'rent') {
      heroTitle = isSearchActive ? "Disponibilités" : "Locations de Vacances";
      heroSubtitle = isSearchActive 
        ? `Du ${formatDate(searchParams?.arrival)} au ${formatDate(searchParams?.departure)} • ${searchParams?.guests} Invités`
        : "Une sélection exclusive à St. Barth";
  } else {
      heroTitle = "Propriétés à Vendre";
      heroSubtitle = "Investir dans l'exception";
  }

  // Price formatting helper
  const formatPrice = (price: number) => {
      return price.toLocaleString('fr-FR');
  };

  if (loading) {
      return (
          <div className="bg-sbh-cream min-h-screen flex items-center justify-center">
              <SunStamp className="w-16 h-16 text-sbh-green animate-spin-slower opacity-50" />
          </div>
      );
  }

  return (
    <div className="bg-sbh-cream min-h-screen animate-fade-in pb-24">
      
      {/* HERO BANNER - With Overlay fix for navbar */}
      <div className="relative h-[50vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center">
         <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2000&auto=format&fit=crop')" }}
         ></div>
         <div className="absolute inset-0 bg-black/30"></div>
         <div className="relative z-10 text-center text-white p-6 animate-slide-up mt-16">
            <div className="mb-6 flex justify-center opacity-80 animate-spin-slower">
                <SunStamp className="w-20 h-20 text-white" />
            </div>
            <h1 className="font-serif text-5xl md:text-7xl italic mb-4">{heroTitle}</h1>
            <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] opacity-90">{heroSubtitle}</p>
         </div>
      </div>

      {/* FILTERS BAR - Adjusted z-index to stay below navbar if scrolled, but above hero */}
      <div className="relative z-30 -mt-8 max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="bg-white shadow-xl rounded-lg md:rounded-full p-6 md:py-3 md:px-4 lg:p-3 flex flex-col md:flex-row items-center gap-6 md:gap-0 border border-gray-100 relative">
            
            {/* Mobile Toggle Title */}
            <div className="md:hidden w-full flex justify-between items-center border-b border-gray-100 pb-4 mb-2 cursor-pointer" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <span className="font-serif text-lg text-sbh-charcoal">Filtres</span>
                <SlidersHorizontal size={18} />
            </div>

            {/* Filter Content (Hidden on mobile unless open) */}
            <div className={`${isFilterOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full gap-6 md:gap-0 items-center divide-y md:divide-y-0 md:divide-x divide-gray-100`}>
                
                {/* Location */}
                <div className="flex-1 w-full md:px-3 lg:px-6 flex flex-col justify-center">
                    <label className="text-[9px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-2 whitespace-nowrap">
                        <MapPin size={10} /> Localisation
                    </label>
                    <select 
                        value={filters.location}
                        onChange={(e) => onUpdateFilters({ ...filters, location: e.target.value })}
                        className="w-full bg-transparent font-serif text-lg md:text-xs lg:text-lg text-sbh-charcoal outline-none cursor-pointer capitalize appearance-none text-ellipsis"
                    >
                        <option value="all">Toute l'île</option>
                        {locations.filter(l => l !== 'all').map(loc => (
                            <option key={loc} value={loc}>{loc}</option>
                        ))}
                    </select>
                </div>

                {/* Guests / Rooms */}
                <div className="flex-1 w-full md:px-3 lg:px-6 flex flex-col justify-center">
                    <label className="text-[9px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-2 whitespace-nowrap">
                        <Users size={10} /> {mode === 'rent' ? 'Capacité Min.' : 'Chambres Min.'}
                    </label>
                    <div className="flex items-center gap-2 md:gap-4">
                        <input 
                            type="range" min="1" max="10" step="1"
                            value={filters.guests} // Reusing 'guests' state for rooms/capacity
                            onChange={(e) => onUpdateFilters({ ...filters, guests: parseInt(e.target.value) })}
                            className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sbh-green"
                        />
                        <span className="font-serif text-lg md:text-sm lg:text-lg text-sbh-charcoal w-6 md:w-8 text-right">{filters.guests}</span>
                    </div>
                </div>

                {/* Price */}
                <div className="flex-1 w-full md:px-3 lg:px-6 flex flex-col justify-center">
                    <label className="text-[9px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-2 whitespace-nowrap">
                        <Euro size={10} /> {mode === 'rent' ? 'Budget Max / Nuit' : 'Budget Max'}
                    </label>
                    <div className="flex items-center gap-2 md:gap-4">
                         {mode === 'rent' ? (
                             <>
                                <input 
                                    type="range" min="500" max="5000" step="100"
                                    value={filters.price}
                                    onChange={(e) => onUpdateFilters({ ...filters, price: parseInt(e.target.value) })}
                                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sbh-charcoal"
                                />
                                <span className="font-serif text-lg md:text-xs lg:text-lg text-sbh-charcoal w-16 md:w-20 text-right whitespace-nowrap">{filters.price < 5000 ? `${filters.price}€` : 'Illimité'}</span>
                             </>
                         ) : (
                             <>
                                <input 
                                    type="range" min="1000000" max="25000000" step="1000000"
                                    value={filters.price}
                                    onChange={(e) => onUpdateFilters({ ...filters, price: parseInt(e.target.value) })}
                                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sbh-charcoal"
                                />
                                <span className="font-serif text-lg md:text-xs lg:text-lg text-sbh-charcoal w-24 md:w-28 text-right whitespace-nowrap">{(filters.price < 25000000) ? `${(filters.price/1000000).toFixed(0)}M€` : 'Illimité'}</span>
                             </>
                         )}
                        
                    </div>
                </div>

                {/* Amenities Filter */}
                <div className="flex-1 w-full md:px-3 lg:px-6 flex flex-col justify-center relative" ref={amenitiesRef}>
                     <label className="text-[9px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-400 mb-1 flex items-center gap-2 whitespace-nowrap">
                        <Plus size={10} /> Équipements
                    </label>
                    <button 
                        onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
                        className="w-full text-left font-serif text-lg md:text-xs lg:text-lg text-sbh-charcoal outline-none cursor-pointer flex justify-between items-center"
                    >
                        <span className="truncate">
                            {filters.amenities.length === 0 ? "Tous" : `${filters.amenities.length} sélectionné(s)`}
                        </span>
                        <span className={`transform transition-transform ${isAmenitiesOpen ? 'rotate-180' : ''} text-gray-400 text-xs`}>▼</span>
                    </button>

                    {/* Dropdown Panel */}
                    {isAmenitiesOpen && (
                        <div className="absolute top-[120%] left-0 w-full md:w-[250px] bg-white rounded-lg shadow-xl border border-gray-100 p-2 z-50 animate-fade-in">
                            <div className="space-y-1">
                                {POPULAR_AMENITIES.map(amenity => (
                                    <div 
                                        key={amenity}
                                        onClick={() => toggleAmenity(amenity)}
                                        className="flex items-center gap-3 p-2 hover:bg-sbh-cream rounded-md cursor-pointer transition-colors"
                                    >
                                        <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors ${filters.amenities.includes(amenity) ? 'bg-sbh-green border-sbh-green' : 'border-gray-300'}`}>
                                            {filters.amenities.includes(amenity) && <Check size={10} className="text-white" />}
                                        </div>
                                        <span className="text-sm font-sans text-sbh-charcoal">{amenity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Result Count / Reset */}
                <div className="md:pl-3 lg:pl-6 flex items-center justify-center min-w-[80px] md:min-w-[100px] lg:min-w-[120px]">
                    <div className="text-center">
                         <span className="block font-serif text-2xl md:text-lg lg:text-2xl text-sbh-green">{filteredVillas.length}</span>
                         <span className="text-[9px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-400">Propriétés</span>
                    </div>
                </div>
            </div>
        </div>
      </div>

      {/* GRID DISPLAY */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-20 md:mt-32">
        {filteredVillas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                {filteredVillas.map((villa) => (
                    <div key={villa.id} className="group cursor-pointer flex flex-col" onClick={() => onViewDetails(villa.id)}>
                        <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6">
                            <img 
                                src={villa.mainImage} 
                                alt={villa.name} 
                                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                            />
                            {/* Hover info overlay */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <span className="bg-white/90 backdrop-blur px-6 py-3 text-sbh-charcoal font-sans text-xs uppercase tracking-widest rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    Découvrir
                                </span>
                            </div>
                            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 font-serif italic text-lg text-sbh-charcoal rounded-sm">
                                {mode === 'rent' ? `${villa.pricePerNight}€` : `${formatPrice(villa.salePrice || 0)}€`}
                            </div>
                        </div>
                        
                        <div className="flex justify-between items-end border-b border-gray-200 pb-4">
                            <div>
                                <h3 className="font-serif text-3xl italic text-sbh-charcoal group-hover:text-sbh-blue transition-colors mb-2">
                                    {villa.name}
                                </h3>
                                <div className="flex items-center gap-4 text-gray-500 text-xs font-sans tracking-widest uppercase">
                                    <span className="flex items-center gap-1"><MapPin size={12}/> {villa.location}</span>
                                    <span className="flex items-center gap-1">
                                        <Users size={12}/> {mode === 'rent' ? `${villa.guests} Pers.` : `${villa.bedrooms} Ch.`}
                                    </span>
                                </div>
                            </div>
                            <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-500 text-sbh-charcoal">
                                <Search size={24} strokeWidth={1} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        ) : (
            <div className="text-center py-32 opacity-50">
                <p className="font-serif text-3xl italic mb-4">Aucune propriété ne correspond à vos critères.</p>
                <button 
                    onClick={() => onUpdateFilters({ location: 'all', guests: 1, price: mode === 'rent' ? 5000 : 25000000, amenities: [] })}
                    className="text-sbh-blue border-b border-sbh-blue pb-1 font-sans uppercase text-xs tracking-widest"
                >
                    Réinitialiser les filtres
                </button>
            </div>
        )}
      </div>

    </div>
  );
};
