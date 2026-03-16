"use client"

import { WaveDivider } from "./wave-divider"

const FOOTER_BLUE = "#2e86b5"

export function EmailCapture() {
  return (
    <section className="relative w-full py-12 md:py-20 pt-24 md:pt-28 pb-32 md:pb-40" style={{ backgroundColor: "#e6f4fc" }}>
      <WaveDivider fill="#e6f4fc" variant="top" shapeId="transitionSage" direction="left" duration={6} />
      <WaveDivider fill={FOOTER_BLUE} variant="bottom" shapeId="newsletterBottom" direction="left" duration={9} />
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20 text-center relative z-10">
        <h2 className="text-2xl md:text-[2rem] font-extrabold tracking-[-0.03em] mb-3 md:mb-4 text-foreground">
          Subscribe To Our Newsletter
        </h2>
        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8 max-w-md mx-auto">
          Sign up for exclusive updates, new arrivals & insider-only discounts.
        </p>
        
        <form className="flex flex-col sm:flex-row items-center max-w-md mx-auto bg-white rounded-2xl sm:rounded-full p-2 sm:p-1.5 gap-2 sm:gap-0" aria-label="Newsletter signup">
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Enter your email"
            aria-label="Email address for newsletter"
            className="flex-1 w-full sm:w-auto px-4 py-2.5 sm:py-2 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none text-sm text-center sm:text-left"
          />
          <button
            type="submit"
            className="w-full sm:w-auto rounded-full bg-navy px-6 py-2.5 text-sm font-medium text-white hover:bg-navy/90 transition-colors"
            aria-label="Subscribe to newsletter"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  )
}
