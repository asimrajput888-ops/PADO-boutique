// app/layout.tsx

import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { CurrencyProvider } from "@/context/currency-context";
import { CartProvider } from "@/context/cart-context";
import SiteHeader from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";
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
  title: "PADO Boutique | Bespoke Tailoring",
  description:
    "Handcrafted bespoke menswear, made to measure. Worldwide shipping.",
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
            <SmoothScroll>
              <SiteHeader />
              <main className="min-h-screen">{children}</main>
              <SiteFooter />
            </SmoothScroll>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
