import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/constants'
import { getSitemapData } from '@/lib/sanity/queries'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { products, categories, posts, pages } = await getSitemapData()
  const entry = (
    path: string,
    updated?: string,
    priority = 0.6,
    changeFrequency: 'daily' | 'weekly' | 'monthly' = 'monthly',
  ) => ({
    url: `${SITE_URL}${path}`,
    lastModified: updated ? new Date(updated) : undefined,
    changeFrequency,
    priority,
  })

  return [
    entry('/', undefined, 1, 'weekly'),
    entry('/prodavnica/', undefined, 0.9, 'daily'),
    entry('/blog/', undefined, 0.7, 'weekly'),
    ...pages.map((p) => entry(`/${p.slug}/`, p.updated, 0.8)),
    ...categories.map((c) => entry(`/product-category/${c.slug}/`, c.updated, 0.8, 'weekly')),
    ...products.map((p) => entry(`/shop/${p.slug}/`, p.updated, 0.8, 'weekly')),
    ...posts.map((p) => entry(`/blog/${p.slug}/`, p.updated, 0.6)),
  ]
}
