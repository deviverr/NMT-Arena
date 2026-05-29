create extension if not exists pgcrypto;
create extension if not exists pg_trgm;

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null check (username ~ '^[A-Za-z0-9_]{3,32}$'),
  display_name text,
  avatar_url text,
  bio text,
  school text,
  college text,
  city text,
  region text,
  country text default 'Україна',
  discord_username text,
  instagram_handle text,
  telegram_handle text,
  total_xp integer default 0 check (total_xp >= 0),
  current_rank text default '🎒 Школяр',
  current_streak integer default 0 check (current_streak >= 0),
  longest_streak integer default 0 check (longest_streak >= 0),
  last_active_date date,
  tests_completed integer default 0 check (tests_completed >= 0),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table subjects (
  id serial primary key,
  slug text unique not null,
  name_ua text not null,
  icon text not null,
  color text not null
);

create table test_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  subject_id integer references subjects(id),
  source_site text not null,
  source_url text,
  score integer not null check (score >= 0),
  total_questions integer not null check (total_questions >= 3),
  score_percent numeric(5,2) not null check (score_percent >= 0 and score_percent <= 100),
  time_spent_seconds integer not null check (time_spent_seconds > 0),
  xp_earned integer not null default 0,
  streak_at_time integer default 0,
  speed_bonus integer default 0,
  streak_bonus integer default 0,
  session_hash text unique not null,
  fingerprint jsonb,
  is_flagged boolean default false,
  created_at timestamptz default now(),
  check (score <= total_questions)
);

create table xp_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  amount integer not null,
  reason text not null,
  session_id uuid references test_sessions(id),
  created_at timestamptz default now()
);

create table badge_definitions (
  id serial primary key,
  slug text unique not null,
  name_ua text not null,
  description_ua text not null,
  emoji text not null,
  trigger_type text not null,
  trigger_value jsonb,
  is_rare boolean default false,
  xp_reward integer default 0
);

create table user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  badge_id integer references badge_definitions(id) not null,
  earned_at timestamptz default now(),
  unique(user_id, badge_id)
);

create table daily_challenges (
  id uuid primary key default gen_random_uuid(),
  date date unique not null default current_date,
  subject_id integer references subjects(id),
  title_ua text not null,
  description_ua text not null,
  min_score_percent numeric(5,2) not null default 70,
  xp_reward integer not null default 100,
  bonus_xp_for_first integer default 50
);

create table daily_challenge_completions (
  id uuid primary key default gen_random_uuid(),
  challenge_id uuid references daily_challenges(id) not null,
  user_id uuid references profiles(id) not null,
  session_id uuid references test_sessions(id) not null,
  score_percent numeric(5,2) not null,
  xp_earned integer not null,
  rank_at_completion integer,
  completed_at timestamptz default now(),
  unique(challenge_id, user_id)
);

create table quests (
  id serial primary key,
  slug text unique not null,
  title_ua text not null,
  description_ua text not null,
  emoji text not null,
  quest_type text not null check (quest_type in ('daily', 'weekly')),
  requirement_type text not null,
  requirement_value jsonb not null,
  xp_reward integer not null,
  is_active boolean default true
);

create table user_quest_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade not null,
  quest_id integer references quests(id) not null,
  progress integer default 0,
  goal integer not null,
  is_completed boolean default false,
  completed_at timestamptz,
  period_start date not null,
  unique(user_id, quest_id, period_start)
);

create table friends (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references profiles(id) on delete cascade not null,
  addressee_id uuid references profiles(id) on delete cascade not null,
  status text default 'pending' check (status in ('pending', 'accepted', 'declined')),
  created_at timestamptz default now(),
  unique(requester_id, addressee_id),
  check (requester_id <> addressee_id)
);

create table groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  invite_code text unique not null default upper(substring(gen_random_uuid()::text, 1, 8)),
  owner_id uuid references profiles(id) on delete cascade not null,
  group_type text default 'general' check (group_type in ('general', 'school_class', 'study_group')),
  avatar_url text,
  member_count integer default 1,
  created_at timestamptz default now()
);

create table group_members (
  group_id uuid references groups(id) on delete cascade not null,
  user_id uuid references profiles(id) on delete cascade not null,
  role text default 'member' check (role in ('owner', 'admin', 'member')),
  joined_at timestamptz default now(),
  primary key (group_id, user_id)
);

alter table profiles enable row level security;
alter table test_sessions enable row level security;
alter table xp_events enable row level security;
alter table user_badges enable row level security;
alter table daily_challenge_completions enable row level security;
alter table user_quest_progress enable row level security;
alter table friends enable row level security;
alter table groups enable row level security;
alter table group_members enable row level security;

create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);
create policy "Users can insert own profile" on profiles for insert with check (auth.uid() = id);

