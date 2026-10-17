// app/admin/dashboard/page.tsx

"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "custom" | "standard">("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) {
      setOrders(data);
    }
    setLoading(false);
  };

  // Kashif ya Cheonseng ke WhatsApp number yahan dalein (Country code ke sath, bina + ke)
  const BESPOKE_WHATSAPP_NUMBER = "923001234567"; // <-- Yahan Kashif ka number dalein

  const generateWhatsAppLink = (order: any) => {
    const m = order.measurements || {};
    
    let message = `*New Bespoke Order* 🧵\n\n`;
    message += `*Order #:* ${order.order_number}\n`;
    message += `*Customer:* ${order.customer_name}\n`;
    message += `*Model:* ${order.model_name}\n`;
    message += `*Category:* ${order.category} (${order.product_type})\n\n`;
    
    message += `*--- MEASUREMENTS (Inches) ---*\n`;
    if (m.height) message += `Height: ${m.height}\n`;
    
    // Loop through all measurements provided
    Object.keys(m).forEach((key) => {
      if (key !== "height" && key !== "profileName" && key !== "additionalInfo" && key !== "jacketFit" && key !== "trouserFit") {
        if (m[key]) {
          message += `${key.charAt(0).toUpperCase() + key.slice(1)}: ${m[key]}\n`;
        }
      }
    });

    if (m.jacketFit) message += `Jacket Fit: ${m.jacketFit}\n`;
    if (m.trouserFit) message += `Trouser Fit: ${m.trouserFit}\n`;
    
    if (m.additionalInfo) {
      message += `\n*Special Requests:* ${m.additionalInfo}\n`;
    }

    message += `\n*Shipping Address:*\n${order.shipping_address?.address1}\n${order.shipping_address?.city}, ${order.shipping_address?.country}\n`;

    return `https://wa.me/${BESPOKE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  const filteredOrders = orders.filter((o) => {
    if (filter === "all") return true;
    return o.fit_type === filter;
  });

  return (
    <div className="min-h-screen bg-paper p-6 md:p-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-border">
          <div>
            <h1 className="text-3xl font-serif text-ink mb-2">Admin Dashboard</h1>
            <p className="text-sm text-stone">Manage bespoke orders and factory fulfillments.</p>
          </div>
          <button 
            onClick={fetchOrders} 
            className="mt-4 md:mt-0 px-6 py-2 bg-ink text-paper text-xs uppercase tracking-[0.2em] hover:bg-bronze transition-colors"
          >
            Refresh Orders
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8">
          {(["all", "custom", "standard"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-xs uppercase tracking-[0.2em] border transition-colors ${
                filter === f ? "bg-ink text-paper border-ink" : "border-border text-stone hover:border-ink"
              }`}
            >
              {f === "all" ? "All Orders" : f === "custom" ? "Bespoke (Kashif/Cheonseng)" : "Ready to Wear (CJ/1688)"}
            </button>
          ))}
        </div>

        {/* Orders Grid */}
        {loading ? (
          <p className="text-stone">Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p className="text-stone border border-border p-10 text-center">No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => (
              <div key={order.id} className="border border-border bg-white p-6 relative flex flex-col h-full">
                
                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`text-[9px] uppercase tracking-wider px-2 py-1 rounded-sm ${
                    order.factory_status === "submitted" ? "bg-blue-100 text-blue-800" :
                    order.factory_status === "failed" ? "bg-red-100 text-red-800" :
                    "bg-gray-100 text-gray-800"
                  }`}>
                    {order.factory_status || "Pending"}
                  </span>
                </div>

                <p className="text-[10px] uppercase tracking-[0.2em] text-brand-gold mb-1">
                  {order.order_number}
                </p>
                <h3 className="font-serif text-xl text-ink mb-4">{order.model_name}</h3>
                
                <div className="text-sm text-stone mb-6 space-y-1">
                  <p><strong>Customer:</strong> {order.customer_name}</p>
                  <p><strong>Type:</strong> {order.fit_type === "custom" ? "Made to Measure" : "Ready to Wear"}</p>
                  <p><strong>Price:</strong> ${order.total_price}</p>
                </div>

                {/* Action Area */}
                <div className="mt-auto pt-4 border-t border-border">
                  {order.fit_type === "custom" ? (
                    <a
                      href={generateWhatsAppLink(order)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-green-600 text-white py-3 text-[10px] uppercase tracking-[0.2em] font-medium hover:bg-green-700 transition-colors"
                    >
                      Send Measurements via WhatsApp
                    </a>
                  ) : (
                    <div className="text-center py-3 text-[10px] uppercase tracking-[0.2em] text-stone bg-gray-50 border border-gray-100">
                      Automated via CJ API
                    </div>
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
