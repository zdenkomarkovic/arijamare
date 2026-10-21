import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getLandingCategory, getProductsByCategory } from '@/lib/sanity/queries'
import { buildMetadata } from '@/lib/metadata'
import RichText from '@/components/content/RichText'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ProductGrid from '@/components/shop/ProductGrid'
import type { PortableTextBlock } from '@/types/shop'

// Na kategorijskim stranicama FAQ ide ispod kartica proizvoda: sadržaj se deli na uvod i FAQ
// (FAQ počinje prvim naslovom koji počinje sa „FAQ”).
function splitAtFaq(body: PortableTextBlock[] = []) {
  const i = body.findIndex(
    (b) =>
      b._type === 'block' &&
      typeof b.style === 'string' &&
      b.style.startsWith('h') &&
      Array.isArray(b.children) &&
      (b.children as { text?: string }[]).map((c) => c.text ?? '').join('').trim().toUpperCase().startsWith('FAQ'),
  )
  return i === -1 ? { intro: body, faq: [] } : { intro: body.slice(0, i), faq: body.slice(i) }
}

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = await getLandingCategory(slug)
  if (!category) return {}
  return buildMetadata({
    title: category.pageSeoTitle ?? category.seoTitle ?? category.name,
    description: category.pageSeoDescription ?? category.seoDescription ?? category.description,
    url: `/${slug}/`,
  })
}

// Svaka glavna kategorija iz Sanity-ja ima svoju stranicu na /naziv-kategorije/ (podkategorije nemaju,
// one se prikazuju unutar nadkategorije). Statične stranice (o-nama, kontakt...) su u kodu.
export default async function CategoryLandingPage({ params }: Props) {
  const { slug } = await params
  const category = await getLandingCategory(slug)
  if (!category) notFound()

  const { products, total } = await getProductsByCategory(slug, 1)
  const { intro, faq } = splitAtFaq(category.body)

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ name: category.name }]} />
      <h1 className="text-3xl font-semibold mb-8 font-serif">{category.name}</h1>
      <div className="max-w-4xl">
        {intro.length === 0 && category.description && <p className="text-gray-700">{category.description}</p>}
        <RichText value={intro} />
      </div>
      <section className="mt-12">
        <ProductGrid products={products} emptyMessage="Nema proizvoda u ovoj kategoriji." />
        {total > products.length && (
          <p className="mt-6 text-center">
            <Link href={`/product-category/${slug}/`} className="text-brand underline underline-offset-4">
              Pogledaj sve proizvode ({total})
            </Link>
          </p>
        )}
      </section>
      {faq.length > 0 && (
        <section className="max-w-4xl mt-14 pt-10 border-t border-gray-100">
          <RichText value={faq} />
        </section>
      )}
    </main>
  )
}
