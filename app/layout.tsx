import type { Metadata } from 'next'
import { Playfair_Display } from 'next/font/google'
import './globals.css'

// Optimize font loading with next/font
const playfairDisplay = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
    style: ['normal', 'italic'],
    display: 'swap',
    variable: '--font-playfair',
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
        <html lang="fr" className={`scroll-smooth ${playfairDisplay.variable}`} style={{ scrollPaddingTop: '100px' }}>
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
            <body className={playfairDisplay.className}>
                {children}
            </body>
        </html>
    )
}
