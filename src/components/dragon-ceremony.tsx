import { useEffect, useState } from "react";
import { Star, Gem, ArrowRight } from "lucide-react";
import { EggArt, DragonArt } from "@/components/art";
import { playCue } from "@/lib/speech";
import { DRAGON_STAGE_NAMES } from "@/lib/store";

type Props = {
  xp: number;
  coins: number;
  stars: number;
  nextLevel: number | null;
  dragonStage: number;
  finalLevel?: boolean;
  soundOn: boolean;
  onContinue: () => void;
};

const STAGE_MS = [1400, 1600, 1500, 1200, 2600, 2000];

export function DragonCeremony({
  xp,
  coins,
  stars,
  nextLevel,
  dragonStage,
  finalLevel,
  soundOn,
  onContinue,
}: Props) {
  const [stage, setStage] = useState(0);
  const [xpShown, setXpShown] = useState(0);

  useEffect(() => {
    if (stage >= 6) return;
    const t = setTimeout(() => setStage((s) => s + 1), STAGE_MS[stage]);
    return () => clearTimeout(t);
  }, [stage]);

  useEffect(() => {
    if (stage === 2) playCue("crack", soundOn);
    if (stage === 3) playCue("crack", soundOn);
    if (stage === 4) playCue("evolve", soundOn);
    if (stage === 5) playCue("evolve", soundOn);
    if (stage === 6) playCue("complete", soundOn);
  }, [stage, soundOn]);

  useEffect(() => {
    if (stage < 6) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1100);
      setXpShown(Math.round(xp * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [stage, xp]);

  const caption =
    stage === 0
      ? "Level Complete!"
      : stage === 1
        ? "Something is awakening…"
        : stage === 2
          ? "A new companion is hatching…"
          : stage === 3
            ? "The shell breaks open"
            : stage === 4
              ? "Your companion is growing stronger"
              : stage === 5
                ? "It takes to the sky"
                : finalLevel
                  ? "YOU DID IT!"
                  : "Level Complete";

  const growStage = stage >= 5 ? Math.min(4, dragonStage + 1) : stage >= 4 ? Math.max(1, dragonStage) : 1;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center night-scene px-4 py-8">
      <Sparks active={stage >= 1 && stage <= 5} />
      {/* Fire burst when the shell breaks */}
      <FireBurst active={stage >= 3 && stage <= 4} />

      <div
        className={`relative w-full max-w-lg text-center ${
          stage === 1 || stage === 2 ? "animate-screen-shake" : ""
        }`}
      >
        {/* Ornate dragon-frame corner accents (fantasy UI) */}
        <CornerFrame />

        <p className="mb-6 font-display text-2xl font-bold text-primary-foreground sm:text-3xl">
          {caption}
        </p>

        <div className="relative mx-auto grid h-64 w-64 place-items-center sm:h-72 sm:w-72">
          {/* Hatchling shadow + aura */}
          <div className="pointer-events-none absolute inset-8 rounded-full bg-gold/20 blur-2xl" />

          {stage <= 3 && (
            <EggArt
              crackLevel={stage === 0 ? 0 : stage === 1 ? 1 : stage === 2 ? 2 : 3}
              className={`relative h-full w-full ${
                stage >= 1 && stage <= 2 ? "animate-egg-rumble" : "animate-float-soft"
              }`}
            />
          )}
          {stage >= 4 && (
            <DragonArt
              key={growStage}
              stage={growStage}
              className={`relative h-full w-full ${
                stage === 5 ? "animate-rise-fly" : "animate-grow-pop"
              }`}
            />
          )}

          {/* Ember rings during the hatch */}
          {stage === 4 && <RingPulse />}
        </div>

        {stage >= 4 && stage < 6 && (
          <p className="mt-4 text-sm font-semibold uppercase tracking-widest text-primary-foreground/70">
            {DRAGON_STAGE_NAMES[growStage]}
          </p>
        )}

        {stage >= 6 && (
          <div className="mt-6 animate-fade-up rounded-2xl border border-gold/30 bg-primary-foreground/5 p-6 shadow-[0_0_50px_-12px_var(--gold)]">
            <div className="flex items-center justify-center gap-1.5">
              {[0, 1, 2].map((i) => (
                <Star
                  key={i}
                  className={`h-7 w-7 ${i < stars ? "fill-gold text-gold" : "text-primary-foreground/25"}`}
                />
              ))}
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-primary-foreground/10 px-4 py-3">
                <div className="flex items-center justify-center gap-1.5 font-display text-2xl font-bold text-primary-foreground">
                  <Star className="h-5 w-5 text-gold" /> +{xpShown}
                </div>
                <div className="text-xs text-primary-foreground/70">experience</div>
              </div>
              <div className="rounded-xl bg-primary-foreground/10 px-4 py-3">
                <div className="flex items-center justify-center gap-1.5 font-display text-2xl font-bold text-primary-foreground">
                  <Gem className="h-5 w-5 text-gold" /> +{coins}
                </div>
                <div className="text-xs text-primary-foreground/70">coins</div>
              </div>
            </div>
            <p className="mt-5 text-sm text-primary-foreground/80">
              {nextLevel ? `Level ${nextLevel} unlocked` : "Every level of the journey is complete."}
            </p>
            <button
              onClick={onContinue}
              className="mt-5 inline-flex w-full items-center justify-center gap-3 rounded-xl ember-fill px-5 py-3 font-bold text-primary-foreground transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Xbox-style gamepad button glyph */}
              <GamepadIcon />
              Continue Adventure <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/** Ornate fantasy corner flourishes inspired by game UI frames. */
function CornerFrame() {
  const base = "pointer-events-none absolute h-10 w-10 text-gold/70";
  return (
    <>
      <svg viewBox="0 0 40 40" className={`${base} left-2 top-2`} aria-hidden="true">
        <path d="M2 20 C 2 8, 8 2, 20 2 C 32 2, 38 8, 38 20 C 38 32, 32 38, 20 38" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
        <path d="M8 20 C 8 12, 12 8, 20 8" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
        <circle cx="20" cy="2" r="2.4" fill="currentColor" opacity="0.7" />
        <circle cx="2" cy="20" r="2.4" fill="currentColor" opacity="0.7" />
      </svg>
      <svg viewBox="0 0 40 40" className={`${base} right-2 top-2 -scale-x-100`} aria-hidden="true">
        <path d="M2 20 C 2 8, 8 2, 20 2 C 32 2, 38 8, 38 20 C 38 32, 32 38, 20 38" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
        <path d="M8 20 C 8 12, 12 8, 20 8" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
        <circle cx="20" cy="2" r="2.4" fill="currentColor" opacity="0.7" />
        <circle cx="2" cy="20" r="2.4" fill="currentColor" opacity="0.7" />
      </svg>
      <svg viewBox="0 0 40 40" className={`${base} bottom-2 left-2 -scale-y-100`} aria-hidden="true">
        <path d="M2 20 C 2 8, 8 2, 20 2 C 32 2, 38 8, 38 20 C 38 32, 32 38, 20 38" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
        <path d="M8 20 C 8 12, 12 8, 20 8" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
        <circle cx="20" cy="2" r="2.4" fill="currentColor" opacity="0.7" />
        <circle cx="2" cy="20" r="2.4" fill="currentColor" opacity="0.7" />
      </svg>
      <svg viewBox="0 0 40 40" className={`${base} bottom-2 right-2 -scale-100`} aria-hidden="true">
        <path d="M2 20 C 2 8, 8 2, 20 2 C 32 2, 38 8, 38 20 C 38 32, 32 38, 20 38" fill="none" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
        <path d="M8 20 C 8 12, 12 8, 20 8" fill="none" stroke="currentColor" strokeWidth="1.6" opacity="0.8" />
        <circle cx="20" cy="2" r="2.4" fill="currentColor" opacity="0.7" />
        <circle cx="2" cy="20" r="2.4" fill="currentColor" opacity="0.7" />
      </svg>
    </>
  );
}

/** Xbox-style gamepad face button */
function GamepadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.15" />
      <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 8.5 L15 14 L9 14 Z" fill="currentColor" />
    </svg>
  );
}

function Sparks({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 26 }).map((_, i) => {
        const angle = (i / 26) * Math.PI * 2;
        return (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-gold"
            style={
              {
                "--dx": `${Math.cos(angle) * (120 + (i % 5) * 40)}px`,
                "--dy": `${Math.sin(angle) * (120 + (i % 4) * 40)}px`,
                animation: `spark-out ${1.6 + (i % 5) * 0.25}s ease-out ${(i % 7) * 0.22}s infinite`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

/** Expanding ember ring pulses when the shell breaks. */
function RingPulse() {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute h-24 w-24 rounded-full border-2 border-gold/70"
          style={{ animation: `ring-expand 1.4s ease-out ${i * 0.35}s infinite` }}
        />
      ))}
    </div>
  );
}

/** Radial fire-burst flash when the egg cracks open. */
function FireBurst({ active }: { active: boolean }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <span
        className="h-40 w-40 rounded-full"
        style={{ background: "radial-gradient(circle, var(--gold) 0%, transparent 65%)", animation: "flash-out 1.2s ease-out infinite" }}
      />
    </div>
  );
}