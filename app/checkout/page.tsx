'use client'

import { useCart } from '@/context/cart-context'
import { useState } from 'react'

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart()
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'paypal'>('stripe')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: cart, paymentMethod }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitted(true)
        clearCart()
      } else {
        alert('Payment failed: ' + data.error)
      }
    } catch (err) {
      alert('An error occurred during payment processing.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl py-20 text-center px-5">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-2xl font-bold">
          ✓
        </div>
        <h1 className="text-3xl font-serif font-bold text-neutral-900">Payment Successful</h1>
        <p className="mt-4 text-sm text-neutral-600">
          Your payment has been processed via {paymentMethod.toUpperCase()}. Our master tailor is preparing your order.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-12">
      <h1 className="text-3xl font-serif font-bold text-center mb-8">Checkout & Payment</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <form onSubmit={handlePayment} className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">1. Client Details</h2>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Full Name</label>
            <input required type="text" className="w-full border p-2 text-sm focus:outline-none border-neutral-300" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-neutral-600 mb-1">Email Address</label>
            <input required type="email" className="w-full border p-2 text-sm focus:outline-none border-neutral-300" />
          </div>

          <h2 className="text-lg font-semibold border-b pb-2 pt-4">2. Payment Method</h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod('stripe')}
              className={`p-3 border text-xs font-semibold uppercase tracking-wider transition-all ${
                paymentMethod === 'stripe' ? 'border-black bg-black text-white' : 'border-neutral-300 text-neutral-700'
              }`}
            >
              Credit Card (Stripe)
            </button>
            <button
              type="button"
              onClick={() => setPaymentMethod('paypal')}
              className={`p-3 border text-xs font-semibold uppercase tracking-wider transition-all ${
                paymentMethod === 'paypal' ? 'border-black bg-black text-white' : 'border-neutral-300 text-neutral-700'
              }`}
            >
              PayPal
            </button>
          </div>

          {paymentMethod === 'stripe' ? (
            <div className="border border-neutral-200 p-3 text-xs text-neutral-500 bg-neutral-50 rounded">
              Encrypted Card Processing powered by Stripe.
            </div>
          ) : (
            <div className="border border-neutral-200 p-3 text-xs text-neutral-500 bg-neutral-50 rounded">
              You will be redirected to PayPal to complete your purchase securely.
            </div>
          )}

          <button
            type="submit"
            disabled={loading || cart.length === 0}
            className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-all mt-4 disabled:opacity-50"
          >
            {loading ? 'Processing Payment...' : `Pay $${totalPrice} USD via ${paymentMethod.toUpperCase()}`}
          </button>
        </form>

        <div className="bg-neutral-50 p-6 border border-neutral-200 h-fit">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4">Order Summary</h2>
          {cart.length === 0 ? (
            <p className="text-sm text-neutral-500">Your cart is empty.</p>
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

