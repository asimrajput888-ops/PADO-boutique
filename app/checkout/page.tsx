// app/checkout/page.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { useCurrency } from "@/context/currency-context";

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { formatPrice } = useCurrency();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    notes: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [error, setError] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contact.name || !contact.email) {
      setError("Please fill in your name and email");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty");
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const payload = {
        customer_name: contact.name,
        customer_email: contact.email,
        customer_phone: contact.phone,
        customer_country: contact.country,
        fit_type: "cart",
        standard_size: null,
        model_id: "cart-multiple",
        model_name: cart.map((i) => `${i.name} x${i.quantity}`).join(", "),
        category: "checkout",
        product_type: "cart",
        fabric: null,
        fabric_name: null,
        lapel: null,
        buttons: null,
        sleeve: null,
        collar: null,
        pocket: null,
        fit: null,
        trouser: null,
        vent: null,
        vest: null,
        lining: null,
        measurements: null,
        total_price: subtotal,
        currency: "USD",
        notes: contact.notes,
        items: cart,
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to submit");

      setOrderNumber(data.order?.order_number || "");
      setSubmitted(true);
      clearCart();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Success screen
  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-5 py-20">
        <div className="max-w-lg text-center">
          <div className="w-16 h-16 rounded-full bg-neutral-900 text-white flex items-center justify-center mx-auto mb-8 text-2xl">
            ✓
          </div>
          <h1 className="text-3xl font-serif text-neutral-900 mb-4">
            Order Received
          </h1>
          <p className="text-neutral-500 mb-2">Your order number is:</p>
          <p className="text-lg font-mono text-neutral-900 mb-8">{orderNumber}</p>
          <p className="text-neutral-500 text-sm mb-10 leading-relaxed">
            We&apos;ve sent a confirmation to <strong>{contact.email}</strong>. Our
            team will review your order within 24 hours and send payment
            instructions.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-neutral-900 text-white px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-32 pb-24 px-5 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-4">
            Checkout
          </p>
          <h1 className="text-3xl md:text-5xl font-serif text-neutral-900">
            Complete Your Order
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-neutral-400 mb-6">Your cart is empty.</p>
            <Link
              href="/shop"
              className="inline-block bg-neutral-900 text-white px-8 py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Cart Items */}
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-6 font-semibold">
                Your Items
              </h2>
              <div className="space-y-6">
                {cart.map((item, i) => (
                  <div key={i} className="flex gap-4 pb-6 border-b border-neutral-200">
                    {item.image && (
                      <div className="relative w-20 h-24 flex-shrink-0 overflow-hidden bg-neutral-100">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="text-sm text-neutral-900 leading-snug mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xs text-neutral-500 mb-2">
                        Quantity: {item.quantity}
                      </p>
                      <p className="text-sm text-neutral-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-neutral-200 flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500">
                  Subtotal
                </span>
                <span className="text-2xl font-serif text-neutral-900">
                  {formatPrice(subtotal)}
                </span>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-6 font-semibold">
                Contact Information
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={contact.name}
                  onChange={(e) =>
                    setContact({ ...contact, name: e.target.value })
                  }
                  required
                  className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={contact.email}
                  onChange={(e) =>
                    setContact({ ...contact, email: e.target.value })
                  }
                  required
                  className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="Phone / WhatsApp"
                  value={contact.phone}
                  onChange={(e) =>
                    setContact({ ...contact, phone: e.target.value })
                  }
                  className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={contact.country}
                  onChange={(e) =>
                    setContact({ ...contact, country: e.target.value })
                  }
                  className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
                />
                <textarea
                  placeholder="Additional notes (optional)"
                  value={contact.notes}
                  onChange={(e) =>
                    setContact({ ...contact, notes: e.target.value })
                  }
                  rows={4}
                  className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none resize-none text-sm"
                />

                {error && (
                  <p className="text-red-500 text-sm">{error}</p>
                )}

                <div className="bg-neutral-100 border border-neutral-200 p-5 text-sm text-neutral-700">
                  <p className="font-medium mb-1 text-neutral-900">
                    What happens next?
                  </p>
                  <p>
                    We&apos;ll review your order within 24 hours and send payment
                    instructions by email.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-neutral-900 text-white py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Place Order"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
