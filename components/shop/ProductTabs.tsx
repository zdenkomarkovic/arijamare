'use client'

import { useState, type ReactNode } from 'react'
import StarRating from './StarRating'
import type { Review } from '@/types/shop'

interface Props {
  description: ReactNode
  hasDescription: boolean
  reviews: Review[]
}

// Prekidač "Opis" / "Recenzije (N)" ispod glavnog dela stranice proizvoda
export default function ProductTabs({ description, hasDescription, reviews }: Props) {
  const [tab, setTab] = useState<'opis' | 'recenzije'>(hasDescription || reviews.length === 0 ? 'opis' : 'recenzije')

  const tabClass = (active: boolean) =>
    `relative px-5 py-3 text-sm md:text-base font-semibold transition-colors ${
      active ? 'text-brand' : 'text-gray-500 hover:text-gray-800'
    }`

  return (
    <section className="mt-14">
      <div role="tablist" aria-label="Informacije o proizvodu" className="flex border-b border-gray-200">
        <button
          role="tab"
          id="tab-opis"
          aria-selected={tab === 'opis'}
          aria-controls="panel-opis"
          onClick={() => setTab('opis')}
          className={tabClass(tab === 'opis')}
        >
          Opis
          {tab === 'opis' && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand" />}
        </button>
        <button
          role="tab"
          id="tab-recenzije"
          aria-selected={tab === 'recenzije'}
          aria-controls="panel-recenzije"
          onClick={() => setTab('recenzije')}
          className={tabClass(tab === 'recenzije')}
        >
          Recenzije ({reviews.length})
          {tab === 'recenzije' && <span className="absolute inset-x-0 -bottom-px h-0.5 bg-brand" />}
        </button>
      </div>

      {/* Opis ostaje u DOM-u (samo skriven) da bi ga pretraživači uvek videli */}
      <div
        role="tabpanel"
        id="panel-opis"
        aria-labelledby="tab-opis"
        hidden={tab !== 'opis'}
        className="pt-8 max-w-3xl"
      >
        {hasDescription ? description : <p className="text-gray-500">Opis proizvoda nije dostupan.</p>}
      </div>

      <div
        role="tabpanel"
        id="panel-recenzije"
        aria-labelledby="tab-recenzije"
        hidden={tab !== 'recenzije'}
        className="pt-8 max-w-3xl"
      >
        {reviews.length === 0 ? (
          <p className="text-gray-500">Još nema recenzija za ovaj proizvod.</p>
        ) : (
          <ul className="space-y-6">
            {reviews.map((r) => (
              <li key={r._key} className="border-b border-gray-100 pb-6 last:border-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <StarRating value={r.rating} size="sm" />
                  <span className="font-semibold text-gray-900">{r.author}</span>
                  {r.date && (
                    <time dateTime={r.date} className="text-sm text-gray-400">
                      {new Date(r.date).toLocaleDateString('sr-Latn-RS', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </time>
                  )}
                </div>
                {r.text && <p className="mt-2 text-gray-700 leading-relaxed">{r.text}</p>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}
