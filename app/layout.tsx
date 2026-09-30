// app/layout.tsx

import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/context/currency-context";
import { CartProvider } from "@/context/cart-context";
import Header from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";

// ============================================
// FONTS — Suitsupply style
// ============================================

// Serif — elegant headings
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif-var",   // globals.css se match
  display: "swap",
});

// Sans — clean body text
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",       // globals.css se match
  display: "swap",
});

// ============================================
// METADATA — SEO
// ============================================

export const metadata: Metadata = {
  title: {
    default: "PADO BOUTIQUE | Bespoke Luxury Tailoring",
    template: "%s | PADO BOUTIQUE",
  },
  description:
    "Luxury bespoke tailoring, silk loungewear, and custom garments crafted to your exact measurements. Timeless elegance since 2020.",
  keywords: [
    "bespoke tailoring",
    "custom suits",
    "luxury menswear",
    "made to measure",
    "PADO Boutique",
    "bespoke suits Pakistan",
  ],
  authors: [{ name: "PADO Boutique" }],
  openGraph: {
    title: "PADO BOUTIQUE | Bespoke Luxury Tailoring",
    description:
      "Luxury bespoke tailoring, silk loungewear, and custom garments crafted to your exact measurements.",
    type: "website",
    locale: "en_US",
    siteName: "PADO BOUTIQUE",
  },
  twitter: {
    card: "summary_large_image",
    title: "PADO BOUTIQUE",
    description: "Bespoke luxury tailoring and custom garments.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ============================================
// ROOT LAYOUT
// ============================================

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body
        className="
          font-sans
          bg-background
          text-foreground
          min-h-screen
          flex
          flex-col
          antialiased
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
