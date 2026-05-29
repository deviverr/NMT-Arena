import { notFound } from "next/navigation";
import { subjects } from "@nmt-arena/shared";
import { LeaderboardFilters } from "@/components/leaderboard/LeaderboardFilters";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { createServerSupabase } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function SubjectLeaderboardPage({ params }: { params: { subject: string } }) {
  const subject = subjects.find((item) => item.slug === params.subject);
  if (!subject) notFound();
  const supabase = createServerSupabase();
  const { data } = await supabase
    .from("profiles")
    .select("id, username, display_name, avatar_url, total_xp, current_rank, current_streak, tests_completed, school, city, region")
    .order("total_xp", { ascending: false })
    .limit(50);
  const rows = (data ?? []).map((row, index) => ({ ...row, global_rank: index + 1 }));
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-4xl font-black">{subject.icon} {subject.nameUa}</h1>
        <p className="mt-2 text-slate-600 dark:text-arena-100/80">Предметний рейтинг готовий для живих даних із Supabase.</p>
      </div>
      <LeaderboardFilters selectedSubject={params.subject} />
      <LeaderboardTable initialRows={rows} />
    </div>
  );
}
