"use client";

import Link from "next/link";
import { Moon, Sun, Trophy } from "lucide-react";
import { useTheme } from "next-themes";

const links = [
  { href: "/leaderboard", label: "Лідерборд" },
  { href: "/challenges", label: "Виклики" },
  { href: "/groups", label: "Групи" },
  { href: "/install", label: "Розширення" }
];

export function Navbar() {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sticky top-0 z-40 border-b border-arena-100 bg-[#f6faf7]/90 backdrop-blur dark:border-arena-900 dark:bg-[#0e1512]/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex min-h-10 items-center gap-2 rounded-2xl font-black text-arena-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arena-500 dark:text-arena-100">
          <span className="grid size-10 place-items-center rounded-2xl bg-arena-500 text-white shadow-sm">
            <Trophy aria-hidden className="size-5" />
          </span>
          NMT Arena
        </Link>
        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-2xl px-4 py-2 font-semibold text-slate-700 transition hover:bg-arena-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arena-500 dark:text-arena-100 dark:hover:bg-arena-900">
              {link.label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          aria-label="Перемкнути тему"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="grid size-10 place-items-center rounded-2xl border border-arena-200 bg-white text-arena-700 transition hover:bg-arena-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-arena-500 dark:border-arena-800 dark:bg-[#18251e] dark:text-arena-100"
        >
          <Sun className="hidden size-5 dark:block" aria-hidden />
          <Moon className="size-5 dark:hidden" aria-hidden />
        </button>
      </nav>
    </header>
  );
}
