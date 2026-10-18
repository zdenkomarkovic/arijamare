import type { Metadata } from 'next'
import './globals.css'
import { SITE_NAME, SITE_URL } from '@/lib/constants'
import { CartProvider } from '@/lib/cart/CartContext'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: 'Online prodavnica',
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
