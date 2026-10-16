// app/track-order/page.tsx

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase";

const STATUS_STEPS = [
  { key: "PENDING", label: "Order Received" },
  { key: "IN_PRODUCTION", label: "In Production" },
  { key: "READY", label: "Ready to Ship" },
  { key: "SHIPPED", label: "Shipped" },
  { key: "DELIVERED", label: "Delivered" },
];

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<any>(null);
  const [error, setError] = useState("");

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setOrder(null);
    setLoading(true);

    try {
      const { data, error: dbError } = await supabase
        .from("orders")
        .select("*")
        .eq("order_number", orderNumber.trim().toUpperCase())
        .maybeSingle();

      if (dbError) throw new Error(dbError.message);

      if (!data) {
        setError("Order not found. Please check your order number.");
        return;
      }

      setOrder(data);
    } catch (err: any) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStep = (status: string) => {
    if (!status) return 0;
    const s = status.toUpperCase();
    if (s.includes("PRODUCTION")) return 1;
    if (s.includes("READY")) return 2;
    if (s.includes("SHIPPED") || s.includes("DISPATCHED")) return 3;
    if (s.includes("DELIVERED")) return 4;
    return 0;
  };

  return (
    <div className="min-h-screen bg-paper pt-40 pb-24 px-6 md:px-12">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-[10px] tracking-[0.5em] text-bronze uppercase mb-5">
            Order Tracking
          </p>
          <h1 className="text-4xl md:text-6xl font-serif text-ink leading-[1.1] mb-6">
            Track your order.
          </h1>
          <p className="text-stone text-base leading-relaxed max-w-lg mx-auto">
            Enter your order number below (e.g. PADO-179506) to see the current status.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleTrack}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              placeholder="PADO-XXXXXX"
              required
              className="flex-1 border border-border bg-white p-5 focus:border-ink outline-none text-base text-ink placeholder:text-mist transition-colors duration-300 font-mono tracking-wider"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-ink text-paper px-12 py-5 text-[11px] uppercase tracking-[0.4em] font-medium hover:bg-bronze transition-colors duration-500 disabled:opacity-50"
            >
              {loading ? "Searching..." : "Track"}
            </button>
          </div>
        </motion.form>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-red-300 bg-red-50 p-6 text-sm text-red-700 text-center"
          >
            {error}
          </motion.div>
        )}

        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Order Header */}
            <div className="border border-border bg-white p-8">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.4em] text-bronze mb-2">
                    Order Number
                  </p>
                  <p className="font-mono text-lg text-ink">
                    {order.order_number}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-[0.4em] text-bronze mb-2">
                    Placed On
                  </p>
                  <p className="text-sm text-ink">
                    {new Date(order.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <p className="text-[10px] uppercase tracking-[0.4em] text-bronze mb-2">
                  Product
                </p>
                <p className="text-ink">{order.model_name}</p>
                <p className="text-sm text-stone capitalize">
                  {order.product_type} · {order.fit_type === "custom" ? "Custom Measurements" : "Standard Size"}
                </p>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="border border-border bg-white p-8">
              <p className="text-[10px] uppercase tracking-[0.4em] text-bronze mb-8">
                Status
              </p>

              <div className="relative">
                {STATUS_STEPS.map((step, index) => {
                  const currentStep = getCurrentStep(order.supplier_status || order.status);
                  const isActive = index <= currentStep;
                  const isCurrent = index === currentStep;

                  return (
                    <div key={step.key} className="flex items-start gap-4 pb-8 last:pb-0 relative">
                      {/* Vertical line */}
                      {index < STATUS_STEPS.length - 1 && (
                        <div
                          className={`absolute left-[15px] top-8 w-[1px] h-full ${
                            isActive ? "bg-ink" : "bg-border"
                          }`}
                        />
                      )}

                      {/* Circle */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium z-10 transition-colors ${
                          isCurrent
                            ? "bg-ink text-paper"
                            : isActive
                            ? "bg-ink text-paper"
                            : "bg-cream text-mist border border-border"
                        }`}
                      >
                        {isActive && !isCurrent ? "✓" : index + 1}
                      </div>

                      {/* Label */}
                      <div className="pt-1">
                        <p
                          className={`text-sm font-medium transition-colors ${
                            isActive ? "text-ink" : "text-stone"
                          }`}
                        >
                          {step.label}
                        </p>
                        {isCurrent && (
                          <p className="text-xs text-bronze mt-1">
                            Current status
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Tracking Info (if shipped) */}
            {order.tracking_number && (
              <div className="border border-border bg-white p-8">
                <p className="text-[10px] uppercase tracking-[0.4em] text-bronze mb-6">
                  Tracking Information
                </p>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-sm text-stone">Courier</span>
                    <span className="text-sm text-ink font-medium">
                      {order.courier_name || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-stone">Tracking Number</span>
                    <span className="text-sm text-ink font-mono">
                      {order.tracking_number}
                    </span>
                  </div>
                  {order.estimated_delivery && (
                    <div className="flex justify-between">
                      <span className="text-sm text-stone">Estimated Delivery</span>
                      <span className="text-sm text-ink">
                        {new Date(order.estimated_delivery).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Shipping Address */}
            {order.shipping_address && (
              <div className="border border-border bg-white p-8">
                <p className="text-[10px] uppercase tracking-[0.4em] text-bronze mb-6">
                  Shipping To
                </p>
                <p className="text-sm text-ink font-medium mb-2">
                  {order.customer_name}
                </p>
                <p className="text-sm text-stone leading-relaxed">
                  {order.shipping_address.address1}
                  {order.shipping_address.address2 && (
                    <>
                      <br />
                      {order.shipping_address.address2}
                    </>
                  )}
                  <br />
                  {order.shipping_address.city} {order.shipping_address.postalCode}
                  <br />
                  {order.shipping_address.country}
                </p>
              </div>
            )}

            {/* Help Section */}
            <div className="border border-bronze/30 bg-cream p-6 text-center">
              <p className="text-sm text-graphite mb-4">
                Need help with your order?
              </p>
              <a
                href="https://wa.me/16393840265"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] tracking-[0.4em] uppercase border-b border-ink pb-1 inline-block hover:border-bronze hover:text-bronze transition-colors duration-300"
              >
                Contact Us →
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
