export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="arena-card animate-pulse">
        <div className="h-8 w-56 rounded-full bg-arena-100 dark:bg-arena-900" />
        <div className="mt-6 h-64 rounded-3xl bg-arena-50 dark:bg-arena-950" />
      </div>
    </div>
  );
}
