"use client"

import Link from "next/link"

export function VideoHero() {
  return (
    <section className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/4825032/4825032-uhd_2560_1440_25fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 md:mb-4 text-balance">
          Happy Pets, Happy Life
        </h2>
        <p className="text-sm sm:text-base md:text-xl text-white/90 max-w-2xl mb-6 md:mb-8 px-4">
          Watch our furry friends play and discover products that bring joy to their everyday adventures.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Link
            href="/collections/dogs"
            className="rounded-full bg-primary px-6 md:px-8 py-2.5 md:py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors text-center"
          >
            Shop Dog Products
          </Link>
          <Link
            href="/collections/cats"
            className="rounded-full bg-white px-6 md:px-8 py-2.5 md:py-3 text-sm font-medium text-primary hover:bg-white/90 transition-colors text-center"
          >
            Shop Cat Products
          </Link>
        </div>
      </div>
    </section>
  )
}
