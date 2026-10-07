// lib/supabase.ts

import { createClient } from "@supabase/supabase-js";

// Lazy client — only created when first accessed
let _supabase: ReturnType<typeof createClient> | null = null;

function getSupabaseClient() {
  if (_supabase) return _supabase;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  _supabase = createClient(url, key);
  return _supabase;
}

// Proxy so existing code keeps working: `supabase.from(...)` etc.
export const supabase = new Proxy({} as ReturnType<typeof createClient>, {
  get(_target, prop) {
    const client = getSupabaseClient();
    const value = (client as any)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
