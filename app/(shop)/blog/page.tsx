import { Suspense } from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPosts, getBlogCategories, POST_PAGE_SIZE } from '@/lib/sanity/queries'
import { buildMetadata } from '@/lib/metadata'
import Pagination from '@/components/shop/Pagination'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import PostCard from '@/components/content/PostCard'

interface Props {
  searchParams: Promise<{ page?: string }>
}

export const metadata: Metadata = buildMetadata({
  title: 'Blog',
  description: 'Blog o zdravlju, aromaterapiji i eteričnim uljima.',
  url: '/blog/',
})

export default async function BlogPage({ searchParams }: Props) {
  const { page } = await searchParams
  const current = Math.max(1, parseInt(page ?? '1'))
  const [{ posts, total }, cats] = await Promise.all([getPosts(current), getBlogCategories()])

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ name: 'Blog' }]} />
      <h1 className="text-3xl font-semibold mb-6 font-serif">Blog</h1>
      {cats.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {cats.map((c) => (
            <Link
              key={c.slug}
              href={`/blog/category/${c.slug}/`}
              className="text-sm px-3 py-1 rounded-full border border-gray-200 hover:border-brand hover:text-brand"
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))}
      </div>
      <Suspense>
        <Pagination total={total} pageSize={POST_PAGE_SIZE} />
      </Suspense>
    </main>
  )
}
