import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/images/'],
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Bytespider', 'Google-Extended'],
        disallow: ['/'],
      }
    ],
    sitemap: 'https://sun-beach-house.com/sitemap.xml',
  }
}
