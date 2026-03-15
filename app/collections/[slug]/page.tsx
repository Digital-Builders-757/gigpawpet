import Image from "next/image"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { PrimaryNav } from "@/components/pet-haven/primary-nav"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { PromoBanner } from "@/components/pet-haven/promo-banner"
import { Footer } from "@/components/pet-haven/footer"
import { ShopifyProductCard } from "@/components/pet-haven/shopify-product-card"
import { getCollectionProducts, getProducts } from "@/lib/actions"

const COLLECTION_CONFIG: Record<
  string,
  { title: string; description: string; image: string; alt: string }
> = {
  cats: {
    title: "Cat Supplies",
    description: "Everything your feline friend needs for a happy, healthy life.",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop",
    alt: "Cute cat",
  },
  dogs: {
    title: "Dog Supplies",
    description: "Premium products for your loyal companion.",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
    alt: "Happy dog",
  },
  seasonal: {
    title: "Seasonal Products",
    description: "Shop for your seasonal needs. Holiday and special occasion pet apparel and accessories.",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
    alt: "Seasonal pet products",
  },
  "seasonal-products": {
    title: "Seasonal Products",
    description: "Shop for your seasonal needs. Holiday and special occasion pet apparel and accessories.",
    image:
      "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&h=400&fit=crop",
    alt: "Seasonal pet products",
  },
  all: {
    title: "All Products",
    description: "Browse our full collection of pet apparel, accessories, and supplies.",
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop",
    alt: "Pet products",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const config = COLLECTION_CONFIG[slug]
  if (!config) return {}
  return {
    title: `${config.title} | Giggling Paws & Pets`,
    description: config.description,
  }
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  if (!COLLECTION_CONFIG[slug]) {
    notFound()
  }

  const config = COLLECTION_CONFIG[slug]
  let products: Awaited<ReturnType<typeof getCollectionProducts>> = []

  const isAllProducts = slug === "all"
  const collectionHandles =
    slug === "seasonal" ? ["seasonal", "seasonal-products"] : isAllProducts ? [] : [slug]
  try {
    if (isAllProducts) {
      products = await getProducts({ first: 100 })
    } else {
      for (const handle of collectionHandles) {
        products = await getCollectionProducts(handle, { first: 100 })
        if (products.length > 0) break
      }
      if (products.length === 0) {
        products = await getProducts({ first: 100 })
      }
    }
  } catch (error) {
    console.error(`Error fetching ${slug} collection products:`, error)
  }

  return (
    <main id="main-content" className="min-h-screen bg-background" role="main">
      <TopBanner />
      <Header />
      <PrimaryNav />
      <SecondaryNav />
      <PromoBanner />

      <section className="w-full bg-background py-8 md:py-12">
        <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
          {/* Header Card */}
          <div className="relative rounded-2xl md:rounded-3xl bg-card overflow-hidden mb-8 md:mb-10 min-h-[160px] md:min-h-[200px] flex items-center">
            <div className="relative z-10 p-6 md:p-12 max-w-[60%] md:max-w-md">
              <h1 className="text-2xl md:text-4xl font-extrabold text-foreground mb-2 md:mb-4">
                {config.title}
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                {config.description}
              </p>
            </div>

            <div
              className="absolute right-0 top-0 bottom-0 w-1/2"
              style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            >
              <Image
                src={config.image}
                alt={config.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 400px"
              />
            </div>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product) => (
                <ShopifyProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-muted-foreground">
              <p>
                No products available. Add a &quot;{slug}&quot; collection in
                your Shopify store.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
