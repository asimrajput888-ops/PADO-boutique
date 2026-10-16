// components/site/site-header.tsx

import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black">
      <div className="flex items-center justify-between px-5 md:px-12 py-4 md:py-5">
        <Link
          href="/custom/men"
          className="text-white text-[11px] uppercase tracking-[0.3em]"
        >
          Shop
        </Link>

        <Link href="/" className="flex flex-col items-center">
          <span className="font-serif text-2xl md:text-3xl tracking-[0.5em] text-[#D4AF37]">
            PADO
          </span>
          <span className="text-[8px] md:text-[9px] tracking-[0.4em] text-white/80 mt-0.5">
            BESPOKE
          </span>
        </Link>

        <Link
          href="/checkout"
          className="text-white text-[11px] uppercase tracking-[0.3em]"
        >
          Cart
        </Link>
      </div>
    </header>
  );
}
