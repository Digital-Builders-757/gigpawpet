"use client"

import Image from "next/image"
import Link from "next/link"
import type { Product } from "@/types/shopify"
import { useCart } from "@/context/CartContext"
import { Spinner } from "@/components/ui/spinner"
import { useTransition } from "react"

interface ShopifyProductCardProps {
  product: Product
  ctaBackgroundColor?: string
}

export function ShopifyProductCard({ product, ctaBackgroundColor }: ShopifyProductCardProps) {
  const { addItem } = useCart()
  const [isPending, startTransition] = useTransition()
  
  const price = parseFloat(product.price)
  const image = product.images[0]
  const variant = product.variants[0] ?? null

  const handleAddToCart = () => {
    if (!variant) return
    
    startTransition(async () => {
      await addItem(variant.id, 1)
    })
  }

  return (
    <div className="group bg-card rounded-xl md:rounded-2xl p-2 md:p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-200">
      <Link href={`/product/${product.handle}`}>
        <div className="aspect-square relative rounded-lg overflow-hidden mb-2 md:mb-3">
          {image ? (
            <Image
              src={image.url}
              alt={image.altText ?? product.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-xs">No image</span>
            </div>
          )}
        </div>
      </Link>
      
      <p className="text-base md:text-xl font-extrabold text-foreground mb-1 md:mb-2">
        ${price.toFixed(2)}
      </p>
      
      <div className="w-full h-px bg-border mb-1 md:mb-2" />
      
      <Link href={`/product/${product.handle}`}>
        <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-2 md:mb-3 min-h-[2rem] md:min-h-[2.5rem] hover:text-foreground transition-colors">
          {product.title}
        </p>
      </Link>
      
      <button 
        onClick={handleAddToCart}
        disabled={isPending || !variant}
        className={`w-full rounded-full py-2 md:py-2.5 text-xs md:text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${ctaBackgroundColor ? 'text-foreground' : 'bg-primary text-white hover:bg-primary-hover'}`}
        style={ctaBackgroundColor ? { backgroundColor: ctaBackgroundColor } : undefined}
      >
        {isPending ? (
          <>
            <Spinner size="sm" />
            <span className="hidden sm:inline">Adding...</span>
          </>
        ) : (
          <span className="sm:hidden">Add</span>
        )}
        {!isPending && <span className="hidden sm:inline">Add to cart</span>}
      </button>
    </div>
  )
}
