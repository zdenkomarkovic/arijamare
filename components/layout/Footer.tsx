export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-200 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-500 text-center">
        &copy; {year} {process.env.NEXT_PUBLIC_SITE_NAME ?? 'Prodavnica'}. Sva prava zadrzana.
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
