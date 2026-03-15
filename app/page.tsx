import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { PrimaryNav } from "@/components/pet-haven/primary-nav"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { PromoBanner } from "@/components/pet-haven/promo-banner"
import { VideoHero } from "@/components/pet-haven/video-hero"
// import { HeroSection } from "@/components/pet-haven/hero-section"
import { ShopifyNewArrivals } from "@/components/pet-haven/shopify-new-arrivals"
import { ShopifyCatSupplies } from "@/components/pet-haven/shopify-cat-supplies"
import { ShopifyDogSupplies } from "@/components/pet-haven/shopify-dog-supplies"
import { SocialVideos } from "@/components/pet-haven/social-videos"
import { BlogSection } from "@/components/pet-haven/blog-section"
import { EmailCapture } from "@/components/pet-haven/email-capture"
import { Footer } from "@/components/pet-haven/footer"
import { getProducts } from "@/lib/actions"
import { formatPrice } from "@/lib/normalize"

export default async function Home() {
  let products: Awaited<ReturnType<typeof getProducts>> = []
  let productsError: string | null = null
  try {
    products = await getProducts({ first: 4 })
  } catch (err) {
    productsError = err instanceof Error ? err.message : 'Failed to fetch products'
    console.error('getProducts error:', err)
  }
  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <Header />
      <PrimaryNav />
      <SecondaryNav />
      <PromoBanner />
      <VideoHero />
      {/* Shopify getProducts test */}
      <section className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20 py-8 border-b border-border">
        <h2 className="text-xl font-bold text-foreground mb-4">Shopify Test (first 4 products)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <div key={product.id} className="p-4 rounded-lg bg-card border border-border">
              <p className="font-medium text-foreground">{product.title}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {formatPrice(product.price, product.currencyCode)}
              </p>
            </div>
          ))}
        </div>
        {productsError && (
          <p className="text-destructive text-sm mb-2">{productsError}</p>
        )}
        {products.length === 0 && !productsError && (
          <p className="text-muted-foreground">
            No products found. Ensure products are published to your Storefront sales channel. Visit{' '}
            <a href="/api/shopify-test" className="underline text-primary" target="_blank" rel="noopener noreferrer">
              /api/shopify-test
            </a>{' '}
            to debug.
          </p>
        )}
      </section>
      {/* <HeroSection /> */}
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
