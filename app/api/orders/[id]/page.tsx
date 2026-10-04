// app/admin/orders/[id]/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminOrderDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .single();

      setOrder(data || null);
      setLoading(false);
    };
    fetchOrder();
  }, [id]);

  const updateStatus = async (newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) setOrder({ ...order, status: newStatus });
  };

  if (loading) {
    return (
      <div className="p-10">
        <p className="text-neutral-400">Loading...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="p-10">
        <h1 className="text-2xl font-serif mb-4">Order Not Found</h1>
        <Link href="/admin/orders" className="text-amber-600 hover:underline text-sm">
          ← Back to Orders
        </Link>
      </div>
    );
  }

  const measurements = order.measurements || {};

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/admin/orders"
          className="text-xs text-neutral-500 hover:text-neutral-900 inline-block mb-4"
        >
          ← Back to Orders
        </Link>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-serif mb-1">
              {order.order_number || `Order #${order.id}`}
            </h1>
            <p className="text-neutral-500 text-sm">
              Placed on {new Date(order.created_at).toLocaleString("en-US")}
            </p>
          </div>
          <select
            value={order.status || "pending"}
            onChange={(e) => updateStatus(e.target.value)}
            className="text-sm px-4 py-2 border border-neutral-300 rounded focus:border-neutral-900 outline-none"
          >
            <option value="pending">Pending</option>
            <option value="in_production">In Production</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left column — 2/3 */}
        <div className="lg:col-span-2 space-y-6">

          {/* Customer Info */}
          <div className="border border-neutral-200 p-6">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
              Customer
            </h2>
            <div className="space-y-2 text-sm">
              <p><strong>Name:</strong> {order.customer_name}</p>
              <p><strong>Email:</strong> <a href={`mailto:${order.customer_email}`} className="text-amber-600 hover:underline">{order.customer_email}</a></p>
              {order.customer_phone && (
                <p><strong>Phone:</strong> {order.customer_phone}</p>
              )}
              {order.customer_country && (
                <p><strong>Country:</strong> {order.customer_country}</p>
              )}
            </div>
          </div>

          {/* Order Details */}
          <div className="border border-neutral-200 p-6">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
              Order Details
            </h2>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-neutral-500 text-xs mb-1">Model</p>
                <p className="font-medium">{order.model_name}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs mb-1">Category</p>
                <p className="capitalize">{order.category}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs mb-1">Type</p>
                <p className="capitalize">{order.product_type}</p>
              </div>
              <div>
                <p className="text-neutral-500 text-xs mb-1">Fit</p>
                <p>
                  {order.fit_type === "custom"
                    ? "Custom Measurements"
                    : `Standard ${order.standard_size || ""}`}
                </p>
              </div>

              {order.fit_type === "custom" && (
                <>
                  {order.fabric_name && (
                    <div>
                      <p className="text-neutral-500 text-xs mb-1">Fabric</p>
                      <p>{order.fabric_name}</p>
                    </div>
                  )}
                  {order.lapel && (
                    <div>
                      <p className="text-neutral-500 text-xs mb-1">Lapel</p>
                      <p className="capitalize">{order.lapel.replace(/-/g, " ")}</p>
                    </div>
                  )}
                  {order.buttons && (
                    <div>
                      <p className="text-neutral-500 text-xs mb-1">Buttons</p>
                      <p className="capitalize">{order.buttons.replace(/-/g, " ")}</p>
                    </div>
                  )}
                  {order.pocket && (
                    <div>
                      <p className="text-neutral-500 text-xs mb-1">Pocket</p>
                      <p className="capitalize">{order.pocket.replace(/-/g, " ")}</p>
                    </div>
                  )}
                  {order.fit && (
                    <div>
                      <p className="text-neutral-500 text-xs mb-1">Fit Style</p>
                      <p className="capitalize">{order.fit}</p>
                    </div>
                  )}
                  {order.vent && (
                    <div>
                      <p className="text-neutral-500 text-xs mb-1">Vent</p>
                      <p className="capitalize">{order.vent.replace(/-/g, " ")}</p>
                    </div>
                  )}
                  {order.lining && (
                    <div>
                      <p className="text-neutral-500 text-xs mb-1">Lining</p>
                      <p className="capitalize">{order.lining}</p>
                    </div>
                  )}
                  {order.vest && (
                    <div>
                      <p className="text-neutral-500 text-xs mb-1">Vest</p>
                      <p className="capitalize">{order.vest.replace(/-/g, " ")}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Measurements */}
          {order.fit_type === "custom" && measurements && Object.keys(measurements).length > 0 && (
            <div className="border border-neutral-200 p-6">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
                Measurements (inches)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                {Object.entries(measurements).map(([key, value]) => (
                  <div key={key}>
                    <p className="text-neutral-500 text-xs mb-1 capitalize">
                      {key.replace(/([A-Z])/g, " $1").trim()}
                    </p>
                    <p className="font-medium">{String(value || "—")}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {order.notes && (
            <div className="border border-neutral-200 p-6">
              <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
                Customer Notes
              </h2>
              <p className="text-sm text-neutral-700 whitespace-pre-line">
                {order.notes}
              </p>
            </div>
          )}
        </div>

        {/* Right column — 1/3 */}
        <div className="space-y-6">

          {/* Total */}
          <div className="border border-neutral-200 p-6 bg-neutral-50">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
              Total
            </h2>
            <p className="text-3xl font-serif text-neutral-900 mb-1">
              ${Number(order.total_price).toLocaleString()}
            </p>
            <p className="text-xs text-neutral-500">{order.currency || "USD"}</p>
          </div>

          {/* Quick actions */}
          <div className="border border-neutral-200 p-6">
            <h2 className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-4 font-semibold">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <a
                href={`mailto:${order.customer_email}?subject=Your PADO Order ${order.order_number}`}
                className="block text-center w-full border border-neutral-300 text-sm py-3 hover:border-neutral-900 transition"
              >
                Email Customer
              </a>
              {order.customer_phone && (
                <a
                  href={`https://wa.me/${order.customer_phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center w-full border border-neutral-300 text-sm py-3 hover:border-neutral-900 transition"
                >
                  WhatsApp Customer
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
