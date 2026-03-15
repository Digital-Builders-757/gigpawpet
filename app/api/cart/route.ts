import { NextRequest, NextResponse } from 'next/server'
import {
  getCart,
  createCart,
  addToCart,
  updateCartLine,
  removeFromCart,
} from '@/lib/actions'

/**
 * GET - Fetch cart by cartId
 * Query: ?cartId=xxx
 */
export async function GET(request: NextRequest) {
  const cartId = request.nextUrl.searchParams.get('cartId')
  if (!cartId) {
    return NextResponse.json(
      { error: 'Missing cartId parameter' },
      { status: 400 }
    )
  }

  try {
    const cart = await getCart(cartId)
    return NextResponse.json({ cart })
  } catch (error) {
    console.error('GET /api/cart error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to get cart' },
      { status: 500 }
    )
  }
}

/**
 * POST - Create a new cart
 * Body: { lines?: [{ merchandiseId, quantity }] }
 */
export async function POST(request: NextRequest) {
  try {
    let input: { lines?: Array<{ merchandiseId: string; quantity: number }> } =
      {}
    try {
      const body = await request.json()
      if (body?.lines?.length) {
        input = { lines: body.lines }
      }
    } catch {
      // Empty body is fine for creating empty cart
    }

    const cart = await createCart(input)
    return NextResponse.json({ cart })
  } catch (error) {
    console.error('POST /api/cart error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to create cart',
      },
      { status: 500 }
    )
  }
}

/**
 * PATCH - Add, update, or remove items from cart
 * Body: { cartId, action: 'add' | 'update' | 'remove', ... }
 * - add: { merchandiseId, quantity? }
 * - update: { lineId, quantity }
 * - remove: { lineId }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { cartId, action } = body

    if (!cartId) {
      return NextResponse.json(
        { error: 'Missing cartId' },
        { status: 400 }
      )
    }

    switch (action) {
      case 'add': {
        const { merchandiseId, quantity = 1 } = body
        if (!merchandiseId) {
          return NextResponse.json(
            { error: 'Missing merchandiseId for add action' },
            { status: 400 }
          )
        }
        const cart = await addToCart(cartId, merchandiseId, quantity)
        return NextResponse.json({ cart })
      }

      case 'update': {
        const { lineId, quantity } = body
        if (!lineId || quantity === undefined) {
          return NextResponse.json(
            { error: 'Missing lineId or quantity for update action' },
            { status: 400 }
          )
        }
        const cart = await updateCartLine(cartId, lineId, quantity)
        return NextResponse.json({ cart })
      }

      case 'remove': {
        const { lineId } = body
        if (!lineId) {
          return NextResponse.json(
            { error: 'Missing lineId for remove action' },
            { status: 400 }
          )
        }
        const cart = await removeFromCart(cartId, lineId)
        return NextResponse.json({ cart })
      }

      default:
        return NextResponse.json(
          { error: `Unknown action: ${action}. Use 'add', 'update', or 'remove'.` },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error('PATCH /api/cart error:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to update cart',
      },
      { status: 500 }
    )
  }
}
