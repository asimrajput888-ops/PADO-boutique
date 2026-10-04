// app/admin/orders/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const fetchOrders = async () => {
    setLoading(true);
    let query = supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (filter !== "all") {
      query = query.eq("status", filter);
    }

    const { data } = await query;
    setOrders(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const updateStatus = async (id: number, newStatus: string) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) fetchOrders();
  };

  const totalRevenue = orders
    .filter((o) => o.status !== "cancelled")
    .reduce((sum, o) => sum + Number(o.total_price || 0), 0);

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-serif mb-1">Orders</h1>
        <p className="text-neutral-500 text-sm">
          {orders.length} orders · ${totalRevenue.toLocaleString()} total value
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { id: "all", name: "All" },
          { id: "pending", name: "Pending" },
          { id: "in_production", name: "In Production" },
          { id: "shipped", name: "Shipped" },
          { id: "completed", name: "Completed" },
          { id: "cancelled", name: "Cancelled" },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`text-[10px] uppercase tracking-[0.25em] px-4 py-2 border transition-all ${
              filter === f.id
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 text-neutral-600 hover:border-neutral-900"
            }`}
          >
            {f.name}
          </button>
        ))}
      </div>

      {/* Orders table */}
      {loading ? (
        <p className="text-neutral-400">Loading...</p>
      ) : orders.length === 0 ? (
        <div className="text-center py-20 border border-neutral-200">
          <p className="text-neutral-400 text-lg mb-2">No orders yet.</p>
          <p className="text-neutral-400 text-sm">
            Orders will appear here when customers submit them.
          </p>
        </div>
      ) : (
        <div className="bg-white border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Order #
                  </th>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Customer
                  </th>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Model
                  </th>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Fit
                  </th>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Total
                  </th>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Status
                  </th>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                    <td className="p-4 font-mono text-xs text-neutral-900">
                      {order.order_number || `#${order.id}`}
                    </td>
                    <td className="p-4">
                      <p className="font-medium text-neutral-900 text-sm">
                        {order.customer_name}
                      </p>
                      <p className="text-xs text-neutral-500">
                        {order.customer_email}
                      </p>
                    </td>
                    <td className="p-4 text-neutral-700 text-sm">
                      {order.model_name}
                    </td>
                    <td className="p-4 text-xs uppercase tracking-wider text-neutral-500">
                      {order.fit_type === "custom"
                        ? "Custom"
                        : `Standard ${order.standard_size || ""}`}
                    </td>
                    <td className="p-4 text-neutral-900 font-medium text-sm">
                      ${Number(order.total_price).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status || "pending"}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`text-xs px-2 py-1 border rounded ${
                          order.status === "pending"
                            ? "bg-yellow-50 border-yellow-200 text-yellow-800"
                            : order.status === "in_production"
                            ? "bg-blue-50 border-blue-200 text-blue-800"
                            : order.status === "shipped"
                            ? "bg-purple-50 border-purple-200 text-purple-800"
                            : order.status === "completed"
                            ? "bg-green-50 border-green-200 text-green-800"
                            : order.status === "cancelled"
                            ? "bg-red-50 border-red-200 text-red-800"
                            : "bg-neutral-50 border-neutral-200 text-neutral-700"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="in_production">In Production</option>
                        <option value="shipped">Shipped</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-amber-600 hover:underline text-xs"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
