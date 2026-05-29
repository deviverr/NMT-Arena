import { describe, expect, it } from "vitest";
import { calculateXP, rankLabel } from "../src";

describe("XP calculation", () => {
  it("awards base, speed, and streak multiplier with cap", () => {
    expect(calculateXP(40, 50, 1200, 10)).toEqual({
      base: 400,
      speedBonus: 200,
      streakMultiplier: 2,
      total: 800
    });
  });

  it("returns the correct Ukrainian rank label", () => {
    expect(rankLabel(15000)).toBe("🔥 Топ Предмет");
  });
});
