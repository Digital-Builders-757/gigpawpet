import { WaveDivider } from "./wave-divider"

const navLinks = [
  { label: "Seasonal", href: "/collections/seasonal" },
  { label: "Dog", href: "/collections/dogs" },
  { label: "Cat", href: "/collections/cats" },
  { label: "Pet News", href: "/pet-news" },
  { label: "Shop", href: "/collections/all" },
]

export function SecondaryNav() {
  return (
    <nav
      className="relative hidden md:flex w-full items-center border-b-0 overflow-visible"
      style={{ backgroundColor: "#e6f4fc", padding: "15px" }}
      aria-label="Main navigation"
    >
      <WaveDivider fill="#ffffff" variant="bottom" shapeId="transitionSage" direction="right" duration={6} extendBelow flipVertical className="z-10" />
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20 flex items-center justify-center" style={{ gap: "100px" }}>
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm font-medium transition-colors whitespace-nowrap hover:font-bold leading-none flex items-center"
            style={{ color: "#2e86b5" }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  )
}
