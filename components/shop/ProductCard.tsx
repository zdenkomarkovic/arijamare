'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCart } from '@/lib/cart/CartContext'
import { urlFor } from '@/lib/sanity/image'
import type { Product } from '@/types/shop'

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart()
  const image = product.images?.[0]
  const price = product.salePrice ?? product.price
  const hasPrice = price != null
  const canAddToCart = product.inStock && hasPrice

  return (
    <div className="group border border-gray-200 rounded-lg overflow-hidden flex flex-col">
      <Link href={`/shop/${product.slug}`} className="block aspect-square relative bg-gray-50">
        {image ? (
          <Image
            src={urlFor(image).width(400).height(400).fit('crop').url()}
            alt={image.alt ?? product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">
            Nema slike
          </div>
        )}
        {product.salePrice && (
          <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
            Akcija
          </span>
        )}
      </Link>

      <div className="p-3 flex flex-col flex-1 gap-2">
        {product.category && (
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            {product.category.name}
          </span>
        )}
        <Link href={`/shop/${product.slug}`} className="font-medium text-sm leading-tight hover:underline underline-offset-2">
          {product.name}
        </Link>

        <div className="flex items-center justify-between gap-2 mt-auto">
          <div className="flex items-center gap-2">
            {hasPrice ? (
              <>
                <span className="font-semibold">{price!.toLocaleString('sr-RS')} RSD</span>
                {product.salePrice && product.price != null && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.price.toLocaleString('sr-RS')} RSD
                  </span>
                )}
              </>
            ) : (
              <span className="text-sm text-gray-500 italic">Cena na upit</span>
            )}
          </div>

          {canAddToCart && (
            <button
              onClick={() =>
                addItem({
                  _id: product._id,
                  name: product.name,
                  slug: product.slug,
                  price: product.price,
                  salePrice: product.salePrice,
                  image: product.images?.[0],
                })
              }
              className="flex-shrink-0 text-xs px-2 py-1 border border-black rounded hover:bg-black hover:text-white transition-colors"
              aria-label={`Dodaj ${product.name} u korpu`}
            >
              + Korpa
            </button>
          )}
        </div>

        <Link
          href={`/shop/${product.slug}`}
          className="w-full text-sm py-2 text-center border border-black rounded hover:bg-black hover:text-white transition-colors"
        >
          Vidi proizvod
        </Link>
      </div>
    </div>
  )
}
