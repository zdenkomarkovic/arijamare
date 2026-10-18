'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import type { CartItem } from '@/types/shop'

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('cart')
    if (saved) setItems(JSON.parse(saved))
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) localStorage.setItem('cart', JSON.stringify(items))
  }, [items, mounted])

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === newItem._id)
      if (existing) {
        return prev.map((i) =>
          i._id === newItem._id ? { ...i, quantity: i.quantity + quantity } : i
        )
      }
      return [...prev, { ...newItem, quantity }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i._id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity < 1) return
    setItems((prev) => prev.map((i) => (i._id === id ? { ...i, quantity } : i)))
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce(
    (sum, i) => sum + ((i.salePrice ?? i.price) ?? 0) * i.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{ items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart mora biti unutar CartProvider')
  return ctx
}
