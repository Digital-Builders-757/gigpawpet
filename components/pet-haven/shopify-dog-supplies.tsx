import Link from "next/link"
import { ShopifyProductCard } from "./shopify-product-card"
import { WaveDivider } from "./wave-divider"
import { PawPattern } from "./paw-pattern"
import { HeaderVideo } from "./header-video"
import type { Product } from "@/types/shopify"

interface ShopifyDogSuppliesProps {
  products: Product[]
}

const PRIMARY_BLUE = "#2e86b5"
const LIGHT_BLUE = "#e8f4fc"

export function ShopifyDogSupplies({ products }: ShopifyDogSuppliesProps) {
  return (
    <section
      className="relative w-full py-12 md:py-20 pt-24 md:pt-28 pb-24 md:pb-28 overflow-hidden"
      style={{ backgroundColor: PRIMARY_BLUE }}
      aria-labelledby="dog-supplies-heading"
    >
      <PawPattern color={LIGHT_BLUE} />
      <WaveDivider fill={PRIMARY_BLUE} variant="top" shapeId="dogSuppliesTop" direction="right" duration={6} />
      <WaveDivider fill="#ffffff" variant="bottom" shapeId="transitionCream" direction="left" duration={7} />
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20 relative z-10">
        {/* Header Card */}
        <div className="relative rounded-2xl md:rounded-3xl bg-card overflow-hidden mb-6 md:mb-8 min-h-[160px] md:min-h-[200px] flex items-center shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="relative z-10 p-6 md:p-12 max-w-[60%] md:max-w-md">
            <h2 id="dog-supplies-heading" className="text-2xl md:text-4xl font-extrabold text-foreground mb-2 md:mb-4">
              Dog Supplies
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Premium products for your loyal companion.
            </p>
          </div>
          
          {/* Decorative polygon with dog video */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-1/2 min-w-0 min-h-[160px]"
            style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          >
            <HeaderVideo src="/dog-header.mp4" ariaLabel="Dogs playing tug-of-war" />
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {products.map((product) => (
              <ShopifyProductCard key={product.id} product={product} ctaBackgroundColor={LIGHT_BLUE} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No dog products available. Add a "dogs" collection in your Shopify store.</p>
          </div>
        )}

        <div className="mt-[100px] text-center">
          <Link
            href="/collections/dogs"
            className="inline-flex items-center rounded-full px-6 py-3 text-sm font-medium text-primary transition-colors hover:opacity-90"
            style={{ backgroundColor: "#e8f4fc" }}
            aria-label="View all dog supplies"
          >
            Shop All Dog Supplies
          </Link>
        </div>
      </div>
    </section>
  )
}
