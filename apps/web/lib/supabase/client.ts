"use client";

import { createSupabaseBrowserClient } from "@nmt-arena/supabase";
import { getPublicEnv } from "@/lib/env";

export function createBrowserSupabase() {
  const { supabaseUrl, supabaseAnonKey } = getPublicEnv();
  return createSupabaseBrowserClient(supabaseUrl, supabaseAnonKey);
}
