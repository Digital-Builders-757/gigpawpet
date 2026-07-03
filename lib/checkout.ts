/**
 * Helpers for handling Shopify checkout navigation.
 */

/**
 * Appends `channel=online_store` to a Shopify checkout URL so it bypasses the
 * store's "Password Required" screen.
 */
export function buildCheckoutUrl(checkoutUrl: string): string {
  if (!checkoutUrl) return checkoutUrl
  try {
    const url = new URL(checkoutUrl)
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
