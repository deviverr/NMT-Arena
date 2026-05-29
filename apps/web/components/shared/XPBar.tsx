import { rankProgress } from "@nmt-arena/shared";
import { formatXP } from "@/lib/utils";

export function XPBar({ totalXp }: { totalXp: number }) {
  const progress = rankProgress(totalXp);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm font-semibold">
        <span>{progress.current.emoji} {progress.current.name}</span>
        <span>{progress.next ? `${formatXP(progress.remaining)} XP до ${progress.next.name}` : "Максимальний ранг"}</span>
      </div>
      <div className="h-3 overflow-hidden rounded-full bg-arena-100 dark:bg-arena-900">
        <div className="h-full rounded-full bg-gradient-to-r from-arena-500 to-amber-400 transition-all" style={{ width: `${progress.percent}%` }} />
      </div>
    </div>
  );
}
