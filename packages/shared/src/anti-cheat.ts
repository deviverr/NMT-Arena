import type { SessionSubmission } from "./schemas";

export type AntiCheatResult = {
  ok: boolean;
  reasons: string[];
};

export function validateSessionPlausibility(session: SessionSubmission): AntiCheatResult {
  const reasons: string[] = [];
  if (session.score > session.total_questions) reasons.push("score_exceeds_total");
  if (session.total_questions < 3) reasons.push("too_few_questions");
  if (session.time_spent_seconds < session.total_questions * 5) reasons.push("too_fast");
  if (session.fingerprint.completedAt <= session.fingerprint.startedAt) reasons.push("invalid_timing");
  if (session.fingerprint.visibilityChanges > 20) reasons.push("too_many_visibility_changes");
  const eventCount = session.fingerprint.answerEvents.length;
  if (eventCount > 0 && eventCount < Math.min(session.score, session.total_questions) * 0.25) reasons.push("low_interaction_trace");
  return { ok: reasons.length === 0, reasons };
}

export async function createSessionHash(input: {
  userId: string;
  sourceUrl: string;
  score: number;
  total: number;
  startedAt: number;
}): Promise<string> {
  const minuteWindow = Math.floor(input.startedAt / 60000);
  const payload = `${input.userId}:${input.sourceUrl}:${input.score}:${input.total}:${minuteWindow}`;
  const bytes = new TextEncoder().encode(payload);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return [...new Uint8Array(digest)].map((byte) => byte.toString(16).padStart(2, "0")).join("");
}
