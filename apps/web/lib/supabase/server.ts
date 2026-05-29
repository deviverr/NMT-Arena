import { cookies } from "next/headers";
import { createSupabaseServerClient, createSupabaseServiceClient } from "@nmt-arena/supabase";
import { getPublicEnv, getServiceEnv } from "@/lib/env";

export function createServerSupabase() {
  const cookieStore = cookies();
  const { supabaseUrl, supabaseAnonKey } = getPublicEnv();
  return createSupabaseServerClient(supabaseUrl, supabaseAnonKey, {
    get(name) {
      return cookieStore.get(name)?.value;
    },
    set(name, value, options) {
      cookieStore.set({ name, value, ...options });
    },
    remove(name, options) {
      cookieStore.set({ name, value: "", ...options });
    }
  });
}

export function createServiceSupabase() {
  const { supabaseUrl, serviceRoleKey } = getServiceEnv();
  return createSupabaseServiceClient(supabaseUrl, serviceRoleKey);
}
