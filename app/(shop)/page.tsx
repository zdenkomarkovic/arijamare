import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import ProductGrid from '@/components/shop/ProductGrid'
import CategoryList from '@/components/shop/CategoryList'
import PostCard from '@/components/content/PostCard'
import {
  getFeaturedProducts,
  getAllCategories,
  getLatestPosts,
  getSitePage,
} from '@/lib/sanity/queries'
import { buildMetadata } from '@/lib/metadata'
import { CHANNELS } from '@/lib/contact'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  const home = await getSitePage('home')
  return buildMetadata({
    title: home?.seoTitle ?? 'Organska proizvodnja',
    description:
      home?.seoDescription ??
      'Organska eterična ulja, čajevi i kozmetika od hercegovačkog samoniklog bilja. Naručite online, plaćanje pouzećem, besplatna dostava.',
    url: '/',
  })
}

const VALUES = [
  { title: 'Besplatna dostava', text: 'Za porudžbine preko 5.000 RSD', icon: 'M3 7h11v9H3zM14 10h4l3 3v3h-7M7 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm10 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3z' },
  { title: '100% prirodno', text: 'Organski proizvodi', icon: 'M5 19c0-8 5-13 14-14 0 9-5 14-13 14M5 19c2-4 5-7 9-9' },
  { title: 'Čuvamo zdravlje', text: 'Lekovito bilje', icon: 'M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z' },
  { title: 'Kvalitet', text: 'Samo najbolje iz prirode', icon: 'M12 3l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.3 6.8 19l1-5.8L3.6 9.1l5.8-.8z' },
]

const CONTACT_CHANNELS = [CHANNELS.viber, CHANNELS.whatsapp, CHANNELS.sms, CHANNELS.call]

const BADGES = [
  { src: '/partner-logo-02.png', alt: '100% organski proizvodi' },
  { src: '/partner-logo-03.png', alt: '100% prirodni organski proizvodi' },
  { src: '/partner-logo-04.png', alt: 'Eko prijateljski proizvodi' },
]

const REVIEWS = [
  {
    name: 'Milana',
    photo: '/utisak-milana.png',
    text: 'Redovno koristim proizvode sada već 7 meseci, mogu reći da sam u početku bila skeptik ali sam i više nego zadovoljna! Sve preporuke.',
  },
  {
    name: 'Miloš',
    photo: '/utisak-milos.png',
    text: 'Veoma sam zadovoljan proizvodima, za razliku od onih koji postoje u zdravoj hrani ovi su 100 puta jačeg mirisa i dejstva.',
  },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center mb-10">
      <h2 className="text-2xl md:text-3xl font-semibold font-serif">{children}</h2>
      <span className="block mx-auto mt-3 h-1 w-14 rounded-full bg-brand" />
    </div>
  )
}

