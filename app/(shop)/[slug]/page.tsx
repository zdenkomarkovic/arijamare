import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getSitePage, getProductsByCategory } from '@/lib/sanity/queries'
import { buildMetadata } from '@/lib/metadata'
import RichText from '@/components/content/RichText'
import ContactInfo from '@/components/content/ContactInfo'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ProductGrid from '@/components/shop/ProductGrid'

// Landing stranice koje na originalnom sajtu postoje uz /product-category/... (zadržavamo URL-ove)
const CATEGORY_LANDING: Record<string, string> = {
  'etericna-ulja': 'etericna-ulja',
  hidrolati: 'hidrolati',
  kozmetika: 'kozmetika',
  'prirodni-cajevi': 'biljni-cajevi',
  'hladno-cedjena-ulja': 'hladno-cedjena-ulja',
}

const NOT_PAGES = ['home', 'blog', 'prodavnica']

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getSitePage(slug)
  if (!page) return {}
  return buildMetadata({
    title: page.seoTitle ?? page.title,
    description: page.seoDescription,
    url: `/${slug}/`,
  })
}

export default async function StaticPage({ params }: Props) {
  const { slug } = await params
  const page = NOT_PAGES.includes(slug) ? null : await getSitePage(slug)
  if (!page) notFound()

  const categorySlug = CATEGORY_LANDING[slug]
  const { products, total } = categorySlug
    ? await getProductsByCategory(categorySlug, 1)
    : { products: [], total: 0 }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ name: page.title }]} />
      <h1 className="text-3xl font-semibold mb-8 font-serif">{page.title}</h1>
      <div className="max-w-4xl">
        <RichText value={page.body} />
        {slug === 'kontakt' && <ContactInfo />}
      </div>
      {categorySlug && (
        <section className="mt-12">
          <ProductGrid products={products} />
          {total > products.length && (
            <p className="mt-6 text-center">
              <Link href={`/product-category/${categorySlug}/`} className="text-brand underline underline-offset-4">
                Pogledaj sve proizvode ({total})
              </Link>
            </p>
          )}
        </section>
      )}
    </main>
  )
}
