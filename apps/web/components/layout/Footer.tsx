import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-arena-100 bg-white/70 py-8 dark:border-arena-900 dark:bg-[#101914]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 text-sm text-slate-600 dark:text-arena-100 sm:px-6 md:flex-row md:items-center md:justify-between">
        <p>© 2026 NMT Arena. Українська підготовка з азартом і здоровою конкуренцією.</p>
        <div className="flex flex-wrap gap-3">
          <Link className="rounded-xl px-2 py-1 hover:text-arena-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arena-500" href="/install">
            Розширення
          </Link>
          <Link className="rounded-xl px-2 py-1 hover:text-arena-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arena-500" href="/leaderboard">
            Лідерборд
          </Link>
          <a className="rounded-xl px-2 py-1 hover:text-arena-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arena-500" href="https://github.com/deviverr/NMT-Arena">
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
