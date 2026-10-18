import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { Category } from '@/types/shop'

export default function CategoryList({
  categories,
  simple = false,
}: {
  categories: Category[]
  simple?: boolean
}) {
  if (categories.length === 0) {
    return <p className="text-gray-400 text-sm py-8 text-center">Nema kategorija.</p>
  }

  if (simple) {
    return (
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Link
            key={cat._id}
            href={`/product-category/${cat.slug}`}
            className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium hover:border-black hover:bg-gray-50 transition-colors"
          >
            {cat.name}
          </Link>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((cat) => (
        <div key={cat._id} className="flex flex-col">
          <Link
            href={`/product-category/${cat.slug}`}
            className="group border border-gray-200 rounded-lg overflow-hidden hover:border-black transition-colors"
          >
            {cat.image ? (
              <div className="aspect-video relative bg-gray-50">
                <Image
                  src={urlFor(cat.image).width(400).height(225).fit('crop').url()}
                  alt={cat.image.alt ?? cat.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-50 flex items-center justify-center text-gray-300 text-sm">
                Nema slike
              </div>
            )}
            <div className="p-3">
              <p className="font-medium text-sm">{cat.name}</p>
              {cat.description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{cat.description}</p>
              )}
            </div>
          </Link>

        </div>
      ))}
    </div>
  )
}
