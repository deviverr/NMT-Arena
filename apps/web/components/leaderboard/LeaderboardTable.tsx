"use client";

import { useEffect, useMemo, useState } from "react";
import type { LeaderboardRow } from "@nmt-arena/shared";
import { createBrowserSupabase } from "@/lib/supabase/client";
import { formatXP } from "@/lib/utils";
import { RankBadge } from "@/components/shared/RankBadge";

export function LeaderboardTable({ initialRows, currentUserId }: { initialRows: LeaderboardRow[]; currentUserId?: string }) {
  const [rows, setRows] = useState(initialRows);
  const supabase = useMemo(() => createBrowserSupabase(), []);

  useEffect(() => {
    const channel = supabase
      .channel("leaderboard-updates")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "profiles" }, (payload) => {
        setRows((current) =>
          current
            .map((row) => (row.id === payload.new.id ? { ...row, total_xp: Number(payload.new.total_xp), current_rank: String(payload.new.current_rank), current_streak: Number(payload.new.current_streak) } : row))
            .sort((a, b) => b.total_xp - a.total_xp)
            .map((row, index) => ({ ...row, global_rank: index + 1 }))
        );
      })
      .subscribe();
    return () => {
      void supabase.removeChannel(channel);
    };
  }, [supabase]);

  if (rows.length === 0) {
    return <div className="arena-card text-center font-semibold text-slate-600 dark:text-arena-100">Поки що ніхто не набрав XP. Стань першим у рейтингу.</div>;
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-arena-100 bg-white shadow-sm dark:border-arena-900 dark:bg-[#14201a]">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="bg-arena-50 text-sm text-arena-800 dark:bg-arena-950 dark:text-arena-100">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Ім'я</th>
              <th className="px-4 py-3">Школа</th>
              <th className="px-4 py-3">Ранг</th>
              <th className="px-4 py-3">XP</th>
              <th className="px-4 py-3">Тести</th>
              <th className="px-4 py-3">Стрік</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={row.id === currentUserId ? "bg-arena-50 dark:bg-arena-950/60" : "border-t border-arena-50 dark:border-arena-900"}>
                <td className="px-4 py-4 font-black text-arena-700 dark:text-arena-100">{row.global_rank}</td>
                <td className="px-4 py-4">
                  <div className="font-extrabold">{row.display_name ?? row.username}</div>
                  <div className="text-sm text-slate-500 dark:text-arena-100/70">@{row.username}</div>
                </td>
                <td className="px-4 py-4 text-sm">{row.school ?? "Не вказано"}</td>
                <td className="px-4 py-4"><RankBadge totalXp={row.total_xp} /></td>
                <td className="px-4 py-4 font-black text-amber-600">{formatXP(row.total_xp)}</td>
                <td className="px-4 py-4">{row.tests_completed}</td>
                <td className="px-4 py-4">🔥 {row.current_streak}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
