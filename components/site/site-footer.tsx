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
              <Link href="/about" className="hover:text-neutral-900 transition-colors duration-300">
                Our Story
              </Link>
            </li>
            <li>
              <Link href="/journal" className="hover:text-neutral-900 transition-colors duration-300">
                Journal
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-neutral-900 text-[10px] tracking-[0.3em] uppercase mb-6">
            Policies
          </h4>
          <ul className="space-y-3 text-sm">
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
            <li>
              <Link href="/shipping" className="hover:text-neutral-900 transition-colors duration-300">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/return" className="hover:text-neutral-900 transition-colors duration-300">
                Returns
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
