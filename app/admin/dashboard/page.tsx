// app/admin/dashboard/page.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function AdminDashboard() {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase.from("products").select("*");
      setProductCount(data?.length || 0);
    };
    fetchStats();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-3xl font-serif mb-2">Dashboard</h1>
      <p className="text-neutral-500 mb-10">Welcome to PADO Admin Panel</p>

      <div className="bg-white border border-neutral-200 p-6 rounded-lg mb-10 max-w-sm">
        <p className="text-xs uppercase tracking-widest text-neutral-400 mb-2">Total Products</p>
        <p className="text-4xl font-serif">{productCount}</p>
      </div>

      <Link href="/admin/products/new" className="inline-block bg-neutral-900 text-white px-6 py-3 rounded-lg hover:bg-amber-600 transition">
        + Add New Product
      </Link>
    </div>
  );
}
