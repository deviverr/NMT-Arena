import Link from "next/link";
import { badges, ranks, subjects } from "@nmt-arena/shared";
import { ArrowRight, BadgeCheck, Download, Flame, Trophy } from "lucide-react";
import { XPBar } from "@/components/shared/XPBar";
import { RankBadge } from "@/components/shared/RankBadge";

export const revalidate = 60;

const demoRows = [
  { name: "Марічка", xp: 18340, tests: 92 },
  { name: "Данило", xp: 16710, tests: 84 },
  { name: "Софія", xp: 14990, tests: 76 },
  { name: "Артем", xp: 13120, tests: 68 },
  { name: "Іра", xp: 11980, tests: 61 }
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      <section className="relative min-h-[calc(100vh-73px)] px-4 py-16 sm:px-6">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,#D4EDDA,transparent_34%),radial-gradient(circle_at_80%_10%,#FDE68A,transparent_28%),linear-gradient(135deg,#F6FAF7,#E9F8EE)] dark:bg-[radial-gradient(circle_at_20%_20%,#0F6033,transparent_34%),radial-gradient(circle_at_80%_10%,#78350F,transparent_28%),linear-gradient(135deg,#0E1512,#14201A)]" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full bg-white/80 px-4 py-2 text-sm font-extrabold text-arena-700 shadow-sm dark:bg-[#14201a] dark:text-arena-100">НМТ, але з XP, стріками і чесною конкуренцією</span>
            <h1 className="mt-6 text-5xl font-black leading-tight text-arena-900 dark:text-arena-50 md:text-7xl">Готуйся до НМТ з кайфом 🏟️</h1>
            <p className="mt-6 text-xl leading-8 text-slate-700 dark:text-arena-100">Встанови розширення, проходь реальні тести на ZNO.Osvita, отримуй XP автоматично та піднімайся в українському лідерборді.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link className="arena-button" href="/install"><Download className="size-5" aria-hidden />Встановити розширення</Link>
              <Link className="arena-button-secondary" href="/leaderboard">Відкрити лідерборд<ArrowRight className="size-5" aria-hidden /></Link>
            </div>
          </div>
          <div className="arena-card shadow-soft">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black">Топ сьогодні</h2>
              <Trophy className="size-7 text-amber-500" aria-hidden />
            </div>
            <div className="mt-5 space-y-3">
              {demoRows.map((row, index) => (
                <div key={row.name} className="flex items-center gap-3 rounded-3xl bg-arena-50 p-3 dark:bg-arena-950">
                  <div className="grid size-10 place-items-center rounded-full bg-white font-black text-arena-700 dark:bg-[#14201a] dark:text-arena-100">{index + 1}</div>
                  <div className="min-w-0 flex-1">
                    <div className="font-extrabold">{row.name}</div>
                    <div className="text-sm text-slate-500 dark:text-arena-100/70">{row.tests} тестів</div>
                  </div>
                  <RankBadge totalXp={row.xp} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["1", "Встанови розширення", "Chrome MV3 читає результат тесту та показує живий HUD."],
            ["2", "Проходь тести", "Працюй на знайомому zno.osvita.ua без зміни звичок."],
            ["3", "Заробляй XP", "Стріки, бейджі, щоденні виклики та ранги оновлюються автоматично."]
          ].map(([step, title, body]) => (
            <div key={step} className="arena-card">
              <div className="grid size-12 place-items-center rounded-2xl bg-arena-500 text-xl font-black text-white">{step}</div>
              <h2 className="mt-5 text-2xl font-black">{title}</h2>
              <p className="mt-2 text-slate-600 dark:text-arena-100/80">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white/60 py-16 dark:bg-[#101914]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-3xl font-black">Ранги</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {ranks.map((rank) => (
              <div key={rank.name} className="arena-card">
                <div className="text-4xl">{rank.emoji}</div>
                <h3 className="mt-3 text-xl font-black">{rank.name}</h3>
                <p className="text-slate-600 dark:text-arena-100/80">Від {rank.threshold.toLocaleString("uk-UA")} XP</p>
                <div className="mt-4"><XPBar totalXp={rank.threshold} /></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-center gap-3">
          <BadgeCheck className="size-8 text-arena-600" aria-hidden />
          <h2 className="text-3xl font-black">Бейджі</h2>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {badges.map((badge) => (
            <div key={badge.slug} className="rounded-3xl border border-arena-100 bg-white p-4 shadow-sm dark:border-arena-900 dark:bg-[#14201a]">
              <div className="text-3xl">{badge.emoji}</div>
              <h3 className="mt-2 font-black">{badge.nameUa}</h3>
              <p className="mt-1 text-sm text-slate-600 dark:text-arena-100/80">{badge.descriptionUa}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="arena-card flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-600"><Flame aria-hidden /> Щоденний виклик</div>
            <h2 className="mt-2 text-3xl font-black">Набери 70%+ з математики</h2>
            <p className="mt-2 text-slate-600 dark:text-arena-100/80">До опівночі лишається один шанс забрати бонус і піднятись у рейтингу.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {subjects.slice(0, 4).map((subject) => <span key={subject.slug} className="rounded-full px-3 py-1 text-sm font-bold text-white" style={{ backgroundColor: subject.color }}>{subject.icon} {subject.nameUa}</span>)}
          </div>
        </div>
      </section>
    </div>
  );
}
