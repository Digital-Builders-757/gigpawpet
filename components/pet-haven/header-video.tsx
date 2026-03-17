"use client"

import { useEffect, useRef } from "react"

interface HeaderVideoProps {
  src: string
  ariaLabel: string
}

export function HeaderVideo({ src, ariaLabel }: HeaderVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.play().catch(() => {})
    }
  }, [src])

  return (
    <div className="absolute inset-0">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        aria-label={ariaLabel}
      />
      <div className="absolute inset-0 z-[2]" style={{ backgroundColor: "rgba(230, 244, 252, 0.6)" }} />
    </div>
  )
}
