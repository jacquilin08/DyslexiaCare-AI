import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { useAppState, updateSettings, type ThemeName } from "@/lib/store";
import { speak } from "@/lib/speech";
import { Volume2 } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Accessibility settings — DyslexiaCare AI" },
      { name: "description", content: "Adjust font size, letter spacing, line height, reading speed, theme and focus mode." },
      { property: "og:title", content: "Accessibility settings — DyslexiaCare AI" },
      { property: "og:description", content: "Make text comfortable to read, your way." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

const SIZES: [string, number][] = [["Small", 0.95], ["Medium", 1], ["Large", 1.1], ["Extra large", 1.22]];
const THEMES: [string, ThemeName][] = [["Light", "light"], ["Warm", "warm"], ["High contrast", "contrast"], ["Dark", "dark"]];
const SPEEDS = [0.75, 1, 1.25, 1.5];

function SettingsPage() {
  const { settings } = useAppState();
  return (
    <AppShell>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Accessibility settings</h1>
      <p className="text-sm text-muted-foreground">Saved to this browser and applied everywhere.</p>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <section className="card-elevated p-6">
          <h2 className="font-bold">Font size</h2>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {SIZES.map(([label, v]) => (
              <button
                key={label}
                onClick={() => updateSettings({ fontScale: v })}
                className={`rounded-xl border px-3 py-2.5 text-sm font-bold ${settings.fontScale === v ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <h2 className="mt-6 font-bold">Letter spacing</h2>
          <input type="range" min={0} max={0.16} step={0.01} value={settings.letterSpacing}
            onChange={(e) => updateSettings({ letterSpacing: Number(e.target.value) })}
            className="mt-2 w-full accent-[var(--primary)]" />

          <h2 className="mt-6 font-bold">Line height</h2>
          <input type="range" min={1.3} max={2.4} step={0.05} value={settings.lineHeight}
            onChange={(e) => updateSettings({ lineHeight: Number(e.target.value) })}
            className="mt-2 w-full accent-[var(--primary)]" />

          <p className="mt-5 rounded-xl bg-parchment p-4 font-learn">
            The dragon read the sentence slowly, and the words stayed still on the page.
          </p>
        </section>

        <section className="card-elevated p-6">
          <h2 className="font-bold">Theme</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {THEMES.map(([label, v]) => (
              <button
                key={v}
                onClick={() => updateSettings({ theme: v })}
                className={`rounded-xl border px-3 py-2.5 text-sm font-bold ${settings.theme === v ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"}`}
              >
                {label}
              </button>
            ))}
          </div>

          <h2 className="mt-6 font-bold">Reading speed</h2>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {SPEEDS.map((v) => (
              <button
                key={v}
                onClick={() => updateSettings({ readingSpeed: v })}
                className={`rounded-xl border px-3 py-2.5 text-sm font-bold ${settings.readingSpeed === v ? "border-primary bg-primary/10 text-primary" : "border-border hover:bg-muted"}`}
              >
                {v}x
              </button>
            ))}
          </div>
          <button
            onClick={() => speak("This is how narration will sound.", settings.readingSpeed)}
            className="mt-3 inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted"
          >
            <Volume2 className="h-4 w-4 text-primary" /> Test narration
          </button>

          <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-border p-4">
            <div className="min-w-0">
              <h2 className="font-bold">Focus mode</h2>
              <p className="text-xs text-muted-foreground">Hides side navigation and extra chrome.</p>
            </div>
            <button
              onClick={() => updateSettings({ focusMode: !settings.focusMode })}
              className={`h-7 w-12 shrink-0 rounded-full transition-colors ${settings.focusMode ? "bg-primary" : "bg-muted"}`}
              aria-pressed={settings.focusMode}
            >
              <span className={`block h-6 w-6 rounded-full bg-card transition-transform ${settings.focusMode ? "translate-x-[22px]" : "translate-x-0.5"}`} />
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between gap-4 rounded-xl border border-border p-4">
            <div className="min-w-0">
              <h2 className="font-bold">Sound effects</h2>
              <p className="text-xs text-muted-foreground">Subtle cues for answers and celebrations.</p>
            </div>
            <button
              onClick={() => updateSettings({ sound: !settings.sound })}
              className={`h-7 w-12 shrink-0 rounded-full transition-colors ${settings.sound ? "bg-primary" : "bg-muted"}`}
              aria-pressed={settings.sound}
            >
              <span className={`block h-6 w-6 rounded-full bg-card transition-transform ${settings.sound ? "translate-x-[22px]" : "translate-x-0.5"}`} />
            </button>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
