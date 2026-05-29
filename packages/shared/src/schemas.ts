import { z } from "zod";
import { subjects } from "./constants";

const subjectSlugs = subjects.map((subject) => subject.slug) as [string, ...string[]];

export const subjectSlugSchema = z.enum(subjectSlugs);

export const profileSchema = z.object({
  id: z.string().uuid(),
  username: z.string().min(3).max(32).regex(/^[a-zA-Z0-9_]+$/),
  display_name: z.string().nullable().optional(),
  avatar_url: z.string().url().nullable().optional(),
  bio: z.string().max(240).nullable().optional(),
  school: z.string().nullable().optional(),
  college: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  region: z.string().nullable().optional(),
  country: z.string().default("Україна"),
  total_xp: z.number().int().nonnegative().default(0),
  current_rank: z.string().default("🎒 Школяр"),
  current_streak: z.number().int().nonnegative().default(0),
  longest_streak: z.number().int().nonnegative().default(0),
  tests_completed: z.number().int().nonnegative().default(0)
});

export const sessionSubmissionSchema = z.object({
  subject_slug: subjectSlugSchema.optional(),
  source_site: z.literal("zno.osvita.ua"),
  source_url: z.string().url(),
  score: z.number().int().min(0),
  total_questions: z.number().int().min(3).max(200),
  time_spent_seconds: z.number().int().min(15).max(60 * 60 * 6),
  session_hash: z.string().min(32).max(128),
  fingerprint: z.object({
    startedAt: z.number().int().positive(),
    completedAt: z.number().int().positive(),
    userAgent: z.string().min(1),
    viewport: z.object({ width: z.number().int().positive(), height: z.number().int().positive() }),
    answerEvents: z.array(z.object({ at: z.number().int().nonnegative(), question: z.number().int().nonnegative() })).max(400),
    visibilityChanges: z.number().int().nonnegative()
  })
});

export const leaderboardQuerySchema = z.object({
  subject: subjectSlugSchema.optional(),
  period: z.enum(["all", "month", "week", "today"]).default("all"),
  scope: z.enum(["country", "region", "city"]).default("country"),
  region: z.string().optional(),
  city: z.string().optional(),
  limit: z.coerce.number().int().min(1).max(100).default(50)
});

export const leaderboardRowSchema = z.object({
  id: z.string().uuid(),
  username: z.string(),
  display_name: z.string().nullable(),
  avatar_url: z.string().nullable(),
  total_xp: z.number(),
  current_rank: z.string(),
  current_streak: z.number(),
  tests_completed: z.number(),
  school: z.string().nullable(),
  city: z.string().nullable(),
  region: z.string().nullable(),
  global_rank: z.number()
});

export type Profile = z.infer<typeof profileSchema>;
export type SessionSubmission = z.infer<typeof sessionSubmissionSchema>;
export type LeaderboardQuery = z.infer<typeof leaderboardQuerySchema>;
export type LeaderboardRow = z.infer<typeof leaderboardRowSchema>;
