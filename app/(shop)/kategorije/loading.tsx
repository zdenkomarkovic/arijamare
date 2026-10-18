import { ProductGridSkeleton } from '@/components/shop/Skeletons'

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="h-8 w-32 bg-gray-100 animate-pulse rounded mb-8" />
      <ProductGridSkeleton count={6} />
    </div>
  )
}
