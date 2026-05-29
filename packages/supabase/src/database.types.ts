export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          display_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          school: string | null;
          college: string | null;
          city: string | null;
          region: string | null;
          country: string;
          discord_username: string | null;
          instagram_handle: string | null;
          telegram_handle: string | null;
          total_xp: number;
          current_rank: string;
          current_streak: number;
          longest_streak: number;
          last_active_date: string | null;
          tests_completed: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & { id: string; username: string };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      subjects: {
        Row: { id: number; slug: string; name_ua: string; icon: string; color: string };
        Insert: { slug: string; name_ua: string; icon: string; color: string };
        Update: Partial<Database["public"]["Tables"]["subjects"]["Row"]>;
      };
      test_sessions: {
        Row: {
          id: string;
          user_id: string;
          subject_id: number | null;
          source_site: string;
          source_url: string | null;
          score: number;
          total_questions: number;
          score_percent: number;
          time_spent_seconds: number;
          xp_earned: number;
          streak_at_time: number | null;
          speed_bonus: number | null;
          streak_bonus: number | null;
          session_hash: string;
          fingerprint: Json | null;
          is_flagged: boolean | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["test_sessions"]["Row"]> & {
          user_id: string;
          source_site: string;
          score: number;
          total_questions: number;
          score_percent: number;
          time_spent_seconds: number;
          session_hash: string;
        };
        Update: Partial<Database["public"]["Tables"]["test_sessions"]["Row"]>;
      };
      xp_events: {
        Row: { id: string; user_id: string; amount: number; reason: string; session_id: string | null; created_at: string };
        Insert: { user_id: string; amount: number; reason: string; session_id?: string | null };
        Update: Partial<Database["public"]["Tables"]["xp_events"]["Row"]>;
      };
      badge_definitions: {
        Row: { id: number; slug: string; name_ua: string; description_ua: string; emoji: string; trigger_type: string; trigger_value: Json | null; is_rare: boolean | null; xp_reward: number | null };
        Insert: Omit<Database["public"]["Tables"]["badge_definitions"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["badge_definitions"]["Row"]>;
      };
      user_badges: {
        Row: { id: string; user_id: string; badge_id: number; earned_at: string };
        Insert: { user_id: string; badge_id: number };
        Update: Partial<Database["public"]["Tables"]["user_badges"]["Row"]>;
      };
      daily_challenges: {
        Row: { id: string; date: string; subject_id: number | null; title_ua: string; description_ua: string; min_score_percent: number; xp_reward: number; bonus_xp_for_first: number | null };
        Insert: Partial<Database["public"]["Tables"]["daily_challenges"]["Row"]> & { title_ua: string; description_ua: string };
        Update: Partial<Database["public"]["Tables"]["daily_challenges"]["Row"]>;
      };
      daily_challenge_completions: {
        Row: { id: string; challenge_id: string; user_id: string; session_id: string; score_percent: number; xp_earned: number; rank_at_completion: number | null; completed_at: string };
        Insert: { challenge_id: string; user_id: string; session_id: string; score_percent: number; xp_earned: number; rank_at_completion?: number | null };
        Update: Partial<Database["public"]["Tables"]["daily_challenge_completions"]["Row"]>;
      };
      quests: {
        Row: { id: number; slug: string; title_ua: string; description_ua: string; emoji: string; quest_type: string; requirement_type: string; requirement_value: Json; xp_reward: number; is_active: boolean | null };
        Insert: Omit<Database["public"]["Tables"]["quests"]["Row"], "id">;
        Update: Partial<Database["public"]["Tables"]["quests"]["Row"]>;
      };
      user_quest_progress: {
        Row: { id: string; user_id: string; quest_id: number; progress: number | null; goal: number; is_completed: boolean | null; completed_at: string | null; period_start: string };
        Insert: { user_id: string; quest_id: number; goal: number; period_start: string; progress?: number; is_completed?: boolean };
        Update: Partial<Database["public"]["Tables"]["user_quest_progress"]["Row"]>;
      };
      friends: {
        Row: { id: string; requester_id: string; addressee_id: string; status: string | null; created_at: string };
        Insert: { requester_id: string; addressee_id: string; status?: string };
        Update: Partial<Database["public"]["Tables"]["friends"]["Row"]>;
      };
      groups: {
        Row: { id: string; name: string; description: string | null; invite_code: string; owner_id: string; group_type: string | null; avatar_url: string | null; member_count: number | null; created_at: string };
        Insert: { name: string; owner_id: string; description?: string | null; group_type?: string; avatar_url?: string | null };
        Update: Partial<Database["public"]["Tables"]["groups"]["Row"]>;
      };
      group_members: {
        Row: { group_id: string; user_id: string; role: string | null; joined_at: string };
        Insert: { group_id: string; user_id: string; role?: string };
        Update: Partial<Database["public"]["Tables"]["group_members"]["Row"]>;
      };
    };
    Views: {
      leaderboard_global: { Row: Database["public"]["Tables"]["profiles"]["Row"] & { global_rank: number } };
      leaderboard_by_subject: { Row: { user_id: string; subject_slug: string; subject_name: string; subject_xp: number; tests_in_subject: number; avg_score: number; subject_rank: number } };
    };
    Functions: {
      award_xp: { Args: { p_user_id: string; p_amount: number; p_reason: string; p_session_id?: string | null }; Returns: undefined };
      update_streak: { Args: { p_user_id: string }; Returns: undefined };
    };
  };
};
