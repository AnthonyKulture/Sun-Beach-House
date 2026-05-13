import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/images/'],
        disallow: ['/api/', '/_next/'],
      },
    ],
    sitemap: 'https://www.sun-beach-house.com/sitemap.xml',
  }
}
