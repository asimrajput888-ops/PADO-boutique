// app/admin/orders/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchOrders = async () => {
    setLoading(true);
    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter === "pending_manual") {
      query = query.eq("supplier_type", "manual").eq("supplier_status", "PENDING_MANUAL");
    } else if (filter === "api") {
      query = query.eq("supplier_type", "api");
    }

    const { data } = await query;
    setOrders(data || []);
    setLoading(false);
  };

  const buildWhatsAppLink = (order: any) => {
    const msg = `*NEW ORDER — ${order.order_number}*

*Customer:* ${order.customer_name}
*Country:* ${order.customer_country}

*Product:* ${order.model_name}
*Type:* ${order.product_type}
*Fit:* ${order.fit_type === "custom" ? "Custom Measurements" : order.standard_size}

${order.measurements ? `*MEASUREMENTS:*
${Object.entries(order.measurements)
  .filter(([_, v]) => v)
  .map(([k, v]) => `• ${k}: ${v}`)
  .join("\n")}` : ""}

${order.customization ? `*CUSTOMIZATION:*
${Object.entries(order.customization)
  .filter(([_, v]) => v)
  .map(([k, v]) => `• ${k}: ${v}`)
  .join("\n")}` : ""}

*SHIPPING:*
${order.shipping_address?.address1 || ""}
${order.shipping_address?.city || ""}
${order.shipping_address?.country || ""}`;

    // ⚠️ Apna Karachi partner ka number yahan daalo
    const phone = "92XXXXXXXXXX";
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  };

  const markAsForwarded = async (orderId: string) => {
    await supabase
      .from("orders")
      .update({
        supplier_status: "FORWARDED",
        supplier_forwarded_at: new Date().toISOString(),
      })
      .eq("id", orderId);
    fetchOrders();
  };

  return (
    <div className="min-h-screen bg-paper pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-4xl font-serif text-ink mb-12">Orders</h1>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          {[
            { key: "all", label: "All Orders" },
            { key: "pending_manual", label: "⏳ Pending Manual" },
            { key: "api", label: "🌐 API Orders" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 text-xs uppercase tracking-widest border transition-colors ${
                filter === f.key
                  ? "bg-ink text-paper border-ink"
                  : "border-border text-ink hover:border-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-stone">No orders found</div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-border bg-white p-6 grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
              >
                <div>
                  <p className="text-xs text-stone uppercase tracking-widest mb-1">Order</p>
                  <p className="font-mono text-sm text-ink">{order.order_number}</p>
                </div>

                <div>
                  <p className="text-xs text-stone uppercase tracking-widest mb-1">Customer</p>
                  <p className="text-sm text-ink">{order.customer_name}</p>
                  <p className="text-xs text-stone">{order.customer_country}</p>
                </div>

                <div>
                  <p className="text-xs text-stone uppercase tracking-widest mb-1">Product</p>
                  <p className="text-sm text-ink">{order.model_name}</p>
                  <p className="text-xs text-stone">{order.product_type}</p>
                </div>

                <div>
                  <p className="text-xs text-stone uppercase tracking-widest mb-1">Status</p>
                  <p
                    className={`text-sm font-medium ${
                      order.supplier_status === "FORWARDED"
                        ? "text-green-600"
                        : order.supplier_type === "api"
                        ? "text-blue-600"
                        : "text-orange-600"
                    }`}
                  >
                    {order.supplier_type === "manual"
                      ? order.supplier_status === "FORWARDED"
                        ? "✅ Forwarded"
                        : "⏳ Pending Forward"
                      : order.supplier_status || "Processing"}
                  </p>
                  {order.supplier_type === "manual" && order.supplier_status !== "FORWARDED" && (
                    <div className="flex gap-2 mt-2">
                      <a
                        href={buildWhatsAppLink(order)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => markAsForwarded(order.id)}
                        className="text-xs px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                      >
                        📱 WhatsApp
                      </a>
                    </div>
                  )}
                  {order.supplier_order_id && (
                    <p className="text-xs text-stone mt-1 font-mono">
                      ID: {order.supplier_order_id}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
