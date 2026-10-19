import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FreeShippingBanner from '@/components/layout/FreeShippingBanner'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">{children}</div>
      <FreeShippingBanner />
      <Footer />
    </div>
  )
}
