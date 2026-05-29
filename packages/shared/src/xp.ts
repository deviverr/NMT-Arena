import { ranks } from "./constants";

export type XPBreakdown = {
  base: number;
  speedBonus: number;
  streakMultiplier: number;
  total: number;
};

export function calculateXP(score: number, total: number, timeSpentSeconds: number, currentStreak: number): XPBreakdown {
  const safeTotal = Math.max(total, 1);
  const base = score * 10;
  const avgTimePerQuestion = timeSpentSeconds / safeTotal;
  const speedBonus = avgTimePerQuestion < 30 ? score * 5 : 0;
  const streakMultiplier = currentStreak >= 10 ? 2.0 : currentStreak >= 5 ? 1.5 : 1.0;
  const totalBeforeCap = Math.min((base + speedBonus) * streakMultiplier, 800);
  return {
    base,
    speedBonus,
    streakMultiplier,
    total: Math.floor(totalBeforeCap)
  };
}

export function getRankForXP(totalXp: number) {
  return [...ranks].reverse().find((rank) => totalXp >= rank.threshold) ?? ranks[0];
}

export function getNextRank(totalXp: number) {
  return ranks.find((rank) => rank.threshold > totalXp) ?? null;
}

export function rankLabel(totalXp: number) {
  const rank = getRankForXP(totalXp);
  return `${rank.emoji} ${rank.name}`;
}

export function rankProgress(totalXp: number) {
  const current = getRankForXP(totalXp);
  const next = getNextRank(totalXp);
  if (!next) return { current, next, percent: 100, remaining: 0 };
  const span = next.threshold - current.threshold;
  const earned = totalXp - current.threshold;
  return { current, next, percent: Math.min(100, Math.round((earned / span) * 100)), remaining: next.threshold - totalXp };
}
