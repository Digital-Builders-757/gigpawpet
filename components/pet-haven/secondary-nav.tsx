const navLinks = [
  { label: "Seasonal", href: "/collections/seasonal" },
  { label: "Dog", href: "/collections/dogs" },
  { label: "Cat", href: "/collections/cats" },
  { label: "Pet News", href: "/pet-news" },
  { label: "About Us", href: "/about" },
  { label: "Contact us", href: "/contact" },
]

export function SecondaryNav() {
  return (
    <nav className="hidden md:block w-full bg-card border-b border-border py-3">
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20 flex items-center justify-center gap-6 md:gap-8 flex-wrap">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm text-[#4A5568] hover:text-primary transition-colors whitespace-nowrap"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
