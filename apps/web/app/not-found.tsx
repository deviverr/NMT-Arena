import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="arena-card">
        <h1 className="text-3xl font-black">Сторінку не знайдено</h1>
        <p className="mt-2 text-slate-600 dark:text-arena-100/80">Можливо, посилання змінилось або профіль ще не створено.</p>
        <Link className="arena-button mt-6" href="/">На головну</Link>
      </div>
    </div>
  );
}
