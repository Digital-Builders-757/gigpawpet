'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useCart } from '@/context/CartContext'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/normalize'

export function CartDrawer() {
  const { cart, cartOpen, closeCart, removeItem, updateItem } = useCart()
  const [updatingLineId, setUpdatingLineId] = useState<string | null>(null)

  return (
    <Sheet open={cartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-lg px-6 pb-6">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-1 flex-col overflow-hidden">
          {!cart || cart.lines.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12">
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button variant="outline" onClick={closeCart} asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <ul className="space-y-4">
                  {cart.lines.map((line) => (
                    <li
                      key={line.id}
                      className="flex gap-4 border-b border-border pb-4 last:border-0"
                    >
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {line.image?.url ? (
                          <Image
                            src={line.image.url}
                            alt={line.image.altText ?? line.title}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground truncate">
                          {line.title}
                        </p>
                        {line.variantTitle && (
                          <p className="text-sm text-muted-foreground">
                            {line.variantTitle}
                          </p>
                        )}
                        <p className="text-sm font-medium mt-1">
                          {formatPrice(line.price, line.currencyCode)} each
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex items-center border border-border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              disabled={updatingLineId === line.id}
                              onClick={async () => {
                                setUpdatingLineId(line.id)
                                try {
                                  if (line.quantity <= 1) {
                                    await removeItem(line.id)
                                    toast.success('Item removed')
                                  } else {
                                    await updateItem(line.id, line.quantity - 1)
                                  }
                                } catch {
                                  toast.error('Failed to update cart')
                                } finally {
                                  setUpdatingLineId(null)
                                }
                              }}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="flex h-8 w-8 items-center justify-center text-sm font-medium">
                              {line.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              disabled={updatingLineId === line.id}
                              onClick={async () => {
                                setUpdatingLineId(line.id)
                                try {
                                  await updateItem(line.id, line.quantity + 1)
                                } catch {
                                  toast.error('Failed to update cart')
                                } finally {
                                  setUpdatingLineId(null)
                                }
                              }}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            disabled={updatingLineId === line.id}
                            onClick={async () => {
                              setUpdatingLineId(line.id)
                              try {
                                await removeItem(line.id)
                                toast.success('Item removed')
                              } catch {
                                toast.error('Failed to remove item')
                              } finally {
                                setUpdatingLineId(null)
                              }
                            }}
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="shrink-0 font-medium">
                        {formatPrice(line.totalPrice, line.currencyCode)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-border pt-4">
                <div className="flex justify-between text-lg font-semibold mb-4">
                  <span>Subtotal</span>
                  <span>
                    {formatPrice(cart.totalAmount, cart.currencyCode)}
                  </span>
                </div>
                <Button className="w-full" asChild>
                  <a
                    href={cart.checkoutUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Checkout
                  </a>
                </Button>
                <Button variant="outline" className="mt-2 w-full" asChild>
                  <Link href="/" onClick={closeCart}>
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
