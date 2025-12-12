import React, { useEffect } from 'react';
import { NorthStar, SunStamp, OrganicLine, PalmLeaf } from './Decorations';
import { MapPin, ArrowRight } from 'lucide-react';

interface DestinationsProps {
    onNavigate: (page: string) => void;
}

export const Destinations: React.FC<DestinationsProps> = ({ onNavigate }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-sbh-cream min-h-screen animate-fade-in pb-24 text-sbh-charcoal overflow-hidden">
      
      {/* =======================
          HERO SECTION 
      ======================= */}
      <div className="relative h-[80vh] w-full overflow-hidden mb-24">
        <div 
          className="absolute inset-0 bg-cover bg-center animate-scale-slow"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?q=80&w=2000&auto=format&fit=crop')" }}
        ></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-sbh-cream/90"></div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
            <span className="text-white text-xs md:text-sm uppercase tracking-[0.4em] mb-6 animate-slide-up">Saint-Barthélemy</span>
            <h1 className="font-serif text-5xl md:text-8xl italic text-white drop-shadow-xl mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                Destination
            </h1>
            <div className="w-16 h-px bg-white/60 animate-slide-up" style={{ animationDelay: '0.2s' }}></div>
            <p className="font-sans text-white/90 mt-6 text-lg tracking-wide max-w-xl animate-slide-up" style={{ animationDelay: '0.3s' }}>
                L'Art de Vivre au Cœur des Caraïbes
            </p>
        </div>
      </div>

      {/* =======================
          INTRO 
      ======================= */}
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 text-center mb-32 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 text-sbh-green">
              <SunStamp className="w-48 h-48 animate-spin-slower" />
          </div>
          
          <p className="font-serif text-2xl md:text-4xl text-sbh-charcoal leading-tight mb-12 relative z-10 reveal-on-scroll">
              "Bienvenue sur le petit caillou le plus prisé des Antilles. Une terre d'histoire, de caractère et d'une douceur de vivre inégalée."
          </p>
          
          <div className="font-sans font-light text-lg text-gray-600 space-y-6 max-w-2xl mx-auto text-balance">
              <p className="reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                  Chez <strong>Sun Beach House</strong>, nous pensons que pour aimer St Barth, il faut la comprendre. 
                  Fondée par Valérie, notre agence ne se contente pas de vous remettre des clés. 
                  Nous vous ouvrons les portes d'une île authentique.
              </p>
          </div>
      </div>

      {/* =======================
          FRESCO: HISTORY
      ======================= */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-12 mb-40 relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              {/* Text Block (Left) */}
              <div className="md:col-span-5 relative z-10 order-2 md:order-1">
                  <div className="w-12 h-px bg-sbh-terracotta mb-6 reveal-on-scroll"></div>
                  <h2 className="font-serif text-4xl md:text-5xl italic text-sbh-charcoal mb-8 reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                      Entre Suède <br/> et Tropiques
                  </h2>
                  <div className="font-sans text-gray-600 leading-relaxed space-y-6 text-justify">
                      <p className="reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                          Saint-Barthélemy possède un patrimoine historique unique. Découverte par Christophe Colomb, l'île fut cédée à la Suède en 1784 en échange d'un droit d'entrepôt à Göteborg.
                      </p>
                      <p className="reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
                          Cette période suédoise a laissé une empreinte indélébile, notamment dans le nom de la capitale, <strong>Gustavia</strong>, et dans l'architecture de certains bâtiments publics aux soubassements de pierre.
                      </p>
                      <p className="text-sm italic text-sbh-charcoal/70 border-l-2 border-sbh-green pl-4 reveal-on-scroll" style={{ transitionDelay: '400ms' }}>
                          Rétrocédée à la France en 1878, l'île a su conserver ses traditions tout en s'ouvrant au monde.
                      </p>
                  </div>
              </div>

              {/* Visual Block (Right) - Offset */}
              <div className="md:col-span-6 md:col-start-7 order-1 md:order-2 md:-mt-20">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm shadow-2xl reveal-on-scroll group" style={{ transitionDelay: '200ms' }}>
                      <img 
                          src="https://storage.googleapis.com/images-sbh/sbh-1.jpg" 
                          alt="Gustavia Harbor Architecture" 
                          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                      />
                      <div className="absolute bottom-6 right-6 bg-white/90 backdrop-blur px-4 py-2 text-xs font-sans tracking-widest uppercase">
                          L'héritage Suédois
                      </div>
                  </div>
              </div>

          </div>
          
          {/* Decorative Line */}
          <div className="absolute top-1/2 left-0 w-full opacity-20 text-sbh-sand pointer-events-none -z-10">
              <OrganicLine />
          </div>
      </section>

      {/* =======================
          FRESCO: CULTURE
      ======================= */}
      <section className="bg-sbh-green/10 py-32 mb-40 relative overflow-hidden">
          <div className="absolute top-[-100px] right-[-100px] text-sbh-green opacity-10 pointer-events-none">
              <PalmLeaf className="w-[500px] h-[600px] rotate-45" />
          </div>

          <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
              
              {/* Visual Block (Left) - Wide */}
              <div className="md:col-span-7">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-sm shadow-xl reveal-on-scroll">
                      <img 
                          src="https://storage.googleapis.com/images-sbh/sbh-2.jpg" 
                          alt="Gastronomy and Culture" 
                          className="w-full h-full object-cover"
                      />
                      {/* Floating secondary image */}
                      <div className="absolute -bottom-12 -right-12 w-1/2 h-2/3 border-8 border-sbh-cream overflow-hidden shadow-lg hidden md:block reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                           <img 
                              src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=800&auto=format&fit=crop" 
                              alt="Artisanat" 
                              className="w-full h-full object-cover" 
                           />
                      </div>
                  </div>
              </div>

              {/* Text Block (Right) */}
              <div className="md:col-span-4 md:col-start-9 md:pl-8">
                  <h2 className="font-serif text-4xl italic text-sbh-charcoal mb-8 reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                      Culture & <br/> <span className="text-sbh-terracotta">Authenticité</span>
                  </h2>
                  <div className="font-sans text-gray-600 leading-relaxed space-y-6 text-justify">
                      <p className="reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                          Loin des clichés, la culture de Saint-Barth est vibrante. C'est un mélange subtil de traditions marines, de tressage de la paille (le fameux <em>Lataniers</em> de Corossol) et d'élégance à la française.
                      </p>
                      <p className="reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
                          Avec notre conciergerie, nous vous connectons à cette âme. Que ce soit pour un restaurant caché ou une rencontre avec un pêcheur local.
                      </p>
                      <div className="pt-4 reveal-on-scroll" style={{ transitionDelay: '400ms' }}>
                          <button onClick={() => onNavigate('services')} className="text-xs uppercase tracking-[0.2em] border-b border-sbh-charcoal pb-1 hover:text-sbh-terracotta hover:border-sbh-terracotta transition-colors">
                              Découvrir notre conciergerie
                          </button>
                      </div>
                  </div>
              </div>

          </div>
      </section>

      {/* =======================
          NEIGHBORHOODS (Vertical Scroll)
      ======================= */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-12 mb-32">
          
          <div className="text-center mb-24 reveal-on-scroll">
              <div className="flex items-center justify-center gap-4 mb-4">
                  <span className="h-px w-8 bg-sbh-charcoal/20"></span>
                  <NorthStar className="w-4 h-4 text-sbh-green" />
                  <span className="h-px w-8 bg-sbh-charcoal/20"></span>
              </div>
              <h2 className="font-serif text-4xl md:text-6xl text-sbh-charcoal">Quartiers Emblématiques</h2>
              <p className="font-sans text-gray-500 mt-4 uppercase tracking-widest text-xs">Où poserez-vous vos valises ?</p>
          </div>

          <div className="space-y-32 md:space-y-48">
              
              {/* 1. Gustavia */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center group">
                  <div className="order-2 md:order-1 reveal-on-scroll">
                      <span className="font-sans text-xs font-bold text-sbh-green uppercase tracking-widest mb-2 block">01. Capitale</span>
                      <h3 className="font-serif text-4xl italic text-sbh-charcoal mb-6">Gustavia</h3>
                      <p className="font-sans text-gray-600 leading-relaxed mb-8">
                          Le cœur battant de l'île. Point de rencontre du glamour et de l'histoire, c'est ici que les yachts jettent l'ancre. Flânez dans les rues bordées de boutiques de créateurs ou profitez de la vie nocturne.
                      </p>
                      <p className="text-sm font-serif italic text-sbh-charcoal/80">
                          "Idéal pour ceux qui aiment tout faire à pied : shopping, dîners festifs et balades sur le port."
                      </p>
                      <button onClick={() => { onNavigate('collections'); }} className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest hover:text-sbh-green transition-colors">
                          Voir les villas à Gustavia <ArrowRight size={14}/>
                      </button>
                  </div>
                  <div className="order-1 md:order-2 relative aspect-[4/5] overflow-hidden rounded-t-[100px] border border-sbh-charcoal/5 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                      <img 
                        src="https://storage.googleapis.com/images-sbh/sbh-3.jpg" 
                        alt="Gustavia" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s]"
                      />
                  </div>
              </div>

              {/* 2. Saint-Jean (Inverted) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center group">
                   <div className="order-1 relative aspect-[4/5] overflow-hidden rounded-b-[100px] border border-sbh-charcoal/5 reveal-on-scroll">
                      <img 
                        src="https://storage.googleapis.com/images-sbh/sbh-4.jpg" 
                        alt="Saint-Jean" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s]"
                      />
                  </div>
                  <div className="order-2 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                      <span className="font-sans text-xs font-bold text-sbh-blue uppercase tracking-widest mb-2 block">02. Beach Life</span>
                      <h3 className="font-serif text-4xl italic text-sbh-charcoal mb-6">Saint-Jean</h3>
                      <p className="font-sans text-gray-600 leading-relaxed mb-8">
                          L'effervescence chic. Quartier mythique abritant la plage où atterrissent les petits avions. Le lieu de rendez-vous pour un déjeuner les pieds dans le sable au Nikki Beach ou à l'Eden Rock.
                      </p>
                      <button onClick={() => { onNavigate('collections'); }} className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest hover:text-sbh-blue transition-colors">
                          Voir les villas à Saint-Jean <ArrowRight size={14}/>
                      </button>
                  </div>
              </div>

              {/* 3. Corossol */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center group">
                  <div className="order-2 md:order-1 reveal-on-scroll">
                      <span className="font-sans text-xs font-bold text-sbh-terracotta uppercase tracking-widest mb-2 block">03. Tradition</span>
                      <h3 className="font-serif text-4xl italic text-sbh-charcoal mb-6">Corossol</h3>
                      <p className="font-sans text-gray-600 leading-relaxed mb-8">
                          L'authenticité préservée. Ce petit village de pêcheurs est le gardien des traditions, où l'on peut encore voir les dories colorées échouées sur le sable et les femmes tresser le latanier.
                      </p>
                      <p className="text-sm font-serif italic text-sbh-charcoal/80">
                          "Un havre de paix pour ceux qui recherchent le calme pittoresque."
                      </p>
                      <button onClick={() => { onNavigate('collections'); }} className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest hover:text-sbh-terracotta transition-colors">
                          Voir les villas à Corossol <ArrowRight size={14}/>
                      </button>
                  </div>
                  <div className="order-1 md:order-2 relative aspect-[16/9] md:aspect-[4/5] overflow-hidden rounded-sm reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                      <img 
                        src="https://storage.googleapis.com/images-sbh/sbh-6.jpg" 
                        alt="Corossol Boats" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-[1.5s]"
                      />
                  </div>
              </div>

               {/* 4. Pointe Milou (Full Width Break) */}
               <div className="relative h-[60vh] rounded-sm overflow-hidden group reveal-on-scroll">
                   <img 
                       src="https://storage.googleapis.com/images-sbh/sbh-5.jpg" 
                       alt="Sunset Pointe Milou"
                       className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                   />
                   <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors"></div>
                   <div className="absolute bottom-12 left-6 md:left-12 text-white">
                        <span className="font-sans text-xs font-bold uppercase tracking-widest mb-2 block">04. Panorama</span>
                        <h3 className="font-serif text-4xl md:text-6xl italic mb-4">Pointe Milou</h3>
                        <p className="max-w-md font-sans text-white/90 leading-relaxed">
                            Des villas accrochées à la falaise, célèbres pour offrir les plus beaux couchers de soleil de l'île face à l'océan Atlantique.
                        </p>
                   </div>
               </div>

          </div>
      </section>

      {/* =======================
          CTA
      ======================= */}
      <section className="bg-white py-24 border-t border-sbh-charcoal/5">
          <div className="max-w-[800px] mx-auto text-center px-6">
              <SunStamp className="w-16 h-16 text-sbh-green mx-auto mb-8 animate-spin-slow" />
              <h2 className="font-serif text-3xl md:text-5xl text-sbh-charcoal mb-8 reveal-on-scroll">
                  Prêt à découvrir St Barth ?
              </h2>
              <p className="font-sans text-gray-600 mb-12 reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
                  Notre expertise locale et notre approche humaine garantissent que votre séjour sera bien plus qu'une simple location : ce sera votre histoire.
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-6 reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
                  <button onClick={() => onNavigate('collections')} className="bg-sbh-charcoal text-white px-8 py-4 font-sans text-xs uppercase tracking-[0.25em] rounded-full hover:bg-sbh-green transition-colors">
                      Explorer nos villas
                  </button>
                  <button onClick={() => onNavigate('contact')} className="border border-sbh-charcoal text-sbh-charcoal px-8 py-4 font-sans text-xs uppercase tracking-[0.25em] rounded-full hover:bg-sbh-charcoal hover:text-white transition-colors">
                      Contacter Valérie
                  </button>
              </div>
          </div>
      </section>

    </div>
  );
};