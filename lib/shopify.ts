/**
 * Shopify Storefront API client using @shopify/storefront-api-client
 */

import { createStorefrontApiClient } from '@shopify/storefront-api-client'
import { getCurrentApiVersion } from '@shopify/graphql-client'

const storeDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN
const storefrontAccessToken =
  process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN

function getStoreUrl(domain: string) {
  const normalized = domain.trim().replace(/^https?:\/\//, '').replace(/\/$/, '')
  if (normalized.startsWith('http')) return normalized
  return `https://${normalized}`
}

export const shopifyClient = createStorefrontApiClient({
  storeDomain: storeDomain ? getStoreUrl(storeDomain) : 'https://example.myshopify.com',
  apiVersion: getCurrentApiVersion().version,
  publicAccessToken: storefrontAccessToken ?? '',
})
