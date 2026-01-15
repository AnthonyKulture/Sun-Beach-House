import React, { useState } from 'react';
import { HomeFeature } from '../types';
import { ChevronDown as ChevronDownIcon } from 'lucide-react';

interface FeatureAccordionProps {
    feature: HomeFeature;
    index: number;
}

export const FeatureAccordion: React.FC<FeatureAccordionProps> = ({ feature, index }) => {
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
                <ChevronDownIcon
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
