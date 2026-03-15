/**
 * Async functions that call each query via the Shopify Storefront API client
 */

import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { shopifyClient } from './shopify'

const SHOPIFY_CACHE_REVALIDATE = 120 // 2 minutes
import {
  getProductsQuery,
  getProductByHandleQuery,
  getCollectionProductsQuery,
  getNewArrivalsQuery,
  getBestSellersQuery,
  getCartQuery,
  createCartMutation,
  addToCartMutation,
  updateCartLineMutation,
  removeFromCartMutation,
} from './queries'
import { normalizeProduct, normalizeProducts, normalizeCart } from './normalize'
import type { ShopifyProduct, ShopifyCart } from '@/types/shopify'
import type { Product, Cart } from '@/types/shopify'

export const getProducts = cache(async (options?: {
  first?: number
  sortKey?: string
  reverse?: boolean
  query?: string
}): Promise<Product[]> => {
  const first = options?.first ?? 12
  const sortKey = options?.sortKey ?? 'CREATED_AT'
  const reverse = options?.reverse ?? false
  const query = options?.query ?? ''

  return unstable_cache(
    async () => {
      const variables: Record<string, unknown> = { first, sortKey, reverse }
      if (query) variables.query = query

      const { data, errors } = await shopifyClient.request<{
        products: { edges: Array<{ node: ShopifyProduct }> }
      }>(getProductsQuery, { variables })

      if (errors?.graphQLErrors?.length) {
        throw new Error(errors.message ?? 'Failed to fetch products')
      }

      const products = data?.products?.edges?.map((e) => e.node) ?? []
      return normalizeProducts(products)
    },
    ['products', String(first), sortKey, String(reverse), query],
    { revalidate: SHOPIFY_CACHE_REVALIDATE }
  )()
})

export const getProductByHandle = cache(async (handle: string): Promise<Product | null> => {
  return unstable_cache(
    async () => {
      const { data, errors } = await shopifyClient.request<{
        product: ShopifyProduct | null
      }>(getProductByHandleQuery, { variables: { handle } })

      if (errors?.graphQLErrors?.length) {
        throw new Error(errors.message ?? 'Failed to fetch product')
      }

      const product = data?.product
      return product ? normalizeProduct(product) : null
    },
    ['product', handle],
    { revalidate: SHOPIFY_CACHE_REVALIDATE }
  )()
})

export const getCollectionProducts = cache(async (
  handle: string,
  options?: { first?: number; sortKey?: string; reverse?: boolean }
): Promise<Product[]> => {
  const first = options?.first ?? 12
  const sortKey = options?.sortKey ?? 'BEST_SELLING'
  const reverse = options?.reverse ?? false

  return unstable_cache(
    async () => {
      const { data, errors } = await shopifyClient.request<{
        collection: {
          products: { edges: Array<{ node: ShopifyProduct }> }
        } | null
      }>(getCollectionProductsQuery, {
        variables: { handle, first, sortKey, reverse },
      })

      if (errors?.graphQLErrors?.length) {
        throw new Error(errors.message ?? 'Failed to fetch collection products')
      }

      const products = data?.collection?.products?.edges?.map((e) => e.node) ?? []
      return normalizeProducts(products)
    },
    ['collection', handle, String(first), sortKey, String(reverse)],
    { revalidate: SHOPIFY_CACHE_REVALIDATE }
  )()
})

export const getNewArrivals = cache(async (first: number = 8): Promise<Product[]> => {
  return unstable_cache(
    async () => {
      const { data, errors } = await shopifyClient.request<{
        products: { edges: Array<{ node: ShopifyProduct }> }
      }>(getNewArrivalsQuery, { variables: { first } })

      if (errors?.graphQLErrors?.length) {
        throw new Error(errors.message ?? 'Failed to fetch new arrivals')
      }

      const products = data?.products?.edges?.map((e) => e.node) ?? []
      return normalizeProducts(products)
    },
    ['new-arrivals', String(first)],
    { revalidate: SHOPIFY_CACHE_REVALIDATE }
  )()
})

// TODO: verify if used - not currently imported anywhere
export async function getBestSellers(first: number = 8): Promise<Product[]> {
  const { data, errors } = await shopifyClient.request<{
    products: { edges: Array<{ node: ShopifyProduct }> }
  }>(getBestSellersQuery, {
    variables: { first },
  })

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.message ?? 'Failed to fetch best sellers')
  }

  const products = data?.products?.edges?.map((e) => e.node) ?? []
  return normalizeProducts(products)
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const { data, errors } = await shopifyClient.request<{
    cart: ShopifyCart | null
  }>(getCartQuery, {
    variables: { cartId },
  })

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.message ?? 'Failed to fetch cart')
  }

  const cart = data?.cart
  return cart ? normalizeCart(cart) : null
}

export async function createCart(
  input?: { lines?: Array<{ merchandiseId: string; quantity: number }> }
): Promise<Cart> {
  const { data, errors } = await shopifyClient.request<{
    cartCreate: {
      cart: ShopifyCart
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>(createCartMutation, {
    variables: { input: input ?? {} },
  })

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.message ?? 'Failed to create cart')
  }

  const payload = data?.cartCreate
  if (payload?.userErrors?.length) {
    throw new Error(payload.userErrors[0].message)
  }

  if (!payload?.cart) {
    throw new Error('Failed to create cart')
  }

  return normalizeCart(payload.cart)
}

export async function addToCart(
  cartId: string,
  merchandiseId: string,
  quantity: number = 1
): Promise<Cart> {
  const { data, errors } = await shopifyClient.request<{
    cartLinesAdd: {
      cart: ShopifyCart
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>(addToCartMutation, {
    variables: {
      cartId,
      lines: [{ merchandiseId, quantity }],
    },
  })

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.message ?? 'Failed to add to cart')
  }

  const payload = data?.cartLinesAdd
  if (payload?.userErrors?.length) {
    throw new Error(payload.userErrors[0].message)
  }

  if (!payload?.cart) {
    throw new Error('Failed to add to cart')
  }

  return normalizeCart(payload.cart)
}

export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const { data, errors } = await shopifyClient.request<{
    cartLinesUpdate: {
      cart: ShopifyCart
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>(updateCartLineMutation, {
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
  })

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.message ?? 'Failed to update cart line')
  }

  const payload = data?.cartLinesUpdate
  if (payload?.userErrors?.length) {
    throw new Error(payload.userErrors[0].message)
  }

  if (!payload?.cart) {
    throw new Error('Failed to update cart line')
  }

  return normalizeCart(payload.cart)
}

export async function removeFromCart(
  cartId: string,
  lineId: string
): Promise<Cart> {
  const { data, errors } = await shopifyClient.request<{
    cartLinesRemove: {
      cart: ShopifyCart
      userErrors: Array<{ field: string[]; message: string }>
    }
  }>(removeFromCartMutation, {
    variables: {
      cartId,
      lineIds: [lineId],
    },
  })

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.message ?? 'Failed to remove from cart')
  }

  const payload = data?.cartLinesRemove
  if (payload?.userErrors?.length) {
    throw new Error(payload.userErrors[0].message)
  }

  if (!payload?.cart) {
    throw new Error('Failed to remove from cart')
  }

  return normalizeCart(payload.cart)
}
