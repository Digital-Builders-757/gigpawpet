import Link from "next/link"

export function HeroText() {
  return (
    <section className="w-full bg-card py-12 md:py-20">
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.1] tracking-tight">
              <span className="block">Tell Your</span>
              <span className="block">Pet Tale</span>
            </h1>
            
            <div className="w-full h-px bg-border my-6" />
            
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              A company designed specifically to enhance the nurturing and loving care between Pets and Pet Parents throughout the world. Gain valuable information to provide quality of care and improved health and safety of pets. We support Adoption, Rescue and Shelters through advocacy and annual donations.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link 
                href="/shop"
                className="rounded-full bg-primary px-8 py-3 text-sm font-medium text-white hover:bg-primary-hover transition-colors"
              >
                Shop Now
              </Link>
              <Link 
                href="/deals"
                className="rounded-full border border-foreground px-8 py-3 text-sm font-medium text-foreground hover:bg-foreground hover:text-card transition-colors"
              >
                Browse Deals
              </Link>
            </div>
          </div>

          {/* Right Placeholder */}
          <div 
            className="aspect-[4/3] w-full rounded-3xl"
            style={{ background: "linear-gradient(135deg, #e8f4fc 0%, #d1e9f9 100%)" }}
          />
        </div>
      </div>
    </section>
  )
}
