// Zvezdice za ocenu 0-5 (podržava decimalne vrednosti: popunjava se procenat širine)
export default function StarRating({ value, size = 'md' }: { value: number; size?: 'sm' | 'md' }) {
  const dim = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
  const clamped = Math.max(0, Math.min(5, value))
  return (
    <span className="inline-flex gap-0.5" role="img" aria-label={`Ocena ${clamped.toFixed(1)} od 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, clamped - i)) * 100
        return (
          <span key={i} className={`relative inline-block ${dim}`}>
            <svg className={`absolute inset-0 ${dim} text-gray-200`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3l-5.9 3.2 1.2-6.5L2.5 9.4l6.6-.9z" />
            </svg>
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
              <svg className={`${dim} text-amber-400`} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.3l-5.9 3.2 1.2-6.5L2.5 9.4l6.6-.9z" />
              </svg>
            </span>
          </span>
        )
      })}
    </span>
  )
}
