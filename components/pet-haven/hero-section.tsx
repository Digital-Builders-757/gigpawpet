"use client"

import Image from "next/image"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="w-full bg-card">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Dog Image Card */}
        <Link href="/collections/dogs" className="relative h-[280px] sm:h-[350px] md:h-[450px] w-full overflow-hidden group cursor-pointer">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-2-UNVgNfKdaAF7etqOG9d3ipm5W5YG4a.png"
            alt="Golden retriever dog sitting on wooden floor"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/70" />
          <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center">
            <span className="rounded-full bg-primary px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-medium text-white group-hover:bg-primary-hover transition-all duration-300 group-hover:scale-105">
              Shop Dog Products
            </span>
          </div>
        </Link>

        {/* Cat Image Card */}
        <Link href="/collections/cats" className="relative h-[280px] sm:h-[350px] md:h-[450px] w-full overflow-hidden group cursor-pointer">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/img-1-ziUoJb0aJEY38da3aIW4Fv6wUAFLPj.png"
            alt="Fluffy brown tabby cat close-up"
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/70" />
          <div className="absolute bottom-6 md:bottom-8 left-0 right-0 flex justify-center">
            <span className="rounded-full bg-primary px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm font-medium text-white group-hover:bg-primary-hover transition-all duration-300 group-hover:scale-105">
              Shop Cat Products
            </span>
          </div>
        </Link>
      </div>
    </section>
  )
}
