import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { PrimaryNav } from "@/components/pet-haven/primary-nav"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { Footer } from "@/components/pet-haven/footer"
import { ShopifyCatSupplies } from "@/components/pet-haven/shopify-cat-supplies"

export default function ShopCatsPage() {
  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <Header />
      <PrimaryNav />
      <SecondaryNav />
      <ShopifyCatSupplies />
      <Footer />
    </main>
  )
}
