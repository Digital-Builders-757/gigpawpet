import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { PrimaryNav } from "@/components/pet-haven/primary-nav"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { Footer } from "@/components/pet-haven/footer"
import { ShopifyDogSupplies } from "@/components/pet-haven/shopify-dog-supplies"

export default function ShopDogsPage() {
  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <Header />
      <PrimaryNav />
      <SecondaryNav />
      <ShopifyDogSupplies />
      <Footer />
    </main>
  )
}
