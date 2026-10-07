// app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import { CurrencyProvider } from "@/context/currency-context";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PADO Boutique | Bespoke Tailoring",
  description: "Handcrafted bespoke menswear, made to measure. Worldwide shipping.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CurrencyProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </CurrencyProvider>
      </body>
    </html>
  );
}
