import React, { useEffect } from 'react';

export const Gallery: React.FC = () => {
  return (
    <section className="bg-white py-32 px-4 overflow-hidden">
      
      {/* Full Width Visual Break - Caribbean Panorama */}
      <div className="w-full h-[80vh] relative mb-32 reveal-on-scroll shadow-lg">
          <div 
            className="absolute inset-0 bg-cover bg-fixed bg-center opacity-90 transition-all duration-[2s]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540206351-d6465b3ac5c1?q=80&w=2000&auto=format&fit=crop')" }}
          ></div>
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="font-serif text-white text-3xl md:text-7xl opacity-90 mix-blend-overlay italic drop-shadow-lg">
                  Magie
              </h3>
          </div>
      </div>

      {/* Two Image Composition */}
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-32 items-center">
          
          <div className="relative aspect-[3/4] reveal-on-scroll">
              <img 
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop" 
                alt="Luxury Villa Interior" 
                className="w-full h-full object-cover relative z-10 shadow-xl"
              />
              <p className="absolute -bottom-8 left-0 font-sans text-[9px] tracking-[0.3em] uppercase text-gray-400">
                  Élégance Intemporelle
              </p>
          </div>

          <div className="relative md:translate-y-24 reveal-on-scroll">
              {/* Green block behind the image */}
              <div className="absolute -top-6 -right-6 w-full h-full bg-sbh-green/20 z-0"></div>
              
              <div className="relative aspect-[3/4] z-10">
                <img 
                    src="https://images.unsplash.com/photo-1590523741831-ab7e8b8f9c78?q=80&w=800&auto=format&fit=crop" 
                    alt="Boat and Blue Water" 
                    className="w-full h-full object-cover shadow-xl"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full">
                    <span className="font-serif text-white text-2xl italic drop-shadow-md">Exception</span>
                </div>
              </div>
          </div>
      </div>

      <div className="h-24"></div>
    </section>
  );
};