'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart/CartContext'

export default function CartIcon() {
  const { totalItems } = useCart()

  return (
    <Link
      href="/korpa/"
      aria-label={totalItems > 0 ? `Korpa, broj proizvoda: ${totalItems}` : 'Korpa'}
      className="group flex items-center gap-2 text-sm hover:text-brand transition-colors"
    >
      <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white shadow-sm group-hover:bg-brand-dark transition-colors">
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M3 4h2.5l2.2 10.2a1.5 1.5 0 001.5 1.2h8.2a1.5 1.5 0 001.5-1.1L20.500 8H6.200" />
          <circle cx="9.500" cy="19.500" r="1.400" />
          <circle cx="17" cy="19.500" r="1.400" />
        </svg>
        {totalItems > 0 && (
          <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[11px] font-bold leading-none text-white ring-2 ring-white">
            {totalItems}
          </span>
        )}
      </span>
      <span className="hidden sm:inline">Korpa</span>
    </Link>
  )
}
