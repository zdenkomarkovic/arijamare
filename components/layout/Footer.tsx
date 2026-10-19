import Link from 'next/link'
import Image from 'next/image'
import { SITE_NAME } from '@/lib/constants'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 mt-auto bg-brand-soft/40">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-3 text-sm text-gray-600">
        <div>
          <Image src="/logo.webp" alt={SITE_NAME} width={240} height={82} className="h-20 w-auto mb-4" />
          <p>
            Tradicija poslovanja duga dve decenije nas je učinila vrlo prepoznatljivim na tržištu organske
            kozmetike. Zadovoljni klijenti nas preporučuju kao pouzdane proizvođače eteričnih ulja i drugih,
            ručno rađenih proizvoda namenjenih nezi i lepoti.
          </p>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-3 font-serif">Kontakt</h2>
          <ul className="space-y-2">
            <li>
              <a href="tel:+381652036804" className="hover:text-brand">
                +381 65 203 6804
              </a>
            </li>
            <li>
              <a href="mailto:info@arijamare.com" className="hover:text-brand">
                info@arijamare.com
              </a>
            </li>
            <li className="flex gap-4 pt-1">
              <a href="https://www.facebook.com/arijamare1980/" target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                Facebook
              </a>
              <a href="https://www.instagram.com/arijamare" target="_blank" rel="noopener noreferrer" className="hover:text-brand">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 mb-3 font-serif">Korisni linkovi</h2>
          <ul className="space-y-2">
            <li><Link href="/o-nama/" className="hover:text-brand">O nama</Link></li>
            <li><Link href="/prodavnica/" className="hover:text-brand">Prodavnica</Link></li>
            <li><Link href="/blog/" className="hover:text-brand">Blog</Link></li>
            <li><Link href="/kontakt/" className="hover:text-brand">Kontakt</Link></li>
            <li><Link href="/privacy-policy/" className="hover:text-brand">Pravila i uslovi</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-xs text-gray-500 text-center">
        Copyright &copy; {year} | {SITE_NAME}
        <span className="mx-2">·</span>
        Izrada sajta:{' '}
        <a
          href="https://manikamwebsolutions.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline underline-offset-2"
        >
          Manikam Web Solutions
        </a>
      </div>
    </footer>
  )
}
