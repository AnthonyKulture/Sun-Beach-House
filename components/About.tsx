import React, { useState } from 'react';
import { PalmLeaf, SunStamp } from './Decorations';

interface AboutProps {
    onNavigate: (page: string) => void;
}

export const About: React.FC<AboutProps> = ({ onNavigate }) => {
  return (
    <section id="about" className="py-24 md:py-40 px-6 md:px-12 bg-white text-sbh-charcoal overflow-hidden relative">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-10 right-[-10%] select-none pointer-events-none opacity-[0.04]">
        <span className="font-serif italic text-[10rem] md:text-[15rem] leading-none text-sbh-blue">Vision</span>
      </div>
      
      {/* Abstract Palm Leaf - Left side decoration */}
      <div className="absolute top-1/3 left-[-50px] w-[400px] h-[500px] text-sbh-green/30 pointer-events-none rotate-12 mix-blend-multiply opacity-60 hidden md:block">
        <PalmLeaf />
      </div>

      <div className="max-w-[1400px] mx-auto relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Typography Section */}
          <div className="lg:col-span-5 order-1 lg:order-1 relative z-10">
             <div className="w-16 h-px bg-sbh-charcoal mb-8 reveal-on-scroll"></div>
             
             <h2 className="font-serif text-3xl md:text-5xl font-light leading-[1.05] mb-12 text-sbh-charcoal reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                L'Excellence <br/>
                <span className="italic text-4xl md:text-5xl text-sbh-blue block mt-4">sur mesure</span>
             </h2>
             
             {/* Main Text Block - using base size (18px) and relaxed leading (1.625) */}
             <div className="space-y-8 font-sans font-light text-sbh-charcoal/90 leading-relaxed text-balance">
                <p className="reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                  <span className="font-serif italic text-2xl text-sbh-charcoal mr-2">Sun Beach House</span> 
                  est une agence spécialisée dans la location et la vente de villas à Saint-Barthélemy. Fondée par <strong className="font-bold text-sbh-charcoal">Valérie</strong>, passionnée par l’île, l’agence accompagne une clientèle exigeante à la recherche d’un séjour d’exception, combinant luxe et authenticité.
                </p>
                <p className="reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
                  Au-delà de la location, nous proposons un service complet de conciergerie personnalisée. Notre mission : offrir un service haut de gamme et humain, en alliant l’expertise locale de Valérie à une approche chaleureuse et attentionnée.
                </p>
                <p className="text-xl text-sbh-charcoal italic border-l-4 border-sbh-blue pl-6 py-2 my-8 reveal-on-scroll" style={{ transitionDelay: '400ms' }}>
                  "Une invitation à vivre pleinement la douceur de l’île."
                </p>
             </div>

             <div className="mt-12 reveal-on-scroll" style={{ transitionDelay: '500ms' }}>
                <button 
                    onClick={() => onNavigate('rentals')}
                    className="inline-block text-sm font-sans tracking-[0.25em] uppercase border-b border-black pb-2 hover:text-sbh-green hover:border-sbh-green transition-colors touch-target"
                >
                    Découvrir nos biens
                </button>
             </div>
          </div>

          {/* Image Collage Section */}
          <div className="lg:col-span-7 order-2 lg:order-2 relative h-[500px] md:h-[800px]">
             
             {/* Main Image - Portrait */}
             <div className="absolute top-0 right-0 md:right-12 w-full md:w-3/4 h-3/4 img-zoom-wrapper z-10 reveal-on-scroll shadow-2xl shadow-gray-200/50" style={{ transitionDelay: '200ms' }}>
                <img 
                    src="https://storage.googleapis.com/images-sbh/besoin-de-plusieurs-images-r-alistes-cin-matique-p.jpg" 
                    alt="Luxury Villa Terrace" 
                    className="w-full h-full object-cover"
                />
             </div>
             
             {/* Secondary Image - Overlap bottom left */}
             <div className="hidden md:block absolute bottom-12 left-0 w-1/2 h-1/2 img-zoom-wrapper z-20 reveal-on-scroll shadow-xl" style={{ transitionDelay: '400ms' }}>
                <img 
                    src="https://storage.googleapis.com/images-sbh/image-r-aliste-spa--bien--tre---st-barth.jpg" 
                    alt="Spa and Wellness St Barth" 
                    className="w-full h-full object-cover"
                />
             </div>

             {/* Graphic Element */}
             <div className="absolute bottom-[-20px] right-4 md:right-20 w-32 h-32 bg-sbh-green/20 rounded-full z-0 flex items-center justify-center">
                 <div className="animate-spin-slower w-24 h-24 text-sbh-green opacity-50">
                    <SunStamp />
                 </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};