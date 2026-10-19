'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Item {
  href: string
  label: string
  children?: { name: string; slug: string }[]
}

export default function MobileMenu({ items }: { items: Item[] }) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState<string | null>(null)
  const close = () => setOpen(false)

  return (
    <div className="xl:hidden">
      <button
        type="button"
        aria-label={open ? 'Zatvori meni' : 'Otvori meni'}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="p-2"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {open ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {open && (
        <nav className="absolute left-0 right-0 top-20 bg-white border-b border-gray-200 shadow-lg max-h-[80vh] overflow-y-auto">
          <ul className="max-w-6xl mx-auto px-4 py-2">
            {items.map((l) => (
              <li key={l.href} className="border-b border-gray-100 last:border-0">
                <div className="flex items-center justify-between">
                  <Link href={l.href} onClick={close} className="flex-1 py-3 hover:text-brand">
                    {l.label}
                  </Link>
                  {l.children && (
                    <button
                      type="button"
                      aria-label={`Podkategorije: ${l.label}`}
                      aria-expanded={expanded === l.href}
                      onClick={() => setExpanded(expanded === l.href ? null : l.href)}
                      className="p-3"
                    >
                      <svg
                        className={`w-4 h-4 transition-transform ${expanded === l.href ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>
                {l.children && expanded === l.href && (
                  <ul className="pb-2 pl-4">
                    {l.children.map((c) => (
                      <li key={c.slug}>
                        <Link
                          href={`/product-category/${c.slug}/`}
                          onClick={close}
                          className="block py-2 text-sm text-gray-600 hover:text-brand"
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  )
}
