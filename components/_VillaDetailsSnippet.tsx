import React, { useEffect, useState, useRef } from 'react';
import { Villa, HomeFeature } from '../types';
import { useVillas } from '../hooks/useCMS';
import {
    MapPin, Users, BedDouble, Bath, Square,
    Wind, Waves, Coffee, ChefHat, Car, Droplets, Sun,
    Flower2, Speaker, Dumbbell, Tv, Shield, Utensils,
    ShoppingBag, Martini, Music, Key, Star, Calendar, Check,
    Minus, Plus, ArrowLeft, X, Mail, ChevronDown
} from 'lucide-react';
import { SunStamp } from './Decorations';
import { DownloadBrochureButton } from './DownloadBrochureButton';
import { VillaMap } from './VillaMap';
import { FullscreenGallery } from './FullscreenGallery';
import { VillaImagePlaceholder } from './VillaImagePlaceholder';

// Feature Accordion Component
const FeatureAccordion: React.FC<{ feature: HomeFeature, index: number }> = ({ feature, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-sbh-charcoal/10 rounded-sm overflow-hidden" style={{ transitionDelay: `${index * 50}ms` }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex justify-between items-center bg-sbh-cream hover:bg-sbh-green/5 transition-colors text-left"
            >
                <span className="font-sans text-sm font-medium text-sbh-charcoal">
                    {feature.title}
                </span>
                <ChevronDown
                    className={`transition-transform duration-300 text-sbh-charcoal/60 ${isOpen ? 'rotate-180' : ''}`}
                    size={20}
                />
            </button>

            {isOpen && (
                <div className="px-6 py-4 bg-white text-sbh-charcoal/80 font-sans text-sm leading-relaxed animate-fade-in">
                    {feature.description}
                </div>
            )}
        </div>
    );
};
