import type { Metadata } from 'next'
import { Inter, Playfair_Display, Outfit, Mr_De_Haviland } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { ScrollReveal } from '@/components/ScrollReveal'
import { WhatsAppButton } from '@/components/WhatsAppButton'

// Optimize font loading with next/font
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    variable: '--font-playfair',
})
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' })
const mrDeHaviland = Mr_De_Haviland({
    weight: '400',
    subsets: ['latin'],
    variable: '--font-mr-de-haviland'
})

export const metadata: Metadata = {
    title: {
        default: 'Sun Beach House | St. Barth - Villas de Luxe',
        template: '%s | Sun Beach House St. Barth'
    },
    description: 'Sun Beach House St Barth - Location et vente de villas de luxe à Saint-Barthélemy. Conciergerie privée haut de gamme par Valérie. Découvrez nos propriétés exclusives avec vue mer.',
    keywords: ['villa luxe saint barth', 'location villa st barth', 'vente villa saint barthélemy', 'conciergerie privée', 'Sun Beach House'],
    authors: [{ name: 'Sun Beach House' }],
    creator: 'Sun Beach House',
    publisher: 'Sun Beach House',
    metadataBase: new URL('https://sunbeachhouse.com'),
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://sunbeachhouse.com',
        siteName: 'Sun Beach House',
        title: 'Sun Beach House | Villas de Luxe à Saint-Barthélemy',
        description: 'Location et vente de villas de luxe à St. Barth. Conciergerie privée haut de gamme.',
        images: [
            {
                url: '/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Sun Beach House - Villas de Luxe St. Barth',
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
    verification: {
        // Add your verification tokens here
        // google: 'your-google-verification-code',
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className={`scroll-smooth ${inter.variable} ${playfair.variable} ${outfit.variable} ${mrDeHaviland.variable}`} style={{ scrollPaddingTop: '100px' }}>
            <head>
                {/* Structured Data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'RealEstateAgent',
                            name: 'Sun Beach House',
                            description: 'Location et vente de villas de luxe à Saint-Barthélemy',
                            url: 'https://sunbeachhouse.com',
                            image: '/og-image.jpg',
                            address: {
                                '@type': 'PostalAddress',
                                addressLocality: 'Saint-Barthélemy',
                                addressCountry: 'FR',
                            },
                            areaServed: 'Saint-Barthélemy',
                        })
                    }}
                />
            </head>
            <body className={`${playfair.className} font-sans text-sbh-charcoal bg-sbh-cream min-h-screen flex flex-col`}>
                <Providers>
                    <ScrollReveal />
                    <div className="fixed inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
                        style={{
                            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
                            pointerEvents: 'none'
                        }}>
                    </div>
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
