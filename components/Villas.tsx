
import React from 'react';
import { Villa } from '../types';
import { useVillas } from '../hooks/useCMS';
import { OrganicLine, NorthStar, SunStamp } from './Decorations';

interface VillasProps {
    onViewDetails: (id: string) => void;
    onNavigateToCollections: () => void;
}

export const Villas: React.FC<VillasProps> = ({ onViewDetails, onNavigateToCollections }) => {
  const { villas, loading } = useVillas();
  
  // Filtrer les villas de location qui sont marquées pour la page d'accueil
  // et les trier par homepageOrder (1, 2, 3, 4)
  const featuredVillas = villas
    .filter(v => v.listingType === 'rent' && v.featuredOnHomepage && v.homepageOrder)
    .sort((a, b) => (a.homepageOrder || 999) - (b.homepageOrder || 999))
    .slice(0, 4); // Limiter à 4 villas maximum
  
  // Fallback : si aucune villa n'est marquée, utiliser les 4 premières locations
  const rentalVillas = featuredVillas.length > 0 
    ? featuredVillas 
    : villas.filter(v => v.listingType === 'rent').slice(0, 4);

  if (loading) {
      return (
          <section className="bg-sbh-cream h-[80vh] flex items-center justify-center">
              <div className="animate-spin-slower text-sbh-green opacity-50">
                  <SunStamp className="w-16 h-16" />
              </div>
          </section>
      );
  }

  return (
    <section id="villas" className="bg-sbh-cream py-24 md:py-40 px-6 md:px-12 relative overflow-hidden">
      
      {/* Decorative Organic Lines Background */}
      <div className="absolute top-1/4 left-0 w-full opacity-30 pointer-events-none text-sbh-green/40">
        <OrganicLine className="w-full h-auto" />
      </div>
      <div className="absolute bottom-1/4 left-0 w-full opacity-20 pointer-events-none text-sbh-blue/30 scale-x-[-1]">
        <OrganicLine className="w-full h-auto" />
      </div>

      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sbh-green/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="max-w-[1600px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-24 md:mb-40 reveal-on-scroll">
            <h2 className="font-serif text-4xl md:text-6xl font-light text-sbh-charcoal leading-[0.9] relative">
                <span className="absolute -top-12 -left-8 text-sbh-green/50 animate-pulse hidden md:block">
                    <NorthStar className="w-8 h-8" />
                </span>
                Collection <br/>
                <span className="italic text-5xl md:text-7xl text-sbh-green ml-0 md:ml-12 block mt-4">Exclusive</span>
            </h2>
            <div className="hidden md:block w-px h-32 bg-sbh-charcoal/10 mr-12"></div>
        </div>

        {/* Extreme Asymmetrical Grid on Desktop, Single Col on Mobile 
            UPDATED: Constrained max-width on containers to reduce visual size
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-y-24 md:gap-y-32 md:gap-x-12">
            
            {/* Item 1 - Col 2-5 (Left, Offset 1) */}
            {rentalVillas[0] && (
            <div className="md:col-span-4 md:col-start-2 md:mt-0 flex justify-center md:block">
               <div className="max-w-[360px] md:max-w-none w-full">
                 <VillaCard villa={rentalVillas[0]} number="01" onClick={() => onViewDetails(rentalVillas[0].id)} delay="0ms" />
               </div>
            </div>
            )}

            {/* Item 2 - Col 8-11 (Right, Offset from right) - Pushed Down */}
            {rentalVillas[1] && (
            <div className="md:col-span-4 md:col-start-8 md:mt-48 relative flex justify-center md:block">
               <div className="absolute -right-12 top-[-50px] text-sbh-blue/20 animate-spin-slower hidden md:block">
                    <NorthStar className="w-16 h-16" />
               </div>
               <div className="max-w-[360px] md:max-w-none w-full">
                  <VillaCard villa={rentalVillas[1]} number="02" onClick={() => onViewDetails(rentalVillas[1].id)} delay="200ms" />
               </div>
            </div>
            )}

            {/* Item 3 - Col 2-5 (Left-Center) */}
            {rentalVillas[2] && (
            <div className="md:col-span-4 md:col-start-3 md:-mt-12 flex justify-center md:block">
               <div className="max-w-[360px] md:max-w-none w-full">
                  <VillaCard villa={rentalVillas[2]} number="03" onClick={() => onViewDetails(rentalVillas[2].id)} delay="100ms" />
               </div>
            </div>
            )}

             {/* Item 4 - Col 7-10 (Right-Center) */}
             {rentalVillas[3] && (
             <div className="md:col-span-4 md:col-start-8 md:mt-32 flex justify-center md:block">
               <div className="max-w-[360px] md:max-w-none w-full">
                   <VillaCard villa={rentalVillas[3]} number="04" onClick={() => onViewDetails(rentalVillas[3].id)} delay="300ms" />
               </div>
            </div>
            )}

        </div>

        {/* Footer Link */}
        <div className="mt-24 md:mt-48 flex justify-center reveal-on-scroll relative" style={{ transitionDelay: '200ms' }}>
            <div className="hidden md:block absolute top-[-50px] h-[50px] w-px bg-sbh-charcoal/10"></div>
            <button onClick={onNavigateToCollections} className="font-sans text-sm uppercase tracking-[0.3em] text-sbh-charcoal border border-sbh-charcoal/30 px-12 py-6 hover:bg-sbh-green hover:text-sbh-charcoal hover:border-sbh-green transition-all duration-500 rounded-full bg-sbh-cream z-10 touch-target text-center w-full md:w-auto">
                Parcourir toutes les villas
            </button>
        </div>
      </div>
    </section>
  );
};

const VillaCard: React.FC<{ villa: Villa; number: string; onClick: () => void; delay?: string }> = ({ villa, number, onClick, delay = '0ms' }) => (
    <div className="group cursor-pointer reveal-on-scroll" onClick={onClick} style={{ transitionDelay: delay }}>
        <div className="flex items-baseline justify-between mb-4 border-b border-gray-300 pb-2">
             <span className="font-sans text-[10px] text-sbh-green tracking-widest font-bold">NO. {number}</span>
             <span className="font-serif italic text-lg text-sbh-charcoal group-hover:text-sbh-blue transition-colors">{villa.name}</span>
        </div>
        
        {/* Image Container */}
        <div className="img-zoom-wrapper relative aspect-[3/4] bg-gray-100 overflow-hidden rounded-sm shadow-md hover:shadow-xl transition-shadow duration-500">
            <img 
                src={villa.mainImage} 
                alt={villa.name} 
                className="w-full h-full object-cover"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-sbh-green/20 group-hover:bg-sbh-green/30 transition-colors duration-500 opacity-0 group-hover:opacity-100 mix-blend-multiply"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="font-serif text-white text-xl italic drop-shadow-md border-b border-white pb-1">Découvrir</span>
            </div>
        </div>

        <div className="mt-6 flex justify-between items-start">
            <div className="flex flex-col gap-1">
                <span className="font-sans text-xs tracking-[0.2em] uppercase text-sbh-stone font-medium">
                    {villa.description}
                </span>
                <div className="flex flex-wrap gap-2">
                    {villa.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[10px] text-gray-400">#{tag}</span>
                    ))}
                </div>
            </div>
            <span className="font-sans text-sm tracking-wider text-sbh-charcoal font-semibold">
                {villa.pricePerNight}€ <span className="text-gray-400 text-[10px] font-normal lowercase">/ nuit</span>
            </span>
        </div>
    </div>
);
