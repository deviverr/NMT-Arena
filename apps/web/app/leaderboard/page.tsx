import { leaderboardRowSchema } from "@nmt-arena/shared";
import { LeaderboardFilters } from "@/components/leaderboard/LeaderboardFilters";
import { LeaderboardTable } from "@/components/leaderboard/LeaderboardTable";
import { createServerSupabase } from "@/lib/supabase/server";

export const revalidate = 60;

async function getRows() {
  const supabase = createServerSupabase();
  const { data } = await supabase.from("leaderboard_global").select("*").limit(50);
  return (data ?? []).map((row) => leaderboardRowSchema.parse(row));
}

export default async function LeaderboardPage() {
  const rows = await getRows();
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-4xl font-black">Лідерборд України</h1>
        <p className="mt-2 text-slate-600 dark:text-arena-100/80">XP оновлюється в реальному часі після кожного валідного тесту.</p>
      </div>
      <LeaderboardFilters />
      <LeaderboardTable initialRows={rows} />
    </div>
  );
}
