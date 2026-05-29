"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="arena-card">
        <h1 className="text-3xl font-black">Щось пішло не так</h1>
        <p className="mt-2 text-slate-600 dark:text-arena-100/80">Сторінка не завантажилась. Спробуй оновити її ще раз.</p>
        <button type="button" onClick={reset} className="arena-button mt-6">Спробувати ще раз</button>
      </div>
    </div>
  );
}
