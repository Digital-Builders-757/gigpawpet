"use client"

import Image from "next/image"
import { Instagram, Facebook } from "lucide-react"
import Link from "next/link"

const tiktokVideos = [
  {
    id: "1",
    videoId: "7576981301400456478",
    title: "Cute pet moments"
  },
  {
    id: "2", 
    videoId: "7584161198321569054",
    title: "Pet playtime"
  },
  {
    id: "3",
    videoId: "7576981301400456478",
    title: "Happy pets"
  }
]

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="currentColor" 
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  )
}

export function SocialVideos() {
  return (
    <section className="w-full bg-white py-12 md:py-20" aria-labelledby="social-heading">
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
        {/* Header Card - same format as Cat section */}
        <div className="relative rounded-2xl md:rounded-3xl bg-card overflow-hidden mb-6 md:mb-8 min-h-[160px] md:min-h-[200px] flex items-center shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="relative z-10 p-6 md:p-12 max-w-[60%] md:max-w-md">
            <h2 id="social-heading" className="text-2xl md:text-4xl font-extrabold text-foreground mb-2 md:mb-4">
              Follow Us
            </h2>
            <p className="text-sm md:text-base text-muted-foreground mb-4">
              Watch our latest pet videos and adorable moments
            </p>
            <div className="flex items-center gap-2 md:gap-3">
              <Link
                href="https://www.instagram.com/gigglingpawsandpets_/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary text-white hover:bg-primary-hover transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link
                href="https://www.facebook.com/GigglingPaws/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary text-white hover:bg-primary-hover transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
              <Link
                href="https://www.tiktok.com/@gigglingpawsandpets"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-full bg-primary text-white hover:bg-primary-hover transition-colors"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </div>
          </div>

          {/* Decorative polygon with image */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2"
            style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=400&fit=crop"
              alt="Cute pets"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 400px"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {tiktokVideos.map((video) => (
            <div 
              key={video.id}
              className="relative bg-white rounded-xl overflow-hidden flex justify-center"
            >
              <div className="w-full max-w-[280px] mx-auto aspect-[9/16]">
                <iframe
                  src={`https://www.tiktok.com/player/v1/${video.videoId}?controls=0&progress_bar=0&volume_control=0&fullscreen_button=0&timestamp=0&music_info=0&description=0&closed_caption=0&rel=0`}
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
