const footerLinks = {
  shop: [
    { label: "Seasonal", href: "/collections/seasonal" },
    { label: "Dog", href: "/collections/dogs" },
    { label: "Cat", href: "/collections/cats" },
    { label: "Pet News", href: "/pet-news" },
  ],
  information: [
    { label: "Privacy Policy", href: "https://gigglingpawsandpets.com/policies/privacy-policy" },
    { label: "Refund Policy", href: "https://gigglingpawsandpets.com/policies/refund-policy" },
    { label: "Terms of Service", href: "https://gigglingpawsandpets.com/policies/terms-of-service" },
  ],
  help: [
    { label: "About Us", href: "/about" },
    { label: "Contact us", href: "/contact" },
    { label: "Blog", href: "https://gigglingpawsandpets.com/blogs/news" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/gigglingpawsandpets_/" },
    { label: "Facebook", href: "https://www.facebook.com/GigglingPaws/" },
    { label: "TikTok", href: "https://www.tiktok.com/@gigglingpawsandpets" },
  ],
}

export function Footer() {
  return (
    <footer className="w-full py-16" style={{ backgroundColor: '#ffde5a' }}>
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="text-2xl font-extrabold text-foreground mb-4">
              Giggling Paws & Pets
            </h3>
            <p className="text-foreground/80 text-sm leading-relaxed">
              A company that provides quality products and valuable information for Pet Parents...
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="text-foreground/80 text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              {footerLinks.information.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="text-foreground/80 text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                    className="text-foreground/80 text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-foreground/80 text-sm hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-foreground/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/70 text-sm">
            © 2024 Giggling Paws & Pets. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://gigglingpawsandpets.com/policies/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 text-sm hover:text-foreground transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://gigglingpawsandpets.com/policies/terms-of-service"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/70 text-sm hover:text-foreground transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
