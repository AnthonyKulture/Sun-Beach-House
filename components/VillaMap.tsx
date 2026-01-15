'use client'

import React from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { Villa } from '../types';
import { MapPin } from 'lucide-react';

interface VillaMapProps {
    villa: Villa;
}

export function VillaMap({ villa }: VillaMapProps) {
    const [infoOpen, setInfoOpen] = React.useState(false);

    if (!villa.geopoint) {
        return (
            <div className="bg-sbh-cream/30 rounded-lg p-8 text-center border border-sbh-green/20">
                <MapPin className="w-8 h-8 mx-auto mb-3 text-sbh-green/40" />
                <p className="text-sm text-sbh-charcoal/60">
                    Localisation précise disponible sur demande
                </p>
            </div>
        );
    }

    const { lat, lng } = villa.geopoint;
    const center = { lat, lng };

    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
        console.error('Google Maps API key not found');
        return null;
    }

    return (
        <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-lg">
            <APIProvider apiKey={apiKey}>
                <Map
                    defaultCenter={center}
                    defaultZoom={15}
                    mapId="villa-map"
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
                        }
                    ]}
                >
                    <AdvancedMarker
                        position={center}
                        onClick={() => setInfoOpen(true)}
                    >
                        <div className="relative">
                            {/* Custom marker with villa icon */}
                            <div className="w-10 h-10 bg-sbh-green rounded-full flex items-center justify-center shadow-lg border-2 border-white cursor-pointer hover:scale-110 transition-transform">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            {/* Pulsing ring */}
                            <div className="absolute inset-0 w-10 h-10 bg-sbh-green/30 rounded-full animate-ping" />
                        </div>
                    </AdvancedMarker>

                    {infoOpen && (
                        <InfoWindow
                            position={center}
                            onCloseClick={() => setInfoOpen(false)}
                        >
                            <div className="p-2 max-w-xs">
                                <h3 className="font-serif text-lg mb-1">{villa.name}</h3>
                                <p className="text-sm text-gray-600 mb-2">{villa.location}</p>
                                {villa.pricePerNight && (
                                    <p className="text-sm font-medium text-sbh-green">
                                        À partir de {villa.pricePerNight}€ / nuit
                                    </p>
                                )}
                                {villa.salePrice && (
                                    <p className="text-sm font-medium text-sbh-green">
                                        {villa.salePrice.toLocaleString('fr-FR')}€
                                    </p>
                                )}
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>
        </div>
    );
}
