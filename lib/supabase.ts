// lib/supabase.ts

import { createClient } from "@supabase/supabase-js";

let _supabase: any = null;

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

export const supabase: any = new Proxy(
  {},
  {
    get(_target, prop) {
      const client = getSupabaseClient();
      const value = (client as any)[prop];
      return typeof value === "function" ? value.bind(client) : value;
    },
  }
);
