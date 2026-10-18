import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { HeroSlide } from '@/types/shop'

export default function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const valid = slides.filter((s) => s.image?.asset)
  if (valid.length === 0) return null

  // Dupliraj za seamless loop; -50% translate = tačno jedan kompletan set
  const loop = [...valid, ...valid]
  const duration = `${valid.length * 6}s`

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-gray-100">

      {/* Scrolling traka */}
      <div
        className="flex h-full"
        style={{
          gap: '10px',
          width: 'max-content',
          animation: `hero-scroll ${duration} linear infinite`,
        }}
      >
        {loop.map((slide, i) => (
          <div
            key={`${slide._id}-${i}`}
            className="relative h-full aspect-square flex-shrink-0 rounded-2xl overflow-hidden"
          >
            <Image
              src={urlFor(slide.image).width(1080).height(1080).fit('crop').url()}
              alt={slide.image.alt ?? ''}
              fill
              className="object-cover"
              sizes="70vh"
              priority={i < valid.length}
            />
          </div>
        ))}
      </div>

      {/* Naslov — centriran, iznad svega */}
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        {/* Blago zatamnjenje iza teksta radi čitljivosti */}
        <div
          className="text-center px-10 py-8 rounded-3xl"
          style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, transparent 75%)' }}
        >
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-wide leading-none"
            style={{ textShadow: '0 2px 28px rgba(0,0,0,0.6), 0 1px 6px rgba(0,0,0,0.5)' }}
          >
            Ljiljanina
          </h1>
          <p
            className="text-xl md:text-3xl lg:text-4xl text-white/90 font-light tracking-[0.25em] uppercase mt-3"
            style={{ textShadow: '0 2px 16px rgba(0,0,0,0.55)' }}
          >
            mala prodavnica
          </p>
        </div>
      </div>

    </div>
  )
}
