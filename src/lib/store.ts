/**
 * DyslexiaCare AI — local-first state layer.
 * All persistence is browser LocalStorage. There is no backend, no API keys.
 */
import { useSyncExternalStore } from "react";

export const STORAGE_KEY = "dyslexiaCareUser";

export type Companion = "dragon" | "fox" | "owl" | "rabbit";
export type ThemeName = "light" | "warm" | "contrast" | "dark";

export type Settings = {
  theme: ThemeName;
  fontScale: number; // 0.95 | 1 | 1.1 | 1.2
  letterSpacing: number; // em
  lineHeight: number;
  readingSpeed: number; // 0.75 | 1 | 1.25 | 1.5
  focusMode: boolean;
  sound: boolean;
};

export type Fingerprint = {
  reading: number;
  spelling: number;
  phonics: number;
  vocabulary: number;
  comprehension: number;
};

export type Quest = { id: string; label: string; target: number; progress: number };

export type LevelResult = { stars: number; correct: number; xp: number; completedAt: string };

export type User = {
  name: string;
  age: number;
  email: string;
  learningLevel: "beginner" | "developing" | "confident";
  interests: string[];
  companion: Companion;
  profileComplete: boolean;
};

export type AppState = {
  user: User | null;
  xp: number;
  coins: number;
  streak: number;
  lastActiveDate: string | null;
  currentLevel: number;
  completedLevels: Record<number, LevelResult>;
  badges: string[];
  dragonStage: number; // 0..4
  fingerprint: Fingerprint;
  fingerprintHistory: Fingerprint;
  weeklyMinutes: number[];
  quests: Quest[];
  questDate: string | null;
  settings: Settings;
};

export const DEFAULT_SETTINGS: Settings = {
  theme: "light",
  fontScale: 1,
  letterSpacing: 0.01,
  lineHeight: 1.65,
  readingSpeed: 1,
  focusMode: false,
  sound: true,
};

const DEFAULT_QUESTS: Quest[] = [
  { id: "lesson", label: "Complete 1 reading lesson", target: 1, progress: 0 },
  { id: "words", label: "Practice 10 words", target: 10, progress: 0 },
  { id: "spelling", label: "Finish 1 spelling challenge", target: 1, progress: 0 },
];

export const DEFAULT_STATE: AppState = {
  user: null,
  xp: 0,
  coins: 0,
  streak: 0,
  lastActiveDate: null,
  currentLevel: 1,
  completedLevels: {},
  badges: [],
  dragonStage: 0,
  fingerprint: { reading: 62, spelling: 54, phonics: 66, vocabulary: 71, comprehension: 64 },
  fingerprintHistory: { reading: 55, spelling: 48, phonics: 58, vocabulary: 64, comprehension: 57 },
  weeklyMinutes: [12, 22, 0, 34, 18, 26, 9],
  quests: DEFAULT_QUESTS,
  questDate: null,
  settings: DEFAULT_SETTINGS,
};

let state: AppState = DEFAULT_STATE;
let hydrated = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function persist() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    /* storage unavailable — session-only */
  }
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function hydrate() {
  if (hydrated || typeof window === "undefined") return;
  hydrated = true;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AppState>;
      state = {
        ...DEFAULT_STATE,
        ...parsed,
        settings: { ...DEFAULT_SETTINGS, ...(parsed.settings ?? {}) },
        fingerprint: { ...DEFAULT_STATE.fingerprint, ...(parsed.fingerprint ?? {}) },
        quests: parsed.quests?.length ? parsed.quests : DEFAULT_QUESTS,
      };
    }
  } catch {
    state = DEFAULT_STATE;
  }
  // Streak + daily quest rollover
  const today = todayKey();
  if (state.user) {
    if (state.lastActiveDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      state = {
        ...state,
        streak: state.lastActiveDate === yesterday ? state.streak + 1 : Math.max(1, state.streak && 1),
        lastActiveDate: today,
      };
    }
  }
  if (state.questDate !== today) {
    state = { ...state, questDate: today, quests: DEFAULT_QUESTS.map((q) => ({ ...q })) };
  }
  persist();
  emit();
}

