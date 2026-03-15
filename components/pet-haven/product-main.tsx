"use client"

import { useState } from "react"
import { Heart } from "lucide-react"

const colors = ["Festive Red", "Evergreen", "Snowflake Blue"]
const sizes = ["XS", "S", "M", "L"]

export function ProductMain() {
  const [selectedColor, setSelectedColor] = useState("Festive Red")
  const [selectedSize, setSelectedSize] = useState("S")
  const [quantity, setQuantity] = useState(1)
  const [activeThumb, setActiveThumb] = useState(0)

  return (
    <main className="bg-card py-16">
      <div className="mx-auto max-w-[1232px] px-4 md:px-12 lg:px-20">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-gray-text">
          <a href="/" className="hover:text-foreground">Home</a>
          <span>/</span>
          <a href="#" className="hover:text-foreground">Cat</a>
          <span>/</span>
          <a href="#" className="hover:text-foreground">Apparel</a>
          <span>/</span>
          <span className="font-medium text-foreground">Ugly Christmas Meow Sweater</span>
        </nav>

        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-light-blue">
              <span className="text-[100px]">🧶</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`aspect-square rounded-xl bg-[#f5f5f5] transition-all ${
                    activeThumb === i ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-border"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6 lg:sticky lg:top-8 lg:h-fit">
            <div className="flex items-center gap-2 text-[13px] font-medium text-primary">
              <span className="h-2 w-2 rounded-full bg-primary" />
              Bestseller
            </div>

            <h1 className="text-[2.8rem] font-extrabold leading-[1.1] tracking-[-0.04em] text-foreground">
              Ugly Christmas Meow Sweater
            </h1>

            <div className="flex items-center gap-2">
              <span className="text-lg text-amber-500">★★★★★</span>
              <span className="text-sm text-gray-text">(124 Reviews)</span>
            </div>

            <div className="text-[2.5rem] font-extrabold tracking-[-0.04em]">$55.00</div>

            <p className="text-base leading-relaxed text-gray-text">
              A festive, cozy knit sweater featuring a holiday-ready pattern. Perfect for seasonal photoshoots and keeping your feline friend warm during the winter months.
            </p>

            <div className="my-4 h-px w-full bg-border" />

            {/* Color Selector */}
            <div className="flex flex-col gap-3">
              <div className="text-sm font-bold text-foreground">Select Color</div>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`rounded-full border px-4 py-2 text-sm transition-all ${
                      selectedColor === color
                        ? "border-primary bg-[#f0f7fb] font-semibold text-primary"
                        : "border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="flex flex-col gap-3">
              <div className="text-sm font-bold text-foreground">Select Size</div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-4 py-2 text-sm transition-all ${
                      selectedSize === size
                        ? "border-primary bg-[#f0f7fb] font-semibold text-primary"
                        : "border-border text-foreground hover:border-primary/50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex flex-col gap-3">
              <div className="text-sm font-bold text-foreground">Quantity</div>
              <div className="flex w-fit items-center overflow-hidden rounded-full border border-border">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2.5 text-lg font-semibold transition-colors hover:bg-muted"
                >
                  -
                </button>
                <span className="px-4 text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2.5 text-lg font-semibold transition-colors hover:bg-muted"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-3 flex gap-3">
              <button className="flex-1 rounded-full bg-primary px-6 py-[18px] text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover">
                Add to Cart
              </button>
              <button className="rounded-full border border-foreground px-[18px] py-[18px] transition-colors hover:bg-foreground hover:text-card">
                <Heart className="h-5 w-5" />
              </button>
            </div>

            {/* Stock Info */}
            <div className="mt-4 flex gap-6">
              <div className="flex items-center gap-2 text-[13px] font-medium">
                <span className="text-lg">✅</span> In Stock
              </div>
              <div className="flex items-center gap-2 text-[13px] font-medium">
                <span className="text-lg">🚚</span> Ships in 24h
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
