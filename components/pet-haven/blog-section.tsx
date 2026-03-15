import Image from "next/image"

const smallArticles = [
  {
    title: "An In Depth Look At Siamese Cats",
    date: "Nov 03, 2021",
    author: "Isiaha Stephens",
    excerpt: "The exotic and somewhat mysterious Siamese cat hails from the country of Thailand...",
    image: "https://images.unsplash.com/photo-1568152950566-c1bf43f4ab28?w=400&h=225&fit=crop",
  },
  {
    title: "PET CARE",
    date: "Sep 20, 2021",
    author: "GigglePandP Admin",
    excerpt: "Vaccinations need to be undertaken always by the pet owners and the dogs need to be vaccinated...",
    image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=400&h=225&fit=crop",
  },
  {
    title: "Extreme Outdoor Pet Adventures",
    date: "Aug 15, 2021",
    author: "Pet Haven",
    excerpt: "Amazing pet adventures are stories of inspiration. Not only can our nature driven pet companions...",
    image: "https://images.unsplash.com/photo-1422565096762-bdb997a56a84?w=400&h=225&fit=crop",
  },
  {
    title: "Cat Calling",
    date: "Jul 22, 2021",
    author: "Pet Haven",
    excerpt: "Learn the secret language of the feline family. The here kitty kitty is a lil over played...",
    image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=225&fit=crop",
  },
]

export function BlogSection() {
  return (
    <section className="w-full bg-card py-10 md:py-16">
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6 md:mb-8">Pet News & Tips</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Large Featured Card */}
          <div className="border border-border rounded-2xl md:rounded-3xl p-5 md:p-8 flex flex-col">
            <div className="aspect-video relative rounded-xl md:rounded-2xl overflow-hidden mb-4 md:mb-6">
              <Image
                src="https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&h=338&fit=crop"
                alt="Hot Pet Trends"
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl md:text-[2.5rem] font-bold text-foreground mb-2">
              Hot Pet Trends
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
              by James (J.R.) Locke on December 25, 2021
            </p>
            <p className="text-sm md:text-base text-muted-foreground mb-3 md:mb-4 flex-1">
              Learn what is driving the growth of the pet industry...
            </p>
            <a href="#" className="text-primary underline hover:no-underline text-sm font-medium">
              Read more
            </a>
          </div>

          {/* Small Cards Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-6">
            {smallArticles.map((article) => (
              <div
                key={article.title}
                className="bg-light-blue rounded-xl md:rounded-2xl p-3 md:p-4 flex flex-col"
              >
                <div className="aspect-video relative rounded-lg md:rounded-xl overflow-hidden mb-3 md:mb-4">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <h4 className="text-sm md:text-xl font-bold text-foreground mb-1 line-clamp-1">
                  {article.title}
                </h4>
                <p className="text-[10px] md:text-xs text-muted-foreground mb-1 md:mb-2">
                  {article.date}
                </p>
                <p className="hidden md:block text-sm text-muted-foreground line-clamp-2 mb-3 flex-1">
                  {article.excerpt}
                </p>
                <a href="#" className="text-primary underline hover:no-underline text-xs md:text-sm font-medium">
                  Read more
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
