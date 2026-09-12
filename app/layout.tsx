import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/context/currency-context";
import { CartProvider } from "@/context/cart-context";
import Header from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer"; // Ensure this file exists with 'export default'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PADO BOUTIQUE | Bespoke Luxury",
  description: "Luxury bespoke tailoring, silk loungewear, and custom garments.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0A0A0A] text-neutral-100 min-h-screen flex flex-col font-sans`}>
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
