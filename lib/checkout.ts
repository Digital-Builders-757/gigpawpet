/**
 * Helpers for handling Shopify checkout navigation.
 */

/**
 * Optional override for the host that serves Shopify checkout.
 *
 * Shopify generates `checkoutUrl` on the store's *primary domain*. When the
 * primary domain is pointed at a headless storefront (this Next.js app on
 * Vercel), that host has no `/cart/c/...` route and checkout 404s. Set this
 * env var to the domain that actually serves Shopify checkout (e.g. a
 * dedicated `shop.yourstore.com` subdomain whose DNS points to Shopify) and
 * the checkout URL host will be rewritten to it.
 */
const CHECKOUT_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_CHECKOUT_DOMAIN

/**
 * Appends `channel=online_store` to a Shopify checkout URL so it bypasses the
 * store's "Password Required" screen, and rewrites the host to the configured
 * checkout domain when one is set.
 */
export function buildCheckoutUrl(checkoutUrl: string): string {
  if (!checkoutUrl) return checkoutUrl
  try {
    const url = new URL(checkoutUrl)
    if (CHECKOUT_DOMAIN) {
      url.host = CHECKOUT_DOMAIN
    }
    url.searchParams.set('channel', 'online_store')
    return url.toString()
  } catch {
    return checkoutUrl
  }
}

/**
 * Opens the checkout URL. When running inside an iframe (e.g. the v0 preview),
 * open in a new tab; otherwise navigate in the current tab.
 */
export function openCheckout(checkoutUrl: string): void {
  if (!checkoutUrl) return
  const url = buildCheckoutUrl(checkoutUrl)

  if (typeof window === 'undefined') return

  if (window.self !== window.top) {
    window.open(url, '_blank', 'noopener,noreferrer')
  } else {
    window.location.href = url
  }
}
