'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  documentId: string
  name: string
  image: string
  price: number
  quantity: number
  size: string
  slug: string
}

interface CartState {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string) => void
  updateQuantity: (id: string, size: string, delta: number) => void
  clear: () => void
  getTotalCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find(
          (i) => i.documentId === item.documentId && i.size === item.size,
        )
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.documentId === item.documentId && i.size === item.size
                ? {
                    ...i,
                    quantity: Math.min(10, i.quantity + item.quantity),
                  }
                : i,
            ),
          })
        } else {
          set({ items: [...get().items, item] })
        }
      },
      removeItem: (id, size) =>
        set({
          items: get().items.filter(
            (item) => !(item.documentId === id && item.size === size),
          ),
        }),
      updateQuantity: (id, size, delta) =>
        set({
          items: get().items.map((item) =>
            item.documentId === id && item.size === size
              ? {
                  ...item,
                  quantity: Math.min(10, Math.max(1, item.quantity + delta)),
                }
              : item,
          ),
        }),
      clear: () => set({ items: [] }),

      getTotalCount: () =>
        get().items.reduce((acc, item) => acc + item.quantity, 0),
    }),
    {
      name: 'cart',
    },
  ),
)
