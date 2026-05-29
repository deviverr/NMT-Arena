import { NextResponse } from "next/server";
import { leaderboardQuerySchema } from "@nmt-arena/shared";
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = leaderboardQuerySchema.parse(Object.fromEntries(url.searchParams));
  const supabase = createServerSupabase();
  let builder = supabase.from("leaderboard_global").select("*").limit(query.limit);
  if (query.scope === "region" && query.region) builder = builder.ilike("region", `%${query.region}%`);
  if (query.scope === "city" && query.city) builder = builder.ilike("city", `%${query.city}%`);
  const { data, error } = await builder;
  if (error) return NextResponse.json({ error: "Не вдалося завантажити лідерборд" }, { status: 500 });
  return NextResponse.json({ rows: data ?? [] });
}
