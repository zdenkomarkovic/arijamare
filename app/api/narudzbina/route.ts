import { NextResponse } from 'next/server'
import { sendOrderEmail } from '@/lib/email/sendOrder'
import type { CartItem, OrderFormData } from '@/types/shop'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { form, items, totalPrice } = body as {
      form: OrderFormData
      items: CartItem[]
      totalPrice: number
    }

    if (!form || !items || items.length === 0) {
      return NextResponse.json({ error: 'Nedostaju podaci' }, { status: 400 })
    }

    await sendOrderEmail(form, items, totalPrice)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Greška pri slanju narudzbine:', err)
    return NextResponse.json({ error: 'Greška pri slanju narudzbine' }, { status: 500 })
  }
}
