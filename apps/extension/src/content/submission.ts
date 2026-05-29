import { createSessionHash, type SessionSubmission } from "@nmt-arena/shared";
import type { DetectedResult, ExtensionStorage } from "../types";
import type { FingerprintTracker } from "./fingerprint";

const API_URL = import.meta.env.VITE_API_URL || "https://nmt-arena.fun";

export async function submitResult(result: DetectedResult, tracker: FingerprintTracker) {
  const storage = await chrome.storage.local.get(["accessToken", "userId"]) as ExtensionStorage;
  if (!storage.accessToken || !storage.userId) throw new Error("Потрібно увійти в NMT Arena");
  const fingerprint = tracker.snapshot();
  const payload: SessionSubmission = {
    ...result,
    source_site: "zno.osvita.ua",
    session_hash: await createSessionHash({
      userId: storage.userId,
      sourceUrl: result.source_url,
      score: result.score,
      total: result.total_questions,
      startedAt: fingerprint.startedAt
    }),
    fingerprint
  };
  const response = await fetch(`${API_URL}/api/sessions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${storage.accessToken}`
    },
    body: JSON.stringify(payload)
  });
  const data = await response.json() as { xp_earned?: number; new_total_xp?: number; error?: string };
  if (!response.ok) throw new Error(data.error ?? "Не вдалося зберегти результат");
  return data;
}
