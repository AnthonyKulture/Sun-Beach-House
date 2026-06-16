import { MetadataRoute } from 'next'
import { CmsService } from '../services/cms'
import { NEIGHBORHOOD_SLUGS } from '../data/neighborhoods'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.sun-beach-house.com'
  const locales = ['fr', 'en', 'es', 'pt']
  
  const staticPaths = [
    { path: '', priority: 1, changeFreq: 'daily' as const },
    { path: '/rentals', priority: 0.8, changeFreq: 'daily' as const },
    { path: '/sales', priority: 0.8, changeFreq: 'daily' as const },
    { path: '/about', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/contact', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/conciergerie', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/destinations', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/blog', priority: 0.7, changeFreq: 'daily' as const },
    { path: '/mentions-legales', priority: 0.3, changeFreq: 'monthly' as const },
    { path: '/politique-de-confidentialite', priority: 0.3, changeFreq: 'monthly' as const },
    { path: '/conditions-generales', priority: 0.3, changeFreq: 'monthly' as const },
    // Neighborhood landing pages (/location-villa-{quartier})
    ...NEIGHBORHOOD_SLUGS.map((slug) => ({
      path: `/location-villa-${slug}`,
      priority: 0.8,
      changeFreq: 'weekly' as const,
    })),
  ]

  // Dynamic villa routes
  const villas = await CmsService.getSitemapData()

  // Dynamic blog post routes (one entry per language with its own slug)
  const posts = await CmsService.getAllPostSlugs()

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Generate entries for each locale and each path
  for (const locale of locales) {
    // Static Routes
    staticPaths.forEach((route) => {
      const pathWithLocale = `/${locale}${route.path}`
      sitemapEntries.push({
        url: `${baseUrl}${pathWithLocale}`,
        lastModified: new Date(),
        changeFrequency: route.changeFreq,
        priority: route.priority,
        alternates: {
          languages: {
            'fr': `${baseUrl}/fr${route.path}`,
            'en': `${baseUrl}/en${route.path}`,
            'es': `${baseUrl}/es${route.path}`,
            'pt': `${baseUrl}/pt${route.path}`,
          }
        }
      })
    })

    // Villa Routes
    villas.forEach((villa) => {
      const preferredId = villa.slug || villa.id
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/villas/${preferredId}`,
        lastModified: new Date(villa.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            'fr': `${baseUrl}/fr/villas/${preferredId}`,
            'en': `${baseUrl}/en/villas/${preferredId}`,
            'es': `${baseUrl}/es/villas/${preferredId}`,
            'pt': `${baseUrl}/pt/villas/${preferredId}`,
          }
        }
      })
    })

    // Blog post routes — slug differs per language, hreflang points each variant to its own slug
    posts.forEach((post) => {
      const currentSlug = post.slug[locale as 'fr' | 'en' | 'es' | 'pt']
      if (!currentSlug) return // skip if no translation for this locale
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${currentSlug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.6,
        alternates: {
          languages: {
            ...(post.slug.fr ? { fr: `${baseUrl}/fr/blog/${post.slug.fr}` } : {}),
            ...(post.slug.en ? { en: `${baseUrl}/en/blog/${post.slug.en}` } : {}),
            ...(post.slug.es ? { es: `${baseUrl}/es/blog/${post.slug.es}` } : {}),
            ...(post.slug.pt ? { pt: `${baseUrl}/pt/blog/${post.slug.pt}` } : {}),
          }
        }
      })
    })
  }

  return sitemapEntries
}
