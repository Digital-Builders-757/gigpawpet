import Image from "next/image"
import { ShopifyProductCard } from "./shopify-product-card"
import type { Product } from "@/types/shopify"

interface ShopifyDogSuppliesProps {
  products: Product[]
}

export function ShopifyDogSupplies({ products }: ShopifyDogSuppliesProps) {
  return (
    <section className="w-full py-12 md:py-20" style={{ backgroundColor: '#e8f4fc' }} aria-labelledby="dog-supplies-heading">
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
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
          
          {/* Decorative polygon with dog image */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-1/2"
            style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=400&fit=crop"
              alt="Happy dog"
              fill
              sizes="(max-width: 768px) 50vw, 400px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {products.map((product) => (
              <ShopifyProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>No dog products available. Add a "dogs" collection in your Shopify store.</p>
          </div>
        )}
      </div>
    </section>
  )
}
