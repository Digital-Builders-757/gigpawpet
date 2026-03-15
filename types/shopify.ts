/**
 * TypeScript interfaces for Shopify Storefront API
 */

export interface ShopifyProduct {
  id: string
  title: string
  description: string
  descriptionHtml: string
  handle: string
  availableForSale: boolean
  productType: string | null
  options: Array<{ id: string; name: string; values: string[] }>
  images: {
    edges: Array<{
      node: { url: string; altText: string | null }
    }>
  }
  priceRange: {
    minVariantPrice: { amount: string; currencyCode: string }
  }
  compareAtPriceRange?: {
    minVariantPrice: { amount: string; currencyCode: string } | null
  } | null
  variants: {
    edges: Array<{
      node: {
        id: string
        title: string
        price: { amount: string; currencyCode: string }
        availableForSale: boolean
        selectedOptions: Array<{ name: string; value: string }>
      }
    }>
  }
}

export interface ShopifyCartLine {
  id: string
  quantity: number
  merchandise: {
    id: string
    title: string
    price: { amount: string; currencyCode: string }
    product: {
      title: string
      handle: string
      images: {
        edges: Array<{
          node: { url: string; altText: string | null }
        }>
      }
    }
  }
}

export interface ShopifyCart {
  id: string
  lines: {
    edges: Array<{ node: ShopifyCartLine }>
  }
  cost: {
    totalAmount: { amount: string; currencyCode: string }
    subtotalAmount?: { amount: string; currencyCode: string }
  }
  checkoutUrl: string
}

export interface Product {
  id: string
  title: string
  description: string
  descriptionHtml: string
  handle: string
  availableForSale: boolean
  productType: string | null
  options: Array<{ name: string; values: string[] }>
  images: Array<{ url: string; altText: string | null }>
  price: string
  compareAtPrice: string | null
  currencyCode: string
  variants: Array<{
    id: string
    title: string
    price: string
    availableForSale: boolean
    selectedOptions: Array<{ name: string; value: string }>
  }>
}

export interface CartItem {
  id: string
  quantity: number
  title: string
  variantTitle: string
  price: string
  totalPrice: string
  currencyCode: string
  image: { url: string; altText: string | null } | null
  productHandle: string
}

export interface Cart {
  id: string
  totalQuantity: number
  totalAmount: string
  currencyCode: string
  checkoutUrl: string
  lines: CartItem[]
}
