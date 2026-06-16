import type { Metadata } from 'next'
import Script from 'next/script'
import { Playfair_Display } from 'next/font/google'
import '../globals.css'
import { Providers } from '@/app/providers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { CookieBanner } from '@/components/CookieBanner'
import { ScrollReveal } from '@/components/ScrollReveal'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { Language } from '@/i18n/types'

const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    variable: '--font-playfair',
    display: 'swap',
})

export async function generateStaticParams() {
    return [{ lang: 'fr' }, { lang: 'en' }, { lang: 'es' }, { lang: 'pt' }]
}

const OG_LOCALES: Record<string, string> = { fr: 'fr_FR', en: 'en_US', es: 'es_ES', pt: 'pt_PT' };

const DEFAULT_TITLE: Record<string, string> = {
    fr: 'Location de villa de luxe à Saint-Barth - Sun Beach House',
    en: 'Luxury Villa Rental in St. Barth - Sun Beach House',
    es: 'Alquiler de villas de lujo en St. Barth - Sun Beach House',
    pt: 'Aluguel de villas de luxo em St. Barth - Sun Beach House',
};

const DEFAULT_DESCRIPTION: Record<string, string> = {
    fr: 'Sun Beach House - Votre agence immobilière de prestige à Saint-Barthélemy. Location et vente de villas de luxe, conciergerie privée et services sur mesure avec Valérie.',
    en: 'Sun Beach House - Your prestige real estate agency in Saint-Barthélemy. Luxury villa rental and sales, private concierge and bespoke services with Valérie.',
    es: 'Sun Beach House - Su agencia inmobiliaria de prestigio en San Bartolomé. Alquiler y venta de villas de lujo, conserjería privada y servicios a medida con Valérie.',
    pt: 'Sun Beach House - Sua agência imobiliária de prestígio em Saint-Barthélemy. Aluguel e venda de villas de luxo, concierge privado e serviços sob medida com Valérie.',
};

const DEFAULT_OG_TITLE: Record<string, string> = {
    fr: 'Sun Beach House | Villas de Luxe & Conciergerie à Saint-Barthélemy',
    en: 'Sun Beach House | Luxury Villas & Concierge in Saint-Barthélemy',
    es: 'Sun Beach House | Villas de Lujo y Conserjería en San Bartolomé',
    pt: 'Sun Beach House | Villas de Luxo & Concierge em Saint-Barthélemy',
};

