import Image from "next/image"
import type { Metadata } from "next"
import { TopBanner } from "@/components/pet-haven/top-banner"
import { Header } from "@/components/pet-haven/header"
import { PrimaryNav } from "@/components/pet-haven/primary-nav"
import { SecondaryNav } from "@/components/pet-haven/secondary-nav"
import { Footer } from "@/components/pet-haven/footer"

export const metadata: Metadata = {
  title: "About Us | Giggling Paws & Pets",
  description:
    "GPP is a company that provides quality products and valuable information for Pet Parents to enhance the nurturing, health and safety of pets throughout the world.",
}

export default function AboutPage() {
  return (
    <main id="main-content" className="min-h-screen bg-background" role="main">
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
                About Us
              </h1>
              <p className="text-sm md:text-base text-muted-foreground">
                Quality products and valuable information for Pet Parents
                worldwide.
              </p>
            </div>
            <div
              className="absolute right-0 top-0 bottom-0 w-1/2"
              style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop"
                alt="Happy pets"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 400px"
              />
            </div>
          </div>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-12 md:mb-16">
            <p className="text-muted-foreground leading-relaxed mb-6">
              Giggling Paws & Pets is an e-commerce social networking company
              designed to provide quality products to enhance the nurturing,
              safety and loving care between Pets and Pet Parents throughout the
              world. The company website and social media pages will allow users
              to gain valuable information to provide quality of care and
              improved health and safety of pets. We support pet shelters and
              the adoption of pets. Follow us on our social media pages.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Giggling Paws & Pets provide pet owners with a unique experience
              to access valuable information that fosters the safe and healthy
              caring of pets for life long enjoyable experiences.
            </p>
            <blockquote className="border-l-4 border-primary pl-6 py-2 my-8 text-lg font-medium text-foreground italic">
              &ldquo;GPP is a company that provides quality products and
              valuable information for Pet Parents to enhance the nurturing,
              health and safety of pets throughout the world.&rdquo;
            </blockquote>
            <p className="text-muted-foreground leading-relaxed">
              Giggling Paws and Pets is a supporter of Adoption, Rescue and
              Shelters through advocacy and annual donations to these care
              facilities. The ASPCA estimates that 5–7 million animals enter
              shelters each year, while the American Humane Association puts the
              figure at approximately 8 million. Each year, about 3.7 million
              animals are euthanized. Approximately 3.2 million shelter animals
              are adopted each year—1.6 million dogs and 1.2 million cats.
              Giggling Paws and Pets supports Adoption, Rescue and Shelters
              through advocacy and annual donations. Join us—your donations will
              help support animal care.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
