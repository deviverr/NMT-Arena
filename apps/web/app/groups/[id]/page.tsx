export default function GroupPage({ params }: { params: { id: string } }) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <div className="arena-card">
        <p className="font-bold text-arena-600">Група {params.id}</p>
        <h1 className="mt-2 text-4xl font-black">Груповий лідерборд</h1>
        <p className="mt-2 text-slate-600 dark:text-arena-100/80">Після підключення Supabase тут з'являться учасники, ролі та рейтинг групи.</p>
      </div>
    </div>
  );
}
