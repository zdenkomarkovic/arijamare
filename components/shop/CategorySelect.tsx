'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import type { Category } from '@/types/shop'

export default function CategorySelect({ categories }: { categories: Category[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const current = searchParams.get('kategorija') ?? ''

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value) {
      params.set('kategorija', e.target.value)
    } else {
      params.delete('kategorija')
    }
    router.push(`/proizvodi?${params.toString()}`)
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black transition-colors bg-white"
    >
      <option value="">Sve kategorije</option>
      {categories.map((cat) => (
        <option key={cat._id} value={cat.slug}>
          {cat.name}
        </option>
      ))}
    </select>
  )
}
