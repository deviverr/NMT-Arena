import { NextResponse } from "next/server";
import { calculateXP, sessionSubmissionSchema, validateSessionPlausibility } from "@nmt-arena/shared";
import { createServiceSupabase } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const authHeader = request.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice("Bearer ".length) : null;
  if (!token) return NextResponse.json({ error: "Потрібна авторизація" }, { status: 401 });

  const supabase = createServiceSupabase();
  const { data: userResult, error: userError } = await supabase.auth.getUser(token);
  if (userError || !userResult.user) return NextResponse.json({ error: "Сесію не підтверджено" }, { status: 401 });

  const body = sessionSubmissionSchema.safeParse(await request.json());
  if (!body.success) return NextResponse.json({ error: "Некоректні дані тесту", details: body.error.flatten() }, { status: 400 });
  const payload = body.data;
  const antiCheat = validateSessionPlausibility(payload);

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", userResult.user.id).single();
  if (!profile) return NextResponse.json({ error: "Профіль не знайдено" }, { status: 404 });

  const { data: subject } = payload.subject_slug ? await supabase.from("subjects").select("id").eq("slug", payload.subject_slug).single() : { data: null };
  const xp = calculateXP(payload.score, payload.total_questions, payload.time_spent_seconds, profile.current_streak);
  const scorePercent = Number(((payload.score / payload.total_questions) * 100).toFixed(2));

  const { data: inserted, error: insertError } = await supabase
    .from("test_sessions")
    .insert({
      user_id: userResult.user.id,
      subject_id: subject?.id ?? null,
      source_site: payload.source_site,
      source_url: payload.source_url,
      score: payload.score,
      total_questions: payload.total_questions,
      score_percent: scorePercent,
      time_spent_seconds: payload.time_spent_seconds,
      xp_earned: antiCheat.ok ? xp.total : 0,
      streak_at_time: profile.current_streak,
      speed_bonus: xp.speedBonus,
      streak_bonus: Math.max(0, xp.total - xp.base - xp.speedBonus),
      session_hash: payload.session_hash,
      fingerprint: payload.fingerprint,
      is_flagged: !antiCheat.ok
    })
    .select("id")
    .single();

  if (insertError) return NextResponse.json({ error: "Сесію вже було збережено або дані некоректні" }, { status: 400 });
  if (!antiCheat.ok) return NextResponse.json({ error: "Сесію позначено як підозрілу", reasons: antiCheat.reasons }, { status: 400 });

  const { data: awarded } = await supabase.rpc("award_xp", { p_user_id: userResult.user.id, p_amount: xp.total, p_reason: "test_complete", p_session_id: inserted.id });
  const { data: streak } = await supabase.rpc("update_streak", { p_user_id: userResult.user.id });
  const { data: updatedProfile } = await supabase.from("profiles").select("total_xp,current_rank,current_streak,tests_completed").eq("id", userResult.user.id).single();

  const earnedBadges = await awardBadges(supabase, userResult.user.id, inserted.id, scorePercent, payload.total_questions, payload.time_spent_seconds, updatedProfile?.tests_completed ?? profile.tests_completed + 1, updatedProfile?.current_streak ?? streak ?? 0);

  return NextResponse.json({
    xp_earned: awarded ?? xp.total,
    new_total_xp: updatedProfile?.total_xp ?? profile.total_xp + xp.total,
    badges_earned: earnedBadges,
    streak: updatedProfile?.current_streak ?? streak ?? 0,
    rank: updatedProfile?.current_rank ?? profile.current_rank
  });
}

async function awardBadges(
  supabase: ReturnType<typeof createServiceSupabase>,
  userId: string,
  sessionId: string,
  scorePercent: number,
  totalQuestions: number,
  timeSpentSeconds: number,
  testsCompleted: number,
  currentStreak: number
) {
  const { data: definitions } = await supabase.from("badge_definitions").select("*");
  const slugs = new Set<string>();
  for (const badge of definitions ?? []) {
    if (badge.slug === "first_test" && testsCompleted >= 1) slugs.add(badge.slug);
    if (badge.slug === "excellent" && scorePercent >= 95 && totalQuestions >= 20) slugs.add(badge.slug);
    if (badge.slug === "speed_demon" && scorePercent >= 90 && timeSpentSeconds < totalQuestions * 30) slugs.add(badge.slug);
    if (badge.slug === "zombie" && currentStreak >= 7) slugs.add(badge.slug);
    if (badge.slug === "grinder" && testsCompleted >= 50) slugs.add(badge.slug);
    if (badge.slug === "legend" && currentStreak >= 1) {
      const { data: profile } = await supabase.from("profiles").select("current_rank").eq("id", userId).single();
      if (profile?.current_rank === "👑 200 з Усього") slugs.add(badge.slug);
    }
  }
  const awarded: string[] = [];
  for (const slug of slugs) {
    const badge = definitions?.find((item) => item.slug === slug);
    if (!badge) continue;
    const { error } = await supabase.from("user_badges").insert({ user_id: userId, badge_id: badge.id });
    if (!error) {
      awarded.push(slug);
      if ((badge.xp_reward ?? 0) > 0) {
        await supabase.rpc("award_xp", { p_user_id: userId, p_amount: badge.xp_reward ?? 0, p_reason: "badge_earned", p_session_id: sessionId });
      }
    }
  }
  return awarded;
}
