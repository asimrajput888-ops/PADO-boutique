// app/admin/layout.tsx

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // Login page pe sidebar nahi dikhana
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard" },
    { href: "/admin/orders", label: "Orders" },
    { href: "/admin/models", label: "Models" },
    { href: "/admin/models/new", label: "Add Model" },
  ];

  const isActive = (href: string) =>
    href === "/admin/dashboard"
      ? pathname === "/admin/dashboard"
      : pathname?.startsWith(href);

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar — Desktop */}
      <aside className="hidden md:flex md:flex-col w-64 border-r border-neutral-200 bg-white">
        {/* Brand */}
        <div className="px-6 py-8 border-b border-neutral-200">
          <Link href="/admin/dashboard" className="block">
            <h1 className="text-sm font-serif tracking-[0.4em] text-neutral-900">
              PADO
            </h1>
            <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-400 mt-2">
              Admin Panel
            </p>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-6 py-3 text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 ${
                isActive(item.href)
                  ? "text-neutral-900 bg-neutral-50 border-l-2 border-neutral-900"
                  : "text-neutral-500 hover:text-neutral-900 border-l-2 border-transparent"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="border-t border-neutral-200 p-6 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="block text-[10px] uppercase tracking-[0.25em] text-neutral-500 hover:text-neutral-900 transition"
          >
            View Site ↗
          </Link>
          <button
            onClick={handleLogout}
            className="block text-left w-full text-[10px] uppercase tracking-[0.25em] text-red-500 hover:text-red-700 transition"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between px-5 py-4">
          <Link href="/admin/dashboard">
            <h1 className="text-sm font-serif tracking-[0.4em] text-neutral-900">
              PADO
            </h1>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-[5px]"
            aria-label="Menu"
          >
            <span className="w-6 h-[1.2px] bg-neutral-900" />
            <span className="w-6 h-[1.2px] bg-neutral-900" />
            <span className="w-4 h-[1.2px] bg-neutral-900" />
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="border-t border-neutral-200 py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={`block px-5 py-3 text-[11px] uppercase tracking-[0.25em] ${
                  isActive(item.href)
                    ? "text-neutral-900 bg-neutral-50"
                    : "text-neutral-500"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-neutral-200 mt-3 pt-3">
              <Link
                href="/"
                target="_blank"
                className="block px-5 py-3 text-[10px] uppercase tracking-[0.25em] text-neutral-500"
              >
                View Site ↗
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-5 py-3 text-[10px] uppercase tracking-[0.25em] text-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="flex-1 md:ml-0 pt-16 md:pt-0">
        {children}
      </main>
    </div>
  );
}
