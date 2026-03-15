/**
 * Functions to flatten Shopify API responses into clean objects
 */

import type { ShopifyProduct, ShopifyCart, ShopifyCartLine } from '@/types/shopify'
import type { Product, Cart, CartItem } from '@/types/shopify'

export function formatPrice(
  amount: string,
  currencyCode: string = 'USD'
): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(parseFloat(amount))
}

export function normalizeProduct(raw: ShopifyProduct): Product {
  const priceRange = raw.priceRange?.minVariantPrice
  const compareAtPrice = raw.compareAtPriceRange?.minVariantPrice

  return {
    id: raw.id,
    title: raw.title,
    description: raw.description ?? '',
    descriptionHtml: raw.descriptionHtml ?? '',
    handle: raw.handle,
    availableForSale: raw.availableForSale ?? false,
    productType: raw.productType ?? null,
    options:
      raw.options?.map((o) => ({
        name: o.name,
        values: o.values ?? [],
      })) ?? [],
    images:
      raw.images?.edges?.map((e) => ({
        url: e.node.url,
        altText: e.node.altText,
      })) ?? [],
    price: priceRange?.amount ?? '0',
    compareAtPrice: compareAtPrice?.amount ?? null,
    currencyCode: priceRange?.currencyCode ?? 'USD',
    variants:
      raw.variants?.edges?.map((e) => ({
        id: e.node.id,
        title: e.node.title,
        price: e.node.price?.amount ?? '0',
        availableForSale: e.node.availableForSale ?? false,
        selectedOptions: e.node.selectedOptions ?? [],
      })) ?? [],
  }
}

export function normalizeProducts(rawProducts: ShopifyProduct[]): Product[] {
  return rawProducts.map(normalizeProduct)
}

export function normalizeCart(raw: ShopifyCart): Cart {
  const lines: CartItem[] =
    raw.lines?.edges?.map((e) => normalizeCartLine(e.node)) ?? []
  const totalQuantity = lines.reduce((sum, l) => sum + l.quantity, 0)
  const cost = raw.cost?.totalAmount

  return {
    id: raw.id,
    totalQuantity,
    totalAmount: cost?.amount ?? '0',
    currencyCode: cost?.currencyCode ?? 'USD',
    checkoutUrl: raw.checkoutUrl ?? '',
    lines,
  }
}

function normalizeCartLine(line: ShopifyCartLine): CartItem {
  const merch = line.merchandise
  const price = merch.price
  const totalAmount = (parseFloat(price.amount) * line.quantity).toFixed(2)
  const image = merch.product?.images?.edges?.[0]?.node ?? null

  return {
    id: line.id,
    quantity: line.quantity,
    title: merch.product?.title ?? 'Product',
    variantTitle: merch.title ?? '',
    price: price.amount,
    totalPrice: totalAmount,
    currencyCode: price.currencyCode ?? 'USD',
    image: image ? { url: image.url, altText: image.altText } : null,
    productHandle: merch.product?.handle ?? '',
  }
}
