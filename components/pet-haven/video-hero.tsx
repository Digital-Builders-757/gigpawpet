"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { WaveDivider } from "./wave-divider"

const HeroParticles = dynamic(
  () => import("./hero-particles").then((m) => ({ default: m.HeroParticles })),
  { ssr: false }
)

const HERO_VIDEOS = ["/hero-pets.mp4", "/hero-cat-shelf.mp4"]

export function VideoHero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    const playNext = () => {
      setActiveIndex((prev) => (prev + 1) % HERO_VIDEOS.length)
    }

    const videos = videoRefs.current
    videos.forEach((video) => {
      if (video) video.addEventListener("ended", playNext)
    })
    return () => {
      videos.forEach((video) => {
        if (video) video.removeEventListener("ended", playNext)
      })
    }
  }, [])

  useEffect(() => {
    const nextVideo = videoRefs.current[activeIndex]
    if (nextVideo) {
      nextVideo.currentTime = 0
      nextVideo.play()
    }
  }, [activeIndex])

  return (
    <section
      className="relative w-full h-[350px] sm:h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Hero Videos - play sequentially, both preloaded */}
      {HERO_VIDEOS.map((src, i) => (
        <video
          key={src}
          ref={(el) => { videoRefs.current[i] = el }}
          autoPlay={i === 0}
          muted
          playsInline
          preload="auto"
          loop={false}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: activeIndex === i ? 1 : 0, zIndex: activeIndex === i ? 1 : 0 }}
          aria-hidden="true"
          src={src}
        />
      ))}

      {/* Black tint overlay at 60% */}
      <div className="absolute inset-0 z-[2] bg-black/60" />

      {/* Wave at bottom - mirrors New Arrivals top for seamless transition */}
      <WaveDivider fill="#ffffff" variant="bottom" shapeId="newArrivalsTop" direction="left" duration={6} className="z-[3]" />

      {/* Floating light particles animation */}
      <HeroParticles />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <h2
          id="hero-heading"
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-3 md:mb-4 text-balance drop-shadow-lg"
        >
          Happy Pets, Happy Life
        </h2>
        <p className="text-sm sm:text-base md:text-xl text-white/95 max-w-2xl mb-6 md:mb-8 px-4 drop-shadow-md">
          Watch our furry friends play and discover products that bring joy to
          their everyday adventures.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0">
          <Link
            href="/collections/dogs"
            className="rounded-full bg-primary px-6 md:px-8 py-2.5 md:py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors text-center"
            aria-label="Shop dog products"
          >
            Shop Dog Products
          </Link>
          <Link
            href="/collections/cats"
            className="rounded-full bg-white px-6 md:px-8 py-2.5 md:py-3 text-sm font-medium text-primary hover:bg-white/90 transition-colors text-center"
            aria-label="Shop cat products"
          >
            Shop Cat Products
          </Link>
        </div>
      </div>
    </section>
  )
}
