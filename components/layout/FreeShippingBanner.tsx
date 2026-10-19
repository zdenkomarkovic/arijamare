import Link from 'next/link'

// Traka iznad footera na svim stranicama prodavnice
export default function FreeShippingBanner() {
  return (
    <section aria-label="Besplatna dostava" className="max-w-6xl mx-auto px-4 pb-12 pt-4">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-dark via-brand to-brand-dark text-white shadow-xl shadow-brand/20">
        {/* dekorativni krugovi */}
        <span aria-hidden="true" className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
        <span aria-hidden="true" className="absolute -right-8 -bottom-12 h-48 w-48 rounded-full bg-white/10" />

        <div className="relative flex flex-col md:flex-row items-center gap-5 md:gap-8 px-6 py-8 md:px-12 md:py-10 text-center md:text-left">
          <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white text-brand shadow-lg">
            <svg
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.7}
              strokeLinecap="round"
              strokeLinejoin="round"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </span>

          <div className="flex-1">
            <p className="text-xl md:text-2xl font-semibold font-serif leading-snug">
              Besplatna dostava za kupovinu preko 5.000 din
            </p>
            <p className="mt-1 text-sm md:text-base text-white/85">
              Porudžbine šaljemo poštom direktno na vašu adresu, a možete platiti i pouzećem.
            </p>
          </div>

          <Link
            href="/prodavnica/"
            className="shrink-0 rounded-full bg-white px-7 py-3 font-semibold text-brand-dark shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            Pogledaj ponudu
          </Link>
        </div>
      </div>
    </section>
  )
}
