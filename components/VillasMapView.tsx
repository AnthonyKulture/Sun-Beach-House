'use client'

import React from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { Villa } from '../types';
import { MapPin, Eye } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface VillasMapViewProps {
    villas: Villa[];
    onViewDetails: (id: string) => void;
}

export function VillasMapView({ villas, onViewDetails }: VillasMapViewProps) {
    const { language } = useLanguage();
    const [selectedVilla, setSelectedVilla] = React.useState<Villa | null>(null);

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
                    {villasWithLocation.map((villa) => {
                        if (!villa.geopoint) return null;

                        const { lat, lng } = villa.geopoint;
                        const isSelected = selectedVilla?.id === villa.id;

                        return (
                            <React.Fragment key={villa.id}>
                                <AdvancedMarker
                                    position={{ lat, lng }}
                                    onClick={() => setSelectedVilla(villa)}
                                >
                                    <div className="relative">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md border-2 border-white cursor-pointer transition-all ${isSelected
                                                ? 'bg-sbh-blue scale-125'
                                                : 'bg-sbh-green hover:bg-sbh-blue hover:scale-110'
                                                }`}
                                        >
                                            <MapPin className="w-5 h-5 text-white" />
                                        </div>
                                        {isSelected && (
                                            <div className="absolute inset-0 w-8 h-8 bg-sbh-blue/30 rounded-full animate-ping" />
                                        )}
                                    </div>
                                </AdvancedMarker>

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
                                                {villa.location} • {villa.bedrooms} ch • {villa.guests} pers
                                            </p>
                                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                                                {villa.description[language]}
                                            </p>
                                            <div className="flex items-center justify-between gap-3">
                                                {((villa.pricePerWeek && villa.pricePerWeek > 0) || (villa.pricePerNight && villa.pricePerNight > 0)) ? (
                                                    <p className="text-sm font-medium text-sbh-green">
                                                        {(villa.pricePerWeek && villa.pricePerWeek > 0)
                                                            ? `$${villa.pricePerWeek.toLocaleString()} / semaine`
                                                            : `$${villa.pricePerNight} / nuit`}
                                                    </p>
                                                ) : (
                                                    <p className="text-sm font-medium text-sbh-green">
                                                        {villa.salePrice ? `${villa.salePrice.toLocaleString('fr-FR')}€` : 'Prix sur demande'}
                                                    </p>
                                                )}
                                                <button
                                                    onClick={() => onViewDetails(villa.id)}
                                                    className="flex items-center gap-1 px-3 py-1 bg-sbh-green text-white text-xs rounded hover:bg-sbh-blue transition-colors"
                                                >
                                                    <Eye className="w-3 h-3" />
                                                    Voir
                                                </button>
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
