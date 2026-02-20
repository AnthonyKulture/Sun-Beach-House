'use client'

import React, { useState, useRef, useEffect } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { Villa } from '../types';
import { useVillas } from '../hooks/useCMS';
import { useLanguage } from '../contexts/LanguageContext';
import { MapPin, Users, BedDouble, Bath, X } from 'lucide-react';
import Link from 'next/link';

interface VillasMapViewProps {
    villas?: Villa[];
}

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '';

const SBH_CENTER = { lat: 17.9, lng: -62.83 };

// Helper to extract description text (handles both old {fr, en} and new string formats)
const getDescriptionText = (description: string | { fr: string; en: string }, language: string): string => {
    if (typeof description === 'string') {
        return description;
    }
    return description[language as 'fr' | 'en'] || description.fr || '';
};

export function VillasMapView({ villas: propVillas }: VillasMapViewProps) {
    const { language, t } = useLanguage();
    const { villas: fetchedVillas, loading: hookLoading, error: hookError } = useVillas();

    // Use passed villas if provided, otherwise fallback to fetched villas
    const villas = propVillas || fetchedVillas;
    const loading = propVillas ? false : hookLoading;
    const error = propVillas ? null : hookError;
    const [selectedVilla, setSelectedVilla] = React.useState<Villa | null>(null);
    const [mapReady, setMapReady] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Delay marker rendering to ensure map is fully mounted
    useEffect(() => {
        const timer = setTimeout(() => {
            setMapReady(true);
        }, 500); // Small delay to let map initialize
        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return (
            <div className="bg-sbh-cream/30 rounded-lg p-12 text-center border border-sbh-green/20 h-[600px] flex flex-col items-center justify-center">
                <p className="text-lg text-sbh-charcoal/60">Chargement des villas...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-sbh-cream/30 rounded-lg p-12 text-center border border-sbh-green/20 h-[600px] flex flex-col items-center justify-center">
                <p className="text-lg text-red-600">Erreur lors du chargement des villas.</p>
            </div>
        );
    }

    // Filter villas that have geolocation
    const villasWithLocation = villas.filter(v => v.geopoint);

    if (villasWithLocation.length === 0) {
        return (
            <div className="bg-sbh-cream/30 rounded-lg p-12 text-center border border-sbh-green/20 h-[600px] flex flex-col items-center justify-center">
                <MapPin className="w-12 h-12 mx-auto mb-4 text-sbh-green/40" />
                <p className="text-lg text-sbh-charcoal/60">
                    Aucune villa avec localisation disponible
                </p>
            </div>
        );
    }

    // Calculate center and bounds
    const bounds = villasWithLocation.reduce(
        (acc, villa) => {
            if (!villa.geopoint) return acc;
            return {
                north: Math.max(acc.north, villa.geopoint.lat),
                south: Math.min(acc.south, villa.geopoint.lat),
                east: Math.max(acc.east, villa.geopoint.lng),
                west: Math.min(acc.west, villa.geopoint.lng),
            };
        },
        { north: -90, south: 90, east: -180, west: 180 }
    );

    // Center on Saint-Barthélemy island for a nice overview
    const center = {
        lat: 17.9,
        lng: -62.83,
    };

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;



    if (!apiKey) {
        console.error('Google Maps API key not found');
        return null;
    }

    if (!isMounted) {
        return (
            <div className="w-full h-[600px] md:h-[700px] rounded-lg overflow-hidden shadow-xl bg-gray-100 flex items-center justify-center">
                <p className="text-gray-400">Chargement de la carte...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-[600px] md:h-[700px] rounded-lg overflow-hidden shadow-xl">
            <APIProvider apiKey={apiKey}>
                <Map
                    defaultCenter={center}
                    defaultZoom={13.5}
                    mapId="villas-map"
                    disableDefaultUI={false}
                    zoomControl={true}
                    mapTypeControl={false}
                    streetViewControl={false}
                    fullscreenControl={true}
                    gestureHandling="greedy"
                    styles={[
                        {
                            featureType: 'all',
                            elementType: 'geometry',
                            stylers: [{ saturation: -10 }]
                        },
                        {
                            featureType: 'water',
                            elementType: 'geometry.fill',
                            stylers: [{ color: '#a3c5d9' }]
                        },
                        {
                            featureType: 'poi',
                            elementType: 'labels',
                            stylers: [{ visibility: 'off' }]
                        }
                    ]}
                >
                    {mapReady && villasWithLocation.map((villa) => {
                        if (!villa.geopoint) return null;

                        const { lat, lng } = villa.geopoint;
                        const isSelected = selectedVilla?.id === villa.id;

                        return (
                            <React.Fragment key={villa.id}>
                                <Marker
                                    position={{ lat, lng }}
                                    onClick={() => setSelectedVilla(villa)}
                                    icon={{
                                        path: 0, // CIRCLE
                                        scale: isSelected ? 12 : 10,
                                        fillColor: isSelected ? '#4A90E2' : '#7FB069',
                                        fillOpacity: 1,
                                        strokeColor: '#ffffff',
                                        strokeWeight: 2,
                                    }}
                                />

                                {isSelected && (
                                    <InfoWindow
                                        position={{ lat, lng }}
                                        onCloseClick={() => setSelectedVilla(null)}
                                    >
                                        <div className="p-3 max-w-sm">
                                            <h3 className="font-serif text-lg mb-1 text-sbh-charcoal">
                                                {villa.name}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2">
                                                {villa.location.name} • {villa.bedrooms} {t.collections.bedroomsAbbrev} • {villa.guests} {t.collections.guestsAbbrev}
                                            </p>
                                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                                                {getDescriptionText(villa.description, language)}
                                            </p>
                                            <div className="flex items-center justify-between gap-3">
                                                {villa.listingType === 'sale' ? (
                                                    <p className="text-sm font-medium text-sbh-blue">
                                                        {villa.salePrice && villa.salePrice > 0 ? `${villa.salePrice.toLocaleString('fr-FR')}€` : t.villa.priceOnRequest}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm font-medium text-sbh-green">
                                                        {villa.pricePerWeek && villa.pricePerWeek > 0
                                                            ? `$${villa.pricePerWeek.toLocaleString('en-US')} ${t.collections.perWeek}`
                                                            : villa.pricePerNight && villa.pricePerNight > 0
                                                                ? `$${villa.pricePerNight.toLocaleString('en-US')} ${t.collections.perNight}`
                                                                : t.villa.priceOnRequest}
                                                    </p>
                                                )}
                                                <Link
                                                    href={`/villas/${villa.id}`}
                                                    className="text-xs bg-sbh-green text-white px-3 py-1 rounded hover:bg-sbh-blue transition-colors"
                                                >
                                                    Voir
                                                </Link>
                                            </div>
                                        </div>
                                    </InfoWindow>
                                )}
                            </React.Fragment>
                        );
                    })}
                </Map>
            </APIProvider>
        </div>
    );
}
