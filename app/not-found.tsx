import Link from 'next/link';
import { Logo } from '@/components/Logo';

export default function NotFound() {
  return (
    <html lang="fr">
      <body>
        <div className="min-h-screen bg-[#F6F5F1] text-[#2D2D2D] font-serif selection:bg-[#C3CBC4] selection:text-[#1A3C34]">
          {/* Background Decorative Element */}
          <div 
            className="fixed inset-0 pointer-events-none opacity-[0.03] z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
            }}
          />

          <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 py-20 text-center">
            {/* Same content as before */}
            <div className="max-w-3xl w-full flex flex-col items-center gap-12 animate-fade-in">
              <div className="hover:opacity-80 transition-opacity duration-500">
                <Link href="/fr">
                  <Logo variant="darkgreen" className="w-40 md:w-56 h-auto" />
                </Link>
              </div>

              <div className="space-y-6">
                <div className="relative inline-block">
                  <span className="text-8xl md:text-[12rem] font-light text-[#1A3C34] opacity-10 select-none">404</span>
                  <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-3xl md:text-5xl font-light tracking-tight">
                    Page <span className="italic">Introuvable</span>
                  </h1>
                </div>
                
                <div className="w-16 h-[1px] bg-[#A05C4D] mx-auto opacity-40" />
                
                <p className="max-w-md mx-auto text-base md:text-lg text-sbh-charcoal/70 font-sans tracking-wide leading-relaxed">
                  Désolé, la page que vous recherchez semble s&apos;être envolée vers d&apos;autres horizons. 
                  Laissez-nous vous guider vers l&apos;essentiel.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl pt-4">
                <Link href="/fr/rentals" className="px-6 py-4 bg-[#1A3C34] text-[#F6F5F1] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#2D2D2D] transition-all duration-500 shadow-sm">Villas à Louer</Link>
                <Link href="/fr/sales" className="px-6 py-4 border border-[#1A3C34]/30 text-[#1A3C34] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#1A3C34] hover:text-[#F6F5F1] transition-all duration-500">Villas à Vendre</Link>
                <Link href="/fr/contact" className="px-6 py-4 border border-[#1A3C34]/30 text-[#1A3C34] text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-[#1A3C34] hover:text-[#F6F5F1] transition-all duration-500">Besoin d&apos;aide ?</Link>
              </div>

              <Link href="/fr" className="text-[10px] uppercase tracking-[0.4em] text-[#A05C4D] hover:text-[#1A3C34] transition-colors duration-300 border-b border-transparent hover:border-[#1A3C34] pb-1 font-semibold">Retour à l&apos;Accueil</Link>
            </div>
          </main>

          <footer className="fixed bottom-8 w-full text-center px-6 pointer-events-none">
            <p className="text-[10px] uppercase tracking-[0.5em] text-[#2D2D2D]/30">Sun Beach House St. Barth</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
