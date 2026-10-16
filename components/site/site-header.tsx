// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://www.padoshop.com"),
  title: "PADO Boutique | Bespoke Tailoring",
  description: "Handcrafted bespoke tailoring",
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
    <html lang="en" className={inter.variable}>
      <body className="antialiased">
        <CurrencyProvider>
          <CartProvider>
            {/* INLINE HEADER — Test */}
            <header className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md">
              <div className="flex items-center justify-between px-5 md:px-12 py-4 md:py-5">
                <Link
                  href="/custom/men"
                  className="text-white text-[11px] uppercase tracking-[0.3em]"
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
                  className="text-white text-[11px] uppercase tracking-[0.3em]"
                >
                  Cart
                </Link>
              </div>
            </header>
            <main className="min-h-screen pt-20">{children}</main>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
