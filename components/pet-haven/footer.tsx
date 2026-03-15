const footerLinks = {
  shop: ["Seasonal", "Dog", "Cat", "Pet News"],
  information: ["Privacy Policy", "Refund Policy", "Terms of Service"],
  help: ["About Us", "Contact us", "Blog"],
  social: ["Instagram", "Facebook", "Twitter", "YouTube"],
}

export function Footer() {
  return (
    <footer className="w-full bg-navy py-16">
      <div className="max-w-[1232px] mx-auto px-4 md:px-12 lg:px-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <h3 className="text-2xl font-extrabold text-white mb-4">
              Giggling Paws & Pets
            </h3>
            <p className="text-white/70 text-sm leading-relaxed">
              A company that provides quality products and valuable information for Pet Parents...
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-white font-semibold mb-4">Information</h4>
            <ul className="space-y-2">
              {footerLinks.information.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-white font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              {footerLinks.help.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <ul className="space-y-2">
              {footerLinks.social.map((link) => (
                <li key={link}>
                  <a href="#" className="text-white/70 text-sm hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/60 text-sm">
            © 2024 Giggling Paws & Pets. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 text-sm hover:text-white transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
