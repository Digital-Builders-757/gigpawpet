import { getNewArrivals } from "@/lib/actions"
import { ShopifyProductCard } from "./shopify-product-card"

export async function ShopifyNewArrivals() {
  let products = []
  
  try {
    products = await getNewArrivals(5)
  } catch (error) {
    console.error("Error fetching products:", error)
  }

  return (
    <section className="w-full bg-background py-12 md:py-20">
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-8">
          New Arrivals
        </h2>
        
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ShopifyProductCard key={product.id} product={product} />
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
