import { ProductCard } from "./product-card"

const dogProducts = [
  {
    name: "Ugly Christmas Pug Sweater",
    price: 50,
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=400&h=400&fit=crop",
  },
  {
    name: "Festive Pet Bandana",
    price: 25,
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop",
  },
  {
    name: "Pet Christmas Tree Heavy Blend™ Crewneck Sweatshirt",
    price: 35.75,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop",
  },
  {
    name: "Very Important Pet Tag - Personalized",
    price: 20,
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop",
  },
  {
    name: "Pet Bowl",
    price: 23.64,
    image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop",
  },
]

export function DogSupplies() {
  return (
    <section className="w-full bg-primary pt-12 pb-16">
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
        {/* Section Header Card */}
        <div className="bg-card rounded-3xl p-8 mb-10 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h2 className="text-3xl md:text-[2rem] font-extrabold tracking-[-0.03em] text-foreground">
                Dog Supplies
              </h2>
              <button className="rounded-full border border-foreground px-6 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                View all dog products
              </button>
            </div>
          </div>
          {/* Decorative polygon */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#e0e0e0]"
            style={{ clipPath: "polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
          />
        </div>

        {/* Light divider */}
        <div className="w-full h-px bg-white/20 mb-10" />

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {dogProducts.map((product, index) => (
            <ProductCard
              key={`${product.name}-${index}`}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
