export function getPublicEnv() {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    apiUrl: process.env.NEXT_PUBLIC_API_URL ?? "https://nmt-arena.fun"
  };
}

export function getServiceEnv() {
  return {
    ...getPublicEnv(),
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? ""
  };
}
