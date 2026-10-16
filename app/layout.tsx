// app/layout.tsx

import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import Script from "next/script";
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
            <SiteHeader />
            <main className="min-h-screen">{children}</main>
            <SiteFooter />
          </CartProvider>
        </CurrencyProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3BE6XFB1WC"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3BE6XFB1WC');
          `}
        </Script>
      </body>
    </html>
  );
}
