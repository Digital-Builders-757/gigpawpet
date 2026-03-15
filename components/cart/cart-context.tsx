"use client"

import { createContext, useContext, useState, useCallback, useEffect, ReactNode, useTransition } from "react"
import { ShopifyCart, ProductVariant, Product } from "@/lib/shopify/types"
import { createCart, addCartLines, updateCartLines, removeCartLines, getCart } from "@/lib/shopify"

const CART_ID_KEY = "shopify_cart_id"

type CartContextType = {
  cart: ShopifyCart | null
  isLoading: boolean
  addItem: (variant: ProductVariant, product: Product) => Promise<void>
  updateItem: (lineId: string, quantity: number) => Promise<void>
  removeItem: (lineId: string) => Promise<void>
  totalQuantity: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<ShopifyCart | null>(null)
  const [isLoading, startTransition] = useTransition()

  // Load cart on mount
  useEffect(() => {
    const loadCart = async () => {
      const cartId = localStorage.getItem(CART_ID_KEY)
      if (cartId) {
        try {
          const existingCart = await getCart(cartId)
          if (existingCart) {
            setCart(existingCart)
            return
          }
        } catch (error) {
          console.error("Error loading cart:", error)
        }
      }
      // Create new cart if none exists
      try {
        const newCart = await createCart()
        localStorage.setItem(CART_ID_KEY, newCart.id)
        setCart(newCart)
      } catch (error) {
        console.error("Error creating cart:", error)
      }
    }
    loadCart()
  }, [])

  const addItem = useCallback(async (variant: ProductVariant, product: Product) => {
    if (!cart) return

    startTransition(async () => {
      try {
        const updatedCart = await addCartLines(cart.id, [
          { merchandiseId: variant.id, quantity: 1 }
        ])
        setCart(updatedCart)
      } catch (error) {
        console.error("Error adding item to cart:", error)
      }
    })
  }, [cart])

  const updateItem = useCallback(async (lineId: string, quantity: number) => {
    if (!cart) return

    startTransition(async () => {
      try {
        const updatedCart = await updateCartLines(cart.id, [{ id: lineId, quantity }])
        setCart(updatedCart)
      } catch (error) {
        console.error("Error updating cart item:", error)
      }
    })
  }, [cart])

  const removeItem = useCallback(async (lineId: string) => {
    if (!cart) return

    startTransition(async () => {
      try {
        const updatedCart = await removeCartLines(cart.id, [lineId])
        setCart(updatedCart)
      } catch (error) {
        console.error("Error removing cart item:", error)
      }
    })
  }, [cart])

  const totalQuantity = cart?.lines.edges.reduce((total, edge) => total + edge.node.quantity, 0) ?? 0

  return (
    <CartContext.Provider value={{ cart, isLoading, addItem, updateItem, removeItem, totalQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
