import type { DetectedResult } from "../types";

const subjectHints = [
  { slug: "math", words: ["математика", "математики"] },
  { slug: "ukrainian", words: ["українська мова", "української мови"] },
  { slug: "history", words: ["історія україни", "історії україни"] },
  { slug: "english", words: ["англійська", "англійської"] },
  { slug: "biology", words: ["біологія", "біології"] },
  { slug: "physics", words: ["фізика", "фізики"] },
  { slug: "chemistry", words: ["хімія", "хімії"] },
  { slug: "geography", words: ["географія", "географії"] }
] as const;

export function detectZnoResult(): DetectedResult | null {
  const text = normalize(document.body.innerText);
  const score = findScore(text);
  if (!score) return null;
  const timeSpentSeconds = findTimeSpent(text) ?? Math.max(score.total * 60, 60);
  return {
    subject_slug: detectSubject(text),
    source_site: "zno.osvita.ua",
    source_url: location.href,
    score: score.score,
    total_questions: score.total,
    time_spent_seconds: timeSpentSeconds
  };
}

function normalize(value: string) {
  return value.replace(/\s+/g, " ").toLowerCase();
}

function findScore(text: string) {
  const patterns = [
    /правильн(?:их|і)\s+відповід(?:ей|і)\s*[:\-]?\s*(\d+)\s*(?:з|\/)\s*(\d+)/i,
    /результат\s*[:\-]?\s*(\d+)\s*(?:з|\/)\s*(\d+)/i,
    /(\d+)\s*(?:з|\/)\s*(\d+)\s*(?:правильн|бал)/i
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (!match) continue;
    const score = Number(match[1]);
    const total = Number(match[2]);
    if (Number.isFinite(score) && Number.isFinite(total) && total >= 3 && score <= total) return { score, total };
  }
  return null;
}

function findTimeSpent(text: string) {
  const hourMinute = text.match(/(\d+)\s*год\D+(\d+)\s*хв/i);
  if (hourMinute) return Number(hourMinute[1]) * 3600 + Number(hourMinute[2]) * 60;
  const minute = text.match(/(\d+)\s*хв/i);
  if (minute) return Number(minute[1]) * 60;
  return null;
}

function detectSubject(text: string) {
  for (const subject of subjectHints) {
    if (subject.words.some((word) => text.includes(word))) return subject.slug;
  }
  return undefined;
}
