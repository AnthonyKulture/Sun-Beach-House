import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
    title: 'Sun Beach House | St. Barth',
    description: 'Sun Beach House St Barth - Location et vente de villas de luxe. Conciergerie privée par Valérie.',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="fr" className="scroll-smooth" style={{ scrollPaddingTop: '100px' }}>
            <head>
                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body>
                {children}
            </body>
        </html>
    )
}
