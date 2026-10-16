// components/site/site-header.tsx

import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="flex items-center justify-between px-5 md:px-12 py-4 md:py-5">
        {/* LEFT */}
        <div className="flex items-center gap-5">
          <Link
            href="/custom/men"
            className="text-white text-[11px] uppercase tracking-[0.3em] hover:text-[#D4AF37] transition"
          >
            Shop
          </Link>
        </div>

        {/* CENTER */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <span className="block font-serif text-2xl md:text-3xl tracking-[0.5em] text-[#D4AF37]">
            PADO
          </span>
          <span className="block text-[8px] md:text-[9px] tracking-[0.4em] text-white/80 mt-0.5">
            BESPOKE
          </span>
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-5">
          <Link
            href="/checkout"
            className="text-white text-[11px] uppercase tracking-[0.3em] hover:text-[#D4AF37] transition"
          >
            Cart
          </Link>
        </div>
      </div>
    </header>
  );
}
