// components/site/site-footer.tsx

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-white border-t border-neutral-200 text-neutral-600 pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* Brand */}
        <div>
          <h3 className="text-xl font-serif text-neutral-900 mb-6 tracking-[0.3em]">
            PADO
          </h3>
          <p className="text-sm leading-relaxed mb-6 max-w-xs text-neutral-500">
            Luxury bespoke tailoring and silk loungewear. Crafted for the modern individual.
          </p>
        </div>

        {/* Custom Made */}
        <div>
          <h4 className="text-neutral-900 text-[10px] tracking-[0.3em] uppercase mb-6">
            Custom Made
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/custom/men" className="hover:text-neutral-900 transition-colors duration-300">
                Men&apos;s Bespoke
              </Link>
            </li>
            <li>
              <Link href="/custom/women" className="hover:text-neutral-900 transition-colors duration-300">
                Women&apos;s Bespoke
              </Link>
            </li>
            <li>
              <Link href="/seasonal" className="hover:text-neutral-900 transition-colors duration-300">
                Seasonal &amp; Novelty
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="text-neutral-900 text-[10px] tracking-[0.3em] uppercase mb-6">
            Customer Care
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/contact" className="hover:text-neutral-900 transition-colors duration-300">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/measurements" className="hover:text-neutral-900 transition-colors duration-300">
                Measurements
              </Link>
            </li>
            <li>
              <Link href="/shipping" className="hover:text-neutral-900 transition-colors duration-300">
                Shipping
              </Link>
            </li>
            <li>
              <Link href="/return" className="hover:text-neutral-900 transition-colors duration-300">
                Returns
              </Link>
            </li>
            <li>
              <Link href="/track-order" className="hover:text-neutral-900 transition-colors duration-300">
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-neutral-900 text-[10px] tracking-[0.3em] uppercase mb-6">
            Company
          </h4>
          <ul className="space-y-3 text-sm">
            <li>
              <Link href="/about" className="hover:text-neutral-900 transition-colors duration-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/journal" className="hover:text-neutral-900 transition-colors duration-300">
                Journal
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-neutral-900 transition-colors duration-300">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-neutral-900 transition-colors duration-300">
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-8 border-t border-neutral-200 text-[10px] text-center text-neutral-400 tracking-[0.3em] uppercase">
        © {new Date().getFullYear()} PADO BOUTIQUE. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
