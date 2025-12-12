import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Logo } from './Logo';

interface NavbarProps {
    onNavigate: (page: string) => void;
    currentView: string;
    forceDark?: boolean; // New prop to force dark text on white pages
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView, forceDark = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false); // Mobile dropdown state
  const [desktopCollectionsHover, setDesktopCollectionsHover] = useState(false); // Desktop hover state

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (page: string) => {
      onNavigate(page);
      setMenuOpen(false);
      setCollectionsOpen(false);
  }

  // Determine text color based on state
  const isDarkText = forceDark || scrolled;
  
  // Helper for active state
  const isActive = (page: string) => currentView === page || (page === 'collections' && (currentView === 'rentals' || currentView === 'sales'));

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] px-6 md:px-8 lg:px-12 transition-all duration-700">
      
      {/* Background Element - Handles the Blur/Color independently to avoid clipping fixed children */}
      <div className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${
          scrolled ? 'bg-sbh-cream/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}></div>

      <div className={`relative z-[1001] flex justify-between items-center transition-all duration-700 ${
           scrolled ? 'py-3 lg:py-4' : 'py-4 lg:py-8'
      }`}>
        
        {/* Logo - Navigates to Home */}
        <button 
            onClick={() => handleNavClick('home')}
            className={`transition-colors duration-700 origin-left hover:opacity-80 flex items-center ${!scrolled && forceDark ? 'text-sbh-charcoal' : !scrolled ? 'text-white' : 'text-[#89ADCE]'}`}
        >
             {/* Adjusted heights: Smaller on Tablet to avoid overlap, Large on Desktop */}
             <Logo className={`transition-all duration-700 w-auto ${
                 scrolled 
                 ? 'h-10 md:h-12 lg:h-16' 
                 : 'h-12 md:h-14 lg:h-24'
             }`} />
        </button>

        {/* Desktop Links - Hidden on Tablet (md), Visible on Desktop (lg) */}
        <div className={`hidden lg:flex items-center gap-8 xl:gap-12 font-sans text-xs tracking-[0.2em] uppercase transition-colors duration-500 ${
          isDarkText ? 'text-sbh-charcoal/80' : 'text-white/90 drop-shadow-md'
        }`}>
          
          {/* Collections Dropdown */}
          <div 
             className="relative group"
             onMouseEnter={() => setDesktopCollectionsHover(true)}
             onMouseLeave={() => setDesktopCollectionsHover(false)}
          >
              <button 
                className={`hover:text-sbh-blue transition-colors duration-300 relative uppercase tracking-[0.2em] flex items-center gap-1 ${isActive('collections') ? 'text-sbh-blue font-medium' : ''}`}
                onClick={() => handleNavClick('rentals')}
              >
                Collections
                <ChevronDown size={10} className={`transition-transform duration-300 ${desktopCollectionsHover ? 'rotate-180' : ''}`} />
                {isActive('collections') && <span className="absolute -bottom-2 left-0 w-full h-px bg-sbh-blue"></span>}
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300 ${desktopCollectionsHover ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
                  <div className="bg-white shadow-xl rounded-sm p-4 min-w-[180px] flex flex-col gap-2 border border-gray-100 text-sbh-charcoal">
                      <button onClick={() => handleNavClick('rentals')} className={`text-left px-4 py-2 hover:bg-sbh-cream/50 hover:text-sbh-blue transition-colors whitespace-nowrap ${currentView === 'rentals' ? 'text-sbh-blue' : ''}`}>
                          Location
                      </button>
                      <button onClick={() => handleNavClick('sales')} className={`text-left px-4 py-2 hover:bg-sbh-cream/50 hover:text-sbh-blue transition-colors whitespace-nowrap ${currentView === 'sales' ? 'text-sbh-blue' : ''}`}>
                          Vente
                      </button>
                  </div>
              </div>
          </div>

          <button onClick={() => handleNavClick('destinations')} className={`hover:text-sbh-blue transition-colors duration-300 relative group uppercase tracking-[0.2em] ${isActive('destinations') ? 'text-sbh-blue font-medium' : ''}`}>
            Destination
            <span className={`absolute -bottom-2 left-0 h-px bg-sbh-blue transition-all duration-300 ${isActive('destinations') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>
          <button onClick={() => handleNavClick('services')} className={`hover:text-sbh-blue transition-colors duration-300 relative group uppercase tracking-[0.2em] ${isActive('services') ? 'text-sbh-blue font-medium' : ''}`}>
            Conciergerie
            <span className={`absolute -bottom-2 left-0 h-px bg-sbh-blue transition-all duration-300 ${isActive('services') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>
          <button onClick={() => handleNavClick('about')} className={`hover:text-sbh-blue transition-colors duration-300 relative group uppercase tracking-[0.2em] ${isActive('about') ? 'text-sbh-blue font-medium' : ''}`}>
            L'Esprit
            <span className={`absolute -bottom-2 left-0 h-px bg-sbh-blue transition-all duration-300 ${isActive('about') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </button>
          <button onClick={() => handleNavClick('contact')} className={`hover:text-sbh-blue transition-colors duration-300 opacity-80 hover:opacity-100 uppercase tracking-[0.2em] ${isActive('contact') ? 'text-sbh-blue font-medium opacity-100' : ''}`}>
            Contact
          </button>
        </div>

        {/* Mobile/Tablet Menu Button - Visible until Desktop (lg) */}
        <button 
          className={`lg:hidden transition-colors duration-500 z-[1002] p-2 -mr-2 ${isDarkText && !menuOpen ? 'text-sbh-charcoal' : !menuOpen ? 'text-white' : 'text-sbh-charcoal'}`} 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Menu</span>
          {menuOpen ? <X strokeWidth={1} size={28} /> : <Menu strokeWidth={1} size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay - Full Screen Cream */}
      {menuOpen && (
        <div className="fixed inset-0 bg-sbh-cream z-[999] flex flex-col items-center justify-center gap-8 animate-fade-in overscroll-contain">
          
          <button onClick={() => handleNavClick('home')} className={`text-xl font-serif font-light italic ${isActive('home') ? 'text-sbh-blue' : 'text-sbh-charcoal'}`}>Accueil</button>
          
          {/* Mobile Collapsible Collections */}
          <div className="flex flex-col items-center">
             <button 
                onClick={() => setCollectionsOpen(!collectionsOpen)}
                className={`text-xl font-serif font-light italic flex items-center gap-2 ${isActive('collections') ? 'text-sbh-blue' : 'text-sbh-charcoal'}`}
             >
                 Collections
                 <ChevronDown size={16} className={`transition-transform ${collectionsOpen ? 'rotate-180' : ''}`}/>
             </button>
             {collectionsOpen && (
                 <div className="flex flex-col items-center gap-4 mt-4 bg-sbh-charcoal/5 w-64 py-4 rounded-lg animate-slide-up">
                     <button onClick={() => handleNavClick('rentals')} className={`text-sm font-sans uppercase tracking-widest ${currentView === 'rentals' ? 'text-sbh-blue' : 'text-sbh-charcoal/80'}`}>
                         Location
                     </button>
                     <button onClick={() => handleNavClick('sales')} className={`text-sm font-sans uppercase tracking-widest ${currentView === 'sales' ? 'text-sbh-blue' : 'text-sbh-charcoal/80'}`}>
                         Vente
                     </button>
                 </div>
             )}
          </div>

          <button onClick={() => handleNavClick('destinations')} className={`text-xl font-serif font-light italic ${isActive('destinations') ? 'text-sbh-blue' : 'text-sbh-charcoal'}`}>Destination</button>
          <button onClick={() => handleNavClick('services')} className={`text-xl font-serif font-light italic ${isActive('services') ? 'text-sbh-blue' : 'text-sbh-charcoal'}`}>Conciergerie</button>
          <button onClick={() => handleNavClick('about')} className={`text-xl font-serif font-light italic ${isActive('about') ? 'text-sbh-blue' : 'text-sbh-charcoal'}`}>L'Esprit</button>
          <button onClick={() => handleNavClick('contact')} className={`text-xs font-sans tracking-[0.3em] uppercase mt-8 border-b pb-1 ${isActive('contact') ? 'text-sbh-blue border-sbh-blue' : 'text-sbh-charcoal border-sbh-charcoal'}`}>Contact</button>
        </div>
      )}
    </nav>
  );
};