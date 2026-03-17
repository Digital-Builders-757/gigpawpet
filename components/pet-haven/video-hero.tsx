"use client"

import { useRef, useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { WaveDivider } from "./wave-divider"

const HeroParticles = dynamic(
  () => import("./hero-particles").then((m) => ({ default: m.HeroParticles })),
  { ssr: false }
)

const HERO_VIDEOS = ["/hero-pets.mp4", "/hero-cat-shelf.mp4"]

export function VideoHero({ className = "" }: { className?: string }) {
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
      className={`relative w-full overflow-hidden ${className}`}
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

      {/* Overlay */}
      <div className="absolute inset-0 z-[2]" style={{ backgroundColor: "rgba(230, 244, 252, 0.6)" }} />

      {/* Wave at bottom - mirrors New Arrivals top for seamless transition */}
      <WaveDivider fill="#f9f9fa" variant="bottom" shapeId="newArrivalsTop" direction="left" duration={6} className="z-[3]" />

      {/* Floating light particles animation */}
      <HeroParticles />
    </section>
  )
}
