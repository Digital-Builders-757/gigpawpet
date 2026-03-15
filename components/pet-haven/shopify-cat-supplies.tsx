import Image from "next/image"
import { getCollectionProducts, getProducts } from "@/lib/actions"
import { ShopifyProductCard } from "./shopify-product-card"

export async function ShopifyCatSupplies() {
  let products = []
  
  try {
    // Try to fetch from "cats" collection, fallback to all products
    products = await getCollectionProducts("cats", { first: 5 })
    
    if (products.length === 0) {
      products = (await getProducts({ first: 5 })).slice(0, 5)
    }
  } catch (error) {
    console.error("Error fetching cat products:", error)
  }

  return (
    <section className="w-full py-12 md:py-20" style={{ backgroundColor: '#e8f4fc' }}>
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
        {/* Header Card */}
        <div className="relative rounded-2xl md:rounded-3xl bg-card overflow-hidden mb-6 md:mb-8 min-h-[160px] md:min-h-[200px] flex items-center shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
          <div className="relative z-10 p-6 md:p-12 max-w-[60%] md:max-w-md">
            <h2 className="text-2xl md:text-4xl font-extrabold text-foreground mb-2 md:mb-4">
              Cat Supplies
            </h2>
            <p className="text-sm md:text-base text-muted-foreground">
              Everything your feline friend needs for a happy, healthy life.
            </p>
          </div>
          
          {/* Decorative polygon with cat image */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-1/2"
            style={{ clipPath: "polygon(30% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=400&fit=crop"
              alt="Cute cat"
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
            <p>No cat products available. Add a "cats" collection in your Shopify store.</p>
          </div>
        )}
      </div>
    </section>
  )
}
