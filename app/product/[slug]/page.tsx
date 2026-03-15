import { getProductByHandle, getProducts } from "@/lib/actions"
import { notFound } from "next/navigation"
import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { PromoBanner } from "@/components/pet-haven/promo-banner"
import { ShopifyProductMain } from "@/components/pet-haven/shopify-product-main"
import { ProductDetails } from "@/components/pet-haven/product-details"
import { ShopifyRelatedProducts } from "@/components/pet-haven/shopify-related-products"
import { Footer } from "@/components/pet-haven/footer"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params

  let product: Awaited<ReturnType<typeof getProductByHandle>> = null
  let relatedProducts: Awaited<ReturnType<typeof getProducts>> = []

  try {
    const [productResult, allProducts] = await Promise.all([
      getProductByHandle(slug),
      getProducts({ first: 10 }),
    ])
    product = productResult
    if (product) {
      relatedProducts = allProducts.filter((p) => p.id !== product!.id).slice(0, 4)
    }
  } catch (error) {
    console.error("Error fetching product:", error)
  }
  
  // If no product found from Shopify, show a fallback demo product
  if (!product) {
    return (
      <main id="main-content" className="min-h-screen bg-muted" role="main">
        <TopBanner />
        <Header />
        <SecondaryNav />
        <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground mb-8">
            Connect your Shopify store to display products, or the product "{slug}" doesn't exist.
          </p>
          <a href="/" className="rounded-full bg-primary px-6 py-3 text-white font-medium hover:bg-primary-hover transition-colors" aria-label="Return to homepage">
            Back to Home
          </a>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main id="main-content" className="min-h-screen bg-muted" role="main">
      <TopBanner />
      <Header />
      <SecondaryNav />
      <PromoBanner />
      <ShopifyProductMain product={product} />
      <ProductDetails />
      <ShopifyRelatedProducts products={relatedProducts} />
      <Footer />
    </main>
  )
}
