import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useThemeEffect } from "@/components/app-shell";
import { CompanionArt, type CreatureKind } from "@/components/art";
import { updateUser, useAppState } from "@/lib/store";

export const Route = createFileRoute("/setup")({
  head: () => ({
    meta: [
      { title: "Build your learning profile — DyslexiaCare AI" },
      { name: "description", content: "Set your name, age, interests and companion to personalize your DyslexiaCare AI reading journey." },
      { property: "og:title", content: "Build your learning profile — DyslexiaCare AI" },
      { property: "og:description", content: "Personalize your reading journey and choose a companion." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Setup,
});

const INTERESTS = ["Animals", "Space", "Adventure", "Sports", "Fantasy", "Science", "Nature"];
const COMPANIONS: { id: CreatureKind; label: string; trait: string }[] = [
  { id: "dragon", label: "Dragon", trait: "Brave and warm" },
  { id: "fox", label: "Fox", trait: "Quick and clever" },
  { id: "owl", label: "Owl", trait: "Calm and wise" },
  { id: "rabbit", label: "Rabbit", trait: "Gentle and steady" },
];

function Setup() {
  useThemeEffect();
  const state = useAppState();
  const navigate = useNavigate();
  const [name, setName] = useState(state.user?.name ?? "");
  const [age, setAge] = useState(String(state.user?.age ?? 10));
  const [interests, setInterests] = useState<string[]>(state.user?.interests ?? []);
  const [companion, setCompanion] = useState<CreatureKind>(state.user?.companion ?? "dragon");

  function finish() {
    updateUser({
      name: name.trim() || "Learner",
      age: Number(age) || 10,
      interests,
      companion,
      profileComplete: true,
    });
    navigate({ to: "/dashboard" });
  }

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-bold sm:text-4xl">Build Your Learning Profile</h1>
        <p className="mt-2 text-muted-foreground">Three quick questions, then you can begin.</p>

        <section className="card-elevated mt-8 space-y-5 p-6">
          <div>
            <label className="text-sm font-bold">What&apos;s your name?</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-bold">How old are you?</label>
            <input
              type="number"
              min={4}
              max={18}
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="mt-2 w-full rounded-xl border border-input bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-bold">What do you enjoy learning about?</label>
            <div className="mt-3 flex flex-wrap gap-2">
              {INTERESTS.map((i) => {
                const on = interests.includes(i);
                return (
                  <button
                    key={i}
                    onClick={() => setInterests((p) => (on ? p.filter((x) => x !== i) : [...p, i]))}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                      on ? "border-primary bg-primary text-primary-foreground" : "border-border hover:bg-muted"
                    }`}
                  >
                    {i}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="font-display text-2xl font-bold">Choose Your Companion</h2>
          <p className="mt-1 text-sm text-muted-foreground">They travel with you through every level.</p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {COMPANIONS.map((c) => {
              const on = companion === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setCompanion(c.id)}
                  className={`relative rounded-2xl border p-4 text-center transition-transform hover:-translate-y-0.5 ${
                    on ? "border-primary bg-primary/8" : "border-border bg-card"
                  }`}
                >
                  {on && (
                    <span className="absolute right-2 top-2 grid h-6 w-6 place-items-center rounded-full bg-primary">
                      <Check className="h-3.5 w-3.5 text-primary-foreground" />
                    </span>
                  )}
                  <CompanionArt kind={c.id} className="mx-auto h-20 w-20" />
                  <div className="mt-2 font-bold">{c.label}</div>
                  <div className="text-[11px] text-muted-foreground">{c.trait}</div>
                </button>
              );
            })}
          </div>
        </section>

        <button
          onClick={finish}
          className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl ember-fill py-4 font-bold text-primary-foreground transition-transform hover:scale-[1.01]"
        >
          Enter the learning world <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
