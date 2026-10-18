import CheckoutForm from '@/components/checkout/CheckoutForm'
import OrderSummary from '@/components/checkout/OrderSummary'

export const metadata = { title: 'Placanje' }

export default function CheckoutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-8">Placanje</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <h2 className="font-semibold mb-4">Podaci za dostavu</h2>
          <CheckoutForm />
        </div>
        <div>
          <h2 className="font-semibold mb-4">Vasa narudzbina</h2>
          <OrderSummary />
        </div>
      </div>
    </main>
  )
}
