import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import '../globals.css'
import { Providers } from '@/app/providers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
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
                            ],
                            areaServed: 'Saint-Barthélemy',
                            priceRange: '$$$$',
                        })
                    }}
                />
                <link
                    rel="preload"
                    as="image"
                    href="https://image.mux.com/oXL4cy02saoCX5kH6L00J2E1r2dkQO4n8a01GMxDe4NThw/thumbnail.webp?width=1920&time=0"
                    // @ts-ignore
                    fetchPriority="high"
                />
            </head>
            <body className={`${playfair.className} font-sans text-sbh-charcoal bg-sbh-cream min-h-screen flex flex-col`}>
                <Providers locale={locale}>
                    <ScrollReveal />
                    {/* Noise texture: pointer-events-none, no mix-blend to avoid full-page compositing */}
                    <div
                        aria-hidden="true"
                        className="fixed inset-0 z-0 pointer-events-none select-none"
                        style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'1\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                            opacity: 0.015,
                        }}
                    />
                    <Navbar />
                    <main className="flex-grow flex flex-col pt-0">
                        {children}
                    </main>
                    <WhatsAppButton />
                    <div className="relative z-10">
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    )
}