export function setState(updater: (prev: AppState) => AppState) {
  state = updater(state);
  persist();
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useAppState(): AppState {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => DEFAULT_STATE,
  );
}

export function getState() {
  return state;
}

/* ---------------- actions ---------------- */

export function signIn(email: string, name?: string) {
  setState((s) => ({
    ...s,
    lastActiveDate: todayKey(),
    streak: Math.max(1, s.streak),
    user: s.user
      ? { ...s.user, email }
      : {
          name: name || email.split("@")[0] || "Learner",
          age: 10,
          email,
          learningLevel: "developing",
          interests: [],
          companion: "dragon",
          profileComplete: false,
        },
  }));
}

export function updateUser(patch: Partial<User>) {
  setState((s) => (s.user ? { ...s, user: { ...s.user, ...patch } } : s));
}

export function signOut() {
  setState((s) => ({ ...s, user: null }));
}

export function updateSettings(patch: Partial<Settings>) {
  setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
}

export function addBadge(id: string) {
  setState((s) => (s.badges.includes(id) ? s : { ...s, badges: [...s.badges, id] }));
}

export function progressQuest(id: string, amount = 1) {
  setState((s) => ({
    ...s,
    quests: s.quests.map((q) =>
      q.id === id ? { ...q, progress: Math.min(q.target, q.progress + amount) } : q,
    ),
  }));
}

export function claimQuestReward() {
  setState((s) => ({ ...s, xp: s.xp + 100, coins: s.coins + 20 }));
}

export const DRAGON_STAGE_LEVELS = [1, 3, 5, 8, 12];
export const DRAGON_STAGE_NAMES = [
  "Dragon Egg",
  "Hatchling",
  "Young Dragon",
  "Adult Dragon",
  "Ember Sovereign",
];

export function dragonStageForLevel(levelsCompleted: number) {
  let stage = 0;
  DRAGON_STAGE_LEVELS.forEach((threshold, i) => {
    if (levelsCompleted >= threshold) stage = i;
  });
  return stage;
}

/**
 * Prototype adaptive engine — deterministic heuristics over local results.
 * Replace with a trained ML model / API in production.
 */
export function completeLevel(opts: {
  level: number;
  correct: number;
  xp: number;
  skillKey: keyof Fingerprint;
}) {
  setState((s) => {
    const stars = opts.correct >= 7 ? 3 : opts.correct >= 6 ? 2 : 1;
    const bonus = opts.correct === 7 ? 150 : 0;
    const completed = {
      ...s.completedLevels,
      [opts.level]: {
        stars,
        correct: opts.correct,
        xp: opts.xp + bonus,
        completedAt: new Date().toISOString(),
      },
    };
    const count = Object.keys(completed).length;
    const delta = Math.round((opts.correct / 7) * 12) - 4;
    const fingerprint = {
      ...s.fingerprint,
      [opts.skillKey]: Math.max(20, Math.min(99, s.fingerprint[opts.skillKey] + delta)),
    };
    const badges = new Set(s.badges);
    badges.add("first-step");
    if (opts.correct === 7) badges.add("perfect-level");
    if (count >= 2) badges.add("letter-master");
    if (count >= 4) badges.add("brave-reader");
    if (count >= 6) badges.add("story-explorer");
    if (count >= 8) badges.add("spelling-star");
    if (count >= 10) badges.add("dragon-keeper");
    if (s.streak >= 7) badges.add("streak-7");
    return {
      ...s,
      completedLevels: completed,
      xp: s.xp + opts.xp + bonus,
      coins: s.coins + 30,
      currentLevel: Math.min(15, Math.max(s.currentLevel, opts.level + 1)),
      dragonStage: dragonStageForLevel(count),
      fingerprint,
      badges: Array.from(badges),
    };
  });
}

export function weakestSkill(fp: Fingerprint): keyof Fingerprint {
  return (Object.keys(fp) as (keyof Fingerprint)[]).reduce((a, b) => (fp[a] <= fp[b] ? a : b));
}
