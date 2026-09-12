'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect } from 'react'
import { X, Minus, Plus } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { formatUSD } from '@/lib/format'

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, count } = useCart()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <div
      className={`fixed inset-0 z-[60] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={`absolute inset-0 bg-charcoal/40 transition-opacity duration-500 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <aside
        className={`absolute top-0 right-0 flex h-full w-full max-w-md flex-col bg-background transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Shopping bag"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-[12px] tracking-wide-sm uppercase">
            Your Bag {count > 0 && <span className="text-muted-foreground">({count})</span>}
          </h2>
          <button onClick={closeCart} aria-label="Close bag">
            <X className="h-5 w-5" strokeWidth={1.25} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
            <p className="font-serif text-2xl">Your bag is empty</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover the signature collection or design your own suit.
            </p>
            <Link
              href="/shop"
              onClick={closeCart}
              className="mt-8 border border-charcoal px-8 py-3 text-[11px] tracking-wide-sm uppercase transition-colors hover:bg-charcoal hover:text-offwhite"
            >
              Explore the Collection
            </Link>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-border/60 py-5">
                  <div className="relative h-28 w-20 shrink-0 overflow-hidden bg-muted">
                    <Image
                      src={item.image || '/placeholder.svg'}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <p className="font-serif text-lg leading-tight">{item.name}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <X className="h-4 w-4" strokeWidth={1.25} />
                      </button>
                    </div>
                    {item.customization && item.customization.length > 0 && (
                      <ul className="mt-1 space-y-0.5 text-[11px] text-muted-foreground">
                        {item.customization.map((c) => (
                          <li key={c.label}>
                            <span className="uppercase tracking-wide-sm">{c.label}:</span> {c.value}
                          </li>
                        ))}
                      </ul>
                    )}
                    {item.measurements && (
                      <p className="mt-1 text-[11px] text-muted-foreground">{item.measurements}</p>
                    )}
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="min-w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="px-2 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <p className="text-sm">{formatUSD(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-6 py-6">
              <div className="flex items-center justify-between text-sm">
                <span className="tracking-wide-sm uppercase text-muted-foreground">Subtotal</span>
                <span className="font-serif text-2xl">{formatUSD(subtotal)}</span>
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">
                Shipping and taxes calculated at checkout.
              </p>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="mt-5 flex w-full items-center justify-center bg-charcoal py-4 text-[11px] tracking-wide-sm text-offwhite uppercase transition-colors hover:bg-foreground"
              >
                Proceed to Checkout
              </Link>
              <button
                onClick={closeCart}
                className="mt-3 w-full text-center text-[11px] tracking-wide-sm uppercase text-muted-foreground transition-colors hover:text-foreground"
              >
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}
