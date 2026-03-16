import dynamic from "next/dynamic"
import Link from "next/link"
import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { HeroAndPromoSection } from "@/components/pet-haven/hero-promo-section"
import { VideoHero } from "@/components/pet-haven/video-hero"
import { ShopifyNewArrivals } from "@/components/pet-haven/shopify-new-arrivals"
import { ShopifyCatSupplies } from "@/components/pet-haven/shopify-cat-supplies"
import { ShopifyDogSupplies } from "@/components/pet-haven/shopify-dog-supplies"
import { Footer } from "@/components/pet-haven/footer"
import { getNewArrivals, getCollectionProducts, getProducts } from "@/lib/actions"

const SocialVideos = dynamic(() =>
  import("@/components/pet-haven/social-videos").then((m) => ({ default: m.SocialVideos }))
)
const BlogSection = dynamic(() =>
  import("@/components/pet-haven/blog-section").then((m) => ({ default: m.BlogSection }))
)
const EmailCapture = dynamic(() =>
  import("@/components/pet-haven/email-capture").then((m) => ({ default: m.EmailCapture }))
)

export default async function Home() {
  let newArrivals: Awaited<ReturnType<typeof getNewArrivals>> = []
  let dogProducts: Awaited<ReturnType<typeof getCollectionProducts>> = []
  let catProducts: Awaited<ReturnType<typeof getCollectionProducts>> = []
  let fallbackProducts: Awaited<ReturnType<typeof getProducts>> = []

  try {
    ;[newArrivals, dogProducts, catProducts, fallbackProducts] = await Promise.all([
      getNewArrivals(5),
      getCollectionProducts("dogs", { first: 5 }),
      getCollectionProducts("cats", { first: 5 }),
      getProducts({ first: 5 }),
    ])
  } catch (error) {
    console.error("Error fetching homepage products:", error)
  }

  const dogItems = dogProducts.length > 0 ? dogProducts : fallbackProducts.slice(0, 5)
  const catItems = catProducts.length > 0 ? catProducts : fallbackProducts.slice(0, 5)

  return (
    <main id="main-content" className="min-h-screen bg-background" role="main">
      <HeroAndPromoSection>
        <div className="relative min-h-screen">
          <VideoHero className="absolute inset-0 z-0 min-h-screen" />
          <div className="absolute top-0 left-0 right-0 z-10 w-full">
            <TopBanner />
            <Header />
            <SecondaryNav />
          </div>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
            <div className="pointer-events-auto flex flex-col items-center translate-y-[70px]">
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
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full sm:w-auto px-4 sm:px-0 justify-center mt-[140px]">
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
          </div>
        </div>
      </HeroAndPromoSection>
      <ShopifyNewArrivals products={newArrivals} />
      <ShopifyCatSupplies products={catItems} />
      <SocialVideos />
      <ShopifyDogSupplies products={dogItems} />
      <BlogSection />
      <EmailCapture />
      <Footer />
    </main>
  )
}
