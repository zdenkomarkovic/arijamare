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
  { title: 'Besplatna dostava', text: 'Za porudžbine preko 5.000 RSD' },
  { title: '100% prirodno', text: 'Organski proizvodi' },
  { title: 'Čuvamo zdravlje', text: 'Lekovito bilje' },
  { title: 'Kvalitet', text: 'Samo najbolje iz prirode' },
]

const REVIEWS = [
  {
    name: 'Milana',
    text: 'Redovno koristim proizvode sada već 7 meseci, mogu reći da sam u početku bila skeptik ali sam i više nego zadovoljna! Sve preporuke.',
  },
  {
    name: 'Miloš',
    text: 'Veoma sam zadovoljan proizvodima, za razliku od onih koji postoje u zdravoj hrani ovi su 100 puta jačeg mirisa i dejstva.',
  },
]

export default async function HomePage() {
  const [{ products: featured }, categories, posts] = await Promise.all([
    getFeaturedProducts(1, 8),
    getAllCategories(),
    getLatestPosts(3),
  ])

  return (
    <>
      <section className="bg-gradient-to-br from-brand-soft via-white to-brand-soft">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight font-serif max-w-3xl mx-auto">
            Organska eterična ulja od samoniklog bilja
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Eterična ulja, hidrolati, čajevi i prirodna kozmetika od hercegovačkog samoniklog bilja.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Link
              href="/etericna-ulja/"
              className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Eterična ulja
            </Link>
            <Link
              href="/prodavnica/"
              className="border border-brand text-brand hover:bg-brand hover:text-white px-6 py-3 rounded-full font-medium transition-colors"
            >
              Cela ponuda
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100">
        <ul className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {VALUES.map((v) => (
            <li key={v.title}>
              <p className="font-semibold font-serif">{v.title}</p>
              <p className="text-sm text-gray-500">{v.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <main className="max-w-6xl mx-auto px-4 py-12 space-y-16">
        <section>
          <h2 className="text-2xl font-semibold mb-6 font-serif">Najprodavanija eterična ulja</h2>
          <ProductGrid products={featured} emptyMessage="Nema istaknutih proizvoda." />
        </section>

        {categories.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-6 font-serif">
              Pogledajte kompletnu ponudu naših organskih proizvoda
            </h2>
            <CategoryList categories={categories} />
          </section>
        )}

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

        <section className="rounded-2xl bg-brand text-white text-center px-6 py-10">
          <h2 className="text-2xl font-semibold font-serif">Poručite telefonom</h2>
          <p className="mt-2 opacity-90">Viber, WhatsApp, SMS</p>
          <a
            href="tel:+381652036804"
            className="mt-4 inline-block text-2xl md:text-3xl font-bold hover:underline underline-offset-4"
          >
            +381 65 203 6804
          </a>
        </section>

        {posts.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold font-serif">Blog o zdravlju i eteričnim uljima</h2>
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
          <h2 className="text-2xl font-semibold mb-6 font-serif">Utisci kupaca</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {REVIEWS.map((r) => (
              <blockquote key={r.name} className="rounded-xl border border-gray-200 p-6">
                <p className="text-brand" aria-label="Ocena 5 od 5">★★★★★</p>
                <p className="mt-2 text-gray-700">{r.text}</p>
                <footer className="mt-3 font-semibold">{r.name}</footer>
              </blockquote>
            ))}
          </div>
        </section>

        <p className="text-center text-lg font-semibold font-serif">
          Besplatna dostava za kupovinu preko 5.000 din
        </p>
      </main>
    </>
  )
}
