import { ProductCard } from "./product-card"

const newArrivalProducts = [
  {
    name: "Pet Christmas Tree Heavy Blend™ Crewneck Sweatshirt",
    price: 35.75,
    image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=400&h=400&fit=crop",
  },
  {
    name: "Ugly Christmas Meow Sweater",
    price: 55,
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop",
  },
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
    name: "Christmas Pet Top",
    price: 35.23,
    image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=400&h=400&fit=crop",
  },
]

export function NewArrivals() {
  return (
    <section className="w-full bg-card py-16 border-b border-border">
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
        <h2 className="text-3xl md:text-[2rem] font-extrabold tracking-[-0.03em] text-foreground text-center mb-10">
          New Arrivals
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {newArrivalProducts.map((product) => (
            <ProductCard
              key={product.name}
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
