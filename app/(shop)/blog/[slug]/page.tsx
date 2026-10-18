import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getPostBySlug, getLatestPosts } from '@/lib/sanity/queries'
import { buildMetadata } from '@/lib/metadata'
import { urlFor } from '@/lib/sanity/image'
import { SITE_NAME, SITE_URL } from '@/lib/constants'
import RichText from '@/components/content/RichText'
import PostCard from '@/components/content/PostCard'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { JsonLd } from '@/components/seo/JsonLd'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  const meta = buildMetadata({
    title: post.seoTitle ?? post.title,
    description: post.seoDescription ?? post.excerpt,
    url: `/blog/${slug}/`,
    type: 'article',
    publishedTime: post.publishedAt,
    image: post.mainImage?.asset ? urlFor(post.mainImage).width(1200).height(630).fit('crop').url() : undefined,
  })
  return meta
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const latest = (await getLatestPosts(4)).filter((p) => p.slug !== slug).slice(0, 3)
  const image = post.mainImage?.asset ? urlFor(post.mainImage).width(1200).url() : undefined
  const date = new Date(post.publishedAt).toLocaleDateString('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ name: 'Blog', href: '/blog/' }, { name: post.title }]} />
      <article>
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold mb-3 font-serif leading-tight">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
            <time dateTime={post.publishedAt}>{date}</time>
            {post.categories?.map((c) => (
              <Link key={c.slug} href={`/blog/category/${c.slug}/`} className="text-brand hover:underline">
                {c.name}
              </Link>
            ))}
          </div>
        </header>
        {post.mainImage?.asset && (
          <Image
            src={urlFor(post.mainImage).width(1200).url()}
            alt={post.mainImage.alt || post.title}
            width={1200}
            height={800}
            priority
            className="rounded-xl w-full h-auto mb-8"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        )}
        <RichText value={post.body} />
      </article>

      {latest.length > 0 && (
        <section className="mt-16 pt-10 border-t border-gray-100">
          <h2 className="text-xl font-semibold mb-6 font-serif">Pročitajte još</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {latest.map((p) => (
              <PostCard key={p._id} post={p} />
            ))}
          </div>
        </section>
      )}

      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.seoDescription ?? post.excerpt,
          datePublished: post.publishedAt,
          dateModified: post.modifiedAt ?? post.publishedAt,
          mainEntityOfPage: `${SITE_URL}/blog/${slug}/`,
          ...(image ? { image } : {}),
          author: { '@type': 'Organization', name: SITE_NAME },
          publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.webp` } },
        }}
      />
    </main>
  )
}
