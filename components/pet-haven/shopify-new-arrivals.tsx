import Image from "next/image"
import { ShopifyProductCard } from "./shopify-product-card"
import { WaveDivider } from "./wave-divider"
import type { Product } from "@/types/shopify"

interface ShopifyNewArrivalsProps {
  products: Product[]
}

const LIGHT_BLUE = "#e8f4fc"

export function ShopifyNewArrivals({ products }: ShopifyNewArrivalsProps) {
  return (
    <section
      className="relative w-full overflow-hidden py-12 md:py-20 pt-24 md:pt-28 pb-24 md:pb-28"
      style={{ backgroundColor: "#f9f9fa" }}
      aria-labelledby="new-arrivals-heading"
    >
      <WaveDivider fill="#ffffff" variant="top" shapeId="newArrivalsTop" direction="right" duration={6} />
      <WaveDivider fill={LIGHT_BLUE} variant="bottom" shapeId="transitionPeach" direction="left" duration={7} />
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20 relative z-10">
        {/* Header Card - same format as Cat/Dog/Pet News sections */}
        <div className="relative rounded-2xl md:rounded-3xl bg-card overflow-hidden mb-6 md:mb-8 min-h-[160px] md:min-h-[200px] flex items-center shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="relative z-10 p-6 md:p-12 max-w-[60%] md:max-w-md">
            <h2 id="new-arrivals-heading" className="text-2xl md:text-4xl font-extrabold text-foreground mb-2 md:mb-4">
              New Arrivals
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Fresh products for your furry friends. Discover the latest additions to our collection.
            </p>
          </div>

          {/* Decorative polygon with image */}
          <div
            className="absolute right-0 top-0 bottom-0 w-1/2"
            style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop"
              alt="Happy pets"
              fill
              sizes="(max-width: 768px) 50vw, 400px"
              className="object-cover"
            />
          </div>
        </div>

        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((product, index) => (
              <ShopifyProductCard key={product.id} product={product} priority={index < 3} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p>No products available. Connect your Shopify store to display products.</p>
          </div>
        )}
      </div>
    </section>
  )
}
