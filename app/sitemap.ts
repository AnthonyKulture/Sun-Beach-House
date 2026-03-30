import { MetadataRoute } from 'next'
import { CmsService } from '../services/cms'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sun-beach-house.com'
  const locales = ['fr', 'en', 'es', 'pt']
  
  const staticPaths = [
    { path: '', priority: 1, changeFreq: 'daily' as const },
    { path: '/rentals', priority: 0.8, changeFreq: 'daily' as const },
    { path: '/sales', priority: 0.8, changeFreq: 'daily' as const },
    { path: '/about', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/contact', priority: 0.7, changeFreq: 'weekly' as const },
    { path: '/conciergerie', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/destinations', priority: 0.8, changeFreq: 'weekly' as const },
    { path: '/mentions-legales', priority: 0.3, changeFreq: 'monthly' as const },
    { path: '/politique-de-confidentialite', priority: 0.3, changeFreq: 'monthly' as const },
    { path: '/conditions-generales', priority: 0.3, changeFreq: 'monthly' as const },
  ]

  // Dynamic villa routes
  const villas = await CmsService.getSitemapData()

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
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/villas/${villa.id}`,
        lastModified: new Date(villa.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
        alternates: {
          languages: {
            'fr': `${baseUrl}/fr/villas/${villa.id}`,
            'en': `${baseUrl}/en/villas/${villa.id}`,
            'es': `${baseUrl}/es/villas/${villa.id}`,
            'pt': `${baseUrl}/pt/villas/${villa.id}`,
          }
        }
      })
    })
  }

  return sitemapEntries
}
