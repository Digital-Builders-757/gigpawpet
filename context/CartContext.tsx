'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
  useTransition,
} from 'react'
import type { Cart } from '@/types/shopify'

const CART_ID_KEY = 'shopify_cart_id'

type CartContextType = {
  cart: Cart | null
  cartOpen: boolean
  addItem: (merchandiseId: string, quantity?: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  openCart: () => void
  closeCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

async function fetchCart(cartId: string): Promise<Cart | null> {
  const res = await fetch(`/api/cart?cartId=${encodeURIComponent(cartId)}`)
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Failed to get cart')
  return json.cart ?? null
}

async function createCartApi(): Promise<Cart> {
  const res = await fetch('/api/cart', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Failed to create cart')
  if (!json.cart) throw new Error('Failed to create cart')
  return json.cart
}

async function addToCartApi(
  cartId: string,
  merchandiseId: string,
  quantity: number
): Promise<Cart> {
  const res = await fetch('/api/cart', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cartId,
      action: 'add',
      merchandiseId,
      quantity,
    }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Failed to add to cart')
  return json.cart
}

async function updateCartLineApi(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const res = await fetch('/api/cart', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cartId,
      action: 'update',
      lineId,
      quantity,
    }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Failed to update cart')
  if (!json.cart) throw new Error('No cart returned from update')
  return json.cart
}

async function removeFromCartApi(
  cartId: string,
  lineId: string
): Promise<Cart> {
  const res = await fetch('/api/cart', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cartId,
      action: 'remove',
      lineId,
    }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error ?? 'Failed to remove from cart')
  if (!json.cart) throw new Error('No cart returned from remove')
  return json.cart
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [, startTransition] = useTransition()

  useEffect(() => {
    const loadCart = async () => {
      if (typeof window === 'undefined') return

      const cartId = localStorage.getItem(CART_ID_KEY)
      if (cartId) {
        try {
          const existingCart = await fetchCart(cartId)
          if (existingCart) {
            setCart(existingCart)
            return
          }
        } catch {
          localStorage.removeItem(CART_ID_KEY)
        }
      }

      try {
        const newCart = await createCartApi()
        localStorage.setItem(CART_ID_KEY, newCart.id)
        setCart(newCart)
      } catch (error) {
        console.error('Failed to create cart:', error)
      }
    }
    loadCart()
  }, [])

  const addItem = useCallback(
    async (merchandiseId: string, quantity: number = 1) => {
      startTransition(async () => {
        let cartId = cart?.id ?? localStorage.getItem(CART_ID_KEY)

        if (!cartId) {
          try {
            const newCart = await createCartApi()
            cartId = newCart.id
            localStorage.setItem(CART_ID_KEY, newCart.id)
            setCart(newCart)
          } catch (error) {
            console.error('Failed to create cart:', error)
            return
          }
        }

        try {
          const updatedCart = await addToCartApi(
            cartId,
            merchandiseId,
            quantity
          )
          setCart(updatedCart)
        } catch (error) {
          console.error('Failed to add to cart:', error)
        }
      })
    },
    [cart?.id]
  )

  const removeItem = useCallback(
    async (lineId: string) => {
      if (!cart) return

      try {
        const updatedCart = await removeFromCartApi(cart.id, lineId)
        setCart(updatedCart)
      } catch (error) {
        console.error('Failed to remove from cart:', error)
        throw error
      }
    },
    [cart]
  )

  const updateItem = useCallback(
    async (lineId: string, quantity: number) => {
      if (!cart) return

      try {
        const updatedCart = await updateCartLineApi(
          cart.id,
          lineId,
          quantity
        )
        setCart(updatedCart)
      } catch (error) {
        console.error('Failed to update cart:', error)
        throw error
      }
    },
    [cart]
  )

  const openCart = useCallback(() => setCartOpen(true), [])
  const closeCart = useCallback(() => setCartOpen(false), [])

  return (
    <CartContext.Provider
      value={{
        cart,
        cartOpen,
        addItem,
        removeItem,
        updateItem,
        openCart,
        closeCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
