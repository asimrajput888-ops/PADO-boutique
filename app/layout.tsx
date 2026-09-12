import "@/app/globals.css"
import Header from "@/components/site/site-header"
import SiteFooter from "@/components/site/site-footer"
import { CurrencyProvider } from "@/context/currency-context"
import { CartProvider } from "@/context/cart-context"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0A0A0A] text-neutral-100 min-h-screen flex flex-col font-sans">
        <CurrencyProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <SiteFooter />
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  )
}
