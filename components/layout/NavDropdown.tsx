'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'

interface Props {
  href: string
  label: string
  items: { name: string; slug: string }[]
}

// Stavka glavnog menija sa padajućim menijem (podkategorije iz Sanity-ja).
// Sama stavka ostaje običan link, pa pretraživači i korisnici bez miša dolaze na stranicu kategorije.
export default function NavDropdown({ href, label, items }: Props) {
  const [open, setOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const show = () => {
    if (timer.current) clearTimeout(timer.current)
    setOpen(true)
  }
  const hide = () => {
    timer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) hide()
      }}
    >
      <Link href={href} className="flex items-center gap-1 hover:text-brand transition-colors" onClick={() => setOpen(false)}>
        {label}
        <svg
          className={`w-3 h-3 mt-px transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Link>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50">
          <ul className="w-60 bg-white border border-gray-200 rounded-xl shadow-xl py-2">
            {items.map((it) => (
              <li key={it.slug}>
                <Link
                  href={`/product-category/${it.slug}/`}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 text-sm text-gray-700 hover:text-brand hover:bg-gray-50 transition-colors"
                >
                  {it.name}
                </Link>
              </li>
            ))}
            <li className="border-t border-gray-100 mt-1 pt-1">
              <Link
                href={href}
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold text-brand hover:bg-gray-50"
              >
                Sva {label.toLowerCase()} &rarr;
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  )
}
