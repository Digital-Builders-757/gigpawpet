"use client"

import Image from "next/image"
import Link from "next/link"

interface ProductCardProps {
  name: string
  price: number
  image: string
  slug?: string
}

export function ProductCard({ name, price, image, slug = "ugly-christmas-meow-sweater" }: ProductCardProps) {
  return (
    <div className="group bg-card rounded-2xl p-3 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-200">
      <Link href={`/product/${slug}`}>
        <div className="aspect-square relative rounded-lg overflow-hidden mb-3">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
      </Link>
      
      <p className="text-xl font-extrabold text-foreground mb-2">
        ${price.toFixed(2)}
      </p>
      
      <div className="w-full h-px bg-border mb-2" />
      
      <Link href={`/product/${slug}`}>
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3 min-h-[2.5rem] hover:text-foreground transition-colors">
          {name}
        </p>
      </Link>
      
      <button className="w-full rounded-full bg-primary py-2.5 text-sm font-medium text-white hover:bg-primary-hover transition-colors">
        Add to cart
      </button>
    </div>
  )
}
