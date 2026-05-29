import Link from "next/link";
import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";
import { XPBar } from "@/components/shared/XPBar";

export default async function MyProfilePage() {
  const supabase = createServerSupabase();
  const { data: auth } = await supabase.auth.getUser();
  if (!auth.user) redirect("/login");
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", auth.user.id).single();
  if (!profile) redirect("/login");
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="arena-card">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="grid size-24 place-items-center rounded-full bg-arena-100 text-4xl font-black text-arena-700 dark:bg-arena-900 dark:text-arena-100">{profile.username.slice(0, 2).toUpperCase()}</div>
          <div className="flex-1">
            <h1 className="text-4xl font-black">{profile.display_name ?? profile.username}</h1>
            <p className="text-slate-600 dark:text-arena-100/80">@{profile.username}</p>
            <div className="mt-4"><XPBar totalXp={profile.total_xp} /></div>
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl bg-arena-50 p-4 dark:bg-arena-950"><div className="text-2xl font-black">{profile.tests_completed}</div><div>Тестів</div></div>
          <div className="rounded-3xl bg-arena-50 p-4 dark:bg-arena-950"><div className="text-2xl font-black">{profile.longest_streak}</div><div>Кращий стрік</div></div>
          <div className="rounded-3xl bg-arena-50 p-4 dark:bg-arena-950"><div className="text-2xl font-black">{profile.total_xp}</div><div>XP</div></div>
        </div>
        <Link className="arena-button mt-6" href={`/profile/${profile.username}`}>Публічний профіль</Link>
      </div>
    </div>
  );
}