export default async function HomePage() {
  const [{ products: featured }, categories, posts] = await Promise.all([
    getFeaturedProducts(1, 8),
    getAllCategories(),
    getLatestPosts(3),
  ])

  return (
    <>
      <section className="relative isolate overflow-hidden bg-neutral-900">
        <Image
          src="/hero-bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center -z-10"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        <div className="max-w-6xl mx-auto px-4 py-24 md:py-36">
          <p className="text-brand uppercase tracking-[0.25em] text-xs md:text-sm font-semibold mb-4">
            Hercegovačko samoniklo bilje
          </p>
          <h1 className="text-3xl md:text-6xl font-bold leading-tight font-serif text-white max-w-2xl">
            Organska eterična ulja od samoniklog bilja
          </h1>
          <p className="mt-5 text-white/85 max-w-xl text-base md:text-lg">
            Eterična ulja, hidrolati, čajevi i prirodna kozmetika, ručno rađeni sa pažnjom i bez veštačkih
            sastojaka.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/etericna-ulja/"
              className="bg-brand hover:bg-brand-dark text-white px-7 py-3.5 rounded-full font-semibold shadow-lg shadow-black/20 transition-colors"
            >
              Eterična ulja
            </Link>
            <Link
              href="/shop/etericno-ulje-smilja/"
              className="border-2 border-white text-white hover:bg-white hover:text-neutral-900 px-7 py-3 rounded-full font-semibold transition-colors"
            >
              Ulje smilja
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 md:-mt-12 px-4">
        <ul className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 bg-white rounded-2xl shadow-xl shadow-black/10 ring-1 ring-black/5 overflow-hidden">
          {VALUES.map((v, i) => (
            <li
              key={v.title}
              className={`group flex flex-col items-center text-center gap-3 px-4 py-7 md:py-9 hover:bg-gray-50 transition-colors ${
                i % 2 === 1 ? 'border-l border-gray-100' : ''
              } ${i >= 2 ? 'border-t border-gray-100 md:border-t-0' : ''} ${i > 0 ? 'md:border-l md:border-gray-100' : ''}`}
            >
              <span className="w-14 h-14 rounded-full bg-brand text-white flex items-center justify-center shadow-md shadow-brand/30 group-hover:bg-brand-dark group-hover:-translate-y-0.5 transition-all">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.6} viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                </svg>
              </span>
              <span>
                <span className="block font-semibold font-serif text-gray-900">{v.title}</span>
                <span className="block mt-1 text-sm text-gray-500">{v.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <main className="max-w-6xl mx-auto px-4 pt-16 pb-14 space-y-20">
        <section>
          <SectionTitle>Najprodavanija eterična ulja</SectionTitle>
          <ProductGrid products={featured} emptyMessage="Nema istaknutih proizvoda." />
        </section>

        {categories.length > 0 && (
          <section>
            <SectionTitle>Pogledajte kompletnu ponudu naših organskih proizvoda</SectionTitle>
            <CategoryList categories={categories} />
          </section>
        )}

        <section className="grid md:grid-cols-2 rounded-3xl overflow-hidden bg-brand-soft">
          <div className="relative min-h-64 md:min-h-96">
            <Image
              src="/hero-smilje.webp"
              alt="Eterično ulje smilja Helichrysum italicum"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center gap-4">
            <p className="text-brand uppercase tracking-[0.2em] text-xs font-semibold">Iz hercegovačkog bilja</p>
            <h2 className="text-2xl md:text-3xl font-semibold font-serif">Eterično ulje smilja</h2>
            <p className="text-gray-700 leading-relaxed">
              Eterično ulje smilja (Helichrysum italicum) iz samoniklog hercegovačkog bilja, jedno od naših
              najtraženijih ulja za negu kože.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                href="/shop/etericno-ulje-smilja/"
                className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-full font-semibold transition-colors"
              >
                Pogledaj ulje smilja
              </Link>
              <Link href="/blog/ulje-od-smilja/" className="px-6 py-3 text-brand font-semibold hover:underline underline-offset-4">
                Pročitaj više
              </Link>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-10 items-center">
          <Image
            src="/o-nama-pocetna.webp"
            alt="Arijamare organska kozmetika"
            width={768}
            height={768}
            className="rounded-2xl w-full h-auto"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="space-y-4 text-gray-700 leading-relaxed">
            <h2 className="text-2xl font-semibold font-serif text-gray-900">
              Arijamare prirodna kozmetika
            </h2>
            <p>
              Arijamare je linija organskih proizvoda namenjenih nezi kože u svim dobima života. Reč je o 100%
              prirodnoj, ručno rađenoj kozmetici baziranoj na najkvalitetnijim eteričnim uljima, koji prodiru
              duboko u kožu podstičući njenu samoobnavljajuću funkciju. U izradi naših proizvoda osluškujemo
              isključivo prirodu, koja nam pruža najfinije biljne sastojke čija lekovita svojstva u procesu
              obrade i proizvodnje kozmetike ne menjamo.
            </p>
            <p>
              Ne razdvajamo lepotu i zdravlje kada je reč o proizvodima koje nudimo – vašoj koži pristupamo sa
              velikom pažnjom i odgovornošću, zaobilazeći veštačke formule koje su najčešći krivac za probleme
              sa kožom. Zrela koža ne mora da bude i problematična koža, ukoliko je organska kozmetika deo
              vaše svakodnevne rutine. Preduhitrite bore, depigmentacije i druge neželjene pojave na koži i
              priuštite sebi elegantno i lepo starenje uz Arijamare organsku kozmetiku!
            </p>
            <Link href="/o-nama/" className="inline-block text-brand underline underline-offset-4">
              Više o nama &rarr;
            </Link>
          </div>
        </section>

        <section className="space-y-8 text-gray-700 leading-relaxed max-w-4xl">
          <div>
            <h2 className="text-xl font-semibold mb-2 font-serif text-gray-900">
              Kome je namenjena Arijamare prirodna kozmetika?
            </h2>
            <p>
              Arijamare prirodna kozmetika je namenjena savremenoj ženi koja drži do urednog, negovanog i
              prirodnog izgleda. Kako je lice prvi pokazatelj toga koliko je koža negovana, važno je da
              prirodna kozmetika bude najvažniji deo svakodnevne rutine ulepšavanja, kako bi se pored
              estetskih kriterijuma zadovoljili i oni zdravstveni – koji su na koži vidljivi na duže staze.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 font-serif text-gray-900">
              Zašto je Arijamare prirodna kozmetika pravi izbor za vašu kožu?
            </h2>
            <p>
              Blage, prirodne note Arijamare proizvoda sa vrlo efektnim uticajem su idealna mera za negu kože
              koja zahteva delotvorne, ali neagresivne proizvode bez veštačkih sastojaka. Odgovarajući upravo
              na ovu potrebu svih onih koji brinu o svojoj koži, kreirali smo liniju prirodnih proizvoda sa
              visokim procentom sertifikovanih eteričnih ulja, koja hrane kožu istovremeno je čineći lepom,
              mladolikom i što je najvažnije – zdravom. Da je u pitanju 100% organska kozmetika potvrđuje i
              ECOCERT sertifikat koji je važna odlika našeg poslovanja.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 font-serif text-gray-900">
              Kako prirodna kozmetika utiče na razne tipove kože?
            </h2>
            <p>
              Prirodna kozmetika je bazirana na posebnim formulama koje kožu čine nežnom, zdravom i negovanom,
              na neagresivan način i bez štetnih efekata. Njena svojstva odgovaraju svim tipovima kože,
              pružajući licu blagotvorna dejstva koja umiruju zapaljenja, iritacije i depigmentacije i bore.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2 font-serif text-gray-900">
              Cenovna pristupačnost prirodne kozmetike
            </h2>
            <p>
              Arijamare prirodna kozmetika je izuzetno pristupačna i dostupna svima koji žele prirodno negovanu
              i zdravu kožu. Organska kozmetika, nasuprot mnogim uverenjima, nema visoke cene i nije
              nepristupačna u odnosu na industrijsku kozmetiku, a razlika u upotrebi je ogromna. Organski
              proizvodi iz naše ponude ne sadrže paraben, emulgatore, silikon i druge za kožu štetne
              sastojke, koji su, nažalost, postali neizostavan deo konvencionalnih kozmetičkih proizvoda.
            </p>
          </div>
        </section>

        <section className="rounded-3xl bg-gradient-to-br from-brand to-brand-dark text-white text-center px-6 py-12">
          <h2 className="text-2xl font-semibold font-serif">Poručite telefonom</h2>
          <p className="mt-2 opacity-90">Pozovite nas ili pišite na Viber, WhatsApp ili SMS</p>
          <a
            href="tel:+381652036804"
            className="mt-4 inline-block text-2xl md:text-3xl font-bold hover:underline underline-offset-4"
          >
            +381 65 203 6804
          </a>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {CONTACT_CHANNELS.map((c) => (
              <a
                key={c.label}
                href={c.href}
                {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={c.aria}
                className="group inline-flex items-center gap-2.5 rounded-full bg-white pl-2 pr-5 py-2 text-gray-900 font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <span
                  className="flex w-9 h-9 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: c.color }}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d={c.icon} />
                  </svg>
                </span>
                {c.label}
              </a>
            ))}
          </div>
        </section>

        {posts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl md:text-3xl font-semibold font-serif">Blog o zdravlju i eteričnim uljima</h2>
              <Link href="/blog/" className="text-sm text-brand hover:underline underline-offset-4">
                Svi članci &rarr;
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((p) => (
                <PostCard key={p._id} post={p} />
              ))}
            </div>
          </section>
        )}

        <section>
          <SectionTitle>Utisci kupaca</SectionTitle>
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="relative rounded-2xl bg-white p-8 shadow-lg shadow-black/5 ring-1 ring-black/5 hover:shadow-xl transition-shadow"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-4 left-8 flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white font-serif text-3xl leading-none pt-2.5"
                >
                  &ldquo;
                </span>
                <div className="flex gap-0.5 text-amber-400" role="img" aria-label="Ocena 5 od 5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.300l-5.900 3.200 1.200-6.500L2.500 9.400l6.600-.9z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 text-gray-700 leading-relaxed italic">{r.text}</blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <Image
                    src={r.photo}
                    unoptimized
                    alt={`${r.name}, kupac Arijamare proizvoda`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover ring-2 ring-brand/30"
                  />
                  <span className="font-semibold text-gray-900">{r.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <ul className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
          {BADGES.map((b) => (
            <li key={b.src}>
              <Image
                src={b.src}
                unoptimized
                alt={b.alt}
                width={159}
                height={100}
                className="h-20 w-auto opacity-80 hover:opacity-100 transition-opacity"
              />
            </li>
          ))}
        </ul>

      </main>
    </>
  )
}
