import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/context/currency-context";
import { CartProvider } from "@/context/cart-context";
import Header from "@/components/site/site-header";
import SiteFooter from "@/components/site/site-footer";

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
      {/* YAHAN CHANGE KAREIN: bg-[#0A0A0A] ko bg-white aur text-neutral-100 ko text-neutral-900 karein */}
      <body className={`${inter.className} bg-white text-neutral-900 min-h-screen flex flex-col font-sans`}>
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
