// app/admin/orders/page.tsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("all");
  const [suppliers, setSuppliers] = useState<any[]>([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const fetchSuppliers = async () => {
    const { data } = await supabase.from("suppliers").select("*");
    setSuppliers(data || []);
  };

  const fetchOrders = async () => {
    setLoading(true);
    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter === "pending_manual") {
      query = query
        .eq("supplier_type", "manual")
        .eq("supplier_status", "PENDING_MANUAL");
    } else if (filter === "api") {
      query = query.eq("supplier_type", "api");
    } else if (filter === "forwarded") {
      query = query.eq("supplier_status", "FORWARDED");
    }

    const { data } = await query;
    setOrders(data || []);
    setLoading(false);
  };

  const buildWhatsAppLink = (order: any) => {
    const supplier = suppliers.find((s) => s.id === order.supplier_id);
    const phone = supplier?.contact_whatsapp?.replace(/[^0-9]/g, "") || "";

    const measurementsText = order.measurements
      ? Object.entries(order.measurements)
          .filter(([_, v]) => v)
          .map(([k, v]) => `• ${k}: ${v}`)
          .join("\n")
      : "";

    const customizationText = order.customization
      ? Object.entries(order.customization)
          .filter(([_, v]) => v)
          .map(([k, v]) => `• ${k}: ${v}`)
          .join("\n")
      : "";

    const msg = `*NEW ORDER — ${order.order_number}*

*Customer:* ${order.customer_name}
*Country:* ${order.customer_country || ""}

*Product:* ${order.model_name}
*Type:* ${order.product_type}
*Fit:* ${
      order.fit_type === "custom" ? "Custom Measurements" : order.standard_size
    }

${measurementsText ? `*MEASUREMENTS (inches):*\n${measurementsText}\n` : ""}
${customizationText ? `*CUSTOMIZATION:*\n${customizationText}\n` : ""}

*SHIPPING ADDRESS:*
${order.shipping_address?.address1 || ""}
${order.shipping_address?.address2 || ""}
${order.shipping_address?.city || ""} ${order.shipping_address?.postalCode || ""}
${order.shipping_address?.country || ""}

*Contact:* ${order.customer_email}
${order.customer_phone ? `*Phone:* ${order.customer_phone}` : ""}

${order.notes ? `*NOTES:* ${order.notes}` : ""}`;

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

  const getSupplierName = (order: any) => {
    const supplier = suppliers.find((s) => s.id === order.supplier_id);
    return supplier?.name || "—";
  };

  return (
    <div className="min-h-screen bg-paper pt-32 pb-24 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-serif text-ink">Orders</h1>
          <Link
            href="/admin/dashboard"
            className="text-xs uppercase tracking-widest text-stone hover:text-ink transition-colors"
          >
            ← Dashboard
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { key: "all", label: "All Orders" },
            { key: "pending_manual", label: "⏳ Pending Manual" },
            { key: "api", label: "🌐 API Orders" },
            { key: "forwarded", label: "✅ Forwarded" },
          ].map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 text-xs uppercase tracking-widest border transition-colors ${
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
          <div className="text-center py-20">
            <div className="w-8 h-8 border border-border border-t-ink rounded-full animate-spin mx-auto" />
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 border border-border">
            <p className="text-stone">No orders found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-border bg-white p-6 grid grid-cols-1 md:grid-cols-5 gap-4 items-center"
              >
                <div>
                  <p className="text-[10px] text-stone uppercase tracking-widest mb-1">
                    Order
                  </p>
                  <p className="font-mono text-sm text-ink">
                    {order.order_number}
                  </p>
                  <p className="text-xs text-stone mt-1">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-stone uppercase tracking-widest mb-1">
                    Customer
                  </p>
                  <p className="text-sm text-ink">{order.customer_name}</p>
                  <p className="text-xs text-stone">
                    {order.customer_country}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-stone uppercase tracking-widest mb-1">
                    Product
                  </p>
                  <p className="text-sm text-ink">{order.model_name}</p>
                  <p className="text-xs text-stone capitalize">
                    {order.product_type} · {getSupplierName(order)}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] text-stone uppercase tracking-widest mb-1">
                    Status
                  </p>
                  <p
                    className={`text-sm font-medium ${
                      order.supplier_status === "FORWARDED"
                        ? "text-green-600"
                        : order.supplier_type === "api"
                        ? "text-blue-600"
                        : "text-orange-600"
                    }`}
                  >
                    {order.supplier_status === "FORWARDED"
                      ? "✅ Forwarded"
                      : order.supplier_type === "manual"
                      ? "⏳ Pending"
                      : order.supplier_status || "Processing"}
                  </p>
                  {order.supplier_order_id && (
                    <p className="text-xs text-stone mt-1 font-mono">
                      ID: {order.supplier_order_id}
                    </p>
                  )}
                </div>

                <div>
                  {order.supplier_type === "manual" &&
                    order.supplier_status !== "FORWARDED" && (
                      <a
                        href={buildWhatsAppLink(order)}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => markAsForwarded(order.id)}
                        className="inline-block text-xs px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                      >
                        📱 WhatsApp Forward
                      </a>
                    )}
                  {order.supplier_status === "FORWARDED" && (
                    <p className="text-xs text-green-600">
                      Forwarded{" "}
                      {order.supplier_forwarded_at
                        ? new Date(order.supplier_forwarded_at).toLocaleString()
                        : ""}
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
