import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPosts, getBlogCategories, POST_PAGE_SIZE } from '@/lib/sanity/queries'
import { buildMetadata } from '@/lib/metadata'
import Pagination from '@/components/shop/Pagination'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import PostCard from '@/components/content/PostCard'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ page?: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const cat = (await getBlogCategories()).find((c) => c.slug === slug)
  if (!cat) return {}
  return buildMetadata({
    title: cat.name,
    description: `Članci iz kategorije ${cat.name}.`,
    url: `/blog/category/${slug}/`,
  })
}

export default async function BlogCategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const { page } = await searchParams
  const current = Math.max(1, parseInt(page ?? '1'))
  const [cats, { posts, total }] = await Promise.all([getBlogCategories(), getPosts(current, slug)])
  const cat = cats.find((c) => c.slug === slug)
  if (!cat) notFound()

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ name: 'Blog', href: '/blog/' }, { name: cat.name }]} />
      <h1 className="text-3xl font-semibold mb-8 font-serif">{cat.name}</h1>
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
