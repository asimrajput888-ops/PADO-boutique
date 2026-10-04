// app/admin/login/page.tsx

"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-5">
      <div className="max-w-md w-full">
        {/* Brand */}
        <div className="text-center mb-12">
          <h1 className="text-lg font-serif tracking-[0.5em] text-neutral-900 mb-3">
            PADO
          </h1>
          <p className="text-[10px] uppercase tracking-[0.4em] text-neutral-400">
            Admin Access
          </p>
        </div>

        {/* Form Card */}
        <div className="border border-neutral-200 p-8 md:p-10">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
                placeholder="admin@padoboutique.com"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-3 font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-neutral-200 p-4 focus:border-neutral-900 outline-none text-sm"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs leading-relaxed">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-neutral-900 text-white py-4 text-[11px] uppercase tracking-[0.3em] font-medium hover:bg-neutral-700 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-neutral-400 mt-8">
          © {new Date().getFullYear()} PADO Boutique
        </p>
      </div>
    </div>
  );
}
