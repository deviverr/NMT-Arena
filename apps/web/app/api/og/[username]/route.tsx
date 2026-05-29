import { ImageResponse } from "@vercel/og";
import { createServiceSupabase } from "@/lib/supabase/server";

export const runtime = "edge";

export async function GET(_: Request, { params }: { params: { username: string } }) {
  const supabase = createServiceSupabase();
  const { data: profile } = await supabase.from("profiles").select("*").eq("username", params.username).single();
  const name = profile?.display_name ?? params.username;
  const xp = profile?.total_xp ?? 0;
  return new ImageResponse(
    (
      <div style={{ width: "1200px", height: "630px", display: "flex", flexDirection: "column", justifyContent: "center", padding: "70px", background: "linear-gradient(135deg,#D4EDDA,#1B8A4C)", color: "#062E18", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: 36, fontWeight: 900 }}>NMT Arena 🏟️</div>
        <div style={{ marginTop: 60, fontSize: 78, fontWeight: 900 }}>{name}</div>
        <div style={{ marginTop: 20, fontSize: 42, fontWeight: 800 }}>{xp.toLocaleString("uk-UA")} XP · {profile?.current_rank ?? "🎒 Школяр"}</div>
        <div style={{ marginTop: 70, fontSize: 30 }}>Змагайся з усією Україною на nmt-arena.fun</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
