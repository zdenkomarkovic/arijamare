import { ProductGridSkeleton } from '@/components/shop/Skeletons'

export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="h-8 w-48 bg-gray-100 animate-pulse rounded" />
        <div className="h-10 w-72 bg-gray-100 animate-pulse rounded-lg" />
      </div>
      <ProductGridSkeleton />
    </div>
  )
}
