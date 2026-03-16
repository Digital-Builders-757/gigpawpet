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
      className="relative w-full bg-white py-12 md:py-20 pt-24 md:pt-28 pb-24 md:pb-28"
      aria-labelledby="new-arrivals-heading"
    >
      <WaveDivider fill="#ffffff" variant="top" shapeId="newArrivalsTop" direction="right" duration={6} />
      <WaveDivider fill={LIGHT_BLUE} variant="bottom" shapeId="transitionPeach" direction="left" duration={7} />
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20 relative z-10">
        <h2 id="new-arrivals-heading" className="text-3xl md:text-4xl font-extrabold text-foreground mb-8">
          New Arrivals
        </h2>
        
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
