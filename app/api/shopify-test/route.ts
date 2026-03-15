import { NextResponse } from 'next/server'
import { shopifyClient } from '@/lib/shopify'
import { getCurrentApiVersion } from '@shopify/graphql-client'

/**
 * Debug route: test Shopify connection and return raw products response
 * Visit /api/shopify-test to see the raw API response
 */
export async function GET() {
  try {
    const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? ''
    const apiVersion = getCurrentApiVersion().version
    const apiUrl = `https://${domain.replace(/^https?:\/\//, '').replace(/\/$/, '')}/api/${apiVersion}/graphql.json`

    const query = `
      query getProducts($first: Int!) {
        products(first: $first) {
          edges {
            node {
              id
              title
              handle
            }
          }
        }
      }
    `
    const response = await shopifyClient.request(query, {
      variables: { first: 4 },
    })

    return NextResponse.json({
      success: !response.errors?.networkStatusCode,
      data: response.data,
      errors: response.errors,
      debug: {
        apiUrl,
        apiVersion,
        hint: response.errors?.networkStatusCode === 404
          ? '404 = wrong API version or store domain'
          : undefined,
      },
      envCheck: {
        hasDomain: !!process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN,
        hasToken: !!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN,
        domain: domain ? `${domain.slice(0, 15)}...` : 'not set',
      },
    })
  } catch (error) {
    console.error('Shopify test error:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : undefined,
      },
      { status: 500 }
    )
  }
}
