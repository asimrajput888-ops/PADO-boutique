// components/site/site-footer.tsx

import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-neutral-800 text-neutral-400 pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand Column */}
        <div>
          <h3 className="text-xl font-serif text-amber-500 mb-4 tracking-widest">PADO</h3>
          <p className="text-sm leading-relaxed mb-6">
            Luxury bespoke tailoring and silk loungewear. Crafted for the modern individual.
          </p>
        </div>

        {/* Customer Care Column */}
        <div>
          <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Customer Care</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/contact" className="hover:text-amber-500 transition">Contact</Link></li>
            <li><Link href="/measurements" className="hover:text-amber-500 transition">Measurements</Link></li>
            <li><Link href="/shipping" className="hover:text-amber-500 transition">Shipping</Link></li>
            <li><Link href="/returns" className="hover:text-amber-500 transition">Returns</Link></li>
            <li><Link href="/track-order" className="hover:text-amber-500 transition">Track Order</Link></li>
          </ul>
        </div>

        {/* Company Column */}
        <div>
          <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Company</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/about" className="hover:text-amber-500 transition">About</Link></li>
            <li><Link href="/about" className="hover:text-amber-500 transition">Our Story</Link></li>
            <li><Link href="/journal" className="hover:text-amber-500 transition">Journal</Link></li>
          </ul>
        </div>

        {/* Policies Column */}
        <div>
          <h4 className="text-white font-medium mb-4 uppercase tracking-wider text-sm">Policies</h4>
          <ul className="space-y-3 text-sm">
            <li><Link href="/policies/privacy" className="hover:text-amber-500 transition">Privacy</Link></li>
            <li><Link href="/policies/terms" className="hover:text-amber-500 transition">Terms</Link></li>
            <li><Link href="/shipping" className="hover:text-amber-500 transition">Shipping Policy</Link></li>
            <li><Link href="/returns" className="hover:text-amber-500 transition">Returns</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright Bottom Bar */}
      <div className="container mx-auto px-6 pt-8 border-t border-neutral-900 text-xs text-center text-neutral-600">
        &copy; {new Date().getFullYear()} PADO BOUTIQUE. All rights reserved.
      </div>
    </footer>
  );
}