create policy "Subjects are public" on subjects for select using (true);
create policy "Users can insert own sessions" on test_sessions for insert with check (auth.uid() = user_id);
create policy "Sessions are publicly readable" on test_sessions for select using (true);
create policy "Users can read own xp events" on xp_events for select using (auth.uid() = user_id);
create policy "Badges are publicly readable" on user_badges for select using (true);
create policy "Completions are publicly readable" on daily_challenge_completions for select using (true);
create policy "Users can insert own completions" on daily_challenge_completions for insert with check (auth.uid() = user_id);
create policy "Users can read own quest progress" on user_quest_progress for select using (auth.uid() = user_id);
create policy "Users can update own quest progress" on user_quest_progress for update using (auth.uid() = user_id);
create policy "Friends are readable by participants" on friends for select using (auth.uid() = requester_id or auth.uid() = addressee_id);
create policy "Users can insert friend requests" on friends for insert with check (auth.uid() = requester_id);
create policy "Users can update received requests" on friends for update using (auth.uid() = addressee_id);
create policy "Groups are publicly readable" on groups for select using (true);
create policy "Owners can update groups" on groups for update using (auth.uid() = owner_id);
create policy "Group members are publicly readable" on group_members for select using (true);
create policy "Users can join groups" on group_members for insert with check (auth.uid() = user_id);
create policy "Users can leave groups" on group_members for delete using (auth.uid() = user_id);

create index profiles_total_xp_idx on profiles (total_xp desc);
create index profiles_region_trgm_idx on profiles using gin (region gin_trgm_ops);
create index profiles_city_trgm_idx on profiles using gin (city gin_trgm_ops);
create index test_sessions_user_created_idx on test_sessions (user_id, created_at desc);
create index test_sessions_subject_created_idx on test_sessions (subject_id, created_at desc);
create index xp_events_user_created_idx on xp_events (user_id, created_at desc);

create or replace view leaderboard_global as
select
  p.id, p.username, p.display_name, p.avatar_url,
  p.total_xp, p.current_rank, p.current_streak,
  p.city, p.region, p.country, p.school,
  p.tests_completed,
  rank() over (order by p.total_xp desc) as global_rank
from profiles p
order by p.total_xp desc;

create or replace view leaderboard_by_subject as
select
  ts.user_id, s.slug as subject_slug, s.name_ua as subject_name,
  sum(ts.xp_earned) as subject_xp,
  count(*) as tests_in_subject,
  avg(ts.score_percent) as avg_score,
  rank() over (partition by s.slug order by sum(ts.xp_earned) desc) as subject_rank
from test_sessions ts
join subjects s on ts.subject_id = s.id
where ts.is_flagged = false
group by ts.user_id, s.slug, s.name_ua;

create or replace function public.rank_for_xp(p_xp integer) returns text language sql immutable as $$
  select case
    when p_xp >= 30000 then '👑 200 з Усього'
    when p_xp >= 15000 then '🔥 Топ Предмет'
    when p_xp >= 6000  then '🧠 НМТшник'
    when p_xp >= 2000  then '☕ Зубрила'
    when p_xp >= 500   then '📖 Абітурієнт'
    else '🎒 Школяр'
  end
$$;

create or replace function award_xp(
  p_user_id uuid,
  p_amount integer,
  p_reason text,
  p_session_id uuid default null
) returns integer language plpgsql security definer set search_path = public as $$
declare
  today_awarded integer;
  capped_amount integer;
  new_xp integer;
begin
  select coalesce(sum(amount), 0) into today_awarded
  from xp_events
  where user_id = p_user_id
    and created_at >= date_trunc('day', now())
    and reason in ('test_complete', 'speed_bonus', 'streak_bonus');

  if p_reason in ('test_complete', 'speed_bonus', 'streak_bonus') then
    capped_amount := greatest(0, least(p_amount, 2000 - today_awarded));
  else
    capped_amount := greatest(0, p_amount);
  end if;

  if capped_amount = 0 then
    return 0;
  end if;

  update profiles
  set total_xp = total_xp + capped_amount,
      updated_at = now()
  where id = p_user_id
  returning total_xp into new_xp;

  insert into xp_events (user_id, amount, reason, session_id)
  values (p_user_id, capped_amount, p_reason, p_session_id);

  update profiles set current_rank = rank_for_xp(new_xp) where id = p_user_id;
  return capped_amount;
end;
$$;

create or replace function update_streak(p_user_id uuid) returns integer language plpgsql security definer set search_path = public as $$
declare
  last_date date;
  today date := current_date;
  new_streak integer;
begin
  select last_active_date into last_date from profiles where id = p_user_id for update;
  if last_date = today - 1 then
    update profiles
    set current_streak = current_streak + 1,
        longest_streak = greatest(longest_streak, current_streak + 1),
        last_active_date = today,
        tests_completed = tests_completed + 1,
        updated_at = now()
    where id = p_user_id
    returning current_streak into new_streak;
  elsif last_date = today then
    update profiles
    set tests_completed = tests_completed + 1,
        updated_at = now()
    where id = p_user_id
    returning current_streak into new_streak;
  else
    update profiles
    set current_streak = 1,
        longest_streak = greatest(longest_streak, 1),
        last_active_date = today,
        tests_completed = tests_completed + 1,
        updated_at = now()
    where id = p_user_id
    returning current_streak into new_streak;
  end if;
  return coalesce(new_streak, 0);
end;
$$;
