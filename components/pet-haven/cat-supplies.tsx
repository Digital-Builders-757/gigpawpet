import Image from "next/image"
import { ProductCard } from "./product-card"

const catProducts = [
  {
    name: "Ugly Christmas Meow Sweater",
    price: 55,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
  },
  {
    name: "Festive Pet Bandana",
    price: 25,
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop",
  },
  {
    name: "Christmas Pet Top",
    price: 35.23,
    image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&h=400&fit=crop",
  },
  {
    name: "Pet Christmas Tree Heavy Blend™ Crewneck Sweatshirt",
    price: 35.75,
    image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=400&h=400&fit=crop",
  },
  {
    name: "Very Important Pet Tag - Personalized",
    price: 20,
    image: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=400&h=400&fit=crop",
  },
]

export function CatSupplies() {
  return (
    <section className="w-full bg-primary pt-12 pb-16">
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
        {/* Section Header Card */}
        <div className="bg-card rounded-3xl p-8 mb-10 relative overflow-hidden">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <h2 className="text-3xl md:text-[2rem] font-extrabold tracking-[-0.03em] text-foreground">
                Cat Supplies
              </h2>
              <button className="rounded-full border border-foreground px-6 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                View all cat products
              </button>
            </div>
          </div>
          {/* Decorative circle with cat image */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-1/2"
            style={{ clipPath: "circle(70% at 100% 50%)" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&h=400&fit=crop"
              alt="Cute cat"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Light divider */}
        <div className="w-full h-px bg-white/20 mb-10" />

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {catProducts.map((product, index) => (
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
