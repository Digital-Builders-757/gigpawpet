"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { PrimaryNav } from "@/components/pet-haven/primary-nav"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { PromoBanner } from "@/components/pet-haven/promo-banner"
import { Footer } from "@/components/pet-haven/footer"
import { Button } from "@/components/ui/button"
import { useCart } from "@/context/CartContext"
import { formatPrice } from "@/lib/normalize"

export default function CartPage() {
  const { cart, removeItem, updateItem } = useCart()
  const [updatingLineId, setUpdatingLineId] = useState<string | null>(null)

  return (
    <main id="main-content" className="min-h-screen bg-background" role="main">
      <TopBanner />
      <Header />
      <PrimaryNav />
      <SecondaryNav />
      <PromoBanner />

      <section className="w-full bg-background py-8 md:py-12">
        <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-8">
            Your Cart
          </h1>

          {!cart || cart.lines.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-6 py-16">
              <p className="text-muted-foreground text-lg">
                Your cart is empty
              </p>
              <Button asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2">
                <ul className="space-y-6">
                  {cart.lines.map((line) => (
                    <li
                      key={line.id}
                      className="flex gap-4 md:gap-6 p-4 rounded-xl bg-card border border-border shadow-sm"
                    >
                      <div className="relative h-24 w-24 md:h-28 md:w-28 shrink-0 overflow-hidden rounded-lg bg-muted">
                        {line.image?.url ? (
                          <Image
                            src={line.image.url}
                            alt={line.image.altText ?? line.title}
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-muted-foreground text-xs">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1 flex flex-col justify-between">
                        <div>
                          <Link
                            href={`/product/${line.productHandle}`}
                            className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2"
                          >
                            {line.title}
                          </Link>
                          {line.variantTitle && (
                            <p className="text-sm text-muted-foreground mt-0.5">
                              {line.variantTitle}
                            </p>
                          )}
                          <p className="text-sm font-medium mt-1">
                            {formatPrice(line.price, line.currencyCode)} each
                          </p>
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="flex items-center border border-border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-r-none"
                              disabled={updatingLineId === line.id}
                              onClick={async () => {
                                setUpdatingLineId(line.id)
                                try {
                                  if (line.quantity <= 1) {
                                    await removeItem(line.id)
                                    toast.success("Item removed")
                                  } else {
                                    await updateItem(line.id, line.quantity - 1)
                                  }
                                } catch {
                                  toast.error("Failed to update cart")
                                } finally {
                                  setUpdatingLineId(null)
                                }
                              }}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="flex h-9 w-9 items-center justify-center text-sm font-medium min-w-[2.25rem]">
                              {line.quantity}
                            </span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-l-none"
                              disabled={updatingLineId === line.id}
                              onClick={async () => {
                                setUpdatingLineId(line.id)
                                try {
                                  await updateItem(line.id, line.quantity + 1)
                                } catch {
                                  toast.error("Failed to update cart")
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
                            size="sm"
                            className="h-9 text-destructive hover:text-destructive hover:bg-destructive/10"
                            disabled={updatingLineId === line.id}
                            onClick={async () => {
                              setUpdatingLineId(line.id)
                              try {
                                await removeItem(line.id)
                                toast.success("Item removed")
                              } catch {
                                toast.error("Failed to remove item")
                              } finally {
                                setUpdatingLineId(null)
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>
                      <p className="shrink-0 font-semibold text-lg">
                        {formatPrice(line.totalPrice, line.currencyCode)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Order summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 rounded-xl bg-card border border-border p-6 shadow-sm">
                  <h2 className="text-lg font-semibold text-foreground mb-4">
                    Order Summary
                  </h2>
                  <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({cart.totalQuantity} items)</span>
                      <span>
                        {formatPrice(cart.totalAmount, cart.currencyCode)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Shipping and taxes calculated at checkout
                    </p>
                  </div>
                  <Button className="w-full" size="lg" asChild>
                    <a
                      href={cart.checkoutUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Proceed to Checkout
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full mt-3" asChild>
                    <Link href="/">Continue Shopping</Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
