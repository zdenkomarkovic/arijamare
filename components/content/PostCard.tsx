import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import type { Post } from '@/types/shop'

export default function PostCard({ post }: { post: Post }) {
  const date = new Date(post.publishedAt).toLocaleDateString('sr-RS', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return (
    <article className="group border border-gray-200 rounded-lg overflow-hidden flex flex-col bg-white">
      <Link href={`/blog/${post.slug}/`} className="block aspect-[4/3] relative bg-gray-50">
        {post.mainImage?.asset && (
          <Image
            src={urlFor(post.mainImage).width(600).height(450).fit('crop').url()}
            alt={post.mainImage.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        )}
      </Link>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <time dateTime={post.publishedAt} className="text-xs text-gray-400">
          {date}
        </time>
        <h2 className="font-semibold leading-snug font-serif">
          <Link href={`/blog/${post.slug}/`} className="hover:text-brand">
            {post.title}
          </Link>
        </h2>
        {post.excerpt && <p className="text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>}
        <Link href={`/blog/${post.slug}/`} className="text-sm text-brand mt-auto pt-2">
          Pročitaj više &rarr;
        </Link>
      </div>
    </article>
  )
}
