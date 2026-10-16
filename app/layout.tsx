// app/layout.tsx

import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Link from "next/link";
import { CurrencyProvider } from "@/context/currency-context";
import { CartProvider } from "@/context/cart-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.padoshop.com"),
  title: {
    default: "PADO Boutique | Bespoke Tailoring, Made to Measure",
    template: "%s | PADO Boutique",
  },
  description:
    "Handcrafted bespoke suits, blazers, and made-to-measure clothing. Cut to your exact measurements by master tailors. Free worldwide shipping over $250.",
  verification: {
    google: "br4l7UY8LsSpvmbaRZltolqua6_L5MHBFwOyMD_hRw0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased">
        <CurrencyProvider>
          <CartProvider>
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md">
              <div className="relative flex items-center justify-between px-5 md:px-12 py-4 md:py-5">
                <Link
                  href="/custom/men"
                  className="text-white text-[11px] uppercase tracking-[0.3em] z-10"
                >
                  Shop
                </Link>
                <Link
                  href="/"
                  className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
                >
                  <span className="block font-serif text-2xl md:text-3xl tracking-[0.5em] text-[#D4AF37]">
                    PADO
                  </span>
                  <span className="block text-[8px] md:text-[9px] tracking-[0.4em] text-white/80 mt-0.5">
                    BESPOKE
                  </span>
                </Link>
                <Link
                  href="/checkout"
                  className="text-white text-[11px] uppercase tracking-[0.3em] z-10"
                >
                  Cart
                </Link>
              </div>
            </header>

            <main className="min-h-screen pt-20">{children}</main>

            <footer className="border-t border-neutral-200 bg-[#FDFBF7] py-12 px-6">
              <div className="max-w-[1400px] mx-auto text-center">
                <h3 className="text-2xl font-serif text-[#0A0A0A] mb-4 tracking-[0.3em]">
                  PADO
                </h3>
                <p className="text-sm text-neutral-500 mb-8">
                  © {new Date().getFullYear()} PADO BOUTIQUE. All rights reserved.
                </p>
                <div className="flex flex-wrap justify-center gap-6 text-xs text-neutral-600">
                  <Link href="/about">About</Link>
                  <Link href="/contact">Contact</Link>
                  <Link href="/shipping">Shipping</Link>
                  <Link href="/returns">Returns</Link>
                  <Link href="/track-order">Track Order</Link>
                </div>
              </div>
            </footer>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
