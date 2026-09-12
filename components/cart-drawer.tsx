'use client'

import { useCart } from '@/context/cart-context'
import Link from 'next/link'

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, totalPrice } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md bg-white p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b pb-4">
              <h2 className="text-xl font-serif font-bold">Your Shopping Bag</h2>
              <button onClick={onClose} className="text-neutral-500 hover:text-black text-xl font-bold">
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto">
              {cart.length === 0 ? (
                <p className="text-center text-sm text-neutral-500 py-8">Your bag is currently empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <h4 className="font-serif text-sm font-semibold">{item.name}</h4>
                      <p className="text-xs text-neutral-500">{item.fabric || 'Bespoke Item'}</p>
                      <p className="text-xs font-medium mt-1">Qty: {item.quantity} × ${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total:</span>
              <span>${totalPrice} USD</span>
            </div>
            <Link
              href="/checkout"
              onClick={onClose}
              className={`block w-full text-center py-3 text-xs uppercase tracking-widest font-semibold transition-all ${
                cart.length === 0
                  ? 'bg-neutral-300 cursor-not-allowed text-neutral-500'
                  : 'bg-black text-white hover:bg-neutral-800'
              }`}
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
