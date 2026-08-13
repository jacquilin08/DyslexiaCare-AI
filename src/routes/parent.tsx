import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useAppState, summarizeConfusions, CONFUSION_LABELS } from "@/lib/store";

export const Route = createFileRoute("/parent")({
  head: () => ({
    meta: [
      { title: "Parent view — DyslexiaCare AI" },
      { name: "description", content: "A calm weekly summary of your child's reading, spelling and phonics practice." },
      { property: "og:title", content: "Parent view — DyslexiaCare AI" },
      { property: "og:description", content: "Weekly practice, current level and encouraging insights." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Parent,
});

function Parent() {
  const s = useAppState();
  const fp = s.fingerprint;
  const confusions = summarizeConfusions(s).slice(0, 3);
  const rows: [string, string][] = [
    ["Reading accuracy", `${fp.reading}%`],
    ["Spelling", `${fp.spelling}%`],
    ["Phonics", `${fp.phonics}%`],
    ["Vocabulary", `${fp.vocabulary}%`],
    ["Weekly practice", `${Math.round(s.weeklyMinutes.reduce((a, b) => a + b, 0) / 60)}h ${s.weeklyMinutes.reduce((a, b) => a + b, 0) % 60}m`],
    ["Current level", `Level ${s.currentLevel}`],
    ["Current streak", `${s.streak} days`],
  ];

  return (
    <AppShell>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Parent view</h1>
      <p className="text-sm text-muted-foreground">
        A practice summary for {s.user?.name ?? "your learner"}. This is a learning tool, not an assessment or diagnosis.
      </p>

      <section className="card-elevated mt-5 divide-y divide-border">
        {rows.map(([l, v]) => (
          <div key={l} className="flex items-center justify-between gap-4 px-6 py-4">
            <span className="min-w-0 truncate text-sm font-semibold">{l}</span>
            <span className="shrink-0 font-display text-lg font-bold">{v}</span>
          </div>
        ))}
      </section>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="card-elevated p-6">
          <h2 className="font-bold">What went well</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Reading accuracy has improved this week, and practice happened on most days.
          </p>
        </div>
        <div className="card-elevated p-6">
          <h2 className="font-bold">Gentle focus</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Spelling practice is the current recommended focus. Ten quiet minutes a day is plenty.
          </p>
        </div>
      </div>

      {confusions.length > 0 && (
        <section className="card-elevated mt-4 p-6">
          <h2 className="font-bold">Patterns noticed</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Based on words {s.user?.name ?? "your learner"} has missed during practice. These are common and
            well-understood patterns in early readers, not a sign of ability.
          </p>
          <ul className="mt-3 space-y-2">
            {confusions.map((c) => (
              <li key={c.pattern} className="flex items-center justify-between rounded-xl bg-parchment px-4 py-2.5 text-sm">
                <span className="font-semibold">{CONFUSION_LABELS[c.pattern]}</span>
                <span className="text-muted-foreground">{c.count} time{c.count === 1 ? "" : "s"}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </AppShell>
  );
}