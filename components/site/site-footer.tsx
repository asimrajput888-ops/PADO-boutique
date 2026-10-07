// components/site/site-footer.tsx

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-brand-ivory border-t border-brand-stone">
      {/* Newsletter */}
      <div className="border-b border-brand-stone">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div>
              <p className="text-[10px] tracking-[0.5em] text-brand-gold uppercase mb-4">
                Newsletter
              </p>
              <h3 className="text-2xl md:text-4xl font-serif text-brand-charcoal leading-tight">
                Join the atelier.
                <br />
                <em className="text-brand-gold">Receive our stories.</em>
              </h3>
            </div>
            <div>
              <p className="text-sm text-brand-slate leading-relaxed mb-6">
                Subscribe for early access to new collections, fabric drops, and
                stories from our master tailors.
              </p>
              <form className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 border border-brand-stone bg-white px-5 py-4 text-sm text-brand-charcoal placeholder:text-neutral-400 focus:border-brand-gold outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="bg-brand-charcoal text-white px-8 py-4 text-[10px] uppercase tracking-[0.3em] font-medium hover:bg-brand-gold transition-colors duration-500"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Links Grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <h3 className="text-2xl font-serif text-brand-charcoal mb-6 tracking-[0.3em]">
              PADO
            </h3>
            <p className="text-sm leading-relaxed mb-6 max-w-xs text-brand-slate">
              Luxury bespoke tailoring and silk loungewear. Crafted for the
              modern individual.
            </p>
            <div className="flex items-center gap-4">
              {["Instagram", "Facebook", "Pinterest", "YouTube"].map(
                (social) => (
                  <a
                    key={social}
                    href="#"
                    aria-label={social}
                    className="w-9 h-9 border border-brand-stone flex items-center justify-center text-[10px] text-brand-slate hover:border-brand-gold hover:text-brand-gold transition-colors duration-300"
                  >
                    {social[0]}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Custom Made */}
          <div>
            <h4 className="text-brand-charcoal text-[10px] tracking-[0.3em] uppercase mb-6 font-semibold">
              Custom Made
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Men's Bespoke", href: "/custom/men" },
                { name: "Women's Bespoke", href: "/custom/women" },
                { name: "Seasonal & Novelty", href: "/seasonal" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-brand-slate hover:text-brand-gold transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-brand-charcoal text-[10px] tracking-[0.3em] uppercase mb-6 font-semibold">
              Customer Care
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "Contact", href: "/contact" },
                { name: "Measurements", href: "/measurements" },
                { name: "Shipping", href: "/shipping" },
                { name: "Returns", href: "/returns" },
                { name: "Track Order", href: "/track-order" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-brand-slate hover:text-brand-gold transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-brand-charcoal text-[10px] tracking-[0.3em] uppercase mb-6 font-semibold">
              Company
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { name: "About", href: "/about" },
                { name: "Journal", href: "/journal" },
                { name: "Privacy", href: "/privacy" },
                { name: "Terms", href: "/terms" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-brand-slate hover:text-brand-gold transition-colors duration-300"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-brand-stone">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-neutral-500 tracking-[0.3em] uppercase text-center md:text-left">
            © {new Date().getFullYear()} PADO BOUTIQUE. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] text-neutral-400 tracking-[0.2em] uppercase">
              Secure Payments
            </span>
            <div className="flex items-center gap-3">
              {["VISA", "MC", "AMEX", "PAY"].map((brand) => (
                <span
                  key={brand}
                  className="text-[9px] tracking-widest text-neutral-400 border border-brand-stone px-2 py-1"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
