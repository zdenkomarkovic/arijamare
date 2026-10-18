import { Suspense } from 'react'
import Link from 'next/link'
import ProductGrid from '@/components/shop/ProductGrid'
import CategoryList from '@/components/shop/CategoryList'
import HeroSlider from '@/components/shop/HeroSlider'
import Pagination from '@/components/shop/Pagination'
import { getFeaturedProducts, getAllCategories, getHeroSlides } from '@/lib/sanity/queries'

const FEATURED_PAGE_SIZE = 8

interface Props {
  searchParams: Promise<{ page?: string }>
}

export default async function HomePage({ searchParams }: Props) {
  const { page } = await searchParams
  const currentPage = Math.max(1, parseInt(page ?? '1'))

  const [{ products: featuredProducts, total }, categories, heroSlides] = await Promise.all([
    getFeaturedProducts(currentPage, FEATURED_PAGE_SIZE),
    getAllCategories(),
    getHeroSlides(),
  ])

  return (
    <>
      <HeroSlider slides={heroSlides} />

      <main className="max-w-6xl mx-auto px-4 py-10 space-y-16">
        {categories.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Kategorije</h2>
              <Link href="/kategorije" className="text-sm hover:underline underline-offset-4">
                Sve kategorije &rarr;
              </Link>
            </div>
            <CategoryList categories={categories} />
          </section>
        )}

        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Istaknuti proizvodi</h2>
            <Link href="/proizvodi" className="text-sm hover:underline underline-offset-4">
              Svi proizvodi &rarr;
            </Link>
          </div>
          <ProductGrid products={featuredProducts} emptyMessage="Nema istaknutih proizvoda." />
          <Suspense>
            <Pagination total={total} pageSize={FEATURED_PAGE_SIZE} />
          </Suspense>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-8">Jedna od prezentacija naših proizvoda</h2>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <video
              src="/video-0c6e6989565f637b6f6fdfcedd6e6713-V.mp4"
              controls
              playsInline
              className="w-full"
            />
          </div>
        </section>
      </main>
    </>
  )
}
