import { ChevronLeft, ChevronRight } from "lucide-react"

const relatedProducts = [
  { id: 1, name: "Festive Pet Bandana", price: "$25.00" },
  { id: 2, name: "Christmas Pet Top", price: "$35.23" },
  { id: 3, name: "Holiday Collar Set", price: "$35.75" },
  { id: 4, name: "Winter Pet Booties", price: "$42.00" },
]

export function RelatedProducts() {
  return (
    <section className="bg-light-blue py-20">
      <div className="mx-auto max-w-[1232px] px-4 md:px-12 lg:px-20">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-[2rem] font-extrabold tracking-[-0.03em]">Related Products</h2>
          <div className="flex gap-2">
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground transition-colors hover:bg-foreground hover:text-card">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground transition-colors hover:bg-foreground hover:text-card">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {relatedProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col rounded-2xl bg-card p-3 shadow-sm"
            >
              <div className="mb-3 aspect-square rounded-lg bg-[#f5f5f5]" />
              <div className="mb-1 font-extrabold">{product.price}</div>
              <div className="mb-3 text-sm text-gray-text">{product.name}</div>
              <button className="w-full rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-hover">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
