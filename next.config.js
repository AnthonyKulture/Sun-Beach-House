/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable SWC minification for faster builds
    swcMinify: true,

    // Enable compression
    compress: true,

    // Optimize images
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/images/**',
            },
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                pathname: '/images-sbh/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'image.mux.com',
            },
        ],
        // Enable modern image formats
        formats: ['image/avif', 'image/webp'],
        // Optimize image quality
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    },

    // Enable experimental features for better PDF generation
    experimental: {
        serverComponentsExternalPackages: ['@react-pdf/renderer'],
    },

    // Rewrites to proxy Sanity images (to avoid suspicious activity flags in emails)
    async rewrites() {
        return [
            {
                source: '/sanity-assets/:path*',
                destination: 'https://cdn.sanity.io/images/i6dkdu7j/:path*',
            },
        ]
    },

    // 301 Redirects for legacy SEO preservation
    async redirects() {
        return [
            // Language and root mappings
            { source: '/', has: [{ type: 'query', key: 'lang', value: 'en' }], destination: '/en', permanent: true },
            { source: '/', has: [{ type: 'query', key: 'lang', value: 'en/' }], destination: '/en', permanent: true },
            { source: '/en/', destination: '/en', permanent: true },

            // Static and legal pages
            { source: '/ventes', destination: '/fr/sales', permanent: true },
            { source: '/ventes/saint-barth', destination: '/fr/sales', permanent: true },
            { source: '/sales', destination: '/fr/sales', permanent: true },
            { source: '/sales/st-barts', destination: '/fr/sales', permanent: true },
            { source: '/a-propos', destination: '/fr/about', permanent: true },
            { source: '/about-us', destination: '/en/about', permanent: true },
            { source: '/fr/about/about', destination: '/fr/about', permanent: true },
            { source: '/nous-contacter', destination: '/fr/contact', permanent: true },
            { source: '/contact-us', destination: '/en/contact', permanent: true },
            { source: '/en/page/general-rental-conditions', destination: '/en/conditions-generales', permanent: true },
            { source: '/page/legal-notice', destination: '/en/mentions-legales', permanent: true },
            { source: '/fr/page/mentions-legales', destination: '/fr/mentions-legales', permanent: true },

            // Category mappings
            { source: '/international-villa-rentals', destination: '/fr/rentals', permanent: true },
            { source: '/locations-villa-saint-barth', destination: '/fr/rentals', permanent: true },
            { source: '/st-barts-villa-rentals', destination: '/en/rentals', permanent: true },
            { source: '/stay-in-st-barts', destination: '/en/rentals', permanent: true },
            { source: '/sejourner-a-saint-barth', destination: '/fr/rentals', permanent: true },

            // Villa specific redirections (mapped from Search Console)
            { source: '/fr/bien-a-louer/ahava', destination: '/fr/villas/villa-6315', permanent: true },
            { source: '/location/ahava', destination: '/fr/villas/villa-6315', permanent: true },
            { source: '/location/paille-en-queue', destination: '/fr/villas/villa-486', permanent: true },
            { source: '/rental/rock', destination: '/fr/villas/villa-2229', permanent: true },
            { source: '/location/rock', destination: '/fr/villas/villa-2229', permanent: true },
            { source: '/fr/bien-a-louer/rock', destination: '/fr/villas/villa-2229', permanent: true },
            { source: '/bien-a-louer/unik', destination: '/fr/villas/villa-2681', permanent: true },
            { source: '/location/unik', destination: '/fr/villas/villa-2681', permanent: true },
            { source: '/fr/bien-a-louer/manoir-voltaire', destination: '/fr/villas/villa-4927', permanent: true },
            { source: '/location/manoir-voltaire', destination: '/fr/villas/villa-4927', permanent: true },
            { source: '/location/ti-manoir-voltaire', destination: '/fr/villas/villa-4927', permanent: true },
            { source: '/rental/domaine-manoir-voltaire', destination: '/fr/villas/villa-4927', permanent: true },
            { source: '/rental/yuzu', destination: '/fr/villas/villa-339', permanent: true },
            { source: '/location/yuzu', destination: '/fr/villas/villa-339', permanent: true },
            { source: '/rental/le-manoir-de-lorient', destination: '/fr/villas/villa-400', permanent: true },
            { source: '/location/la-maison-de-la-mer', destination: '/fr/villas/villa-400', permanent: true },
            { source: '/rental/la-maison-de-la-mer', destination: '/fr/villas/villa-400', permanent: true },
            { source: '/bien-a-louer/pastel', destination: '/fr/villas/villa-335', permanent: true },
            { source: '/rental/pastel', destination: '/fr/villas/villa-335', permanent: true },
            { source: '/location/aka', destination: '/fr/villas/villa-370', permanent: true },
            { source: '/location/avalon', destination: '/fr/villas/villa-1419', permanent: true },
            { source: '/rental/avalon', destination: '/fr/villas/villa-1419', permanent: true },
            { source: '/location/african-queen', destination: '/fr/villas/villa-371', permanent: true },
            { source: '/location/alpaka', destination: '/fr/villas/villa-345', permanent: true },
            { source: '/vente/acajous', destination: '/fr/villas/villa-1993', permanent: true },
            { source: '/sale/acajous', destination: '/fr/villas/villa-1993', permanent: true },
            { source: '/rental/la-bulle', destination: '/fr/villas/villa-4513', permanent: true },
            { source: '/rental/l-oiseau-bleu', destination: '/fr/villas/villa-3659', permanent: true },
            { source: '/location/l-oiseau-bleu', destination: '/fr/villas/villa-3659', permanent: true },
            { source: '/rental/mamiami', destination: '/fr/villas/villa-800', permanent: true },
            { source: '/rental/la-vue-1', destination: '/fr/villas/villa-3671', permanent: true },
            { source: '/bien-a-louer/ti-lama', destination: '/fr/villas/villa-353', permanent: true },
            { source: '/rental/ti-lama', destination: '/fr/villas/villa-353', permanent: true },
            { source: '/location/marcel', destination: '/fr/villas/villa-398', permanent: true },
            { source: '/rental/marcel', destination: '/fr/villas/villa-398', permanent: true },
            { source: '/rental/ti-rock-1', destination: '/fr/villas/villa-788', permanent: true },
            { source: '/rental/wild-banana', destination: '/fr/villas/villa-5148', permanent: true },
            { source: '/rental/maison-de-la-luz', destination: '/fr/villas/villa-1328', permanent: true },
            { source: '/location/legends-b', destination: '/fr/villas/villa-3658', permanent: true },
            { source: '/location/only-you', destination: '/fr/villas/villa-1275', permanent: true },
            { source: '/rental/only-you', destination: '/fr/villas/villa-1275', permanent: true },
            { source: '/location/sand-club', destination: '/fr/villas/villa-1817', permanent: true },
            { source: '/location/jnana-1', destination: '/fr/villas/villa-2635', permanent: true },
            { source: '/rental/jnana-1', destination: '/fr/villas/villa-2635', permanent: true },
            { source: '/location/kyr', destination: '/fr/villas/villa-1569', permanent: true },
            { source: '/rental/kyr', destination: '/fr/villas/villa-1569', permanent: true },
            { source: '/location/borderline', destination: '/fr/villas/villa-2215', permanent: true },
            { source: '/location/gaillac', destination: '/fr/villas/villa-5855', permanent: true },
            { source: '/rental/gaillac', destination: '/fr/villas/villa-5855', permanent: true },
            { source: '/location/le-moulin', destination: '/fr/villas/villa-5296', permanent: true },
            { source: '/rental/suite-acajous', destination: '/fr/villas/villa-485', permanent: true },
            { source: '/rental/casa-del-mar', destination: '/fr/villas/villa-1440', permanent: true },
            { source: '/location/casa-del-mar', destination: '/fr/villas/villa-1440', permanent: true },
            { source: '/location/blanc-bleu', destination: '/fr/villas/villa-1303', permanent: true },
            { source: '/location/vague-bleue', destination: '/fr/villas/villa-374', permanent: true },
            { source: '/rental/vague-bleue', destination: '/fr/villas/villa-374', permanent: true },
            { source: '/rental/douceur-de-vivre', destination: '/fr/villas/villa-1432', permanent: true },
            { source: '/location/reef-point', destination: '/fr/villas/villa-480', permanent: true },
            { source: '/fr/bien-a-louer/les-palmes', destination: '/fr/villas/villa-796', permanent: true },
            { source: '/rental/pasha', destination: '/fr/villas/villa-5297', permanent: true },
            { source: '/rental/manonjul', destination: '/fr/villas/villa-380', permanent: true },
            { source: '/location/ti-castelle', destination: '/fr/villas/ti-castelle', permanent: true },
            { source: '/rental/ti-castelle', destination: '/fr/villas/ti-castelle', permanent: true },
            { source: '/location/castelle', destination: '/fr/villas/villa-2252', permanent: true },
            { source: '/rental/bohemian-blue', destination: '/fr/villas/bohemian-blue', permanent: true },
            { source: '/rental/tourmaline', destination: '/fr/villas/villa-3584', permanent: true },
            { source: '/rental/lagon-jaune-estate', destination: '/fr/villas/villa-3472', permanent: true },
            { source: '/rental/lagon-vert', destination: '/fr/villas/villa-3654', permanent: true },
            { source: '/location/sea-star', destination: '/fr/villas/villa-103f231e-9618-40d1-93ff-4627e14ad998', permanent: true },
            { source: '/rental/floating-garden', destination: '/fr/villas/villa-3653', permanent: true },

            // General pattern fallbacks
            { source: '/location/:slug', destination: '/fr/rentals', permanent: true },
            { source: '/rental/:slug', destination: '/fr/rentals', permanent: true },
            { source: '/sale/:slug', destination: '/fr/sales', permanent: true },
            { source: '/locations-villa-international/:path*', destination: '/fr/rentals', permanent: true },
            { source: '/international-villa-rentals/:path*', destination: '/fr/rentals', permanent: true },
            { source: '/bien-a-louer/:slug', destination: '/fr/rentals', permanent: true },

            // Catch-all for legacy st_barth territory pages (SEO preservation)
            { source: '/st_barth/:path*', destination: '/fr/destinations', permanent: true },
            { source: '/fr/st_barth/:path*', destination: '/fr/destinations', permanent: true },

            // Legacy Search query mapping (WordPress style)
            { 
                source: '/', 
                has: [{ type: 'query', key: 's' }], 
                destination: '/fr/rentals', 
                permanent: true 
            },
        ]
    },

    // Security headers
    async headers() {
        return [
            {
                source: '/api/:path*',
                headers: [
                    { key: 'Access-Control-Allow-Origin', value: 'https://sbh-admin.sanity.studio' },
                    { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
                    { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
                    { key: 'X-Robots-Tag', value: 'noindex' },
                ]
            },
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'X-DNS-Prefetch-Control',
                        value: 'on'
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN'
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff'
                    },
                    {
                        key: 'Referrer-Policy',
                        value: 'strict-origin-when-cross-origin'
                    },
                    {
                        key: 'Permissions-Policy',
                        value: 'camera=(), microphone=(), geolocation=(self)'
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.sanity.io https://maps.googleapis.com https://*.googleapis.com https://va.vercel-scripts.com https://vercel.live https://www.gstatic.com https://scripts.mux.com https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://cdn.sanity.io https://storage.googleapis.com https://images.unsplash.com https://image.mux.com https://maps.gstatic.com https://*.googleapis.com https://www.googletagmanager.com https://www.google-analytics.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.sanity.io https://*.googleapis.com https://vitals.vercel-insights.com https://*.sanity.studio https://*.mux.com https://*.litix.io https://www.gstatic.com https://www.googletagmanager.com https://www.google-analytics.com; media-src 'self' blob: https://*.mux.com; frame-src 'self' https://player.mux.com https://vercel.live https://*.sanity.studio; worker-src 'self' blob:;"
                    }
                ],
            },
        ]
    },
}

module.exports = nextConfig
