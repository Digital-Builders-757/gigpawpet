import type { Product } from "@/types/shopify"
import { ShopifyProductCard } from "./shopify-product-card"

interface ShopifyRelatedProductsProps {
  products: Product[]
}

export function ShopifyRelatedProducts({ products }: ShopifyRelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="w-full bg-light-blue py-12 md:py-16" aria-labelledby="related-products-heading">
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
        <div className="flex items-center justify-between mb-8">
          <h2 id="related-products-heading" className="text-2xl md:text-3xl font-extrabold text-foreground">
            You Might Also Like
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((product) => (
            <ShopifyProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
