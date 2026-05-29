import Link from "next/link";
import { subjects, ukrainianRegions } from "@nmt-arena/shared";

export function LeaderboardFilters({ selectedSubject }: { selectedSubject?: string }) {
  return (
    <div className="arena-card sticky top-[73px] z-20 space-y-4">
      <div className="flex flex-wrap gap-2">
        <Link className="arena-button-secondary px-4 py-2" href="/leaderboard">Всі предмети</Link>
        {subjects.map((subject) => (
          <Link
            key={subject.slug}
            className={selectedSubject === subject.slug ? "arena-button px-4 py-2" : "arena-button-secondary px-4 py-2"}
            href={`/leaderboard/${subject.slug}`}
          >
            <span aria-hidden>{subject.icon}</span>
            {subject.nameUa}
          </Link>
        ))}
      </div>
      <div className="grid gap-3 md:grid-cols-3">
        <select className="min-h-10 rounded-2xl border border-arena-200 bg-white px-4 dark:border-arena-800 dark:bg-[#101914]" aria-label="Обрати масштаб">
          <option>Країна</option>
          <option>Регіон</option>
          <option>Місто</option>
        </select>
        <select className="min-h-10 rounded-2xl border border-arena-200 bg-white px-4 dark:border-arena-800 dark:bg-[#101914]" aria-label="Обрати регіон">
          {ukrainianRegions.map((region) => <option key={region}>{region}</option>)}
        </select>
        <input className="min-h-10 rounded-2xl border border-arena-200 bg-white px-4 dark:border-arena-800 dark:bg-[#101914]" placeholder="Пошук міста" aria-label="Пошук міста" />
      </div>
    </div>
  );
}
