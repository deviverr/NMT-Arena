import type { SessionSubmission } from "@nmt-arena/shared";

export type StoredProfile = {
  username: string;
  displayName: string;
  avatarUrl?: string;
  totalXp: number;
  currentRank: string;
  currentStreak: number;
};

export type ExtensionStorage = {
  accessToken?: string;
  userId?: string;
  profile?: StoredProfile;
};

export type DetectedResult = Omit<SessionSubmission, "session_hash" | "fingerprint" | "source_site"> & {
  source_site?: "zno.osvita.ua";
};
