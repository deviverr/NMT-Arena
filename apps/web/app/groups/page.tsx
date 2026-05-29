export default function GroupsPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6">
      <div>
        <h1 className="text-4xl font-black">Групи</h1>
        <p className="mt-2 text-slate-600 dark:text-arena-100/80">Класи, школи та навчальні команди можуть мати власні рейтинги.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {["Шкільний клас", "Навчальна група", "Команда друзів"].map((name) => (
          <div key={name} className="arena-card">
            <h2 className="text-2xl font-black">{name}</h2>
            <p className="mt-2 text-slate-600 dark:text-arena-100/80">Створи групу, поділись кодом запрошення і змагайся у своєму колі.</p>
            <button type="button" className="arena-button mt-5">Створити</button>
          </div>
        ))}
      </div>
    </div>
  );
}
