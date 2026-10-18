'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { useDebounce } from '@/hooks/use-debounce'

export default function SearchInput({ placeholder = 'Pretraži proizvode...' }: { placeholder?: string }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const currentQ = searchParams.get('q') ?? ''

  const [value, setValue] = useState(currentQ)
  const debounced = useDebounce(value, 350)

  useEffect(() => {
    const trimmed = debounced.trim()
    if (trimmed === currentQ) return
    const params = new URLSearchParams(searchParams.toString())
    params.delete('page')
    if (trimmed) {
      params.set('q', trimmed)
    } else {
      params.delete('q')
    }
    const qs = params.toString()
    router.push(qs ? `${pathname}?${qs}` : pathname)
  }, [debounced]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative flex items-center">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        className="w-full md:w-72 px-4 py-2 pr-8 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black transition-colors"
      />
      {value && (
        <button
          type="button"
          onClick={() => setValue('')}
          className="absolute right-2 text-gray-400 hover:text-black transition-colors"
          aria-label="Obriši pretragu"
        >
          ✕
        </button>
      )}
      {!value && (
        <span className="absolute right-3 text-gray-400 pointer-events-none text-base">⌕</span>
      )}
    </div>
  )
}
