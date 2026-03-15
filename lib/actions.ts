/**
 * Async functions that call each query via the Shopify Storefront API client
 */

import { shopifyClient } from './shopify'
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

export async function getProducts(options?: {
  first?: number
  sortKey?: string
  reverse?: boolean
  query?: string
}): Promise<Product[]> {
  const variables: Record<string, unknown> = {
    first: options?.first ?? 12,
    sortKey: options?.sortKey ?? 'CREATED_AT',
    reverse: options?.reverse ?? false,
  }
  if (options?.query) {
    variables.query = options.query
  }

  const { data, errors } = await shopifyClient.request<{
    products: { edges: Array<{ node: ShopifyProduct }> }
  }>(getProductsQuery, {
    variables,
  })

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.message ?? 'Failed to fetch products')
  }

  const products = data?.products?.edges?.map((e) => e.node) ?? []
  return normalizeProducts(products)
}

export async function getProductByHandle(handle: string): Promise<Product | null> {
  const { data, errors } = await shopifyClient.request<{
    product: ShopifyProduct | null
  }>(getProductByHandleQuery, {
    variables: { handle },
  })

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.message ?? 'Failed to fetch product')
  }

  const product = data?.product
  return product ? normalizeProduct(product) : null
}

export async function getCollectionProducts(
  handle: string,
  options?: { first?: number; sortKey?: string; reverse?: boolean }
): Promise<Product[]> {
  const { data, errors } = await shopifyClient.request<{
    collection: {
      products: { edges: Array<{ node: ShopifyProduct }> }
    } | null
  }>(getCollectionProductsQuery, {
    variables: {
      handle,
      first: options?.first ?? 12,
      sortKey: options?.sortKey ?? 'BEST_SELLING',
      reverse: options?.reverse ?? false,
    },
  })

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.message ?? 'Failed to fetch collection products')
  }

  const products = data?.collection?.products?.edges?.map((e) => e.node) ?? []
  return normalizeProducts(products)
}

export async function getNewArrivals(first: number = 8): Promise<Product[]> {
  const { data, errors } = await shopifyClient.request<{
    products: { edges: Array<{ node: ShopifyProduct }> }
  }>(getNewArrivalsQuery, {
    variables: { first },
  })

  if (errors?.graphQLErrors?.length) {
    throw new Error(errors.message ?? 'Failed to fetch new arrivals')
  }

  const products = data?.products?.edges?.map((e) => e.node) ?? []
  return normalizeProducts(products)
}

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
