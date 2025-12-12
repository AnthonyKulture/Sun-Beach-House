import React, { useEffect } from 'react';
import { Mail, Phone, ArrowRight, Instagram, Facebook } from 'lucide-react';

export const ContactPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen animate-fade-in relative z-10">
      
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* LEFT COLUMN: FORM */}
        <div className="lg:w-7/12 w-full px-6 md:px-12 lg:px-24 xl:px-32 pt-32 pb-12 lg:pt-48 lg:pb-32 flex flex-col justify-center order-2 lg:order-1 bg-white relative z-10">
            <h1 className="font-serif text-4xl md:text-6xl italic text-sbh-charcoal mb-4">Parlons de vous.</h1>
            <p className="font-sans text-sm text-gray-500 uppercase tracking-widest mb-12">
                Un projet de vacances ou Conciergerie Luxe ?
            </p>

            <form className="space-y-12 max-w-xl" onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="group relative">
                        <input type="text" placeholder=" " className="peer w-full border-b border-gray-300 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg" required />
                        <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                            Nom
                        </label>
                    </div>
                    <div className="group relative">
                        <input type="text" placeholder=" " className="peer w-full border-b border-gray-300 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg" />
                        <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                            Prénom
                        </label>
                    </div>
                </div>

                <div className="group relative">
                    <input type="email" placeholder=" " className="peer w-full border-b border-gray-300 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg" required />
                    <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                        Email
                    </label>
                </div>

                <div className="group relative">
                    <textarea rows={4} placeholder=" " className="peer w-full border-b border-gray-300 bg-transparent py-3 text-sbh-charcoal outline-none focus:border-sbh-green transition-colors font-serif text-lg resize-none" required></textarea>
                    <label className="absolute left-0 top-3 text-xs uppercase tracking-widest text-gray-400 transition-all peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-sbh-green peer-placeholder-shown:top-3 peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px]">
                        Votre Message
                    </label>
                </div>

                <div className="pt-8">
                    <button className="group flex items-center gap-4 text-sbh-charcoal font-sans text-xs uppercase tracking-[0.25em] font-bold hover:text-sbh-green transition-colors">
                        Envoyer ma demande
                        <span className="p-2 rounded-full border border-sbh-charcoal/30 group-hover:border-sbh-green group-hover:bg-sbh-green group-hover:text-white transition-all">
                            <ArrowRight size={16} />
                        </span>
                    </button>
                </div>

            </form>
        </div>

        {/* RIGHT COLUMN: INFO & VISUALS */}
        <div className="lg:w-5/12 w-full flex flex-col order-1 lg:order-2 h-auto lg:min-h-screen">
             
             {/* Upper Visual */}
             <div className="h-64 lg:h-1/2 relative overflow-hidden">
                <img 
                    src="https://storage.googleapis.com/images-sbh/f7f7fd16-3e6c-43e6-93fd-b13f74bf9418.jpg" 
                    alt="Atmosphere St Barth" 
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[2s]"
                />
                <div className="absolute inset-0 bg-sbh-green/20 mix-blend-multiply"></div>
                
                {/* Gradient Overlay for Navbar Visibility */}
                <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white/90 via-white/50 to-transparent z-10 pointer-events-none"></div>
             </div>

             {/* Lower Info - Sage Green Block */}
             <div className="flex-1 lg:h-1/2 bg-sbh-green text-sbh-charcoal p-10 lg:p-16 flex flex-col justify-center relative overflow-hidden">
                {/* Map texture background */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Saint_Barthelemy_map-fr.svg/1200px-Saint_Barthelemy_map-fr.svg.png')] bg-cover bg-center grayscale mix-blend-overlay"></div>

                <div className="relative z-10 space-y-10">
                     <div>
                         <h3 className="font-serif text-2xl italic mb-4 text-sbh-charcoal">Sun Beach House</h3>
                         <p className="font-sans text-sm leading-relaxed opacity-80 text-sbh-charcoal">
                             Gustavia Harbor<br/>
                             Rue de la République<br/>
                             97133 Saint-Barthélemy
                         </p>
                     </div>

                     <div>
                         <h3 className="font-serif text-2xl italic mb-4 text-sbh-charcoal">Contact Privé</h3>
                         <ul className="space-y-3 font-sans text-sm opacity-80 text-sbh-charcoal">
                             <li className="flex items-center gap-4">
                                 <Phone size={16} /> +590 690 00 00 00
                             </li>
                             <li className="flex items-center gap-4">
                                 <Mail size={16} /> hello@sunbeachhouse.com
                             </li>
                         </ul>
                     </div>

                     <div className="flex gap-6 pt-4">
                         <a href="#" className="p-3 border border-sbh-charcoal/20 rounded-full hover:bg-sbh-charcoal hover:text-white transition-all text-sbh-charcoal">
                             <Instagram size={20} />
                         </a>
                         <a href="#" className="p-3 border border-sbh-charcoal/20 rounded-full hover:bg-sbh-charcoal hover:text-white transition-all text-sbh-charcoal">
                             <Facebook size={20} />
                         </a>
                     </div>
                 </div>
             </div>
        </div>

      </div>
    </div>
  );
};