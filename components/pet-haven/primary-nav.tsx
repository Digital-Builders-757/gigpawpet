export function PrimaryNav() {
  return (
    <nav className="w-full bg-card border-b border-border py-2.5 md:py-3" aria-label="Quick links">
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20 flex items-center justify-center gap-6 md:gap-8">
        <a href="/" className="text-xs md:text-sm font-medium text-foreground hover:text-primary transition-colors">
          New Arrivals
        </a>
        <a href="/collections/all" className="text-xs md:text-sm font-medium text-foreground hover:text-primary transition-colors">
          Shop All
        </a>
      </div>
    </nav>
  )
}
