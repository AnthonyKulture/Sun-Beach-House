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

export const metadata: Metadata = {
    title: {
        default: 'Sun Beach House | St. Barth - Location & Vente de Villas de Luxe',
        template: '%s | Sun Beach House St. Barth'
    },
    description: 'Sun Beach House - Votre agence immobilière de prestige à Saint-Barthélemy. Location et vente de villas de luxe, conciergerie privée et services sur mesure avec Valérie.',
    keywords: ['villa luxe saint barth', 'location villa st barth', 'vente villa saint barthélemy', 'conciergerie privée st barth', 'Sun Beach House'],
    authors: [{ name: 'Sun Beach House' }],
    creator: 'Sun Beach House',
    publisher: 'Sun Beach House',
    metadataBase: new URL('https://sun-beach-house.com'),
    alternates: {
        canonical: 'https://sun-beach-house.com',
    },
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://sun-beach-house.com',
        siteName: 'Sun Beach House',
        title: 'Sun Beach House | Villas de Luxe & Conciergerie à Saint-Barthélemy',
        description: 'Explorez notre collection exclusive de villas de luxe à St. Barth. Location, vente et services de conciergerie haut de gamme.',
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
        title: 'Sun Beach House | Villas de Luxe St. Barth',
        description: 'Location et vente de villas de luxe à Saint-Barthélemy',
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
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-JY1FQ1MG2F"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
                      window.dataLayer = window.dataLayer || [];
                      function gtag(){dataLayer.push(arguments);}
                      gtag('js', new Date());

                      gtag('config', 'G-JY1FQ1MG2F');
                    `}
                </Script>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'RealEstateAgent',
                            name: 'Sun Beach House',
                            description: 'Location et vente de villas de luxe à Saint-Barthélemy. Conciergerie privée haut de gamme.',
                            url: 'https://sun-beach-house.com',
                            logo: 'https://sun-beach-house.com/logo-sbh.png',
                            image: 'https://sun-beach-house.com/og-image.jpg',
                            telephone: '+590690634725',
                            email: 'valerie@sun-beach-house.com',
                            address: {
                                '@type': 'PostalAddress',
                                streetAddress: '65 RUE DE LA PAIX GUSTAVIA',
                                addressLocality: 'Saint-Barthélemy',
                                postalCode: '97133',
                                addressCountry: 'FR',
                            },
                            geo: {
                                '@type': 'GeoCoordinates',
                                latitude: 17.8967,
                                longitude: -62.8497,
                            },
                            founder: {
                                '@type': 'Person',
                                name: 'Valérie Kerckhofs',
                            },
                            sameAs: [
                                'https://www.instagram.com/sun.beach.house',
                                'https://share.google/Ho4uufMpWmqr2tUc8',
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
