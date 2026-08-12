import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Flame, Star, Trophy, Gem, ArrowRight, Target, Award, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { CompanionArt, DragonArt } from "@/components/art";
import { useAppState, claimQuestReward, DRAGON_STAGE_NAMES } from "@/lib/store";
import { LEVELS } from "@/lib/curriculum";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your learning home — DyslexiaCare AI" },
      { name: "description", content: "Track your streak, XP, daily quests and skill progress, then continue your next reading level." },
      { property: "og:title", content: "Your learning home — DyslexiaCare AI" },
      { property: "og:description", content: "Streaks, quests, skills and your next level in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Dashboard,
});

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

function Dashboard() {
  const state = useAppState();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== "undefined" && !state.user) {
      const t = setTimeout(() => {
        if (!state.user) navigate({ to: "/auth" });
      }, 400);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [state.user, navigate]);

  const level = LEVELS.find((l) => l.id === state.currentLevel) ?? LEVELS[0]!;
  const done = Object.keys(state.completedLevels).length;
  const pct = Math.round((done / LEVELS.length) * 100);
  const questsDone = state.quests.filter((q) => q.progress >= q.target).length;
  const fp = state.fingerprint;
  const lastBadge = state.badges[state.badges.length - 1];

  return (
    <AppShell>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h1 className="truncate font-display text-2xl font-bold sm:text-3xl">
            {greeting()}, {state.user?.name ?? "Learner"}
          </h1>
          <p className="text-sm text-muted-foreground">Your learning adventure continues.</p>
        </div>
        {state.user && <CompanionArt kind={state.user.companion} className="h-14 w-14 shrink-0" />}
      </header>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat icon={Flame} value={`${state.streak}`} label="Day streak" />
        <Stat icon={Star} value={state.xp.toLocaleString()} label="XP earned" />
        <Stat icon={Trophy} value={`Level ${state.currentLevel}`} label="Current island" />
        <Stat icon={Gem} value={`${state.coins}`} label="Coins" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="card-elevated relative overflow-hidden p-6">
          <span className="text-xs font-bold uppercase tracking-wide text-primary">Continue your journey</span>
          <h2 className="mt-2 font-display text-2xl font-bold">
            Level {level.id} — {level.title}
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">{level.blurb}</p>
          <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full ember-fill transition-[width] duration-700"
              style={{ width: `${Math.max(6, pct)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {done} of {LEVELS.length} levels complete · {pct}%
          </p>
          <Link
            to="/level/$levelId"
            params={{ levelId: String(level.id) }}
            className="mt-5 inline-flex items-center gap-2 rounded-xl ember-fill px-5 py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.02]"
          >
            Continue Level <ArrowRight className="h-4 w-4" />
          </Link>
          <DragonArt
            stage={state.dragonStage}
            className="pointer-events-none absolute -bottom-6 -right-6 hidden h-40 w-40 opacity-90 sm:block"
          />
        </section>

        <section className="card-elevated p-6">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h2 className="font-bold">Today&apos;s Quests</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {state.quests.map((q) => {
              const complete = q.progress >= q.target;
              return (
                <li key={q.id} className="flex items-start gap-3">
                  <CheckCircle2
                    className={`mt-0.5 h-5 w-5 shrink-0 ${complete ? "text-success" : "text-muted-foreground/40"}`}
                  />
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-semibold ${complete ? "text-muted-foreground line-through" : ""}`}>
                      {q.label}
                    </p>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-success transition-[width] duration-500"
                        style={{ width: `${(q.progress / q.target) * 100}%` }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">
            {questsDone} / {state.quests.length} completed · reward +100 XP
          </p>
          <button
            disabled={questsDone < state.quests.length}
            onClick={claimQuestReward}
            className="mt-3 w-full rounded-xl border border-border py-2.5 text-sm font-bold transition-colors enabled:hover:bg-muted disabled:opacity-45"
          >
            {questsDone < state.quests.length ? "Finish quests to claim" : "Claim +100 XP"}
          </button>
        </section>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <section className="card-elevated p-6">
          <h2 className="font-bold">Learning progress</h2>
          <div className="mt-4 space-y-3">
            {(
              [
                ["Reading accuracy", fp.reading],
                ["Spelling", fp.spelling],
                ["Phonics", fp.phonics],
                ["Vocabulary", fp.vocabulary],
                ["Comprehension", fp.comprehension],
              ] as const
            ).map(([label, val]) => (
              <div key={label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold">{label}</span>
                  <span className="tabular-nums text-muted-foreground">{val}%</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary transition-[width] duration-700" style={{ width: `${val}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="card-elevated flex flex-col p-6">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            <h2 className="font-bold">Companion &amp; awards</h2>
          </div>
          <div className="mt-4 flex items-center gap-4">
            <DragonArt stage={state.dragonStage} className="h-20 w-20 shrink-0" />
            <div className="min-w-0">
              <p className="font-display text-lg font-bold">{DRAGON_STAGE_NAMES[state.dragonStage]}</p>
              <p className="text-xs text-muted-foreground">
                Complete more levels to grow your companion.
              </p>
            </div>
          </div>
          <p className="mt-5 text-sm">
            <span className="text-muted-foreground">Recent achievement: </span>
            <span className="font-bold">{lastBadge ? prettyBadge(lastBadge) : "Not yet — your first level awaits"}</span>
          </p>
          <Link to="/progress" className="mt-auto pt-4 text-sm font-bold text-primary hover:underline">
            View full progress
          </Link>
        </section>
      </div>
    </AppShell>
  );
}

export function prettyBadge(id: string) {
  return (
    {
      "first-step": "First Step",
      "letter-master": "Letter Master",
      "brave-reader": "Brave Reader",
      "story-explorer": "Story Explorer",
      "spelling-star": "Spelling Star",
      "streak-7": "7 Day Streak",
      "dragon-keeper": "Dragon Keeper",
      "perfect-level": "Perfect Level",
    }[id] ?? id
  );
}

function Stat({ icon: Icon, value, label }: { icon: typeof Flame; value: string; label: string }) {
  return (
    <div className="card-elevated flex items-center gap-3 p-4">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10">
        <Icon className="h-5 w-5 text-primary" />
      </span>
      <div className="min-w-0">
        <div className="truncate font-display text-lg font-bold">{value}</div>
        <div className="truncate text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
