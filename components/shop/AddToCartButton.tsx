'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart/CartContext'
import type { Product } from '@/types/shop'

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const unitPrice = product.salePrice ?? product.price
  const hasPrice = unitPrice != null

  if (!hasPrice) {
    return <p className="text-sm text-gray-500 italic">Cena na upit — kontaktirajte nas</p>
  }

  if (!product.inStock) {
    return (
      <button disabled className="w-full py-3 border border-gray-300 rounded text-gray-400 cursor-not-allowed">
        Nije na stanju
      </button>
    )
  }

  const totalPrice = unitPrice * quantity

  function handleAdd() {
    addItem(
      {
        _id: product._id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        salePrice: product.salePrice,
        image: product.images?.[0],
      },
      quantity,
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100 transition-colors"
            aria-label="Smanji količinu"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="w-10 h-10 flex items-center justify-center text-lg hover:bg-gray-100 transition-colors"
            aria-label="Povećaj količinu"
          >
            +
          </button>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-400">Ukupno</p>
          <p className="text-lg font-bold">{totalPrice.toLocaleString('sr-RS')} RSD</p>
        </div>
      </div>

      <button
        onClick={handleAdd}
        className="w-full py-3 bg-brand text-white rounded hover:bg-brand-dark transition-colors"
      >
        {added ? 'Dodato u korpu ✓' : 'Dodaj u korpu'}
      </button>
    </div>
  )
}
