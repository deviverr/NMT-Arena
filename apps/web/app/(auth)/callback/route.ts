import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

function usernameFromEmail(email?: string | null) {
  const base = email?.split("@")[0]?.replace(/[^a-zA-Z0-9_]/g, "_").slice(0, 24) || `user_${crypto.randomUUID().slice(0, 8)}`;
  return base.length >= 3 ? base : `${base}_nmt`;
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const source = url.searchParams.get("source");
  const supabase = createServerSupabase();

  if (code) {
    await supabase.auth.exchangeCodeForSession(code);
  }

  const { data } = await supabase.auth.getUser();
  if (data.user) {
    const meta = data.user.user_metadata;
    const username = usernameFromEmail(data.user.email);
    await supabase.from("profiles").upsert({
      id: data.user.id,
      username,
      display_name: typeof meta.full_name === "string" ? meta.full_name : username,
      avatar_url: typeof meta.avatar_url === "string" ? meta.avatar_url : null
    }, { onConflict: "id" });
  }

  return NextResponse.redirect(new URL(source === "extension" ? "/install?connected=1" : "/profile/me", url.origin));
}
