'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '../contexts/LanguageContext';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface NavbarProps {
  forceDark?: boolean; // New prop to force dark text on white pages
}

export const Navbar: React.FC<NavbarProps> = ({ forceDark = false }) => {
  const { language, t } = useLanguage();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false); // Mobile dropdown state
  const [desktopCollectionsHover, setDesktopCollectionsHover] = useState(false); // Desktop hover state
  const [langMenuOpen, setLangMenuOpen] = useState(false); // Language menu state
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    // passive: true prevents blocking the main thread on mobile scroll
    window.addEventListener('scroll', handleScroll, { passive: true });
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

  // Determine text color based on state and pathname
  const isWhitePage = ['/contact', '/booking', '/sales-contact', '/mentions-legales', '/politique-de-confidentialite'].some(p => {
    const localizedPath = `/${language}${p}`;
    return pathname === localizedPath || pathname?.startsWith(`${localizedPath}/`);
  });
  const isDarkText = forceDark || isWhitePage || scrolled;

  // Helper for active state
  const isActive = (path: string) => {
    const localizedPath = `/${language}${path === '/' ? '' : path}`;
    if (path === '/') return pathname === localizedPath || pathname === `/${language}`;
    return pathname?.startsWith(localizedPath);
  };

  const handleLanguageChange = (newLocale: string) => {
    const segments = pathname.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
    setLangMenuOpen(false);
  };

  const isCollectionsActive = isActive('/rentals') || isActive('/sales');

  return (
    <nav className="fixed top-0 left-0 w-full z-[9999] px-6 md:px-8 lg:px-12">

      {/* Background Element - Separate GPU layer to avoid main-thread paint cost */}
      <div
        className="absolute inset-0 w-full h-full shadow-sm"
        style={{
          backgroundColor: scrolled ? 'rgba(246, 245, 241, 0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(8px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(8px)' : 'none',
          opacity: scrolled ? 1 : 0,
          transition: 'opacity 400ms ease, background-color 400ms ease, backdrop-filter 400ms ease',
          willChange: 'opacity, backdrop-filter',
          transform: 'translateZ(0)', // Force GPU layer promotion
        }}
      ></div>

      <div
        className="relative z-[1001] flex justify-between items-center"
        style={{
          paddingTop: scrolled ? '0.75rem' : '1rem',
          paddingBottom: scrolled ? '0.75rem' : '1rem',
          transition: 'padding 500ms ease',
        }}
      >

        {/* Logo - Navigates to Home */}
        <Link
          href={`/${language}`}
          onClick={() => setMenuOpen(false)}
          className={`origin-left hover:opacity-80 flex items-center ${(isDarkText || menuOpen) ? 'text-sbh-darkgreen' : 'text-white'}`}
          style={{ transition: 'color 400ms ease' }}
        >
          <Logo 
            variant={isDarkText || menuOpen ? 'darkgreen' : 'beige'}
            style={{
              height: scrolled ? 'clamp(2rem, 3vw, 3rem)' : 'clamp(2.5rem, 4vw, 5rem)',
              transition: 'height 500ms ease',
            }}
            className=""
          />
        </Link>

        {/* Desktop Links - Hidden on Tablet (md), Visible on Desktop (lg) */}
        <div className={`hidden lg:flex items-center gap-6 xl:gap-10 font-sans text-sm tracking-[0.08em] uppercase transition-colors duration-500 font-semibold ${isDarkText ? 'text-sbh-darkgreen' : 'text-white [text-shadow:_0_2px_8px_rgb(0_0_0_/_40%)]'
          }`}>

          {/* Collections Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setDesktopCollectionsHover(true)}
            onMouseLeave={() => setDesktopCollectionsHover(false)}
          >
            <button
              className={`hover:text-sbh-blue transition-colors duration-300 relative uppercase tracking-[0.15em] flex items-center gap-1.5 ${isCollectionsActive ? (isDarkText ? 'text-sbh-darkgreen font-bold underline underline-offset-8' : 'text-sbh-blue font-semibold') : ''}`}
            >
              {t.nav.collections}
              <ChevronDown size={10} className={`transition-transform duration-300 ${desktopCollectionsHover ? 'rotate-180' : ''}`} />
              {isCollectionsActive && !isDarkText && <span className="absolute -bottom-2 left-0 w-full h-px bg-sbh-blue"></span>}
            </button>

            {/* Dropdown Menu */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-6 transition-all duration-300 ${desktopCollectionsHover ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'}`}>
              <div className="bg-white shadow-xl rounded-sm p-4 min-w-[180px] flex flex-col gap-2 border border-gray-100 text-sbh-charcoal">
                <Link href={`/${language}/rentals`} className={`text-left px-4 py-2 hover:bg-sbh-cream/50 hover:text-sbh-blue transition-colors whitespace-nowrap ${isActive('/rentals') ? 'text-sbh-blue' : ''}`}>
                  {t.nav.rentals}
                </Link>
                <Link href={`/${language}/sales`} className={`text-left px-4 py-2 hover:bg-sbh-cream/50 hover:text-sbh-blue transition-colors whitespace-nowrap ${isActive('/sales') ? 'text-sbh-blue' : ''}`}>
                  {t.nav.sales}
                </Link>
              </div>
            </div>
          </div>

          <Link href={`/${language}/destinations`} className={`hover:text-sbh-blue transition-colors duration-300 relative group uppercase tracking-[0.15em] ${isActive('/destinations') ? (isDarkText ? 'text-sbh-darkgreen font-bold' : 'text-sbh-blue font-semibold') : ''}`}>
            {t.nav.destination}
            <span className={`absolute -bottom-2 left-0 h-px ${isDarkText ? 'bg-sbh-darkgreen' : 'bg-sbh-blue'} transition-all duration-300 ${isActive('/destinations') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link href={`/${language}/conciergerie`} className={`hover:text-sbh-blue transition-colors duration-300 relative group uppercase tracking-[0.15em] ${isActive('/conciergerie') ? (isDarkText ? 'text-sbh-darkgreen font-bold' : 'text-sbh-blue font-semibold') : ''}`}>
            {t.nav.concierge}
            <span className={`absolute -bottom-2 left-0 h-px ${isDarkText ? 'bg-sbh-darkgreen' : 'bg-sbh-blue'} transition-all duration-300 ${isActive('/conciergerie') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link href={`/${language}/about`} className={`hover:text-sbh-blue transition-colors duration-300 relative group uppercase tracking-[0.15em] ${isActive('/about') ? (isDarkText ? 'text-sbh-darkgreen font-bold' : 'text-sbh-blue font-semibold') : ''}`}>
            {t.nav.spirit}
            <span className={`absolute -bottom-2 left-0 h-px ${isDarkText ? 'bg-sbh-darkgreen' : 'bg-sbh-blue'} transition-all duration-300 ${isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
          </Link>
          <Link href={`/${language}/contact`} className={`hover:text-sbh-blue transition-colors duration-300 hover:opacity-100 uppercase tracking-[0.15em] ${isActive('/contact') ? (isDarkText ? 'text-sbh-darkgreen font-bold underline underline-offset-8' : 'text-sbh-blue font-semibold') : ''}`}>
            {t.nav.contact}
          </Link>

          {/* Language Switcher */}
          <div
            className="relative ml-4 border-l border-current/20 pl-4"
            onMouseEnter={() => setLangMenuOpen(true)}
            onMouseLeave={() => setLangMenuOpen(false)}
          >
            <button className="flex items-center gap-1 hover:text-sbh-blue transition-colors duration-300 font-bold">
              <Globe size={14} className="opacity-60" />
              {language.toUpperCase()}
            </button>

            {/* Language Dropdown */}
            <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ${langMenuOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'}`}>
              <div className="bg-white shadow-xl rounded-sm p-2 min-w-[100px] flex flex-col gap-1 border border-gray-100 text-sbh-charcoal text-xs">
                <button onClick={() => handleLanguageChange('fr')} className={`px-3 py-1.5 text-left hover:bg-sbh-cream/50 hover:text-sbh-blue transition-colors rounded-sm ${language === 'fr' ? 'text-sbh-blue bg-sbh-cream/30' : ''}`}>🇫🇷 FR</button>
                <button onClick={() => handleLanguageChange('en')} className={`px-3 py-1.5 text-left hover:bg-sbh-cream/50 hover:text-sbh-blue transition-colors rounded-sm ${language === 'en' ? 'text-sbh-blue bg-sbh-cream/30' : ''}`}>🇬🇧 EN</button>
                <button onClick={() => handleLanguageChange('pt')} className={`px-3 py-1.5 text-left hover:bg-sbh-cream/50 hover:text-sbh-blue transition-colors rounded-sm ${language === 'pt' ? 'text-sbh-blue bg-sbh-cream/30' : ''}`}>🇵🇹 PT</button>
                <button onClick={() => handleLanguageChange('es')} className={`px-3 py-1.5 text-left hover:bg-sbh-cream/50 hover:text-sbh-blue transition-colors rounded-sm ${language === 'es' ? 'text-sbh-blue bg-sbh-cream/30' : ''}`}>🇪🇸 ES</button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Menu Button - Visible until Desktop (lg) */}
        <button
          className={`lg:hidden transition-colors duration-500 z-[1002] p-2 -mr-2 ${isDarkText && !menuOpen ? 'text-sbh-darkgreen' : !menuOpen ? 'text-white' : 'text-sbh-darkgreen'}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="sr-only">Menu</span>
          {menuOpen ? <X strokeWidth={1} size={28} /> : <Menu strokeWidth={1} size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay - Full Screen Cream */}
      {menuOpen && (
        <div className="fixed inset-0 bg-sbh-cream z-[999] flex flex-col items-center justify-start pt-32 pb-12 gap-8 animate-fade-in overflow-y-auto overscroll-contain">

          <Link href={`/${language}`} onClick={() => setMenuOpen(false)} className={`text-xl font-serif font-light italic ${isActive('/') ? 'text-sbh-blue' : 'text-sbh-charcoal'}`}>{t.nav.home}</Link>

          {/* Mobile Collapsible Collections */}
          <div className="flex flex-col items-center">
            <button
              onClick={() => setCollectionsOpen(!collectionsOpen)}
              className={`text-xl font-serif font-light italic flex items-center gap-2 ${isCollectionsActive ? 'text-sbh-blue' : 'text-sbh-charcoal'}`}
            >
              {t.nav.collections}
              <ChevronDown size={16} className={`transition-transform ${collectionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {collectionsOpen && (
              <div className="flex flex-col items-center gap-4 mt-4 bg-sbh-charcoal/5 w-64 py-4 rounded-lg animate-slide-up">
                <Link href={`/${language}/rentals`} onClick={() => setMenuOpen(false)} className={`text-sm font-sans uppercase tracking-widest ${isActive('/rentals') ? 'text-sbh-blue' : 'text-sbh-charcoal/80'}`}>
                  {t.nav.rentals}
                </Link>
                <Link href={`/${language}/sales`} onClick={() => setMenuOpen(false)} className={`text-sm font-sans uppercase tracking-widest ${isActive('/sales') ? 'text-sbh-blue' : 'text-sbh-charcoal/80'}`}>
                  {t.nav.sales}
                </Link>
              </div>
            )}
          </div>

          <Link href={`/${language}/destinations`} onClick={() => setMenuOpen(false)} className={`text-xl font-serif font-light italic ${isActive('/destinations') ? 'text-sbh-blue' : 'text-sbh-charcoal'}`}>{t.nav.destination}</Link>
          <Link href={`/${language}/conciergerie`} onClick={() => setMenuOpen(false)} className={`text-xl font-serif font-light italic ${isActive('/conciergerie') ? 'text-sbh-blue' : 'text-sbh-charcoal'}`}>{t.nav.concierge}</Link>
          <Link href={`/${language}/about`} onClick={() => setMenuOpen(false)} className={`text-xl font-serif font-light italic ${isActive('/about') ? 'text-sbh-blue' : 'text-sbh-charcoal'}`}>{t.nav.spirit}</Link>
          <Link href={`/${language}/contact`} onClick={() => setMenuOpen(false)} className={`text-xs font-sans tracking-[0.3em] uppercase mt-8 border-b pb-1 ${isActive('/contact') ? 'text-sbh-blue border-sbh-blue' : 'text-sbh-charcoal border-sbh-charcoal'}`}>{t.nav.contact}</Link>

          {/* Language Switcher Mobile */}
          <div className="flex gap-2 mt-8">
            <button onClick={() => handleLanguageChange('fr')} className={`px-3 py-2 text-xs font-sans tracking-wider uppercase rounded-sm transition-colors ${language === 'fr' ? 'bg-sbh-blue text-white' : 'bg-sbh-charcoal/5 text-sbh-charcoal/60 hover:bg-sbh-charcoal/10'}`}>🇫🇷 FR</button>
            <button onClick={() => handleLanguageChange('en')} className={`px-3 py-2 text-xs font-sans tracking-wider uppercase rounded-sm transition-colors ${language === 'en' ? 'bg-sbh-blue text-white' : 'bg-sbh-charcoal/5 text-sbh-charcoal/60 hover:bg-sbh-charcoal/10'}`}>🇬🇧 EN</button>
            <button onClick={() => handleLanguageChange('pt')} className={`px-3 py-2 text-xs font-sans tracking-wider uppercase rounded-sm transition-colors ${language === 'pt' ? 'bg-sbh-blue text-white' : 'bg-sbh-charcoal/5 text-sbh-charcoal/60 hover:bg-sbh-charcoal/10'}`}>🇵🇹 PT</button>
            <button onClick={() => handleLanguageChange('es')} className={`px-3 py-2 text-xs font-sans tracking-wider uppercase rounded-sm transition-colors ${language === 'es' ? 'bg-sbh-blue text-white' : 'bg-sbh-charcoal/5 text-sbh-charcoal/60 hover:bg-sbh-charcoal/10'}`}>🇪🇸 ES</button>
          </div>
        </div>
      )}
    </nav>
  );
};