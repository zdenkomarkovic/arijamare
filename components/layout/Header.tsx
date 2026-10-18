import Link from 'next/link'
import Image from 'next/image'
import { getAllCategories } from '@/lib/sanity/queries'
import CartIcon from './CartIcon'
import CategoryDropdown from './CategoryDropdown'

export default async function Header() {
  const categories = await getAllCategories()

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.jpg"
            alt={process.env.NEXT_PUBLIC_SITE_NAME ?? 'Prodavnica'}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
          <span className="font-semibold text-lg tracking-tight hidden sm:block">
            {process.env.NEXT_PUBLIC_SITE_NAME ?? 'Prodavnica'}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/" className="hover:underline underline-offset-4">
            Početna
          </Link>
          <CategoryDropdown categories={categories} />
          <Link href="/proizvodi" className="hover:underline underline-offset-4">
            Svi proizvodi
          </Link>
        </nav>

        <CartIcon />
      </div>
    </header>
  )
}
