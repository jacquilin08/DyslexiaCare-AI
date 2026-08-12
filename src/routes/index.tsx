import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Mic, Sparkles, ShieldCheck, Waypoints, Volume2 } from "lucide-react";
import { HeroScene, DragonArt } from "@/components/art";
import { useThemeEffect } from "@/components/app-shell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DyslexiaCare AI — A Reading Adventure for Every Learner" },
      {
        name: "description",
        content:
          "DyslexiaCare AI turns reading practice into a personalized fantasy adventure: 15 levels, 7 challenges each, voice and phonics practice, and a dragon that grows with you.",
      },
      { property: "og:title", content: "DyslexiaCare AI — A Reading Adventure for Every Learner" },
      {
        property: "og:description",
        content: "Personalized reading, spelling and phonics practice built as a fantasy learning journey.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  { icon: Waypoints, title: "A journey, not a worksheet", body: "Fifteen levels across floating islands. Seven focused challenges each, unlocked step by step." },
  { icon: Mic, title: "Speak, type or tap", body: "Voice answers use your browser's speech engine. Prefer typing? Every question accepts that too." },
  { icon: Volume2, title: "Read-along narration", body: "Sentence-by-sentence highlighting with adjustable speed, powered by built-in speech synthesis." },
  { icon: Sparkles, title: "Adaptive practice", body: "A learning fingerprint tracks five skills and recommends what to practise next." },
  { icon: BookOpen, title: "Made for readable text", body: "Font size, letter spacing, line height, warm and high-contrast themes, and focus mode." },
  { icon: ShieldCheck, title: "Private by design", body: "Everything runs in your browser. Progress is stored locally — no accounts on a server." },
];

function Landing() {
  useThemeEffect();
  return (
    <div className="min-h-screen bg-background">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <div className="flex min-w-0 items-center gap-2">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl ember-fill">
            <Waypoints className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="truncate font-display text-lg font-bold">DyslexiaCare AI</span>
        </div>
        <Link
          to="/auth"
          className="rounded-xl border border-border px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted"
        >
          Sign in
        </Link>
      </header>

      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-6 lg:grid-cols-[1.05fr_1fr] lg:pt-14">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-parchment px-3 py-1 text-xs font-semibold text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" /> Prototype learning companion
          </span>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
            Every learner has a different way of learning.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground text-learn">
            DyslexiaCare AI turns reading practice into a personalized adventure where every challenge
            helps you grow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/auth"
              className="inline-flex items-center gap-2 rounded-xl ember-fill px-6 py-3.5 font-bold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.02]"
            >
              Start Your Journey <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#learning"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-6 py-3.5 font-bold transition-colors hover:bg-muted"
            >
              Explore Learning
            </a>
          </div>
          <dl className="mt-10 grid max-w-lg grid-cols-3 gap-4">
            {[
              ["15", "levels"],
              ["105", "challenges"],
              ["5", "skill areas"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-xl border border-border bg-card px-4 py-3">
                <dt className="font-display text-2xl font-bold text-primary">{n}</dt>
                <dd className="text-xs text-muted-foreground">{l}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <HeroScene className="w-full rounded-3xl border border-border bg-card p-3 shadow-[var(--shadow-lift)]" />
        </div>
      </section>

      <section id="learning" className="border-y border-border bg-parchment py-16">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="max-w-2xl font-display text-3xl font-bold sm:text-4xl">
            Practice that adapts to the reader, not the other way around.
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <article key={f.title} className="card-elevated p-6">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid items-center gap-8 rounded-3xl border border-border night-scene p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary-foreground sm:text-4xl">
              Finish seven challenges. Watch your companion grow.
            </h2>
            <p className="mt-4 max-w-xl text-primary-foreground/75">
              Learn, practise, complete a level, hatch your dragon, unlock the next island. Egg to
              hatchling to sovereign — your progress has a face.
            </p>
            <Link
              to="/auth"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-primary-foreground px-6 py-3.5 font-bold text-ink transition-transform hover:scale-[1.02]"
            >
              Start Your Journey <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <DragonArt stage={4} className="mx-auto h-56 w-56 animate-float-soft" />
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        DyslexiaCare AI is an educational prototype. Its coach, simplifier and recommendations use
        local rule-based logic — not a diagnostic tool and not medical advice.
      </footer>
    </div>
  );
}
