'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export default function PurchaseConversion() {
  useEffect(() => {
    let purchase: { value: number; transactionId: string } | null = null
    try {
      const raw = sessionStorage.getItem('purchase')
      if (!raw) return
      sessionStorage.removeItem('purchase')
      purchase = JSON.parse(raw)
    } catch {
      return
    }
    if (!purchase) return

    const fire = () => {
      if (typeof window.gtag !== 'function') return false
      window.gtag('event', 'conversion', {
        send_to: 'AW-10886102026/TYoSCO_w-ZsdEIr48sYo',
        value: purchase.value,
        currency: 'RSD',
        transaction_id: purchase.transactionId,
      })
      return true
    }

    // gtag se učitava afterInteractive, pa pokušaj ponovo ako još nije spreman
    if (fire()) return
    const timer = setInterval(() => {
      if (fire()) clearInterval(timer)
    }, 300)
    const stop = setTimeout(() => clearInterval(timer), 10000)
    return () => {
      clearInterval(timer)
      clearTimeout(stop)
    }
  }, [])

  return null
}
