import { createBrowserClient, createServerClient, type CookieOptions } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

export function createSupabaseBrowserClient(url: string, anonKey: string) {
  return createBrowserClient<Database>(url, anonKey);
}

export function createSupabaseServiceClient(url: string, serviceRoleKey: string) {
  return createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

export function createSupabaseServerClient(
  url: string,
  anonKey: string,
  cookies: {
    get(name: string): string | undefined;
    set(name: string, value: string, options: CookieOptions): void;
    remove(name: string, options: CookieOptions): void;
  }
) {
  return createServerClient<Database>(url, anonKey, { cookies });
}
