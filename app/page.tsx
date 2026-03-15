import dynamic from "next/dynamic"
import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { PrimaryNav } from "@/components/pet-haven/primary-nav"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { PromoBanner } from "@/components/pet-haven/promo-banner"
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
      <TopBanner />
      <Header />
      <PrimaryNav />
      <SecondaryNav />
      <PromoBanner />
      <VideoHero />
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
