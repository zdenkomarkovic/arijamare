import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/metadata'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import ContactInfo from '@/components/content/ContactInfo'

export const metadata: Metadata = buildMetadata({
  title: "Kontakt",
  url: '/kontakt/',
})

export default function Page() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <Breadcrumbs items={[{ name: "Kontakt" }]} />
      <h1 className="text-3xl font-semibold mb-8 font-serif">Kontakt</h1>
      <div className="page-content max-w-4xl">
        <h3>Stojimo Vam na raspolaganju za sva Vaša pitanja u vezi Arijamare prirodne kozmetike!</h3>
        <p>Budite slobodni da nas kontaktirate putem <strong>naznačenog broja telefona</strong>, <strong>Viber-a ili društvenih mreža</strong> Instagram i Facebook na kojima smo takođe prisutni. Tu smo da Vam pružimo najvalitetniju prirodnu kozmetiku, ali i da odgovorimo na pitanja i nedoumice koje imate u vezi sa preparatima.</p>
        <h4><a href="tel:+381652036804">0652036804</a></h4>
        <h4><a href="mailto:info@arijamare.com">info@arijamare.com</a></h4>
        <h3>Često postavljena pitanja</h3>
        <p>Da li šaljete na adresu?</p>
        <p>Naravno, proizvode šaljemo poštom direktno na vašu adresu.</p>
        <p>Da li mogu da platim pouzećem?</p>
        <p>Možete, zavisno od količine i dogovora.</p>
        <p>Besplatna dostava?</p>
        <p>Za sve porudžbine preko 4.700 RSD dostava je FREE</p>
        <p>Da li dobijam popust?</p>
        <p>Za veće količine imamo poseban popust.</p>
        <p>Da li je kozmetika prirodna?</p>
        <p>Da, kozmetika je od isključivo prirodnih sastojaka iz prirode</p>
        <p>Kako mogu da poručim?</p>
        <p>Putem sajta, telefonom ili u DM na društvenim mrežama.</p>
        <ContactInfo />
      </div>
    </main>
  )
}
