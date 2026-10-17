// app/track-order/page.tsx

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setLoading(true);
    setError(null);
    setOrder(null);

    // Supabase se order fetch karein
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("order_number", orderNumber.trim().toUpperCase())
      .single();

    if (error || !data) {
      setError("Order not found. Please check your order number and try again.");
    } else {
      setOrder(data);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-paper pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] text-brand-gold uppercase mb-4">Customer Care</p>
          <h1 className="text-4xl md:text-5xl font-serif text-brand-charcoal mb-4">Track Your Order</h1>
          <p className="text-sm text-brand-slate">Enter your order number below to see the current status.</p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleTrack} className="flex flex-col sm:flex-row gap-4 mb-12">
          <input
            type="text"
            placeholder="e.g. PADO-123456"
            value={orderNumber}
            onChange={(e) => setOrderNumber(e.target.value)}
            className="flex-1 border border-border p-4 text-sm focus:outline-none focus:border-ink uppercase"
          />
          <button 
            type="submit" 
            disabled={loading || !orderNumber.trim()}
            className="bg-brand-charcoal text-white px-10 py-4 text-[11px] uppercase tracking-[0.3em] hover:bg-brand-gold transition-colors disabled:opacity-50"
          >
            {loading ? "Searching..." : "Track Order"}
          </button>
        </form>

        {/* Error Message */}
        {error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-red-50 border border-red-200 text-red-600 p-6 text-center text-sm">
            {error}
          </motion.div>
        )}

        {/* Order Details */}
        {order && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="border border-border bg-white p-8 md:p-12">
            
            <div className="flex items-center justify-between border-b border-border pb-6 mb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone mb-1">Order Number</p>
                <p className="font-mono text-xl text-ink tracking-wider">{order.order_number}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone mb-1">Status</p>
                <span className={`inline-block px-3 py-1 text-[10px] uppercase tracking-wider font-semibold rounded-sm ${
                  order.factory_status === "DISPATCHED" ? "bg-green-100 text-green-800" :
                  order.factory_status === "IN_PRODUCTION" ? "bg-blue-100 text-blue-800" :
                  "bg-gray-100 text-gray-800"
                }`}>
                  {order.factory_status || "Processing"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone mb-2">Item</p>
                <p className="text-sm font-medium text-ink">{order.model_name}</p>
                <p className="text-sm text-stone mt-1">
                  {order.fit_type === "custom" ? "Made to Measure" : "Ready to Wear"}
                </p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.3em] text-stone mb-2">Shipping To</p>
                <p className="text-sm text-ink">{order.customer_name}</p>
                <p className="text-sm text-stone mt-1">
                  {order.shipping_address?.address1}<br />
                  {order.shipping_address?.city}, {order.shipping_address?.country}
                </p>
              </div>
            </div>

            {/* Tracking Details (Only if dispatched) */}
            {order.tracking_number ? (
              <div className="bg-brand-cream border border-bronze/20 p-6">
                <p className="text-[10px] uppercase tracking-[0.3em] text-bronze mb-4 font-semibold">Tracking Information</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-stone text-xs mb-1">Courier</p>
                    <p className="font-medium text-ink">{order.courier_name || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-stone text-xs mb-1">Tracking Number</p>
                    <p className="font-medium text-ink">{order.tracking_number}</p>
                  </div>
                  <div>
                    <p className="text-stone text-xs mb-1">Est. Delivery</p>
                    <p className="font-medium text-ink">{order.estimated_delivery || "N/A"}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-brand-cream border border-border p-6 text-center">
                <p className="text-sm text-stone">
                  {order.fit_type === "custom" 
                    ? "Your bespoke garment is currently being handcrafted by our master tailors. Tracking details will be available upon dispatch (approx. 3-4 weeks)."
                    : "Your order is being prepared for dispatch. Tracking details will be updated shortly."}
                </p>
              </div>
            )}

          </motion.div>
        )}

        <div className="text-center mt-12">
          <p className="text-sm text-stone">
            Need help? <Link href="/contact" className="text-brand-gold underline underline-offset-4">Contact Support</Link>
          </p>
        </div>

      </div>
    </div>
  );
}
