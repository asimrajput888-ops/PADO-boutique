// app/admin/dashboard/page.tsx

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    totalModels: 0,
    totalRevenue: 0,
  });
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const { count: orderCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true });

      const { count: pendingCount } = await supabase
        .from("orders")
        .select("*", { count: "exact", head: true })
        .eq("status", "pending");

      const { count: modelCount } = await supabase
        .from("models")
        .select("*", { count: "exact", head: true });

      const { data: orders } = await supabase
        .from("orders")
        .select("total_price, status");

      const revenue =
        orders
          ?.filter((o) => o.status !== "cancelled")
          .reduce((sum, o) => sum + Number(o.total_price || 0), 0) || 0;

      const { data: recent } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      setStats({
        totalOrders: orderCount || 0,
        pendingOrders: pendingCount || 0,
        totalModels: modelCount || 0,
        totalRevenue: revenue,
      });
      setRecentOrders(recent || []);
      setLoading(false);
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 md:p-10">
      {/* Header */}
      <div className="mb-10">
        <p className="text-[10px] tracking-[0.4em] text-neutral-500 uppercase mb-2">
          Overview
        </p>
        <h1 className="text-3xl font-serif text-neutral-900">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <StatCard label="Total Orders" value={stats.totalOrders.toString()} />
        <StatCard label="Pending" value={stats.pendingOrders.toString()} />
        <StatCard label="Models" value={stats.totalModels.toString()} />
        <StatCard
          label="Revenue"
          value={`$${stats.totalRevenue.toLocaleString()}`}
        />
      </div>

      {/* Quick Actions */}
      <div className="mb-12">
        <h2 className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/admin/models/new"
            className="bg-neutral-900 text-white px-6 py-3 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition"
          >
            + Add Model
          </Link>
          <Link
            href="/admin/orders"
            className="border border-neutral-300 text-neutral-900 px-6 py-3 text-[11px] uppercase tracking-[0.3em] font-medium hover:border-neutral-900 transition"
          >
            View Orders
          </Link>
          <Link
            href="/admin/models"
            className="border border-neutral-300 text-neutral-900 px-6 py-3 text-[11px] uppercase tracking-[0.3em] font-medium hover:border-neutral-900 transition"
          >
            Manage Models
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase">
            Recent Orders
          </h2>
          <Link
            href="/admin/orders"
            className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 hover:text-neutral-900 transition"
          >
            View All →
          </Link>
        </div>

        {loading ? (
          <p className="text-neutral-400 text-sm">Loading...</p>
        ) : recentOrders.length === 0 ? (
          <div className="border border-neutral-200 p-10 text-center">
            <p className="text-neutral-400 text-sm mb-2">No orders yet.</p>
            <p className="text-neutral-400 text-xs">
              Orders will appear here when customers submit them.
            </p>
          </div>
        ) : (
          <div className="border border-neutral-200 overflow-hidden">
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
                    Total
                  </th>
                  <th className="text-left p-4 text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-t border-neutral-100">
                    <td className="p-4 font-mono text-xs">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-amber-600 hover:underline"
                      >
                        {order.order_number || `#${order.id}`}
                      </Link>
                    </td>
                    <td className="p-4 text-sm">{order.customer_name}</td>
                    <td className="p-4 text-sm text-neutral-600">
                      {order.model_name}
                    </td>
                    <td className="p-4 text-sm font-medium">
                      ${Number(order.total_price).toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] uppercase tracking-wider px-2 py-1 ${
                          order.status === "pending"
                            ? "bg-yellow-50 text-yellow-800"
                            : order.status === "in_production"
                            ? "bg-blue-50 text-blue-800"
                            : order.status === "shipped"
                            ? "bg-purple-50 text-purple-800"
                            : order.status === "completed"
                            ? "bg-green-50 text-green-800"
                            : "bg-neutral-100 text-neutral-600"
                        }`}
                      >
                        {order.status || "pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-neutral-200 p-6">
      <p className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase mb-3">
        {label}
      </p>
      <p className="text-3xl font-serif text-neutral-900">{value}</p>
    </div>
  );
}
