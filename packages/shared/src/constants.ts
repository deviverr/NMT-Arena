export const APP_NAME = "NMT Arena";
export const APP_DOMAIN = "nmt-arena.fun";
export const SOURCE_SITE = "zno.osvita.ua";

export const subjects = [
  { slug: "ukrainian", nameUa: "Українська мова", icon: "📝", color: "#3B82F6" },
  { slug: "math", nameUa: "Математика", icon: "📐", color: "#8B5CF6" },
  { slug: "history", nameUa: "Історія України", icon: "📜", color: "#F59E0B" },
  { slug: "english", nameUa: "Англійська мова", icon: "🌍", color: "#10B981" },
  { slug: "biology", nameUa: "Біологія", icon: "🌱", color: "#22C55E" },
  { slug: "physics", nameUa: "Фізика", icon: "⚛️", color: "#6366F1" },
  { slug: "chemistry", nameUa: "Хімія", icon: "🧪", color: "#EC4899" },
  { slug: "geography", nameUa: "Географія", icon: "🗺️", color: "#14B8A6" }
] as const;

export type SubjectSlug = (typeof subjects)[number]["slug"];

export const ranks = [
  { threshold: 0, name: "Школяр", emoji: "🎒", color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-100" },
  { threshold: 500, name: "Абітурієнт", emoji: "📖", color: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-100" },
  { threshold: 2000, name: "Зубрила", emoji: "☕", color: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-100" },
  { threshold: 6000, name: "НМТшник", emoji: "🧠", color: "bg-violet-100 text-violet-800 dark:bg-violet-950 dark:text-violet-100" },
  { threshold: 15000, name: "Топ Предмет", emoji: "🔥", color: "bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-100" },
  { threshold: 30000, name: "200 з Усього", emoji: "👑", color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-100" }
] as const;

export const ukrainianRegions = [
  "Вінницька область",
  "Волинська область",
  "Дніпропетровська область",
  "Донецька область",
  "Житомирська область",
  "Закарпатська область",
  "Запорізька область",
  "Івано-Франківська область",
  "Київська область",
  "Кіровоградська область",
  "Луганська область",
  "Львівська область",
  "Миколаївська область",
  "Одеська область",
  "Полтавська область",
  "Рівненська область",
  "Сумська область",
  "Тернопільська область",
  "Харківська область",
  "Херсонська область",
  "Хмельницька область",
  "Черкаська область",
  "Чернівецька область",
  "Чернігівська область",
  "м. Київ"
] as const;

export const badges = [
  { slug: "first_test", nameUa: "НМТ не страшно", descriptionUa: "Пройшов перший тест", emoji: "💀", triggerType: "tests_count", triggerValue: { count: 1 }, isRare: false, xpReward: 25 },
  { slug: "night_owl", nameUa: "Сова", descriptionUa: "Пройшов тест між 00:00 та 04:00", emoji: "🌙", triggerType: "session_time", triggerValue: { from: 0, to: 4 }, isRare: false, xpReward: 30 },
  { slug: "coffee_gone", nameUa: "Кава закінчилась", descriptionUa: "5 сесій за один день", emoji: "☕", triggerType: "sessions_per_day", triggerValue: { count: 5 }, isRare: false, xpReward: 50 },
  { slug: "zombie", nameUa: "Зомбі", descriptionUa: "7 днів підряд", emoji: "🧟", triggerType: "streak", triggerValue: { days: 7 }, isRare: false, xpReward: 100 },
  { slug: "parents_dont_know", nameUa: "Батьки не знають", descriptionUa: "3 сесії після 23:00 за тиждень", emoji: "📵", triggerType: "late_night", triggerValue: { sessions: 3, hour: 23, within_days: 7 }, isRare: false, xpReward: 40 },
  { slug: "google_not_needed", nameUa: "Гугл не потрібен", descriptionUa: "10 правильних відповідей поспіль", emoji: "🎯", triggerType: "streak_answers", triggerValue: { count: 10 }, isRare: false, xpReward: 75 },
  { slug: "olympian", nameUa: "Олімпієць", descriptionUa: "Перемога у щоденному виклику", emoji: "🏅", triggerType: "daily_challenge_win", triggerValue: {}, isRare: false, xpReward: 60 },
  { slug: "excellent", nameUa: "Відмінник", descriptionUa: "95%+ на повному тесті", emoji: "🤓", triggerType: "score", triggerValue: { percent: 95, min_questions: 20 }, isRare: false, xpReward: 80 },
  { slug: "no_chance", nameUa: "Без шансів", descriptionUa: "Обігнав когось з XP на 200+ вище", emoji: "😤", triggerType: "leaderboard", triggerValue: {}, isRare: true, xpReward: 100 },
  { slug: "best_school", nameUa: "Краща школа", descriptionUa: "Твоя школа №1 в регіоні", emoji: "🏫", triggerType: "school_rank", triggerValue: { rank: 1 }, isRare: true, xpReward: 150 },
  { slug: "ghost", nameUa: "Примара", descriptionUa: "Тест рівно о 03:00", emoji: "👻", triggerType: "session_time", triggerValue: { exact_hour: 3 }, isRare: true, xpReward: 50 },
  { slug: "top_100", nameUa: "Перший крок", descriptionUa: "Потрапив у топ 100 глобально", emoji: "🚀", triggerType: "global_rank", triggerValue: { rank: 100 }, isRare: false, xpReward: 100 },
  { slug: "speed_demon", nameUa: "Блискавка", descriptionUa: "90%+ менш ніж за половину часу", emoji: "⚡", triggerType: "speed_and_score", triggerValue: { score_percent: 90, time_ratio: 0.5 }, isRare: true, xpReward: 120 },
  { slug: "grinder", nameUa: "Стаханівець", descriptionUa: "50 тестів загалом", emoji: "⛏️", triggerType: "tests_count", triggerValue: { count: 50 }, isRare: false, xpReward: 200 },
  { slug: "legend", nameUa: "Легенда Арени", descriptionUa: "Досяг рангу 200 з Усього", emoji: "👑", triggerType: "rank", triggerValue: { rank: "👑 200 з Усього" }, isRare: true, xpReward: 500 }
] as const;

export const quests = [
  { slug: "daily_3_tests", titleUa: "Трійка за день", descriptionUa: "Пройди 3 тести сьогодні", emoji: "📚", questType: "daily", requirementType: "tests_count", requirementValue: { count: 3 }, xpReward: 75 },
  { slug: "daily_80_score", titleUa: "Стабільний результат", descriptionUa: "Отримай 80%+ у будь-якому тесті", emoji: "✅", questType: "daily", requirementType: "score_threshold", requirementValue: { percent: 80 }, xpReward: 60 },
  { slug: "weekly_10_tests", titleUa: "Тижневий марафон", descriptionUa: "Пройди 10 тестів за тиждень", emoji: "🏃", questType: "weekly", requirementType: "tests_count", requirementValue: { count: 10 }, xpReward: 250 },
  { slug: "weekly_math_focus", titleUa: "Математичний ривок", descriptionUa: "Пройди 5 тестів з математики", emoji: "📐", questType: "weekly", requirementType: "subject_tests", requirementValue: { subject: "math", count: 5 }, xpReward: 220 }
] as const;

export const uiText = {
  installExtension: "Встановити розширення",
  openLeaderboard: "Відкрити лідерборд",
  loginGoogle: "Увійти через Google",
  loginDiscord: "Увійти через Discord",
  daily: "Щоденні",
  weekly: "Тижневі",
  retry: "Спробувати ще раз",
  emptyLeaderboard: "Поки що ніхто не набрав XP. Саме час стати першим.",
  loading: "Завантаження...",
  error: "Щось пішло не так"
} as const;
