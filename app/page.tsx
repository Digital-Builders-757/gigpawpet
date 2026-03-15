import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { PrimaryNav } from "@/components/pet-haven/primary-nav"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { PromoBanner } from "@/components/pet-haven/promo-banner"
import { VideoHero } from "@/components/pet-haven/video-hero"
import { ShopifyNewArrivals } from "@/components/pet-haven/shopify-new-arrivals"
import { ShopifyCatSupplies } from "@/components/pet-haven/shopify-cat-supplies"
import { ShopifyDogSupplies } from "@/components/pet-haven/shopify-dog-supplies"
import { SocialVideos } from "@/components/pet-haven/social-videos"
import { BlogSection } from "@/components/pet-haven/blog-section"
import { EmailCapture } from "@/components/pet-haven/email-capture"
import { Footer } from "@/components/pet-haven/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <Header />
      <PrimaryNav />
      <SecondaryNav />
      <PromoBanner />
      <VideoHero />
      <ShopifyNewArrivals />
      <ShopifyCatSupplies />
      <SocialVideos />
      <ShopifyDogSupplies />
      <BlogSection />
      <EmailCapture />
      <Footer />
    </main>
  )
}
