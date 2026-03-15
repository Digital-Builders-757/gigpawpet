"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useTransition } from "react"
import { Heart, Minus, Plus, Star, Truck } from "lucide-react"
import type { Product } from "@/types/shopify"
import { useCart } from "@/context/CartContext"
import { Spinner } from "@/components/ui/spinner"

interface ShopifyProductMainProps {
  product: Product
}

export function ShopifyProductMain({ product }: ShopifyProductMainProps) {
  const { addItem } = useCart()
  const [isPending, startTransition] = useTransition()
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)

  const images = product.images
  const selectedImage = images[selectedImageIndex] ?? images[0]
  
  const price = parseFloat(product.price)
  const compareAtPrice = product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null

  // Find the selected variant based on options
  const selectedVariant = product.variants.find(variant => {
    if (Object.keys(selectedOptions).length === 0 && product.variants.length === 1) {
      return true
    }
    return variant.selectedOptions.every(
      option => selectedOptions[option.name] === option.value
    )
  }) ?? product.variants[0]

  const handleAddToCart = () => {
    if (!selectedVariant) return
    
    startTransition(async () => {
      await addItem(selectedVariant.id, quantity)
    })
  }

  return (
    <section className="w-full bg-card py-8 md:py-12">
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-foreground transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-foreground">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Image Gallery */}
          <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4">
            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-visible pb-2 sm:pb-0">
                {images.slice(0, 4).map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <Image
                      src={image.url}
                      alt={image.altText || `${product.title} thumbnail ${index + 1}`}
                      width={80}
                      height={80}
                      sizes="80px"
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
            
            {/* Main Image */}
            <div className="flex-1 aspect-square relative rounded-xl sm:rounded-2xl overflow-hidden bg-muted">
              {selectedImage ? (
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.altText || product.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            {/* Bestseller Badge */}
            <span className="inline-flex items-center self-start px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Bestseller
            </span>

            <h1 className="text-2xl md:text-3xl font-extrabold text-foreground mb-3">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">(4.9) 128 reviews</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-extrabold text-foreground">
                ${price.toFixed(2)}
              </span>
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-xl text-muted-foreground line-through">
                  ${compareAtPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6 leading-relaxed">
              {product.description || "No description available."}
            </p>

            {/* Product Options */}
            {product.options?.map((option) => (
              <div key={option.id} className="mb-6">
                <p className="text-sm font-medium text-foreground mb-3">{option.name}</p>
                <div className="flex flex-wrap gap-2">
                  {option.values.map(value => (
                    <button
                      key={value}
                      onClick={() => setSelectedOptions((prev) => ({ ...prev, [option.name]: value }))}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedOptions[option.name] === value
                          ? "bg-primary text-white"
                          : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Quantity */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-3">Quantity</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-border rounded-full">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted rounded-l-full transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted rounded-r-full transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={handleAddToCart}
                disabled={isPending || !selectedVariant?.availableForSale}
                className="flex-1 rounded-full bg-primary py-3.5 text-base font-medium text-white hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Spinner size="sm" />
                    Adding...
                  </>
                ) : selectedVariant?.availableForSale ? (
                  "Add to Cart"
                ) : (
                  "Out of Stock"
                )}
              </button>
              <button className="w-12 h-12 flex items-center justify-center rounded-full border border-border hover:bg-muted transition-colors">
                <Heart className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Shipping Info */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-light-blue">
              <Truck className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium text-foreground">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders over $50</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
