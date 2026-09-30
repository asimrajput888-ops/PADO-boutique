// app/layout.tsx

import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/context/currency-context";
import { CartProvider } from "@/context/cart-context";
import Header from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";

// Serif — Suitsupply jaisa elegant
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

// Sans — clean body text
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PADO BOUTIQUE | Bespoke Luxury Tailoring",
  description:
    "Luxury bespoke tailoring, silk loungewear, and custom garments crafted to your exact measurements.",
  keywords: ["bespoke", "tailoring", "custom suits", "luxury menswear", "PADO Boutique"],
  openGraph: {
    title: "PADO BOUTIQUE",
    description: "Bespoke luxury tailoring and custom garments.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body
        className="
          font-sans 
          bg-white 
          text-neutral-900 
          min-h-screen 
          flex 
          flex-col 
          antialiased
          selection:bg-neutral-900 
          selection:text-white
        "
      >
        <CurrencyProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
