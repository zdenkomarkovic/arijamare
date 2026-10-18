function Bone({ className = '' }: { className?: string }) {
  return <div className={`bg-gray-100 animate-pulse rounded ${className}`} />
}

export function ProductCardSkeleton() {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden flex flex-col">
      <Bone className="aspect-square rounded-none" />
      <div className="p-3 flex flex-col gap-2">
        <Bone className="h-3 w-16" />
        <Bone className="h-4 w-3/4" />
        <Bone className="h-4 w-1/2" />
        <Bone className="h-9 mt-1 rounded" />
      </div>
    </div>
  )
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  )
}

export function ProductPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Bone className="h-4 w-64 mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        <Bone className="aspect-square rounded-lg" />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <Bone className="h-3 w-24" />
            <Bone className="h-8 w-3/4" />
          </div>
          <Bone className="h-8 w-40" />
          <Bone className="h-4 w-20" />
          <div className="flex flex-col gap-3">
            <Bone className="h-10 w-36 rounded" />
            <Bone className="h-12 rounded" />
          </div>
          <div className="pt-6 border-t border-gray-100 flex flex-col gap-2">
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-5/6" />
            <Bone className="h-4 w-4/6" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function CategoryPageSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <Bone className="h-4 w-48 mb-8" />
      <Bone className="w-full h-48 md:h-64 rounded-xl mb-8" />
      <Bone className="h-4 w-24 mb-6" />
      <ProductGridSkeleton />
    </div>
  )
}
