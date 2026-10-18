import ProductCard from './ProductCard'
import type { Product } from '@/types/shop'

interface Props {
  products: Product[]
  emptyMessage?: string
}

export default function ProductGrid({ products, emptyMessage = 'Nema proizvoda.' }: Props) {
  if (products.length === 0) {
    return <p className="text-gray-400 text-sm py-8 text-center">{emptyMessage}</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map((p) => (
        <ProductCard key={p._id} product={p} />
      ))}
    </div>
  )
}
