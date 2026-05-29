import { getRankForXP } from "@nmt-arena/shared";
import { cn } from "@/lib/utils";

export function RankBadge({ totalXp, className }: { totalXp: number; className?: string }) {
  const rank = getRankForXP(totalXp);
  return <span className={cn("rounded-full px-3 py-1 text-sm font-extrabold", rank.color, className)}>{rank.emoji} {rank.name}</span>;
}
