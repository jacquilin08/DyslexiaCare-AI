import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, Check, Star } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useAppState } from "@/lib/store";
import { LEVELS } from "@/lib/curriculum";
import { DragonArt, IslandIcon } from "@/components/art";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Learning map — DyslexiaCare AI" },
      { name: "description", content: "Travel fifteen floating islands of reading, spelling, phonics and comprehension challenges." },
      { property: "og:title", content: "Learning map — DyslexiaCare AI" },
      { property: "og:description", content: "Fifteen islands, seven challenges each." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearningMap,
});

function LearningMap() {
  const state = useAppState();
  const nodes = LEVELS.map((l, i) => ({
    ...l,
    x: 50 + Math.sin(i * 0.9) * 30,
    y: i * 140 + 90,
  }));
  const height = nodes.length * 140 + 140;

  return (
    <AppShell>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold sm:text-3xl">The Learning Isles</h1>
          <p className="text-sm text-muted-foreground">
            Seven challenges guard each island. Clear them to sail onward.
          </p>
        </div>
        <DragonArt stage={state.dragonStage} className="h-16 w-16 shrink-0 animate-float-soft" />
      </header>

      <div className="relative mt-6 overflow-hidden rounded-3xl border border-border night-scene p-4 sm:p-8">
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <span
              key={i}
              className="absolute h-1 w-1 rounded-full bg-gold animate-twinkle"
              style={{
                left: `${(i * 37) % 100}%`,
                top: `${(i * 53) % 100}%`,
                animationDelay: `${(i % 7) * 0.5}s`,
              }}
            />
          ))}
        </div>

        <div className="relative" style={{ height }}>
          <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 100 ${height}`} preserveAspectRatio="none">
            <path
              d={nodes
                .map((n, i) => (i === 0 ? `M ${n.x} ${n.y}` : `L ${n.x} ${n.y}`))
                .join(" ")}
              fill="none"
              stroke="var(--gold)"
              strokeWidth="0.7"
              strokeDasharray="2 2.4"
              strokeLinecap="round"
              opacity="0.7"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {nodes.map((n) => {
            const result = state.completedLevels[n.id];
            const unlocked = n.id <= state.currentLevel;
            const current = n.id === state.currentLevel;
            return (
              <div
                key={n.id}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: n.y }}
              >
                <Link
                  to={unlocked ? "/level/$levelId" : "/map"}
                  params={{ levelId: String(n.id) }}
                  disabled={!unlocked}
                  className={`flex w-56 items-center gap-3 rounded-2xl border p-3 transition-transform sm:w-72 ${
                    unlocked
                      ? "border-primary/40 bg-card hover:-translate-y-0.5"
                      : "cursor-not-allowed border-primary-foreground/10 bg-primary-foreground/5"
                  } ${current ? "animate-pulse-ring border-primary" : ""}`}
                >
                  <span
                    className={`relative grid h-14 w-14 shrink-0 place-items-center rounded-xl ${
                      unlocked ? "bg-primary-foreground/5" : "bg-primary-foreground/5 grayscale opacity-50"
                    }`}
                  >
                    <IslandIcon skillKey={n.skillKey} className="h-14 w-14" />
                    <span
                      className={`absolute -bottom-1.5 -right-1.5 grid h-6 w-6 place-items-center rounded-full font-display text-[11px] font-bold shadow-sm ${
                        result
                          ? "bg-success text-success-foreground"
                          : unlocked
                            ? "ember-fill text-primary-foreground"
                            : "bg-primary-foreground/20 text-primary-foreground/60"
                      }`}
                    >
                      {result ? <Check className="h-3 w-3" /> : unlocked ? n.id : <Lock className="h-3 w-3" />}
                    </span>
                  </span>
                  <span className={`min-w-0 ${unlocked ? "" : "text-primary-foreground/60"}`}>
                    <span className="block truncate text-sm font-bold">{n.title}</span>
                    <span className={`block truncate text-[11px] ${unlocked ? "text-muted-foreground" : "text-primary-foreground/45"}`}>
                      {n.skill} · {n.difficulty} · +{n.xpReward} XP
                    </span>
                    {result && (
                      <span className="mt-1 flex gap-0.5">
                        {[0, 1, 2].map((i) => (
                          <Star key={i} className={`h-3 w-3 ${i < result.stars ? "fill-gold text-gold" : "text-muted-foreground/30"}`} />
                        ))}
                      </span>
                    )}
                  </span>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}