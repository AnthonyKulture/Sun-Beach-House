'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/LanguageContext';
import { Logo } from '@/components/Logo';

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-sbh-cream text-sbh-charcoal font-serif selection:bg-sbh-green/20 selection:text-sbh-green">
      {/* Background Decorative Element */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
        }}
      />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
        <div className="max-w-3xl w-full flex flex-col items-center gap-12 animate-fade-in">
          
          {/* Logo Section */}
          <div className="hover:opacity-80 transition-opacity duration-500">
            <Link href="/">
              <Logo variant="darkgreen" className="w-40 md:w-56 h-auto" />
            </Link>
          </div>

          {/* Text Section */}
          <div className="space-y-6">
            <div className="relative inline-block">
              <span className="text-8xl md:text-[12rem] font-light opacity-10 select-none text-sbh-darkgreen">
                {t.common.notFound.title}
              </span>
              <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-3xl md:text-5xl font-light tracking-tight text-sbh-darkgreen">
                {t.common.notFound.subtitle.split(' ')[0]} <span className="italic">{t.common.notFound.subtitle.split(' ').slice(1).join(' ')}</span>
              </h1>
            </div>
            
            <div className="w-16 h-[1px] bg-sbh-terracotta/40 mx-auto" />
            
            <p className="max-w-md mx-auto text-base md:text-lg text-sbh-charcoal/80 font-sans tracking-wide leading-relaxed">
              {t.common.notFound.message}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl pt-4">
            <Link 
              href="/rentals" 
              className="px-6 py-4 bg-sbh-darkgreen text-sbh-cream text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-sbh-charcoal transition-all duration-500 shadow-sm"
            >
              {t.nav.rentals}
            </Link>
            <Link 
              href="/sales" 
              className="px-6 py-4 border border-sbh-darkgreen/30 text-sbh-darkgreen text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-sbh-darkgreen hover:text-sbh-cream transition-all duration-500"
            >
              {t.nav.sales}
            </Link>
            <Link 
              href="/contact" 
              className="px-6 py-4 border border-sbh-darkgreen/30 text-sbh-darkgreen text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-sbh-darkgreen hover:text-sbh-cream transition-all duration-500"
            >
              {t.nav.contact}
            </Link>
          </div>

          <Link 
            href="/" 
            className="text-[10px] uppercase tracking-[0.4em] text-sbh-green hover:text-sbh-charcoal transition-colors duration-300 border-b border-transparent hover:border-sbh-green pb-1 font-semibold"
          >
            {t.common.notFound.backToHome}
          </Link>
        </div>
      </main>

      <footer className="fixed bottom-8 w-full text-center px-6 pointer-events-none">
        <p className="text-[10px] uppercase tracking-[0.5em] text-sbh-charcoal/30">
          Sun Beach House St. Barth
        </p>
      </footer>
    </div>
  );
}
