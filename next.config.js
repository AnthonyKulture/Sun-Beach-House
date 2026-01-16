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

    // Security headers
    async headers() {
        return [
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
                        value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://cdn.sanity.io https://maps.googleapis.com https://*.googleapis.com https://va.vercel-scripts.com https://vercel.live; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://cdn.sanity.io https://storage.googleapis.com https://images.unsplash.com https://maps.gstatic.com https://*.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://*.sanity.io https://*.googleapis.com https://vitals.vercel-insights.com;"
                    }
                ],
            },
        ]
    },
}

module.exports = nextConfig
