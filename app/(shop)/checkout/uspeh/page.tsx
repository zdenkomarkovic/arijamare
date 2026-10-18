import Link from 'next/link'

export const metadata = { title: 'Narudzbina primljena' }

export default function UspehPage() {
  return (
    <main className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="text-5xl mb-6">✓</div>
      <h1 className="text-2xl font-semibold mb-3">Narudzbina je primljena!</h1>
      <p className="text-gray-500 mb-8">
        Hvala na porudzbini. Kontaktiraćemo vas uskoro radi potvrde i dogovora oko dostave.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-black text-white rounded text-sm hover:bg-gray-800 transition-colors"
      >
        Vrati se na pocetnu
      </Link>
    </main>
  )
}
