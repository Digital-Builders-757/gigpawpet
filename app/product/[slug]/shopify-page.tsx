import { getProductByHandle, getProducts } from "@/lib/actions"
import { notFound } from "next/navigation"
import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { ShopifyProductMain } from "@/components/pet-haven/shopify-product-main"
import { ShopifyRelatedProducts } from "@/components/pet-haven/shopify-related-products"
import { Footer } from "@/components/pet-haven/footer"

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export default async function ShopifyProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductByHandle(slug)
  
  if (!product) {
    notFound()
  }

  // Get related products (same category or just recent products)
  const relatedProducts = await getProducts({ first: 4 })

  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <Header />
      <SecondaryNav />
      <ShopifyProductMain product={product} />
      <ShopifyRelatedProducts products={relatedProducts.filter(p => p.id !== product.id).slice(0, 4)} />
      <Footer />
    </main>
  )
}
