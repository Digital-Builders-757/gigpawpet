"use client"

import { useState } from "react"
import Image from "next/image"
import { Search, Menu, X } from "lucide-react"
import { useCart } from "@/context/CartContext"

export function Header() {
  const { cart, openCart } = useCart()
  const totalQuantity = cart?.totalQuantity ?? 0
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)

  return (
    <header className="w-full bg-white border-b border-border py-4 md:py-5" style={{ color: "#2e86b5" }}>
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Logo */}
          <a href="/" className="flex-shrink-0" aria-label="Giggling Paws & Pets - Home">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-mekM3qgTHVDTF5XWozevtbVlHDMe6i.png"
              alt="Giggling Paws & Pets"
              width={48}
              height={48}
              priority
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center max-w-[400px] flex-1 mx-8" role="search">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full rounded-full border bg-card py-2.5 pl-11 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#2e86b5]"
                style={{ borderColor: "#2e86b5" }}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Mobile Search Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <button className="hidden md:block text-sm font-medium hover:opacity-80 transition-opacity" aria-label="Sign in">
              Sign In
            </button>
            <button
              onClick={openCart}
              className="rounded-full border px-3 md:px-4 py-2 text-xs md:text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ borderColor: "#2e86b5" }}
              aria-label={`Open cart, ${totalQuantity} items`}
            >
              Cart ({totalQuantity})
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {mobileSearchOpen && (
          <div className="md:hidden mt-4" role="search">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search products..."
                aria-label="Search products"
                className="w-full rounded-full border bg-card py-2.5 pl-11 pr-4 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#2e86b5]"
                style={{ borderColor: "#2e86b5" }}
                autoFocus
              />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav id="mobile-menu" className="md:hidden mt-3 py-3 border-t border-border" aria-label="Main navigation">
            <ul className="flex flex-col gap-2">
              <li><a href="#" className="block text-sm font-medium hover:font-bold transition-colors">Seasonal</a></li>
              <li><a href="#" className="block text-sm font-medium hover:font-bold transition-colors">Dog</a></li>
              <li><a href="#" className="block text-sm font-medium hover:font-bold transition-colors">Cat</a></li>
              <li><a href="#" className="block text-sm font-medium hover:font-bold transition-colors">Pet News</a></li>
              <li><a href="/collections/all" className="block text-sm font-medium hover:font-bold transition-colors">Shop</a></li>
              <li className="pt-2 border-t border-border">
                <a href="#" className="block text-sm font-medium hover:font-bold transition-colors">Sign In</a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}
