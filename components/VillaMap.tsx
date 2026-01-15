'use client'

import React, { useState, useEffect } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { Villa } from '../types';
import { MapPin } from 'lucide-react';

interface VillaMapProps {
    villa: Villa;
}

export function VillaMap({ villa }: VillaMapProps) {
    const [infoOpen, setInfoOpen] = React.useState(false);
    const [isMounted, setIsMounted] = useState(false);

    // Delay rendering until client-side to avoid getRootNode errors
    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

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

    // Don't render map until client is mounted
    if (!isMounted) {
        return (
            <div className="w-full h-[400px] md:h-[500px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                <div className="text-gray-400 text-sm">Chargement de la carte...</div>
            </div>
        );
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
                    <Marker
                        position={center}
                        onClick={() => setInfoOpen(true)}
                        icon={{
                            path: "M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8z", // Simple pin path
                            fillColor: "#7FB069",
                            fillOpacity: 1,
                            strokeWeight: 2,
                            strokeColor: "#FFFFFF",
                            scale: 2,
                            anchor: { x: 12, y: 21 } as any // Center bottom of the pin
                        }}
                    />

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
