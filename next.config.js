/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'cdn.sanity.io',
                pathname: '/images/**',
            },
        ],
    },
    // Enable experimental features for better PDF generation
    experimental: {
        serverComponentsExternalPackages: ['@react-pdf/renderer'],
    },
}

module.exports = nextConfig
