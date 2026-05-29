insert into subjects (slug, name_ua, icon, color) values
('ukrainian', 'Українська мова', '📝', '#3B82F6'),
('math', 'Математика', '📐', '#8B5CF6'),
('history', 'Історія України', '📜', '#F59E0B'),
('english', 'Англійська мова', '🌍', '#10B981'),
('biology', 'Біологія', '🌱', '#22C55E'),
('physics', 'Фізика', '⚛️', '#6366F1'),
('chemistry', 'Хімія', '🧪', '#EC4899'),
('geography', 'Географія', '🗺️', '#14B8A6')
on conflict (slug) do update set name_ua = excluded.name_ua, icon = excluded.icon, color = excluded.color;

insert into badge_definitions (slug, name_ua, description_ua, emoji, trigger_type, trigger_value, is_rare, xp_reward) values
('first_test', 'НМТ не страшно', 'Пройшов перший тест', '💀', 'tests_count', '{"count": 1}', false, 25),
('night_owl', 'Сова', 'Пройшов тест між 00:00 та 04:00', '🌙', 'session_time', '{"from": 0, "to": 4}', false, 30),
('coffee_gone', 'Кава закінчилась', '5 сесій за один день', '☕', 'sessions_per_day', '{"count": 5}', false, 50),
('zombie', 'Зомбі', '7 днів підряд', '🧟', 'streak', '{"days": 7}', false, 100),
('parents_dont_know', 'Батьки не знають', '3 сесії після 23:00 за тиждень', '📵', 'late_night', '{"sessions": 3, "hour": 23, "within_days": 7}', false, 40),
('google_not_needed', 'Гугл не потрібен', '10 правильних відповідей поспіль', '🎯', 'streak_answers', '{"count": 10}', false, 75),
('olympian', 'Олімпієць', 'Перемога у щоденному виклику', '🏅', 'daily_challenge_win', '{}', false, 60),
('excellent', 'Відмінник', '95%+ на повному тесті', '🤓', 'score', '{"percent": 95, "min_questions": 20}', false, 80),
('no_chance', 'Без шансів', 'Обігнав когось з XP на 200+ вище', '😤', 'leaderboard', '{}', true, 100),
('best_school', 'Краща школа', 'Твоя школа №1 в регіоні', '🏫', 'school_rank', '{"rank": 1}', true, 150),
('ghost', 'Примара', 'Тест рівно о 03:00', '👻', 'session_time', '{"exact_hour": 3}', true, 50),
('top_100', 'Перший крок', 'Потрапив у топ 100 глобально', '🚀', 'global_rank', '{"rank": 100}', false, 100),
('speed_demon', 'Блискавка', '90%+ менш ніж за половину часу', '⚡', 'speed_and_score', '{"score_percent": 90, "time_ratio": 0.5}', true, 120),
('grinder', 'Стаханівець', '50 тестів загалом', '⛏️', 'tests_count', '{"count": 50}', false, 200),
('legend', 'Легенда Арени', 'Досяг рангу 200 з Усього', '👑', 'rank', '{"rank": "👑 200 з Усього"}', true, 500)
on conflict (slug) do update set
  name_ua = excluded.name_ua,
  description_ua = excluded.description_ua,
  emoji = excluded.emoji,
  trigger_type = excluded.trigger_type,
  trigger_value = excluded.trigger_value,
  is_rare = excluded.is_rare,
  xp_reward = excluded.xp_reward;

insert into quests (slug, title_ua, description_ua, emoji, quest_type, requirement_type, requirement_value, xp_reward) values
('daily_3_tests', 'Трійка за день', 'Пройди 3 тести сьогодні', '📚', 'daily', 'tests_count', '{"count": 3}', 75),
('daily_80_score', 'Стабільний результат', 'Отримай 80%+ у будь-якому тесті', '✅', 'daily', 'score_threshold', '{"percent": 80}', 60),
('weekly_10_tests', 'Тижневий марафон', 'Пройди 10 тестів за тиждень', '🏃', 'weekly', 'tests_count', '{"count": 10}', 250),
('weekly_math_focus', 'Математичний ривок', 'Пройди 5 тестів з математики', '📐', 'weekly', 'subject_tests', '{"subject": "math", "count": 5}', 220)
on conflict (slug) do update set
  title_ua = excluded.title_ua,
  description_ua = excluded.description_ua,
  emoji = excluded.emoji,
  quest_type = excluded.quest_type,
  requirement_type = excluded.requirement_type,
  requirement_value = excluded.requirement_value,
  xp_reward = excluded.xp_reward,
  is_active = true;

insert into daily_challenges (date, subject_id, title_ua, description_ua, min_score_percent, xp_reward, bonus_xp_for_first)
select current_date, id, 'Сьогоднішній ривок', 'Набери 70%+ у тесті з математики та забери бонус XP.', 70, 100, 50
from subjects where slug = 'math'
on conflict (date) do nothing;
