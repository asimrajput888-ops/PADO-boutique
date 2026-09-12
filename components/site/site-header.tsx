'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/lib/cart-context'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Men', href: '/shop/men' },
  { label: 'Women', href: '/shop/women' },
  { label: 'Custom Tailoring', href: '/custom' },
  { label: 'Journal', href: '/journal' },
]

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const { count, openCart } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden bg-charcoal text-offwhite md:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-8 py-2 text-[10px] tracking-luxe uppercase">
          <p className="text-offwhite/75">
            Custom Tailoring <span className="mx-2 text-champagne">•</span> Premium Fabrics{' '}
            <span className="mx-2 text-champagne">•</span> Worldwide Shipping
          </p>
          <div className="flex items-center gap-6 text-offwhite/75">
            <span>USD</span>
            <Link href="/account/orders" className="transition-colors hover:text-champagne">
              Track Your Order
            </Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div
        className={`border-b transition-all duration-500 ${
          scrolled
            ? 'border-border bg-background/85 backdrop-blur-md'
            : 'border-transparent bg-background'
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4 md:px-8">
          {/* Left: brand */}
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-serif text-2xl tracking-wide-sm md:text-[26px]">BESPOKE</span>
            <span className="mt-1 text-[9px] tracking-luxe text-muted-foreground uppercase">
              Tailored For You
            </span>
          </Link>

          {/* Center: nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const active =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative text-[11px] tracking-wide-sm uppercase transition-colors ${
                    active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-px bg-champagne transition-all duration-300 ${
                      active ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              )
            })}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-4 md:gap-5">
            <button
              aria-label="Search"
              className="hidden text-foreground/80 transition-colors hover:text-foreground md:block"
            >
              <Search className="h-[18px] w-[18px]" strokeWidth={1.25} />
            </button>
            <Link
              href="/account"
              aria-label="Account"
              className="hidden text-foreground/80 transition-colors hover:text-foreground md:block"
            >
              <User className="h-[18px] w-[18px]" strokeWidth={1.25} />
            </Link>
            <button
              onClick={openCart}
              aria-label={`Cart, ${count} items`}
              className="relative text-foreground/80 transition-colors hover:text-foreground"
            >
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.25} />
              {count > 0 && (
                <span className="absolute -top-2 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-charcoal px-1 text-[9px] text-offwhite">
                  {count}
                </span>
              )}
            </button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="text-foreground/80 transition-colors hover:text-foreground lg:hidden"
            >
              <Menu className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!menuOpen}
      >
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-charcoal/40 transition-opacity duration-500 ${
            menuOpen ? 'opacity-100' : 'opacity-0'
          }`}
        />
        <div
          className={`absolute top-0 right-0 flex h-full w-[85%] max-w-sm flex-col bg-background transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-border px-6 py-5">
            <span className="font-serif text-xl tracking-wide-sm">BESPOKE</span>
            <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="border-b border-border/60 py-4 font-serif text-2xl tracking-wide-sm text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-auto flex items-center gap-6 border-t border-border px-6 py-5 text-[11px] tracking-wide-sm uppercase text-muted-foreground">
            <Link href="/account">Account</Link>
            <Link href="/account/orders">Track Order</Link>
            <span className="ml-auto">USD</span>
          </div>
        </div>
      </div>
    </header>
  )
}
