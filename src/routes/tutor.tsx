import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles, Volume2, Wand2, BookOpen } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useAppState, weakestSkill } from "@/lib/store";
import { speak } from "@/lib/speech";

export const Route = createFileRoute("/tutor")({
  head: () => ({
    meta: [
      { title: "AI Tutor — DyslexiaCare AI" },
      { name: "description", content: "Simplify tricky text, generate a practice story and review your reading coach summary." },
      { property: "og:title", content: "AI Tutor — DyslexiaCare AI" },
      { property: "og:description", content: "Text simplifier, story maker and reading coach — all offline prototypes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Tutor,
});

// Prototype rule-based transformations. Replace with a trained model / API in production.
const SIMPLE_MAP: Record<string, string> = {
  utilise: "use",
  utilize: "use",
  purchase: "buy",
  commence: "start",
  numerous: "many",
  assist: "help",
  demonstrate: "show",
  require: "need",
  approximately: "about",
  additional: "more",
  difficult: "hard",
  immediately: "right away",
  observe: "watch",
  sufficient: "enough",
};

function simplify(text: string, level: number) {
  if (!text.trim()) return "";
  let out = text;
  if (level <= 3) {
    Object.entries(SIMPLE_MAP).forEach(([k, v]) => {
      out = out.replace(new RegExp(`\\b${k}\\b`, "gi"), v);
    });
  }
  if (level <= 2) {
    out = out
      .split(/(?<=[.!?])\s+/)
      .map((s) => s.replace(/,\s*(and|but|which|because)\s*/gi, ". ").trim())
      .join(" ");
  }
  if (level === 1) {
    out = out
      .split(/(?<=[.!?])\s+/)
      .map((s) => (s.split(" ").length > 12 ? s.split(" ").slice(0, 12).join(" ") + "." : s))
      .join("\n");
  }
  if (level >= 4) out = `In more detail: ${out}`;
  return out;
}

const STORY_TEMPLATES: Record<string, string[]> = {
  Space: [
    "NAME climbed into a small silver ship. The stars looked like tiny lanterns. A blue planet waved hello.",
    "On the moon, NAME found a rock that hummed. The hum turned into a song about brave readers.",
  ],
  Animals: [
    "NAME met a fox with one white paw. The fox led the way to a warm den full of soft leaves.",
    "A tall giraffe asked NAME for help. Together they found the tallest tree in the whole valley.",
  ],
  Fantasy: [
    "NAME opened a book and a dragon stepped out. It was small, warm, and very polite.",
    "The map glowed at night. NAME followed it to a bridge made of words.",
  ],
  Adventure: [
    "NAME packed a rope, a lamp and a snack. The cave ahead was dark but the path was clear.",
    "The river was fast. NAME found stepping stones shaped like letters and crossed them one by one.",
  ],
  Nature: [
    "NAME planted a seed near the window. Every morning it grew a little taller, just like NAME's reading.",
    "Rain tapped the roof. NAME counted each drop and found a rhythm in the sound.",
  ],
};

function Tutor() {
  const s = useAppState();
  const [text, setText] = useState(
    "Students must utilise the library resources, and they should commence their research immediately, because numerous books are required.",
  );
  const [level, setLevel] = useState(2);
  const [interest, setInterest] = useState("Fantasy");
  const [length, setLength] = useState("Short");
  const [story, setStory] = useState<string | null>(null);
  const fp = s.fingerprint;
  const weak = weakestSkill(fp);

  function makeStory() {
    const bank = STORY_TEMPLATES[interest] ?? STORY_TEMPLATES["Fantasy"]!;
    const name = s.user?.name ?? "Mia";
    const parts = length === "Short" ? bank.slice(0, 1) : bank;
    setStory(parts.join(" ").replace(/NAME/g, name));
  }

  return (
    <AppShell>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">AI Tutor</h1>
      <p className="text-sm text-muted-foreground">
        These tools run entirely in your browser using rule-based logic — no model, no API, no data leaves this device.
      </p>

      <section className="card-elevated mt-5 p-6">
        <div className="flex items-center gap-2">
          <Wand2 className="h-4 w-4 text-primary" />
          <h2 className="font-bold">Make It Easier to Understand</h2>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={4}
          className="mt-4 w-full rounded-xl border border-input bg-card p-4 font-learn outline-none focus:ring-2 focus:ring-ring"
        />
        <div className="mt-4">
          <div className="flex justify-between text-xs font-semibold text-muted-foreground">
            <span>Simple</span>
            <span>Advanced</span>
          </div>
          <input
            type="range"
            min={1}
            max={5}
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="mt-1 w-full accent-[var(--primary)]"
          />
          <p className="mt-1 text-sm font-semibold">
            Level {level} —{" "}
            {["Very Simple", "Simple", "Standard", "Detailed", "Advanced"][level - 1]}
          </p>
        </div>
        <div className="mt-4 whitespace-pre-line rounded-xl bg-parchment p-4 font-learn">
          {simplify(text, level) || "Paste some text above to see a simpler version."}
        </div>
        <button
          onClick={() => speak(simplify(text, level), s.settings.readingSpeed)}
          className="mt-3 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
        >
          <Volume2 className="h-4 w-4 text-primary" /> Read it to me
        </button>
      </section>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <section className="card-elevated p-6">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <h2 className="font-bold">Create Your Story</h2>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <label className="space-y-1">
              <span className="font-semibold">Interest</span>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="w-full rounded-xl border border-input bg-card px-3 py-2.5"
              >
                {Object.keys(STORY_TEMPLATES).map((k) => (
                  <option key={k}>{k}</option>
                ))}
              </select>
            </label>
            <label className="space-y-1">
              <span className="font-semibold">Length</span>
              <select
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full rounded-xl border border-input bg-card px-3 py-2.5"
              >
                <option>Short</option>
                <option>Medium</option>
              </select>
            </label>
          </div>
          <button
            onClick={makeStory}
            className="mt-4 inline-flex items-center gap-2 rounded-xl ember-fill px-5 py-3 font-bold text-primary-foreground"
          >
            <Sparkles className="h-4 w-4" /> Create My Story
          </button>
          {story && (
            <div className="mt-4 animate-fade-up rounded-xl bg-parchment p-4 font-learn text-lg leading-relaxed">
              {story}
              <button
                onClick={() => speak(story, s.settings.readingSpeed)}
                className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <Volume2 className="h-4 w-4" /> Listen
              </button>
            </div>
          )}
        </section>

        <section className="card-elevated p-6">
          <h2 className="font-bold">Your Reading Coach</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              ["Reading accuracy", `${fp.reading}%`],
              ["Reading speed", "61 WPM"],
              ["Words practised", String(Object.keys(s.completedLevels).length * 14)],
              ["Comprehension", `${fp.comprehension}%`],
            ].map(([l, v]) => (
              <div key={l} className="rounded-xl bg-parchment p-4">
                <div className="font-display text-xl font-bold">{v}</div>
                <div className="text-xs text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-xl border border-border p-4 text-sm">
            Great progress. You recognise most words accurately. Your steadiest gain is vocabulary, and{" "}
            <span className="font-bold capitalize">{weak}</span> is the area worth a little more practice this week.
          </p>
          <ul className="mt-4 space-y-2 text-sm">
            {["Multi-syllable words", "Pronunciation practice", "Guided reading"].map((r) => (
              <li key={r} className="rounded-xl bg-muted px-4 py-2.5 font-semibold">
                {r}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
