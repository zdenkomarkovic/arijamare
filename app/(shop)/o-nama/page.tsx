import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import Breadcrumbs from '@/components/seo/Breadcrumbs'

export const metadata: Metadata = buildMetadata({
  title: "O nama",
  url: '/o-nama/',
})

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ name: "O nama" }]} />
      <h1 className="text-3xl font-semibold mb-8 font-serif">O nama</h1>
      <div className="page-content max-w-4xl">
        <p>Kompanija Elmar iz Trebinja je osnovana 1999. godine, sa ciljem da tržištu ponudi najkvalitetniju <strong>prirodnu kozmetiku baziranu na organskim proizvodima.</strong></p>
        <p><strong>Tradicija poslovanja duga dve decenije </strong>nas je učinila vrlo prepoznatljivim na tržištu organske kozmetike, a zadovoljni klijenti nas preporučuju kao pouzdane proizvođače eteričnih ulja i drugih, ručno rađenih proizvoda nemanjenih nezi i lepoti.</p>
        <p>Osim na domaćem tržištu, svoje proizvode smo predstavili i na <strong>međunarodnim sajmovima organske kozmetike</strong> gde smo iz godine u godinu prisutni zajedno sa našim prirodnim eteričnim uljima koja su najvažniji produkt našeg poslovanja.</p>
        <Image src="/images/o-nama/o-nama-1.jpg" alt="" width={1200} height={800} sizes="(max-width: 768px) 100vw, 768px" />
        <h2>100% Prirodno</h2>
        <Image src="/images/o-nama/o-nama-2.jpg" alt="Vitex agnus castus" width={450} height={500} sizes="(max-width: 768px) 100vw, 768px" />
        <Image src="/images/o-nama/o-nama-3.jpg" alt="Ulje za hormonski balans" width={450} height={500} sizes="(max-width: 768px) 100vw, 768px" />
        <Image src="/images/o-nama/o-nama-4.jpg" alt="Ulje za gljivice" width={450} height={500} sizes="(max-width: 768px) 100vw, 768px" />
        <Image src="/images/o-nama/o-nama-5.jpg" alt="Dezodorans" width={450} height={500} sizes="(max-width: 768px) 100vw, 768px" />
        <Image src="/images/o-nama/o-nama-6.jpg" alt="Serum za lica" width={450} height={500} sizes="(max-width: 768px) 100vw, 768px" />
        <Image src="/images/o-nama/o-nama-7.jpg" alt="Krema za zrelu kožu" width={450} height={500} sizes="(max-width: 768px) 100vw, 768px" />
        <Image src="/images/o-nama/o-nama-8.jpg" alt="Sapun sa lavandom, i lovorom" width={450} height={500} sizes="(max-width: 768px) 100vw, 768px" />
        <Image src="/images/o-nama/o-nama-9.jpg" alt="Sapun sa klekom, i iglicama bora" width={450} height={500} sizes="(max-width: 768px) 100vw, 768px" />
        <Image src="/images/o-nama/o-nama-10.jpg" alt="Labelo" width={450} height={500} sizes="(max-width: 768px) 100vw, 768px" />
        <p><em></em><em></em><em></em><em></em><em></em> Rated 5 out of 5</p>
        <p>Organski proizvodi iz naše ponude ne sadrže paraben, emulgatore, silikon i druge za kožu štetne sastojke, koji su, nažalost, postali neizostavan deo konvencionalnih kozmetičkih proizvoda.</p>
        <Image src="/images/o-nama/o-nama-11.png" alt="" width={194} height={153} sizes="(max-width: 768px) 100vw, 768px" />
        <h3>Organski proizvodi</h3>
        <p>Blage, prirodne note Arijamare proizvoda sa vrlo efektnim uticajem su idealna mera za negu kože koja zahteva delotvorne, ali neagresivne proizvode bez veštačkih sastojaka.</p>
        <h2>Direktno iz prirode!</h2>
        <ul>
          <li><Link href="/etericna-ulja/">Eterična ulja</Link></li>
          <li><Link href="/kozmetika/">Kozmetika</Link></li>
          <li><Link href="/biljni-cajevi/">Čajevi</Link></li>
          <li><Link href="/hidrolati/">Hidrolati</Link></li>
        </ul>
      </div>
    </main>
  )
}
