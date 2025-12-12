
import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Villas } from './components/Villas';
import { Experience } from './components/Experience';
import { Services } from './components/Services';
import { Footer } from './components/Footer';
import { VillaDetails } from './components/VillaDetails';
import { Collections } from './components/Collections';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { BookingPage } from './components/BookingPage';
import { SalesContactPage } from './components/SalesContactPage';
import { Destinations } from './components/Destinations';
import { useVilla } from './hooks/useCMS';
import { BookingParams, FilterState, SalesInquiryParams } from './types';
import { SunStamp } from './components/Decorations';

type ViewState = 'home' | 'villa-details' | 'collections' | 'rentals' | 'sales' | 'about' | 'contact' | 'booking' | 'sales-contact' | 'destinations';

export interface SearchParams {
  arrival: string;
  departure: string;
  guests: number;
}

// Modern Router Hook: Syncs React State with URL
const useRouter = () => {
  const [view, setView] = useState<ViewState>('home');
  const [params, setParams] = useState<Record<string, string>>({});

  useEffect(() => {
    const syncFromUrl = () => {
      try {
        const urlParams = new URLSearchParams(window.location.search);
        const currentView = (urlParams.get('view') as ViewState) || 'home';
        const id = urlParams.get('id') || '';
        
        setView(currentView);
        setParams({ id });
      } catch (e) {
        console.error("Error syncing URL:", e);
      }
    };

    window.addEventListener('popstate', syncFromUrl);
    syncFromUrl(); // Initial load

    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  const push = (newView: ViewState, newParams: Record<string, string> = {}) => {
    try {
        const url = new URL(window.location.href);
        url.searchParams.set('view', newView);
        
        // Manage specific params
        if (newParams.id) {
            url.searchParams.set('id', newParams.id);
        } else {
            url.searchParams.delete('id');
        }

        window.history.pushState({}, '', url.toString());
    } catch (e) {
        // Fallback for environments where pushState is restricted
        console.warn("Navigation history update failed", e);
    }
    
    // Always update local state
    setView(newView);
    setParams(newParams);
    
    // Handle anchor scrolling for services
    if (newView !== 'home' || !newParams.anchor) {
        window.scrollTo(0, 0);
    }
  };

  return { view, params, push };
};

function App() {
  const { view: currentView, params: routeParams, push: navigate } = useRouter();

  // Application State
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  const [bookingParams, setBookingParams] = useState<BookingParams | null>(null);
  const [salesInquiryParams, setSalesInquiryParams] = useState<SalesInquiryParams | null>(null);
  
  // Persistent Filters
  const [filters, setFilters] = useState<FilterState>({
    location: 'all',
    guests: 1,
    price: 5000,
    amenities: []
  });

  // Data Fetching: Specific Villa for Details View
  const selectedVillaId = routeParams.id || null;
  const { villa: selectedVilla, loading: villaLoading } = useVilla(selectedVillaId);

  // Document Head Management
  useEffect(() => {
    const baseTitle = "Sun Beach House | St. Barth";
    try {
        switch (currentView) {
            case 'home': document.title = baseTitle; break;
            case 'about': document.title = `L'Esprit | ${baseTitle}`; break;
            case 'contact': document.title = `Contact | ${baseTitle}`; break;
            case 'rentals': document.title = `Locations Exclusives | ${baseTitle}`; break;
            case 'sales': document.title = `Ventes Immobilières | ${baseTitle}`; break;
            case 'destinations': document.title = `Destination St Barth | ${baseTitle}`; break;
            case 'villa-details': 
                document.title = selectedVilla ? `${selectedVilla.name} | ${baseTitle}` : baseTitle; 
                break;
            default: document.title = baseTitle;
        }
    } catch (e) {}
  }, [currentView, selectedVilla]);

  // Scroll Reveal Observer
  useEffect(() => {
    try {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setTimeout(() => {
                entry.target.classList.add('reveal-visible');
              }, 100); 
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.05, rootMargin: "0px 0px -50px 0px" });

        setTimeout(() => {
            const elements = document.querySelectorAll('.reveal-on-scroll');
            elements.forEach(el => observer.observe(el));
        }, 200);

        return () => observer.disconnect();
    } catch (e) {
        // Fallback: make everything visible if observer fails
        document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('reveal-visible'));
    }
  }, [currentView, selectedVillaId]);

  // Navigation Handlers
  const handleNavigate = (page: string) => {
      if (page === 'services') {
          if (currentView !== 'home') {
              navigate('home');
              setTimeout(() => {
                  const element = document.getElementById('services');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
              }, 100);
          } else {
              const element = document.getElementById('services');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
          }
          return;
      }

      if (['collections', 'rentals', 'sales', 'about', 'contact', 'destinations'].includes(page)) {
          navigate(page as ViewState);
      } else {
          navigate('home');
      }
  };

  const handleViewDetails = (id: string) => {
    navigate('villa-details', { id });
  };

  const handleSearch = (arrival: string, departure: string, guests: number) => {
    setSearchParams({ arrival, departure, guests });
    setFilters(prev => ({ ...prev, guests }));
    navigate('rentals');
  };

  const handleBook = (villaId: string, arrival: string, departure: string, guests: number) => {
    setBookingParams({ villaId, arrival, departure, guests });
    navigate('booking');
  };

  const handleSalesContact = (villaId: string) => {
    setSalesInquiryParams({ villaId });
    navigate('sales-contact');
  };

  const isWhitePage = ['contact', 'booking', 'sales-contact'].includes(currentView);

  return (
    <div className="min-h-screen font-sans selection:bg-sbh-blue selection:text-white relative flex flex-col bg-sbh-cream text-sbh-charcoal">
      
      {/* Global Cinematic Noise Overlay */}
      <div className="fixed inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
           style={{ 
             backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
             pointerEvents: 'none'
           }}>
      </div>

      <Navbar onNavigate={handleNavigate} currentView={currentView} forceDark={isWhitePage} />

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        {currentView === 'home' && (
          <>
            <Hero onSearch={handleSearch} />
            <About onNavigate={handleNavigate} />
            <Villas onViewDetails={handleViewDetails} onNavigateToCollections={() => navigate('rentals')} />
            <Services onNavigate={handleNavigate} />
            <Experience />
          </>
        )}

        {(currentView === 'collections' || currentView === 'rentals') && (
            <Collections 
              onViewDetails={handleViewDetails} 
              searchParams={searchParams}
              filters={filters}
              onUpdateFilters={setFilters}
              mode="rent"
            />
        )}

        {currentView === 'sales' && (
            <Collections 
              onViewDetails={handleViewDetails} 
              searchParams={null}
              filters={filters}
              onUpdateFilters={setFilters}
              mode="sale"
            />
        )}

        {currentView === 'destinations' && (
          <Destinations onNavigate={handleNavigate} />
        )}

        {currentView === 'about' && (
          <AboutPage />
        )}

        {currentView === 'contact' && (
          <ContactPage />
        )}

        {currentView === 'booking' && bookingParams && (
           <BookingPage 
             bookingParams={bookingParams} 
             onBack={() => handleViewDetails(bookingParams.villaId)}
           />
        )}

        {currentView === 'sales-contact' && salesInquiryParams && (
           <SalesContactPage
             inquiryParams={salesInquiryParams}
             onBack={() => handleViewDetails(salesInquiryParams.villaId)}
           />
        )}

        {currentView === 'villa-details' && (
          villaLoading ? (
            <div className="bg-white min-h-screen flex items-center justify-center">
               <SunStamp className="w-16 h-16 text-sbh-green animate-spin-slower opacity-50" />
            </div>
          ) : selectedVilla ? (
            <VillaDetails 
              villa={selectedVilla} 
              onNavigateToVilla={handleViewDetails}
              onBook={handleBook}
              onContact={handleSalesContact}
              onBack={() => navigate(selectedVilla.listingType === 'sale' ? 'sales' : 'rentals')}
            />
          ) : (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
               <h2 className="font-serif text-3xl italic">Propriété introuvable</h2>
               <button onClick={() => navigate('home')} className="border-b border-black uppercase text-xs tracking-widest pb-1">Retour à l'accueil</button>
            </div>
          )
        )}
      </main>

      {/* Footer - Z-10 */}
      <div className="relative z-10">
        <Footer onNavigate={handleNavigate} />
      </div>
    </div>
  );
}

export default App;
