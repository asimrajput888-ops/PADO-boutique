import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import Header from "@/components/site/site-header"
import Footer from "@/components/site/site-footer"
import { CurrencyProvider } from "@/context/currency-context"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "PADO BOUTIQUE | Bespoke Modern Tailoring",
  description: "Luxury custom-tailored suits, blazers, and sartorial couture.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-[#0A0A0A] text-neutral-100 min-h-screen flex flex-col font-sans">
        <CurrencyProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CurrencyProvider>
      </body>
    </html>
  )
}
