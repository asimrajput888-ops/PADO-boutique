// components/site/site-footer.tsx

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-brand-charcoal text-white pt-20 pb-10 border-t border-white/10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* Top Section: Newsletter & Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="font-serif text-3xl tracking-[0.2em] uppercase text-white">
                PADO
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed mb-8 max-w-xs">
              Bespoke tailoring crafted to your exact measurements. Designed in Canada, handcrafted by master tailors, delivered worldwide.
            </p>
            <div className="flex gap-4">
              {/* Instagram */}
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-brand-charcoal transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              {/* WhatsApp */}
              <a href="https://wa.me/16393840265" target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-brand-charcoal transition-all duration-300">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-6">Collections</h4>
            <ul className="space-y-4">
              {["For Him", "For Her", "Seasonal & Novelty", "The Atelier"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-6">Customer Care</h4>
            <ul className="space-y-4">
              {["Track Your Order", "Measurement Guide", "Shipping & Returns", "Contact Us", "FAQ"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-white/70 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[0.4em] text-brand-gold mb-6">Join The List</h4>
            <p className="text-sm text-white/60 leading-relaxed mb-6">
              Subscribe for early access to new collections, seasonal offers, and atelier insights.
            </p>
            <form className="flex border-b border-white/20 pb-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
              />
              <button type="submit" className="text-[10px] uppercase tracking-[0.2em] text-brand-gold hover:text-white transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} PADO Boutique. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Refund Policy"].map((item) => (
              <Link key={item} href="#" className="text-[10px] text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
