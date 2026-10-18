import { Suspense } from 'react'
import Link from 'next/link'
import { getFilteredProducts, getAllCategories, PAGE_SIZE } from '@/lib/sanity/queries'
import ProductGrid from '@/components/shop/ProductGrid'
import SearchInput from '@/components/shop/SearchInput'
import CategorySelect from '@/components/shop/CategorySelect'
import Pagination from '@/components/shop/Pagination'

export const metadata = { title: 'Svi proizvodi' }

interface Props {
  searchParams: Promise<{ q?: string; kategorija?: string; page?: string }>
}

export default async function ProizvodiStranica({ searchParams }: Props) {
  const { q, kategorija, page } = await searchParams
  const query = q?.trim() ?? ''
  const categorySlug = kategorija?.trim() ?? ''
  const currentPage = Math.max(1, parseInt(page ?? '1'))

  const [{ products, total }, categories] = await Promise.all([
    getFilteredProducts(query || undefined, categorySlug || undefined, currentPage),
    getAllCategories(),
  ])

  const hasFilters = query || categorySlug
  const activeCategory = categories.find((c) => c.slug === categorySlug)

  function buildTitle() {
    if (query && activeCategory) return `„${query}" u kategoriji ${activeCategory.name}`
    if (query) return `Rezultati za „${query}"`
    if (activeCategory) return activeCategory.name
    return 'Svi proizvodi'
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl font-semibold">{buildTitle()}</h1>

        <div className="flex items-center gap-2 flex-wrap">
          <Suspense>
            <CategorySelect categories={categories} />
          </Suspense>
          <Suspense>
            <SearchInput />
          </Suspense>
        </div>
      </div>

      {hasFilters && products.length === 0 && (
        <p className="text-gray-400 text-sm mb-6">
          Nema rezultata.{' '}
          <Link href="/proizvodi" className="underline hover:text-black">
            Prikaži sve proizvode
          </Link>
        </p>
      )}

      <ProductGrid products={products} />

      <Suspense>
        <Pagination total={total} pageSize={PAGE_SIZE} />
      </Suspense>
    </main>
  )
}
