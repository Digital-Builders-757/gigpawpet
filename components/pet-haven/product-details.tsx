"use client"

import { useState } from "react"

const tabs = ["Reviews (124)", "Description", "Size Guide", "Shipping & Returns"]

const reviews = [
  {
    id: 1,
    rating: 5,
    author: "Sarah M.",
    verified: true,
    date: "Oct 12, 2023",
    content: "Absolutely adorable! My cat usually hates clothes but this knit is soft enough that he didn't mind it at all. The size small fit perfectly on my 10lb tabby."
  },
  {
    id: 2,
    rating: 5,
    author: "David K.",
    verified: false,
    date: "Oct 05, 2023",
    content: "High quality material. It's thick and feels like a real human sweater. The colors are vibrant and it looks great in our family holiday photos."
  },
  {
    id: 3,
    rating: 4,
    author: "Elena G.",
    verified: false,
    date: "Sep 28, 2023",
    content: "Really cute but runs a little small. I recommend sizing up if your cat has a lot of fluff!"
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-lg text-amber-500">
      {"★".repeat(rating)}{"☆".repeat(5 - rating)}
    </span>
  )
}

export function ProductDetails() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="border-t border-border bg-card py-20">
      <div className="mx-auto max-w-[1232px] px-4 md:px-12 lg:px-20">
        {/* Tabs */}
        <div className="mb-8 flex gap-8 border-b border-border">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`relative pb-4 text-base font-bold transition-colors ${
                activeTab === i ? "text-foreground" : "text-gray-text hover:text-foreground"
              }`}
            >
              {tab}
              {activeTab === i && (
                <span className="absolute bottom-[-1px] left-0 h-0.5 w-full bg-primary" />
              )}
            </button>
          ))}
        </div>

        {/* Reviews Content */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[300px_1fr]">
          {/* Summary */}
          <div>
            <div className="text-[4rem] font-extrabold leading-none">4.9</div>
            <div className="mt-2 text-2xl text-amber-500">★★★★★</div>
            <div className="mt-2 text-sm font-semibold">124 Verified Reviews</div>
            <div className="my-4 h-px w-full bg-border" />
            <button className="w-full rounded-full border border-foreground px-6 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-card">
              Write a Review
            </button>
          </div>

          {/* Reviews List */}
          <div>
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-border py-6 first:pt-0">
                <StarRating rating={review.rating} />
                <div className="mt-2 text-sm font-bold">
                  {review.author}
                  {review.verified && (
                    <span className="ml-2 text-xs font-normal text-gray-text">Verified Buyer</span>
                  )}
                </div>
                <div className="mt-1 text-xs text-gray-text">{review.date}</div>
                <p className="mt-3 text-[15px] leading-relaxed text-gray-text">{review.content}</p>
              </div>
            ))}
            <div className="mt-8 text-center">
              <button className="rounded-full border border-foreground px-6 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-card">
                Load More Reviews
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
