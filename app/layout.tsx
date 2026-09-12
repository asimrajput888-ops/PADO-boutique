import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google"; // 1. Fonts import karein
import "./globals.css";
import { CurrencyProvider } from "@/context/currency-context";
import { CartProvider } from "@/context/cart-context";
import Header from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";

// 2. Fonts configure karein
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap",
});

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
      {/* 3. Body par fonts aur colors apply karein */}
      <body 
        className={`${playfair.variable} ${inter.variable} font-sans bg-[#FFF8F0] text-[#1E1E2C] min-h-screen flex flex-col`}
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
