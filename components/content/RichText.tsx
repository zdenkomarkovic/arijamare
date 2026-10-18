import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from 'next-sanity'
import { urlFor } from '@/lib/sanity/image'
import type { PortableTextBlock } from '@/types/shop'

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="text-2xl font-semibold mt-10 mb-4 font-serif">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-8 mb-3 font-serif">{children}</h3>,
    h4: ({ children }) => <h4 className="text-lg font-semibold mt-6 mb-2">{children}</h4>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand pl-4 italic text-gray-600 my-6">{children}</blockquote>
    ),
    normal: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>,
  },
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? '#'
      const external = /^https?:\/\//i.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
      if (external) {
        return (
          <a href={href} className="text-brand underline underline-offset-2" rel="noopener">
            {children}
          </a>
        )
      }
      return (
        <Link href={href} className="text-brand underline underline-offset-2">
          {children}
        </Link>
      )
    },
  },
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null
      return (
        <figure className="my-6">
          <Image
            src={urlFor(value).width(1200).fit('max').url()}
            alt={value.alt ?? ''}
            width={1200}
            height={800}
            className="rounded-lg w-full h-auto"
            sizes="(max-width: 768px) 100vw, 768px"
          />
        </figure>
      )
    },
  },
}

export default function RichText({ value }: { value?: PortableTextBlock[] }) {
  if (!value || value.length === 0) return null
  return (
    <div className="text-gray-800">
      <PortableText value={value as never} components={components} />
    </div>
  )
}
