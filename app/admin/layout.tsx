// app/admin/layout.tsx

"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user && pathname !== "/admin/login") {
        router.push("/admin/login");
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [pathname, router]);

  if (loading || pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen flex bg-[#FDFBF7]">
      <aside className="w-64 bg-white border-r border-neutral-200 p-6 flex flex-col">
        <h2 className="text-xl font-serif mb-2">PADO</h2>
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 mb-8">Admin Panel</p>

        <nav className="space-y-1 flex-1">
          <Link href="/admin/dashboard" className={`block p-3 rounded-lg text-sm transition ${pathname === "/admin/dashboard" ? "bg-neutral-900 text-white" : "hover:bg-neutral-100 text-neutral-700"}`}>
            Dashboard
          </Link>
          <Link href="/admin/products" className={`block p-3 rounded-lg text-sm transition ${pathname.startsWith("/admin/products") ? "bg-neutral-900 text-white" : "hover:bg-neutral-100 text-neutral-700"}`}>
            Products
          </Link>
        </nav>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            router.push("/admin/login");
          }}
          className="w-full text-left p-3 text-red-500 hover:bg-red-50 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
