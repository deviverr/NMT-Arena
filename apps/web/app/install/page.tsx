import Link from "next/link";
import { CheckCircle2, Download, ShieldCheck } from "lucide-react";

export default function InstallPage({ searchParams }: { searchParams: { connected?: string } }) {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6">
      {searchParams.connected ? <div className="rounded-3xl border border-arena-200 bg-arena-50 p-4 font-bold text-arena-800 dark:border-arena-800 dark:bg-arena-950 dark:text-arena-100">Акаунт підключено. Тепер відкрий popup розширення.</div> : null}
      <div className="arena-card">
        <Download className="size-10 text-arena-600" aria-hidden />
        <h1 className="mt-4 text-4xl font-black">Встановлення розширення</h1>
        <p className="mt-2 text-slate-600 dark:text-arena-100/80">Розширення працює на `zno.osvita.ua`, читає результат тесту, рахує XP і надсилає валідовану сесію в NMT Arena.</p>
        <Link href="/login?source=extension" className="arena-button mt-6">Підключити акаунт</Link>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Збери extension", "pnpm build:extension"],
          ["Відкрий Chrome", "chrome://extensions"],
          ["Load unpacked", "Обери apps/extension/dist"]
        ].map(([title, body]) => (
          <div key={title} className="arena-card">
            <CheckCircle2 className="size-7 text-arena-600" aria-hidden />
            <h2 className="mt-3 text-xl font-black">{title}</h2>
            <p className="mt-1 text-slate-600 dark:text-arena-100/80">{body}</p>
          </div>
        ))}
      </div>
      <div className="arena-card">
        <ShieldCheck className="size-8 text-arena-600" aria-hidden />
        <h2 className="mt-3 text-2xl font-black">Приватність</h2>
        <p className="mt-2 text-slate-600 dark:text-arena-100/80">Ми надсилаємо лише результат, предмет, час проходження, URL тесту і технічний fingerprint для античіту. Вміст інших сайтів не читається.</p>
      </div>
    </div>
  );
}
