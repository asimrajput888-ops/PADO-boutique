'use client'

import { useCart } from '@/context/cart-context'
import { useState } from 'react'

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    clearCart()
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center px-5">
        <h1 className="text-3xl font-serif font-bold text-neutral-900">Thank You For Your Order</h1>
        <p className="mt-4 text-sm text-neutral-600">
          Your bespoke order has been placed successfully. Our master tailor will review your details shortly.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="text-3xl font-serif font-bold text-center mb-8">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Billing Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Client Details</h2>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Full Name</label>
            <input required type="text" className="w-full border p-2 text-sm focus:outline-none border-neutral-300" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Email Address</label>
            <input required type="email" className="w-full border p-2 text-sm focus:outline-none border-neutral-300" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Shipping Address</label>
            <textarea required rows={3} className="w-full border p-2 text-sm focus:outline-none border-neutral-300" />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-all mt-4"
          >
            Place Order (${totalPrice} USD)
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-neutral-50 p-6 border border-neutral-200 h-fit">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">Order Summary</h2>
          {cart.length === 0 ? (
            <p className="text-sm text-neutral-500">No items in checkout.</p>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-sm border-b pb-2">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-xs text-neutral-500">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold">${item.price * item.quantity}</p>
                </div>
              ))}
              <div className="flex justify-between font-bold text-base pt-2">
                <span>Total Amount:</span>
                <span>${totalPrice} USD</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
