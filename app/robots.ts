import { MetadataRoute } from 'next'

// AI / generative-search crawlers we explicitly welcome (visibility in ChatGPT,
// Perplexity, Google AI Overviews, Claude, Common Crawl…). They already fall under
// the wildcard rule, but naming them states intent and avoids accidental future blocks.
const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'ClaudeBot',
  'Claude-Web',
  'Google-Extended',
  'CCBot',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/images/'],
        disallow: ['/api/', '/_next/'],
      },
      ...AI_BOTS.map((userAgent) => ({
        userAgent,
        allow: '/',
      })),
    ],
    sitemap: 'https://www.sun-beach-house.com/sitemap.xml',
  }
}