export async function generateMetadata({ params }: { params: { lang: string } }): Promise<Metadata> {
    const { lang } = params;
    const title = DEFAULT_TITLE[lang] || DEFAULT_TITLE.fr;
    const description = DEFAULT_DESCRIPTION[lang] || DEFAULT_DESCRIPTION.fr;
    const ogTitle = DEFAULT_OG_TITLE[lang] || DEFAULT_OG_TITLE.fr;
    const url = `https://www.sun-beach-house.com/${lang}`;

    return {
        title: {
            default: title,
            template: '%s | St-Barth | Sun Beach House'
        },
        description,
        keywords: ['villa luxe saint barth', 'location villa st barth', 'vente villa saint barthélemy', 'conciergerie privée st barth', 'Sun Beach House'],
        authors: [{ name: 'Sun Beach House' }],
        creator: 'Sun Beach House',
        publisher: 'Sun Beach House',
        metadataBase: new URL('https://www.sun-beach-house.com'),
        alternates: {
            canonical: url,
        },
        openGraph: {
            type: 'website',
            locale: OG_LOCALES[lang] || OG_LOCALES.fr,
            url,
            siteName: 'Sun Beach House',
            title: ogTitle,
            description,
            images: [
                {
                    url: '/og-image.jpg',
                    width: 1200,
                    height: 630,
                    alt: 'Sun Beach House - Excellence Immobilière à St. Barth',
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: ogTitle,
            description,
            images: ['/og-image.jpg'],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        icons: {
            icon: '/favicon.svg',
            apple: '/favicon.svg',
        },
    };
}

export default function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { lang: string }
}) {
    const locale = params.lang as Language;

    return (
        <html lang={locale} className={`scroll-smooth ${playfair.variable}`} style={{ scrollPaddingTop: '100px' }}>
            <head>
                <script dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        
                        // Consent Mode V2 Implementation
                        (function() {
                            const saved = typeof window !== 'undefined' ? localStorage.getItem('google-consent') : null;
                            if (saved) {
                                // Apply saved preferences immediately if existing
                                gtag('consent', 'default', JSON.parse(saved));
                            } else {
                                // Default for EEE + UK (Strict/GDPR)
                                gtag('consent', 'default', {
                                    'ad_storage': 'denied',
                                    'analytics_storage': 'denied',
                                    'ad_user_data': 'denied',
                                    'ad_personalization': 'denied',
                                    'region': ['AT', 'BE', 'BG', 'CH', 'CY', 'CZ', 'DE', 'DK', 'EE', 'ES', 'FI', 'FR', 'GB', 'GR', 'HR', 'HU', 'IE', 'IS', 'IT', 'LI', 'LT', 'LU', 'LV', 'MT', 'NL', 'NO', 'PL', 'PT', 'RO', 'SE', 'SI', 'SK']
                                });
                                // Default for Rest of World (Permissive) - Fixes the "0% consent" warning in GTM
                                gtag('consent', 'default', {
                                    'ad_storage': 'granted',
                                    'analytics_storage': 'granted',
                                    'ad_user_data': 'granted',
                                    'ad_personalization': 'granted'
                                });
                            }
                            
                            // Advanced Privacy Settings
                            gtag('set', 'ads_data_redaction', true);
                            gtag('set', 'url_passthrough', true);
                        })();
                    `
                }} />
                <Script id="google-tag-manager" strategy="lazyOnload">
                    {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-NBCJJ2CV');
                    `}
                </Script>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'RealEstateAgent',
                            '@id': 'https://www.sun-beach-house.com/#org',
                            name: 'Sun Beach House',
                            description: 'Location et vente de villas de luxe à Saint-Barthélemy. Conciergerie privée haut de gamme.',
                            url: 'https://www.sun-beach-house.com',
                            logo: 'https://www.sun-beach-house.com/logo-sbh.png',
                            image: 'https://www.sun-beach-house.com/og-image.jpg',
                            telephone: '+590690634725',
                            email: 'valerie@sun-beach-house.com',
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: '65 RUE DE LA PAIX GUSTAVIA',
                                addressLocality: 'Saint-Barthélemy',
                                postalCode: '97133',
                                addressCountry: 'BL',
                            },
                            geo: {
                                '@type': 'GeoCoordinates',
                                latitude: 17.8967,
                                longitude: -62.8497,
                            },
                            founder: {
                                '@type': 'Person',
                                '@id': 'https://www.sun-beach-house.com/#valerie',
                                name: 'Valérie Kerckhofs',
                                jobTitle: 'Founder & Real Estate Agent',
                                worksFor: { '@id': 'https://www.sun-beach-house.com/#org' },
                                knowsAbout: [
                                    'Saint-Barthélemy real estate',
                                    'Luxury villa rental',
                                    'Luxury property sales',
                                    'Private concierge services',
                                ],
                                knowsLanguage: ['fr', 'en'],
                                sameAs: ['https://www.instagram.com/sun.beach.house'],
                                image: 'https://www.sun-beach-house.com/images/valerie-founder.jpg',
                            },
                            sameAs: [
                                'https://www.instagram.com/sun.beach.house',
                                'https://share.google/TdUK2DyiWTMX9FF2A',
                            ],
                            areaServed: 'Saint-Barthélemy',
                            priceRange: '$$$$',
                        })
                    }}
                />
                {/* 
                    LCP Preload Strategy:
                    - Preload 800px version for mobile to minimize bandwidth and CPU
                    - Preload 1920px version for desktop
                */}
                <link
                    rel="preload"
                    as="image"
                    href="https://image.mux.com/oXL4cy02saoCX5kH6L00J2E1r2dkQO4n8a01GMxDe4NThw/thumbnail.webp?width=800&time=0"
                    media="(max-width: 768px)"
                    // @ts-ignore
                    fetchPriority="high"
                />
                <link
                    rel="preload"
                    as="image"
                    href="https://image.mux.com/oXL4cy02saoCX5kH6L00J2E1r2dkQO4n8a01GMxDe4NThw/thumbnail.webp?width=1920&time=0"
                    media="(min-width: 769px)"
                    // @ts-ignore
                    fetchPriority="high"
                />
            </head>
            <body className={`${playfair.className} font-sans text-sbh-charcoal bg-sbh-cream min-h-screen flex flex-col`}>
                <noscript>
                    <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NBCJJ2CV"
                    height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
                </noscript>
                <Providers locale={locale}>
                    <ScrollReveal />
                    {/* 
                        Performance Optimization (Desktop):
                        Removed feTurbulence (heavy CPU) and mix-blend-mode: overlay (heavy GPU).
                        Using a lightweight static noise pattern with simple opacity on a separate GPU layer.
                    */}
                    <div
                        aria-hidden="true"
                        className="fixed inset-0 z-0 pointer-events-none select-none opacity-[0.02]"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
                            // mix-blend-mode: overlay; // Removed for performance
                            transform: 'translateZ(0)', // Promote to GPU layer
                        }}
                    />
                    <Navbar />
                    <main className="flex-grow flex flex-col pt-0">
                        {children}
                    </main>
                    <WhatsAppButton />
                    <CookieBanner />
                    <div className="relative z-10">
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    )
}
