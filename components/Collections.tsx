
'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useVillas } from '../hooks/useCMS';
import { MapPin, Users, Euro, Search, SlidersHorizontal, Plus, Check, Map as MapIcon, Grid, BedDouble } from 'lucide-react';
import { SunStamp } from './Decorations';
import { FilterState } from '../types';
import { VillasMapView } from './VillasMapView';
import { VillaImagePlaceholder } from './VillaImagePlaceholder';
import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface CollectionsProps {
    mode: 'rent' | 'sale';
}

export const Collections: React.FC<CollectionsProps> = ({ mode }) => {
    const { villas, loading } = useVillas();
    const { language, t } = useLanguage();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    // Initial state from URL params
    const initialFilters: FilterState = {
        location: searchParams.get('location') || 'all',
        bedrooms: parseInt(searchParams.get('bedrooms') || '1'),
        price: mode === 'rent' ? 150000 : parseInt(searchParams.get('price') || '0'),
        amenities: searchParams.get('amenities') ? searchParams.get('amenities')!.split(',') : [],
        name: searchParams.get('name') || '',
        propertyType: searchParams.get('propertyType') || 'all'
    };

    const [filters, setFilters] = useState<FilterState>(initialFilters);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false);
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const amenitiesRef = useRef<HTMLDivElement>(null);
    const prevModeRef = useRef<'rent' | 'sale'>(mode);

    // Update filters if searchParams change (e.g. navigation from home)
    useEffect(() => {
        const urlLocation = searchParams.get('location') || 'all';
        const urlBedrooms = parseInt(searchParams.get('bedrooms') || '1');
        const urlName = searchParams.get('name') || '';
        const urlAmenities = searchParams.get('amenities') ? searchParams.get('amenities')!.split(',') : [];
        const urlPropertyType = searchParams.get('propertyType') || 'all';
        const urlPrice = searchParams.get('price') ? parseInt(searchParams.get('price')!) : (mode === 'rent' ? 150000 : 0);
        const urlLandSurface = searchParams.get('landSurface') ? parseInt(searchParams.get('landSurface')!) : 0;

        // Only update if URL params are different from current filters
        setFilters(prev => {
            const amenitiesChanged = prev.amenities.length !== urlAmenities.length || !prev.amenities.every(a => urlAmenities.includes(a));

            if (
                prev.location !== urlLocation ||
                prev.bedrooms !== urlBedrooms ||
                prev.name !== urlName ||
                prev.propertyType !== urlPropertyType ||
                amenitiesChanged ||
                prev.price !== urlPrice ||
                prev.landSurface !== urlLandSurface
            ) {
                return {
                    ...prev,
                    location: urlLocation,
                    bedrooms: urlBedrooms,
                    name: urlName,
                    amenities: urlAmenities,
                    propertyType: urlPropertyType,
                    price: urlPrice,
                    landSurface: urlLandSurface
                };
            }
            return prev;
        });
    }, [searchParams]);

    // Reset filters only when mode actually changes
    useEffect(() => {
        if (prevModeRef.current !== mode) {
            setFilters({
                location: 'all',
                bedrooms: 1,
                price: mode === 'rent' ? 150000 : 0,
                amenities: [],
                name: '',
                propertyType: 'all',
                landSurface: 0
            });
            prevModeRef.current = mode;
        }
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

    const onUpdateFilters = (newFilters: FilterState) => {
        setFilters(newFilters);

        // Update URL Params to persist state on navigation
        const params = new URLSearchParams(searchParams.toString());

        if (newFilters.location && newFilters.location !== 'all') params.set('location', newFilters.location);
        else params.delete('location');

        if (newFilters.bedrooms > 1) params.set('bedrooms', newFilters.bedrooms.toString());
        else params.delete('bedrooms');

        if (newFilters.name) params.set('name', newFilters.name);
        else params.delete('name');

        if (newFilters.amenities.length > 0 && mode === 'rent') params.set('amenities', newFilters.amenities.join(','));
        else params.delete('amenities');

        if (newFilters.propertyType && newFilters.propertyType !== 'all') params.set('propertyType', newFilters.propertyType);
        else params.delete('propertyType');

        if (mode === 'sale' && newFilters.price > 0) params.set('price', newFilters.price.toString());
        else params.delete('price');

        if (mode === 'sale' && newFilters.landSurface && newFilters.landSurface > 0) params.set('landSurface', newFilters.landSurface.toString());
        else params.delete('landSurface');

        // Use scroll: false to avoid jumping to top on filter change
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    // Extract unique locations for dropdown (filtered by mode) - DYNAMIC
    const locations = useMemo(() => {
        const locs = new Set(villas.filter(v => v.listingType === mode && v.location).map(v => v.location.name));
        return ['all', ...Array.from(locs).sort()];
    }, [mode, villas]);

    // Static popular amenities list
    const popularAmenities = [
        "Piscine Chauffée",
        "Jacuzzi",
        "Court de Tennis",
        "Sauna / Hammam",
        "Salle de Fitness",
        "Accès Plage Direct",
        "Court de Padel"
    ];

    // Filter Logic
    const filteredVillas = useMemo(() => {
        return villas.filter(villa => {
            // First, filter by mode
            if (villa.listingType !== mode) return false;

            // Name Search (case-insensitive)
            const searchName = filters.name?.toLowerCase() || '';
            const matchName = !searchName || villa.name.toLowerCase().includes(searchName);

            // Location Filter
            const matchLocation = filters.location === 'all' || (villa.location && villa.location.name === filters.location);

            // Bedrooms Filter
            const matchBedrooms = villa.bedrooms >= filters.bedrooms;

            // Price Filter
            let matchPrice = true;
            if (mode === 'rent') {
                // Rental logic: <= max price per week (approximate if only night price exists)
                const effectiveWeeklyPrice = villa.pricePerWeek || ((villa.pricePerNight || 0) * 7);
                matchPrice = effectiveWeeklyPrice <= filters.price;
                // Special case for max value (150000+) - logic kept from previous implementation
                if (filters.price >= 150000) matchPrice = true;
            } else {
                // Sale logic: >= min price (price 0 = all villas, including those without price 'Prix sur demande')
                matchPrice = !villa.salePrice || villa.salePrice >= filters.price;
            }

            // Amenities Filter (AND logic) - Case Insensitive - Only for rent
            const matchAmenities = mode === 'sale' || filters.amenities.length === 0 || filters.amenities.every(filterAmenity =>
                villa.amenities.some(villaAmenity =>
                    (villaAmenity.name || '').toLowerCase() === filterAmenity.toLowerCase()
                )
            );

            // Property Type Filter
            const matchPropertyType = !filters.propertyType || filters.propertyType === 'all' || villa.propertyType === filters.propertyType;

            // Land Surface Filter (Sale only)
            const matchLandSurface = mode === 'rent' || !filters.landSurface || (villa.landSurface || 0) >= filters.landSurface;

            return matchName && matchLocation && matchBedrooms && matchPrice && matchAmenities && matchPropertyType && matchLandSurface;
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
            return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
        } catch (e) {
            return dateStr;
        }
    };

    // Determine Hero Text based on Search & Mode
    const arrival = searchParams.get('arrival');
    const departure = searchParams.get('departure');
    const guests = searchParams.get('guests');
    const isSearchActive = !!arrival && !!departure && mode === 'rent';

    let heroTitle = "";
    let heroSubtitle = "";

    if (mode === 'rent') {
        heroTitle = isSearchActive ? t.collections.availabilities : t.collections.vacationRentals;
        heroSubtitle = isSearchActive
            ? `${t.collections.from} ${formatDate(arrival || undefined)} ${t.collections.to} ${formatDate(departure || undefined)} • ${guests} ${t.collections.guests}`
            : t.collections.exclusiveSelection;
    } else {
        heroTitle = t.collections.propertiesForSale;
        heroSubtitle = t.collections.investInException;
    }

    // Price formatting helper
    const formatPrice = (price: number) => {
        if (mode === 'rent') {
            return `$${price.toLocaleString('en-US')}`;
        }
        return `${price.toLocaleString('fr-FR')}€`;
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
            <div className="relative h-[60vh] xl:h-[50vh] min-h-[400px] w-full overflow-hidden flex items-center justify-center">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2000&auto=format&fit=crop')" }}
                ></div>
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="relative z-10 text-center text-white px-6 animate-slide-up pt-20 xl:pt-0">
                    <div className="mb-6 flex justify-center opacity-80 animate-spin-slower">
                        <SunStamp className="w-20 h-20 text-white" />
                    </div>
                    <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl italic mb-4">{heroTitle}</h1>
                    <p className="font-sans text-xs md:text-sm uppercase tracking-[0.3em] opacity-90">{heroSubtitle}</p>
                </div>
            </div>

            {/* FILTERS BAR - Adjusted z-index to stay below navbar if scrolled, but above hero */}
            <div className="relative z-30 -mt-8 max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="bg-white shadow-xl rounded-lg md:rounded-full p-6 md:py-3 md:px-4 lg:p-3 flex flex-col md:flex-row items-center gap-6 md:gap-0 border border-gray-100 relative">

                    {/* Mobile Toggle Title */}
                    <div className="md:hidden w-full flex justify-between items-center border-b border-gray-100 pb-4 mb-2 cursor-pointer" onClick={() => setIsFilterOpen(!isFilterOpen)}>
                        <span className="font-serif text-lg text-sbh-charcoal">{t.collections.filters}</span>
                        <SlidersHorizontal size={18} />
                    </div>

                    {/* Filter Content (Hidden on mobile unless open) */}
                    <div className={`${isFilterOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row w-full gap-6 md:gap-0 items-center divide-y md:divide-y-0 md:divide-x divide-gray-100`}>

                        {/* Name Search */}
                        <div className="flex-1 w-full md:px-3 lg:px-6 flex flex-col justify-center">
                            <label className="text-[9px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2 whitespace-nowrap font-medium">
                                <Search size={10} /> {t.collections.properties}
                            </label>
                            <input
                                type="text"
                                value={filters.name || ''}
                                onChange={(e) => onUpdateFilters({ ...filters, name: e.target.value })}
                                placeholder={t.collections.explore}
                                className="w-full bg-transparent font-serif text-lg md:text-xs lg:text-lg text-sbh-charcoal outline-none placeholder:text-gray-400 placeholder:italic"
                            />
                        </div>

                        {/* Location */}
                        <div className="flex-1 w-full md:px-3 lg:px-6 flex flex-col justify-center border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                            <label className="text-[9px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2 whitespace-nowrap font-medium">
                                <MapPin size={10} /> {t.collections.location}
                            </label>
                            <select
                                value={filters.location}
                                onChange={(e) => onUpdateFilters({ ...filters, location: e.target.value })}
                                className="w-full bg-transparent font-serif text-lg md:text-xs lg:text-lg text-sbh-charcoal outline-none cursor-pointer capitalize appearance-none text-ellipsis"
                            >
                                <option value="all">{t.hero.allIsland}</option>
                                {locations.filter(l => l !== 'all').map(loc => (
                                    <option key={loc} value={loc}>{loc}</option>
                                ))}
                            </select>
                        </div>

                        {/* Property Type Filter (Only for Sales) */}
                        {mode === 'sale' && (
                            <div className="flex-1 w-full md:px-3 lg:px-6 flex flex-col justify-center border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                                <label className="text-[9px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2 whitespace-nowrap font-medium">
                                    <SunStamp className="w-2.5 h-2.5" /> Type de bien
                                </label>
                                <select
                                    value={filters.propertyType || 'all'}
                                    onChange={(e) => onUpdateFilters({ ...filters, propertyType: e.target.value })}
                                    className="w-full bg-transparent font-serif text-lg md:text-xs lg:text-lg text-sbh-charcoal outline-none cursor-pointer appearance-none text-ellipsis"
                                >
                                    <option value="all">Tous</option>
                                    <option value="villa">Villa</option>
                                    <option value="apartment">Appartement</option>
                                    <option value="land">Terrain</option>
                                </select>
                            </div>
                        )}

                        {/* Bedrooms Filter */}
                        <div className="flex-1 w-full md:px-3 lg:px-6 flex flex-col justify-center">
                            <label className="text-[9px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2 whitespace-nowrap font-medium">
                                <BedDouble size={10} /> {t.collections.bedroomsMin}
                            </label>
                            <div className="flex items-center gap-2 md:gap-4">
                                <input
                                    type="range" min="1" max="10" step="1"
                                    value={filters.bedrooms}
                                    onChange={(e) => onUpdateFilters({ ...filters, bedrooms: parseInt(e.target.value) })}
                                    className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sbh-green"
                                />
                                <span className="font-serif text-lg md:text-sm lg:text-lg text-sbh-charcoal w-6 md:w-8 text-right">{filters.bedrooms}</span>
                            </div>
                        </div>

                        {/* Price Filter (Only for Sales) */}
                        {mode === 'sale' && (
                            <div className="flex-1 w-full md:px-3 lg:px-6 flex flex-col justify-center border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                                <label className="text-[9px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2 whitespace-nowrap font-medium">
                                    <Euro size={10} /> {t.collections.minPrice}
                                </label>
                                <div className="flex items-center gap-2 md:gap-4">
                                    <input
                                        type="range" min="0" max="25000000" step="100000"
                                        value={filters.price}
                                        onChange={(e) => onUpdateFilters({ ...filters, price: parseInt(e.target.value) })}
                                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sbh-green"
                                    />
                                    <span className="font-serif text-lg md:text-sm lg:text-lg text-sbh-charcoal w-20 md:w-24 lg:w-24 text-right whitespace-nowrap overflow-visible">
                                        {filters.price === 0 ? t.collections.all : (
                                            filters.price >= 25000000 ? '25M€ +' :
                                                filters.price >= 1000000 ? `${filters.price / 1000000}M€` :
                                                    `${filters.price / 1000}k€`
                                        )}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Land Surface Filter (Only for Sales) */}
                        {mode === 'sale' && (
                            <div className="flex-1 w-full md:px-3 lg:px-6 flex flex-col justify-center border-t md:border-t-0 border-gray-100 pt-4 md:pt-0">
                                <label className="text-[9px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2 whitespace-nowrap font-medium">
                                    <Grid size={10} /> Surface terrain min (m²)
                                </label>
                                <div className="flex items-center gap-2 md:gap-4">
                                    <input
                                        type="range" min="0" max="5000" step="10"
                                        value={filters.landSurface || 0}
                                        onChange={(e) => onUpdateFilters({ ...filters, landSurface: parseInt(e.target.value) })}
                                        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sbh-green"
                                    />
                                    <span className="font-serif text-lg md:text-sm lg:text-lg text-sbh-charcoal w-16 text-right whitespace-nowrap overflow-visible">
                                        {(!filters.landSurface || filters.landSurface === 0) ? t.collections.all : (
                                            filters.landSurface >= 5000 ? '5000+ m²' : `${filters.landSurface} m²`
                                        )}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Amenities Filter (Only for Rent) */}
                        {mode === 'rent' && (
                            <div className="flex-1 w-full md:px-3 lg:px-6 flex flex-col justify-center relative" ref={amenitiesRef}>
                                <label className="text-[9px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-500 mb-1 flex items-center gap-2 whitespace-nowrap font-medium">
                                    <Plus size={10} /> {t.collections.amenities}
                                </label>
                                <button
                                    onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
                                    className="w-full text-left font-serif text-lg md:text-xs lg:text-lg text-sbh-charcoal outline-none cursor-pointer flex justify-between items-center"
                                >
                                    <span className="truncate">
                                        {filters.amenities.length === 0 ? t.collections.all : `${filters.amenities.length} ${t.collections.selected}`}
                                    </span>
                                    <span className={`transform transition-transform ${isAmenitiesOpen ? 'rotate-180' : ''} text-gray-400 text-xs`}>▼</span>
                                </button>

                                {/* Dropdown Panel */}
                                {isAmenitiesOpen && (
                                    <div className="absolute top-[120%] left-0 w-full md:w-[250px] bg-white rounded-lg shadow-xl border border-gray-100 p-2 z-50 animate-fade-in">
                                        <div className="space-y-1">
                                            {popularAmenities.map(amenity => (
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
                        )}

                        {/* Result Count / Reset */}
                        <div className="md:pl-3 lg:pl-6 flex items-center justify-center min-w-[80px] md:min-w-[100px] lg:min-w-[120px]">
                            <div className="text-center">
                                <span className="block font-serif text-2xl md:text-lg lg:text-2xl text-sbh-green">{filteredVillas.length}</span>
                                <span className="text-[9px] md:text-[8px] lg:text-[9px] uppercase tracking-widest text-gray-500 font-medium">{t.collections.properties}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* VIEW MODE TOGGLE*/}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-12">
                <div className="flex justify-end items-center gap-2">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'list'
                            ? 'bg-sbh-green text-white'
                            : 'bg-white text-sbh-charcoal border border-gray-200 hover:border-sbh-green'
                            }`}
                    >
                        <Grid size={16} />
                        <span className="text-xs uppercase tracking-widest">{t.collections.list}</span>
                    </button>
                    <button
                        onClick={() => setViewMode('map')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${viewMode === 'map'
                            ? 'bg-sbh-green text-white'
                            : 'bg-white text-sbh-charcoal border border-gray-200 hover:border-sbh-green'
                            }`}
                    >
                        <MapIcon size={16} />
                        <span className="text-xs uppercase tracking-widest">{t.collections.map}</span>
                    </button>
                </div>
            </div>

            {/* GRID DISPLAY OR MAP VIEW */}
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-8">
                {viewMode === 'map' ? (
                    <VillasMapView villas={filteredVillas} />
                ) : filteredVillas.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
                        {filteredVillas.map((villa) => (
                            <Link href={`/villas/${villa.id}`} key={villa.id} className="group cursor-pointer flex flex-col">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-sm mb-6">
                                    {villa.mainImage ? (
                                        <Image
                                            src={villa.mainImage}
                                            alt={villa.name}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 50vw"
                                            className="object-cover transition-transform duration-[1.5s] group-hover:scale-105"
                                        />
                                    ) : (
                                        <VillaImagePlaceholder className="w-full h-full" />
                                    )}
                                    {/* Hover info overlay */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <span className="bg-white/90 backdrop-blur px-6 py-3 text-sbh-charcoal font-sans text-xs uppercase tracking-widest rounded-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                            {t.collections.discover}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 font-serif italic text-lg text-sbh-charcoal rounded-sm">
                                        {mode === 'rent'
                                            ? (villa.pricePerWeek && villa.pricePerWeek > 0 ? `${formatPrice(villa.pricePerWeek)} ${t.collections.weekAbbrev}` : (villa.pricePerNight && villa.pricePerNight > 0 ? `${formatPrice(villa.pricePerNight)} ${t.collections.perNight}` : t.villa.priceOnRequest))
                                            : (villa.salePrice && villa.salePrice > 0 ? formatPrice(villa.salePrice) : t.villa.priceOnRequest)
                                        }
                                    </div>
                                </div>

                                <div className="flex justify-between items-end border-b border-gray-200 pb-4">
                                    <div>
                                        <h3 className="font-serif text-3xl italic text-sbh-charcoal group-hover:text-sbh-blue transition-colors mb-2">
                                            {villa.name}
                                        </h3>
                                        <div className="flex items-center gap-4 text-gray-500 text-xs font-sans tracking-widest uppercase">
                                            <span className="flex items-center gap-1"><MapPin size={12} /> {villa.location?.name || 'N/A'}</span>
                                            <span className="flex items-center gap-1">
                                                <Users size={12} /> {mode === 'rent' ? `${villa.guests} ${t.collections.guestsAbbrev}` : `${villa.bedrooms} ${t.collections.bedroomsAbbrev}`}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-4 group-hover:translate-x-0 duration-500 text-sbh-charcoal">
                                        <Search size={24} strokeWidth={1} />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 opacity-50">
                        <p className="font-serif text-3xl italic mb-4">{t.collections.noProperties}</p>
                        <button
                            onClick={() => onUpdateFilters({ location: 'all', bedrooms: 1, price: mode === 'rent' ? 5000 : 0, amenities: [], name: '', propertyType: 'all', landSurface: 0 })}
                            className="text-sbh-blue border-b border-sbh-blue pb-1 font-sans uppercase text-xs tracking-widest"
                        >
                            {t.collections.resetFilters}
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

