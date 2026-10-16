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
  metadataBase: new URL("https://www.padoshop.com"),

  title: {
    default: "PADO Boutique | Bespoke Tailoring, Made to Measure",
    template: "%s | PADO Boutique",
  },

  description:
    "Handcrafted bespoke suits, blazers, and made-to-measure clothing. Cut to your exact measurements by master tailors. Free worldwide shipping over $250.",

  keywords: [
    "bespoke suit",
    "made to measure suit",
    "custom tailored suit",
    "bespoke tailoring",
    "mens bespoke suit",
    "womens bespoke suit",
    "custom suit men",
    "custom suit women",
    "wedding suit",
    "groomsmen suit",
    "tailored blazer",
    "custom dress shirt",
    "handmade suit",
    "PADO Boutique",
  ],

  authors: [{ name: "PADO Boutique" }],
  creator: "PADO Boutique",
  publisher: "PADO Boutique",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.padoshop.com",
    siteName: "PADO Boutique",
    title: "PADO Boutique | Bespoke Tailoring, Made to Measure",
    description:
      "Handcrafted bespoke suits, blazers, and made-to-measure clothing. Cut to your exact measurements by master tailors. Free worldwide shipping over $250.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "PADO Boutique — Bespoke Tailoring",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PADO Boutique | Bespoke Tailoring, Made to Measure",
    description:
      "Handcrafted bespoke suits, blazers, and made-to-measure clothing. Free worldwide shipping over $250.",
    images: [
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=1200&h=630&fit=crop",
    ],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
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
