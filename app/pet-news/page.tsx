import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { PrimaryNav } from "@/components/pet-haven/primary-nav"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { Footer } from "@/components/pet-haven/footer"
import { ShopifyProductCard } from "@/components/pet-haven/shopify-product-card"
import { getCollectionProducts, getProducts } from "@/lib/actions"

export const metadata: Metadata = {
  title: "Pet News | Giggling Paws & Pets",
  description:
    "Latest pet care tips, industry trends, and valuable information for Pet Parents.",
}

const BLOG_POSTS = [
  {
    title: "Hot Pet Trends",
    author: "James (J.R.) Locke",
    date: "December 25, 2021",
    excerpt:
      "Learn what is driving the growth of the pet industry and why it is one of the fastest growing industries in the U.S. today. According to industry trends and projections, the pet business will continue to boom unabated in the future.",
    url: "https://gigglingpawsandpets.com/blogs/news/hot-pet-trends",
  },
  {
    title: "An In Depth Look At Siamese Cats",
    author: "Isiaha Stephens",
    date: "November 03, 2021",
    excerpt:
      "The exotic and somewhat mysterious Siamese cat hails from the country of Thailand. They had always been a popular breed of cats, some even residing in royal palaces.",
    url: "https://gigglingpawsandpets.com/blogs/news/an-in-depth-look-at-siamese-cats",
  },
  {
    title: "PET CARE",
    author: "GigglePandP Admin",
    date: "September 20, 2021",
    excerpt:
      "Vaccinations need to be undertaken always by the pet owners and the dogs need to be vaccinated at the appropriate time. This helps to improve the resistance of the animal against some specific diseases.",
    url: "https://gigglingpawsandpets.com/blogs/news/pet-care",
  },
]

export default async function PetNewsPage() {
  let products: Awaited<ReturnType<typeof getProducts>> = []
  try {
    products = await getCollectionProducts("seasonal-products", { first: 100 })
    if (products.length === 0) {
      products = await getCollectionProducts("seasonal", { first: 100 })
    }
    if (products.length === 0) {
      products = await getProducts({ first: 100 })
    }
  } catch (error) {
    console.error("Error fetching products:", error)
  }

  return (
    <main className="min-h-screen bg-background">
      <TopBanner />
      <Header />
      <PrimaryNav />
      <SecondaryNav />

      <section className="w-full bg-background py-8 md:py-12">
        <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
          {/* Header Card */}
          <div className="relative rounded-2xl md:rounded-3xl bg-card overflow-hidden mb-8 md:mb-10 min-h-[160px] md:min-h-[200px] flex items-center">
            <div className="relative z-10 p-6 md:p-12 max-w-[60%] md:max-w-md">
              <h1 className="text-2xl md:text-4xl font-extrabold text-foreground mb-2 md:mb-4">
                Pet News
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Tips, trends, and valuable information for Pet Parents.
              </p>
            </div>
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2"
              style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&h=400&fit=crop"
                alt="Pet reading"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 400px"
              />
            </div>
          </div>

          {/* Blog Posts */}
          <div className="mb-12 md:mb-16">
            <h2 className="text-xl md:text-2xl font-extrabold text-foreground mb-6">
              Latest Posts
            </h2>
            <div className="grid gap-6 md:gap-8">
              {BLOG_POSTS.map((post) => (
                <article
                  key={post.url}
                  className="rounded-xl bg-card p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-border"
                >
                  <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    By {post.author} on {post.date}
                  </p>
                  <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                  <Link
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary font-medium hover:underline"
                  >
                    Read more →
                  </Link>
                </article>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="https://gigglingpawsandpets.com/blogs/news"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                View all posts on our blog →
              </Link>
            </div>
          </div>

          {/* Products Grid */}
          {products.length > 0 && (
            <>
              <h2 className="text-xl md:text-2xl font-extrabold text-foreground mb-6">
                Seasonal Products
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {products.slice(0, 10).map((product) => (
                  <ShopifyProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="mt-8 text-center">
                <Link
                  href="/collections/seasonal"
                  className="text-primary font-medium hover:underline"
                >
                  View all seasonal products →
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
