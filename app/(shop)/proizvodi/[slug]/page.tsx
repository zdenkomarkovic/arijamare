import { notFound } from 'next/navigation'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import type { Metadata } from 'next'
import { getProductBySlug, getRelatedProducts } from '@/lib/sanity/queries'
import { buildMetadata } from '@/lib/metadata'
import { SITE_URL } from '@/lib/constants'
import ProductGallery from '@/components/shop/ProductGallery'
import AddToCartButton from '@/components/shop/AddToCartButton'
import ShareButton from '@/components/shop/ShareButton'
import ProductGrid from '@/components/shop/ProductGrid'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}

  const price = product.salePrice ?? product.price
  const description = price != null
    ? `${product.name} — ${price.toLocaleString('sr-RS')} RSD`
    : product.name

  return buildMetadata({
    title: product.name,
    description,
    url: `/proizvodi/${slug}`,
    type: 'website',
  })
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) notFound()

  const related = product.category
    ? await getRelatedProducts(product.category.slug, slug)
    : []

  const displayPrice = product.salePrice ?? product.price

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors">Početna</Link>
        <span>/</span>
        <Link href="/proizvodi" className="hover:text-black transition-colors">Proizvodi</Link>
        {product.category && (
          <>
            <span>/</span>
            <Link
              href={`/kategorije/${product.category.slug}`}
              className="hover:text-black transition-colors"
            >
              {product.category.name}
            </Link>
          </>
        )}
        <span>/</span>
        <span className="text-gray-600 truncate">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <ProductGallery images={product.images ?? []} productName={product.name} />

        <div className="flex flex-col gap-6">
          <div>
            {product.category && (
              <Link
                href={`/kategorije/${product.category.slug}`}
                className="text-xs text-gray-400 uppercase tracking-wide hover:text-black transition-colors"
              >
                {product.category.name}
              </Link>
            )}
            <h1 className="text-2xl font-semibold mt-1">{product.name}</h1>
          </div>

          <div className="flex items-baseline gap-3">
            {displayPrice != null ? (
              <>
                <span className="text-2xl font-bold">
                  {displayPrice.toLocaleString('sr-RS')} RSD
                </span>
                {product.salePrice && product.price != null && (
                  <span className="text-base text-gray-400 line-through">
                    {product.price.toLocaleString('sr-RS')} RSD
                  </span>
                )}
                {product.salePrice && (
                  <span className="text-sm bg-black text-white px-2 py-0.5 rounded">
                    Akcija
                  </span>
                )}
              </>
            ) : (
              <span className="text-gray-500 italic">Cena na upit</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
              {product.inStock ? 'Na stanju' : 'Nije na stanju'}
            </span>
            <ShareButton
              title={product.name}
              url={`${SITE_URL}/proizvodi/${slug}`}
            />
          </div>

          <AddToCartButton product={product} />

          {product.description && product.description.length > 0 && (
            <div className="pt-6 border-t border-gray-100">
              <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-3">
                Opis
              </h2>
              <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed">
                <PortableText value={product.description} />
              </div>
            </div>
          )}
        </div>
      </div>

      {related.length > 0 && (
        <section className="mt-16 pt-10 border-t border-gray-100">
          <h2 className="text-lg font-semibold mb-6">Može te zanimati</h2>
          <ProductGrid products={related} />
        </section>
      )}
    </main>
  )
}
