import { quests, subjects } from "@nmt-arena/shared";

export const revalidate = 60;

export default function ChallengesPage() {
  const math = subjects.find((subject) => subject.slug === "math") ?? subjects[0];
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-4xl font-black">Виклики та квести</h1>
        <p className="mt-2 text-slate-600 dark:text-arena-100/80">Щоденні завдання тримають темп, тижневі квести дають великий бонус.</p>
      </div>
      <section className="arena-card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-extrabold text-amber-600">{new Date().toLocaleDateString("uk-UA")} · {math.icon} {math.nameUa}</p>
            <h2 className="mt-2 text-3xl font-black">Сьогоднішній ривок</h2>
            <p className="mt-2 text-slate-600 dark:text-arena-100/80">Вимога: 70%+ на тесті з математики. Нагорода: 100 XP, перший отримує ще 50 XP.</p>
          </div>
          <div className="rounded-3xl bg-amber-100 px-5 py-4 text-center font-black text-amber-800 dark:bg-amber-950 dark:text-amber-100">Скидання о 00:00</div>
        </div>
      </section>
      <section className="grid gap-4 md:grid-cols-2">
        {quests.map((quest) => (
          <div key={quest.slug} className="arena-card">
            <div className="flex items-start gap-3">
              <div className="text-4xl">{quest.emoji}</div>
              <div className="flex-1">
                <div className="text-sm font-extrabold uppercase tracking-wide text-arena-600">{quest.questType === "daily" ? "Щоденний" : "Тижневий"}</div>
                <h2 className="text-xl font-black">{quest.titleUa}</h2>
                <p className="mt-1 text-slate-600 dark:text-arena-100/80">{quest.descriptionUa}</p>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-arena-100 dark:bg-arena-900"><div className="h-full w-1/3 rounded-full bg-arena-500" /></div>
              </div>
              <div className="rounded-full bg-amber-100 px-3 py-1 text-sm font-black text-amber-700 dark:bg-amber-950 dark:text-amber-100">+{quest.xpReward} XP</div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
