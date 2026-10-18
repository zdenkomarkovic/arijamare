import Link from 'next/link'
import { SITE_URL } from '@/lib/constants'
import { JsonLd } from './JsonLd'

export interface Crumb {
  name: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: 'Početna', href: '/' }, ...items]
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-gray-400 mb-8 flex items-center gap-2 flex-wrap">
        {all.map((c, i) => (
          <span key={i} className="flex items-center gap-2">
            {i > 0 && <span>/</span>}
            {c.href && i < all.length - 1 ? (
              <Link href={c.href} className="hover:text-black transition-colors">
                {c.name}
              </Link>
            ) : (
              <span className="text-gray-600">{c.name}</span>
            )}
          </span>
        ))}
      </nav>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: all.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            ...(c.href ? { item: `${SITE_URL}${c.href}` } : {}),
          })),
        }}
      />
    </>
  )
}
