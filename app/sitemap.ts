import type { MetadataRoute } from 'next'
import worksData from '@/data/works.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://oohlab.co.kr'
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/works`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]

  const workPages: MetadataRoute.Sitemap = worksData.works
    .filter((w) => w.isPublic)
    .map((w) => ({
      url: `${baseUrl}/works/${w.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }))

  return [...staticPages, ...workPages]
}
