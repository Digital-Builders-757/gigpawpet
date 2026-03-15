import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { PrimaryNav } from "@/components/pet-haven/primary-nav"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { PromoBanner } from "@/components/pet-haven/promo-banner"
import { Footer } from "@/components/pet-haven/footer"
import { ShopifyCatSupplies } from "@/components/pet-haven/shopify-cat-supplies"
import { getCollectionProducts, getProducts } from "@/lib/actions"

export default async function ShopCatsPage() {
  let products = await getCollectionProducts("cats", { first: 5 })
  if (products.length === 0) {
    products = (await getProducts({ first: 5 })).slice(0, 5)
  }

  return (
    <main id="main-content" className="min-h-screen bg-background" role="main">
      <TopBanner />
      <Header />
      <PrimaryNav />
      <SecondaryNav />
      <PromoBanner />
      <ShopifyCatSupplies products={products} />
      <Footer />
    </main>
  )
}
