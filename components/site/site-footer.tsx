import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="bg-[#FFF8F0] border-t border-[#1E1E2C]/10 text-[#1E1E2C]/70 pt-20 pb-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        <div>
          <h3 className="text-2xl font-serif text-[#1E1E2C] mb-6 tracking-[0.2em]">PADO<span className="text-[#C5A059]">.</span></h3>
          <p className="text-sm leading-relaxed mb-6 max-w-xs">
            Luxury bespoke tailoring and silk loungewear. Crafted for the modern individual.
          </p>
        </div>

        <div>
          <h4 className="text-[#1E1E2C] font-serif mb-6 text-sm tracking-[0.15em] uppercase">Customer Care</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/contact" className="hover:text-[#5D1A24] transition">Contact</Link></li>
            <li><Link href="/measurements" className="hover:text-[#5D1A24] transition">Measurements</Link></li>
            <li><Link href="/shipping" className="hover:text-[#5D1A24] transition">Shipping</Link></li>
            <li><Link href="/returns" className="hover:text-[#5D1A24] transition">Returns</Link></li>
            <li><Link href="/track-order" className="hover:text-[#5D1A24] transition">Track Order</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#1E1E2C] font-serif mb-6 text-sm tracking-[0.15em] uppercase">Company</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/about" className="hover:text-[#5D1A24] transition">About</Link></li>
            <li><Link href="/about" className="hover:text-[#5D1A24] transition">Our Story</Link></li>
            <li><Link href="/journal" className="hover:text-[#5D1A24] transition">Journal</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[#1E1E2C] font-serif mb-6 text-sm tracking-[0.15em] uppercase">Policies</h4>
          <ul className="space-y-4 text-sm">
            <li><Link href="/policies/privacy" className="hover:text-[#5D1A24] transition">Privacy</Link></li>
            <li><Link href="/policies/terms" className="hover:text-[#5D1A24] transition">Terms</Link></li>
            <li><Link href="/shipping" className="hover:text-[#5D1A24] transition">Shipping Policy</Link></li>
            <li><Link href="/returns" className="hover:text-[#5D1A24] transition">Returns</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 pt-8 border-t border-[#1E1E2C]/10 text-xs text-center text-[#1E1E2C]/40 tracking-widest">
        &copy; {new Date().getFullYear()} PADO BOUTIQUE. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
}
