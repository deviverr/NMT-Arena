import { notFound } from "next/navigation";
import { badges, subjects } from "@nmt-arena/shared";
import { createServerSupabase } from "@/lib/supabase/server";
import { XPBar } from "@/components/shared/XPBar";
import { RankBadge } from "@/components/shared/RankBadge";

export const revalidate = 60;

export default async function PublicProfilePage({ params }: { params: { username: string } }) {
  const supabase = createServerSupabase();
  const { data: profile } = await supabase.from("profiles").select("*").eq("username", params.username).single();
  if (!profile) notFound();
  const { data: sessions } = await supabase.from("test_sessions").select("*, subjects(name_ua, icon)").eq("user_id", profile.id).order("created_at", { ascending: false }).limit(8);
  const { data: userBadges } = await supabase.from("user_badges").select("badge_id, badge_definitions(slug)").eq("user_id", profile.id);
  const earned = new Set((userBadges ?? []).map((item) => item.badge_definitions?.slug).filter(Boolean));

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <section className="arena-card">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
          <div className="grid size-28 place-items-center rounded-full bg-arena-100 text-4xl font-black text-arena-700 dark:bg-arena-900 dark:text-arena-100">{profile.username.slice(0, 2).toUpperCase()}</div>
          <div className="flex-1">
            <h1 className="text-4xl font-black">{profile.display_name ?? profile.username}</h1>
            <p className="text-slate-600 dark:text-arena-100/80">@{profile.username}</p>
            {profile.bio ? <p className="mt-3 max-w-2xl">{profile.bio}</p> : null}
            <div className="mt-4 flex flex-wrap gap-2">
              <RankBadge totalXp={profile.total_xp} />
              {profile.school ? <span className="rounded-full bg-arena-50 px-3 py-1 text-sm font-bold dark:bg-arena-950">{profile.school}</span> : null}
              {profile.city ? <span className="rounded-full bg-arena-50 px-3 py-1 text-sm font-bold dark:bg-arena-950">{profile.city}</span> : null}
            </div>
          </div>
          <button type="button" className="arena-button">Додати в друзі</button>
        </div>
        <div className="mt-6"><XPBar totalXp={profile.total_xp} /></div>
      </section>

      <section className="grid gap-4 md:grid-cols-4">
        {[["Total XP", profile.total_xp], ["Тестів", profile.tests_completed], ["Кращий стрік", profile.longest_streak], ["Поточний стрік", profile.current_streak]].map(([label, value]) => (
          <div key={label} className="arena-card"><div className="text-3xl font-black">{value}</div><div className="text-slate-600 dark:text-arena-100/80">{label}</div></div>
        ))}
      </section>

      <section className="arena-card">
        <h2 className="text-2xl font-black">Предмети</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-4">
          {subjects.map((subject) => <div key={subject.slug} className="rounded-3xl bg-arena-50 p-4 dark:bg-arena-950"><div className="text-3xl">{subject.icon}</div><div className="font-black">{subject.nameUa}</div><div className="text-sm text-slate-600 dark:text-arena-100/80">Готово для статистики</div></div>)}
        </div>
      </section>

      <section className="arena-card">
        <h2 className="text-2xl font-black">Бейджі</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {badges.map((badge) => {
            const isEarned = earned.has(badge.slug);
            return <div key={badge.slug} className={isEarned ? "rounded-3xl bg-arena-50 p-4 dark:bg-arena-950" : "rounded-3xl bg-slate-100 p-4 opacity-60 grayscale dark:bg-slate-800"} title={isEarned ? badge.descriptionUa : undefined}><div className="text-3xl">{isEarned ? badge.emoji : "❔"}</div><div className="font-black">{isEarned ? badge.nameUa : "Таємний бейдж"}</div></div>;
          })}
        </div>
      </section>

      <section className="arena-card">
        <h2 className="text-2xl font-black">Останні сесії</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-left">
            <thead><tr className="text-sm text-slate-500"><th className="py-2">Дата</th><th>Предмет</th><th>Сайт</th><th>Результат</th><th>XP</th><th>Час</th></tr></thead>
            <tbody>{(sessions ?? []).map((session) => <tr key={session.id} className="border-t border-arena-100 dark:border-arena-900"><td className="py-3">{new Date(session.created_at).toLocaleDateString("uk-UA")}</td><td>{session.subjects?.icon} {session.subjects?.name_ua ?? "НМТ"}</td><td>{session.source_site}</td><td>{session.score}/{session.total_questions}</td><td>{session.xp_earned}</td><td>{Math.round(session.time_spent_seconds / 60)} хв</td></tr>)}</tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
