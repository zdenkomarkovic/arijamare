'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart/CartContext'

export default function CartIcon() {
  const { totalItems } = useCart()

  return (
    <Link
      href="/korpa"
      className="relative flex items-center gap-2 text-sm hover:underline underline-offset-4"
    >
      <span>Korpa</span>
      {totalItems > 0 && (
        <span className="flex items-center justify-center w-5 h-5 text-xs font-bold bg-black text-white rounded-full">
          {totalItems}
        </span>
      )}
    </Link>
  )
}
