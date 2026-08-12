import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useAppState, weakestSkill } from "@/lib/store";
import { LEVELS } from "@/lib/curriculum";
import { prettyBadge } from "@/routes/dashboard";
import { Award, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress & achievements — DyslexiaCare AI" },
      { name: "description", content: "See your learning fingerprint, weekly practice, skill growth and earned badges." },
      { property: "og:title", content: "Progress & achievements — DyslexiaCare AI" },
      { property: "og:description", content: "Skill radar, weekly activity and badges in one dashboard." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgressPage,
});

const ALL_BADGES = [
  "first-step",
  "letter-master",
  "brave-reader",
  "story-explorer",
  "spelling-star",
  "streak-7",
  "dragon-keeper",
  "perfect-level",
];

function ProgressPage() {
  const s = useAppState();
  const fp = s.fingerprint;
  const keys = Object.keys(fp) as (keyof typeof fp)[];
  const done = Object.keys(s.completedLevels).length;
  const overall = Math.round((done / LEVELS.length) * 100);
  const weak = weakestSkill(fp);
  const recommended = LEVELS.find((l) => l.skillKey === weak && !s.completedLevels[l.id]) ?? LEVELS[0]!;

  const R = 70;
  const pts = keys
    .map((k, i) => {
      const a = (i / keys.length) * Math.PI * 2 - Math.PI / 2;
      const r = (fp[k] / 100) * R;
      return `${100 + Math.cos(a) * r},${100 + Math.sin(a) * r}`;
    })
    .join(" ");

  return (
    <AppShell>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Your Learning Fingerprint</h1>
      <p className="text-sm text-muted-foreground">
        Prototype analysis built from your answers in this browser — a practice guide, not a diagnosis.
      </p>

      <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <section className="card-elevated p-6">
          <h2 className="font-bold">Skill radar</h2>
          <svg viewBox="0 0 200 200" className="mx-auto mt-2 h-64 w-64">
            {[0.25, 0.5, 0.75, 1].map((f) => (
              <circle key={f} cx="100" cy="100" r={R * f} fill="none" stroke="var(--border)" strokeWidth="1" />
            ))}
            <polygon points={pts} fill="var(--primary)" fillOpacity="0.25" stroke="var(--primary)" strokeWidth="2" />
            {keys.map((k, i) => {
              const a = (i / keys.length) * Math.PI * 2 - Math.PI / 2;
              return (
                <text
                  key={k}
                  x={100 + Math.cos(a) * (R + 20)}
                  y={100 + Math.sin(a) * (R + 20)}
                  textAnchor="middle"
                  fontSize="9"
                  fill="var(--muted-foreground)"
                >
                  {k}
                </text>
              );
            })}
          </svg>
          <p className="mt-2 rounded-xl bg-parchment p-3 text-sm">
            Your next recommended lesson is{" "}
            <Link to="/level/$levelId" params={{ levelId: String(recommended.id) }} className="font-bold text-primary hover:underline">
              Level {recommended.id} — {recommended.title}
            </Link>
            .
          </p>
        </section>

        <div className="grid gap-4">
          <section className="card-elevated flex items-center gap-6 p-6">
            <div className="relative h-28 w-28 shrink-0">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--muted)" strokeWidth="10" />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(overall / 100) * 264} 264`}
                />
              </svg>
              <span className="absolute inset-0 grid place-items-center font-display text-xl font-bold">{overall}%</span>
            </div>
            <div className="min-w-0">
              <h2 className="font-bold">Overall journey</h2>
              <p className="text-sm text-muted-foreground">
                {done} of {LEVELS.length} levels · {done * 7} questions answered
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-sm font-semibold text-success">
                <TrendingUp className="h-4 w-4" /> Reading {s.fingerprintHistory.reading}% → {fp.reading}%
              </p>
            </div>
          </section>

          <section className="card-elevated p-6">
            <h2 className="font-bold">Skill progress</h2>
            <div className="mt-4 space-y-3">
              {keys.map((k) => (
                <div key={k}>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold capitalize">{k}</span>
                    <span className="tabular-nums text-muted-foreground">{fp[k]}%</span>
                  </div>
                  <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${fp[k]}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="card-elevated p-6">
            <h2 className="font-bold">Weekly activity</h2>
            <div className="mt-4 flex h-32 items-end gap-2">
              {s.weeklyMinutes.map((m, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t-lg ember-fill transition-[height] duration-700"
                    style={{ height: `${Math.max(6, (m / 40) * 100)}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">{["M", "T", "W", "T", "F", "S", "S"][i]}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      <section className="card-elevated mt-4 p-6">
        <div className="flex items-center gap-2">
          <Award className="h-4 w-4 text-primary" />
          <h2 className="font-bold">Achievements</h2>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {ALL_BADGES.map((b) => {
            const earned = s.badges.includes(b);
            return (
              <div
                key={b}
                className={`rounded-2xl border p-4 text-center text-sm font-bold ${
                  earned ? "border-primary/40 bg-primary/8" : "border-border bg-muted/40 text-muted-foreground"
                }`}
              >
                <Award className={`mx-auto mb-2 h-6 w-6 ${earned ? "text-primary" : "text-muted-foreground/40"}`} />
                {prettyBadge(b)}
              </div>
            );
          })}
        </div>
      </section>
    </AppShell>
  );
}
