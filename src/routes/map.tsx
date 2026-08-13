/**
 * DyslexiaCare AI — Game-style Learning Journey Map (v2)
 *
 * Winding S-curve path  ·  Node states (completed / current / locked / future)
 * ·  Dragon companion panel with emotional feedback  ·  Confetti celebration
 * ·  Level-unlock burst  ·  Responsive desktop + mobile
 *
 * Changed files: map.tsx (this file) + styles.css (new keyframes appended).
 * All other routes, components, store, curriculum remain untouched.
 */

import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { Lock, Check, Star, ChevronRight } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useAppState } from "@/lib/store";
import { LEVELS } from "@/lib/curriculum";
import { DragonArt, IslandIcon } from "@/components/art";
import type { DragonMood } from "@/components/art";

/* ─── Route ─────────────────────────────────────────────────────────────── */

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Learning Journey — DyslexiaCare AI" },
      { name: "description", content: "Travel fifteen magical islands of reading, spelling, phonics and comprehension. Your dragon grows with every level." },
      { property: "og:title", content: "Learning Journey — DyslexiaCare AI" },
      { property: "og:description", content: "Fifteen islands, seven challenges each. Your dragon grows with you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LearningMap,
});

/* ─── Layout helpers ────────────────────────────────────────────────────── */

const NODE_STEP   = 160;    // px between node centres
const SVG_W       = 100;    // viewBox units (percentage coords)
const SVG_TOP_PAD = 120;    // px of top padding (extra to avoid clipping)

/** Winding layout: column offsets alternate to create S-curve */
const COL_X = [50, 66, 50, 34, 50, 66, 50, 34, 50, 66, 50, 34, 50, 66, 50];

function buildNodes() {
  return LEVELS.map((l, i) => ({
    ...l,
    x: COL_X[i] ?? 50,
    y: SVG_TOP_PAD + i * NODE_STEP,
  }));
}

/** Cubic-Bézier SVG path through all nodes */
function buildPath(nodes: ReturnType<typeof buildNodes>, upTo?: number) {
  const pts = upTo !== undefined ? nodes.slice(0, upTo + 1) : nodes;
  return pts
    .map((n, i, arr) => {
      if (i === 0) return `M ${n.x} ${n.y}`;
      const prev = arr[i - 1]!;
      const dy   = (n.y - prev.y) * 0.44;
      return `C ${prev.x} ${prev.y + dy}, ${n.x} ${n.y - dy}, ${n.x} ${n.y}`;
    })
    .join(" ");
}

/* ─── Section band labels ───────────────────────────────────────────────── */
// Section dividers appear BETWEEN level groups (before the first level of each section)
// startId = the first level ID of that section
const SECTIONS = [
  { startId: 4,  label: "Beginner Isles 🌱" },   // divider before level 4
  { startId: 7,  label: "Explorer Seas 🌊"  },
  { startId: 11, label: "Challenger Peaks ⛰️" },
  { startId: 14, label: "Dragon's Domain 🐉" },
];

/* ─── Confetti component ─────────────────────────────────────────────────── */
function Confetti({ active }: { active: boolean }) {
  if (!active) return null;
  const pieces = Array.from({ length: 20 }, (_, i) => {
    const angle = (i / 20) * Math.PI * 2;
    const dist  = 50 + (i % 4) * 18;
    return {
      cx:    `${Math.round(Math.cos(angle) * dist)}px`,
      cy:    `${Math.round(Math.sin(angle) * dist)}px`,
      cr:    `${(i % 4) * 90}deg`,
      color: ["var(--gold)", "var(--primary)", "var(--success)", "var(--arcane)"][i % 4]!,
      delay: `${(i % 6) * 0.07}s`,
      size:  6 + (i % 3) * 3,
    };
  });
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center overflow-hidden" aria-hidden="true">
      {pieces.map((p, i) => (
        <span
          key={i}
          className="absolute rounded-sm"
          style={{
            width: p.size, height: p.size,
            background: p.color,
            "--cx": p.cx, "--cy": p.cy, "--cr": p.cr,
            animation: `confetti-pop 0.9s ease-out ${p.delay} both`,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}

/* ─── Dragon companion types + messages ─────────────────────────────────── */
type DragonState = "idle" | "happy" | "wrong";

const MOOD_MAP: Record<DragonState, DragonMood> = {
  idle:  "neutral",
  happy: "happy",
  wrong: "sad",
};

const MESSAGES: Record<DragonState, string[]> = {
  idle:  ["Ready for your next adventure! 🐉", "Choose an island and let's go! ✨", "I believe in you! 💙", "Adventure awaits! 🗺️"],
  happy: ["Great job! 🎉", "You're amazing! 🌟", "Keep going, champion! 🏆", "Your dragon is so proud! 🐉✨", "Fantastic! 🎊"],
  wrong: ["Almost! Let's try again 💙", "So close! You've got this 🌟", "Every mistake helps us grow 🐉", "Keep trying — you're doing great! 💪"],
};

function pickMsg(state: DragonState, seed: number) {
  const msgs = MESSAGES[state];
  return msgs[seed % msgs.length]!;
}

/* ─── Dragon companion panel ─────────────────────────────────────────────── */
interface DragonPanelProps {
  dragonStage: number;
  dragonState: DragonState;
  confetti: boolean;
  messageSeed: number;
}

function DragonPanel({ dragonStage, dragonState, confetti, messageSeed }: DragonPanelProps) {
  const mood    = MOOD_MAP[dragonState];
  const message = pickMsg(dragonState, messageSeed);

  const auraColor =
    dragonState === "happy" ? "oklch(0.78 0.13 82 / 0.35)" :
    dragonState === "wrong" ? "oklch(0.45 0.11 250 / 0.22)" :
                              "oklch(0.63 0.17 42 / 0.12)";

  return (
    <div
      className="relative flex flex-col items-center gap-2 rounded-3xl border border-border bg-card p-4 shadow-[var(--shadow-lift)]"
      style={{ minWidth: 148 }}
      aria-label="Dragon companion"
    >
      {/* Soft glow aura */}
      <div
        className="pointer-events-none absolute inset-4 rounded-full blur-2xl"
        style={{ background: `radial-gradient(circle, ${auraColor} 0%, transparent 70%)`, transition: "background 0.6s ease" }}
      />

      {/* Dragon + confetti */}
      <div className="relative">
        <Confetti active={confetti} />
        <DragonArt
          key={`${dragonState}-${messageSeed}`}
          stage={dragonStage}
          mood={mood}
          className={`relative h-24 w-24 ${
            dragonState === "happy" ? "animate-dragon-bounce" :
            dragonState === "wrong" ? "animate-grow-pop"      :
                                      "animate-dragon-idle"
          }`}
        />
      </div>

      {/* Speech bubble */}
      <div
        key={`msg-${messageSeed}`}
        className="animate-message-pop rounded-2xl border border-border bg-parchment px-3 py-2 text-center text-xs font-semibold leading-snug shadow-sm"
        style={{ maxWidth: 140 }}
      >
        {message}
      </div>

      <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
        Your Dragon
      </span>
    </div>
  );
}

/* ─── Individual journey node ────────────────────────────────────────────── */
type NodeState = "completed" | "current" | "locked" | "future";

function getNodeState(id: number, currentLevel: number, completedLevels: Record<number, unknown>): NodeState {
  if (completedLevels[id]) return "completed";
  if (id === currentLevel) return "current";
  if (id < currentLevel)   return "completed";  // safety
  if (id === currentLevel + 1) return "locked";
  return "future";
}

interface JourneyNodeProps {
  node: ReturnType<typeof buildNodes>[number];
  nodeState: NodeState;
  result: { stars: number } | undefined;
  justUnlocked: boolean;
  onHover: (s: NodeState) => void;
  onLeave: () => void;
}

function JourneyNode({ node, nodeState, result, justUnlocked, onHover, onLeave }: JourneyNodeProps) {
  const isClickable = nodeState === "completed" || nodeState === "current";
  const isHidden    = nodeState === "future";

  const cardBase = "flex items-center gap-3 rounded-2xl border p-3 transition-all duration-200";

  const cardStyle =
    nodeState === "completed" ? "border-success/50 bg-card ring-2 ring-success/30" :
    nodeState === "current"   ? "border-primary/60 bg-card animate-node-current" :
    nodeState === "locked"    ? "border-border/50 bg-muted/40 opacity-60 cursor-not-allowed" :
                                "border-border/30 bg-muted/20 opacity-30 cursor-not-allowed";

  const hoverStyle = isClickable ? "hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]" : "";

  const badgeBg =
    nodeState === "completed" ? "bg-success text-success-foreground" :
    nodeState === "current"   ? "ember-fill text-primary-foreground" :
                                "bg-muted text-muted-foreground";

  return (
    <div
      id={`level-node-${node.id}`}
      className={`absolute -translate-x-1/2 -translate-y-1/2 animate-node-pop ${isHidden ? "pointer-events-none" : ""}`}
      style={{
        left: `${node.x}%`,
        top:  node.y,
        animationDelay: `${0.08 + node.id * 0.08}s`,
        zIndex: nodeState === "current" ? 10 : 5,
      }}
      onMouseEnter={() => onHover(nodeState)}
      onMouseLeave={onLeave}
    >
      {/* Current level arrow */}
      {nodeState === "current" && (
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 animate-bounce-soft pointer-events-none z-10">
          <svg viewBox="0 0 20 20" className="h-6 w-6 drop-shadow-lg" aria-hidden="true">
            <path d="M10 1 L13 8 L10 19 L7 8 Z" fill="var(--gold)" />
          </svg>
        </span>
      )}

      {/* Unlock burst ring */}
      {justUnlocked && (
        <span className="pointer-events-none absolute inset-0 -m-3 rounded-3xl animate-node-unlock" aria-hidden="true" />
      )}

      <Link
        to={isClickable ? "/level/$levelId" : "/map"}
        params={{ levelId: String(node.id) }}
        disabled={!isClickable}
        aria-label={`${node.title} (${nodeState})`}
        className={`${cardBase} ${cardStyle} ${hoverStyle}`}
        style={{ width: "clamp(212px, 60vw, 280px)" }}
      >
        {/* Island icon + badge */}
        <span className="relative shrink-0">
          <span
            className={`grid h-14 w-14 place-items-center rounded-xl ${
              !isClickable ? "grayscale opacity-60" : ""
            }`}
            style={nodeState === "current" ? { background: "color-mix(in oklab, var(--primary) 8%, transparent)" } : undefined}
          >
            <IslandIcon skillKey={node.skillKey} className="h-14 w-14" />
          </span>
          <span className={`absolute -bottom-1.5 -right-1.5 grid h-6 w-6 place-items-center rounded-full font-display text-[11px] font-bold shadow ${badgeBg}`}>
            {nodeState === "completed" ? <Check className="h-3.5 w-3.5" /> :
             isClickable              ? node.id                            :
                                        <Lock className="h-3 w-3" />}
          </span>
        </span>

        {/* Text */}
        <span className={`min-w-0 ${!isClickable ? "opacity-50" : ""}`}>
          <span className="block truncate text-sm font-bold leading-tight">{node.title}</span>
          <span className="block truncate text-[11px] text-muted-foreground">{node.skill} · {node.difficulty}</span>
          <span className="block text-[11px] font-semibold text-primary">+{node.xpReward} XP</span>
          {result && (
            <span className="mt-0.5 flex gap-0.5">
              {[0,1,2].map(i => (
                <Star key={i} className={`h-3 w-3 ${i < result.stars ? "fill-gold text-gold" : "text-muted-foreground/30"}`} />
              ))}
            </span>
          )}
          {nodeState === "current" && (
            <span className="mt-0.5 inline-flex items-center gap-0.5 text-[11px] font-bold text-primary">
              Play now <ChevronRight className="h-3 w-3" />
            </span>
          )}
        </span>
      </Link>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────────────────────── */
function LearningMap() {
  const state = useAppState();
  const nodes = buildNodes();
  const mapH  = SVG_TOP_PAD + (nodes.length - 1) * NODE_STEP + 100;

  /* ── Dragon companion state ── */
  const [dragonState,   setDragonState]  = useState<DragonState>("idle");
  const [confetti,      setConfetti]     = useState(false);
  const [messageSeed,   setMessageSeed]  = useState(0);
  const dragonTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const triggerDragon = useCallback((next: DragonState, durationMs = 3200) => {
    if (dragonTimer.current) clearTimeout(dragonTimer.current);
    setDragonState(next);
    setConfetti(next === "happy");
    setMessageSeed(s => s + 1);
    dragonTimer.current = setTimeout(() => {
      setDragonState("idle");
      setConfetti(false);
    }, durationMs);
  }, []);

  /* Cleanup timer on unmount */
  useEffect(() => () => { if (dragonTimer.current) clearTimeout(dragonTimer.current); }, []);

  /* ── Read sessionStorage result written by level page ── */
  useEffect(() => {
    const last = sessionStorage.getItem("dyslexia_lastAnswer");
    if (last === "correct") triggerDragon("happy");
    else if (last === "wrong") triggerDragon("wrong");
    sessionStorage.removeItem("dyslexia_lastAnswer");
  }, [triggerDragon]);

  /* ── Listen for in-flight answer events ── */
  useEffect(() => {
    function onFeedback(e: Event) {
      const ok = (e as CustomEvent<{ ok: boolean }>).detail?.ok;
      triggerDragon(ok ? "happy" : "wrong");
    }
    window.addEventListener("dragon-feedback", onFeedback);
    return () => window.removeEventListener("dragon-feedback", onFeedback);
  }, [triggerDragon]);

  /* ── Detect newly-unlocked level ── */
  const [justUnlockedId, setJustUnlockedId] = useState<number | null>(null);
  const prevLevel = useRef(state.currentLevel);
  useEffect(() => {
    if (state.currentLevel !== prevLevel.current) {
      setJustUnlockedId(state.currentLevel);
      prevLevel.current = state.currentLevel;
      triggerDragon("happy", 2500);
      const t = setTimeout(() => setJustUnlockedId(null), 1200);
      return () => clearTimeout(t);
    }
    return undefined;
  }, [state.currentLevel, triggerDragon]);

  /* ── Auto-scroll to current node ── */
  useEffect(() => {
    const el = document.getElementById(`level-node-${state.currentLevel}`);
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "center" }), 600);
  }, [state.currentLevel]);

  /* ── Node hover → dragon reacts ── */
  function handleHover(ns: NodeState) {
    if (dragonState !== "idle") return;
    if (ns === "completed") { setDragonState("happy"); setMessageSeed(s => s + 1); }
  }
  function handleLeave() {
    if (dragonState === "happy" || dragonState === "wrong") return;
    setDragonState("idle");
  }

  /* ── Paths ── */
  const fullPath      = buildPath(nodes);
  const completedCount = Object.keys(state.completedLevels).length;
  const donePath      = completedCount > 0 ? buildPath(nodes, Math.min(completedCount, nodes.length - 1)) : null;

  /* ── Progress ── */
  const pct = Math.round((completedCount / 15) * 100);

  return (
    <AppShell>
      {/* ── Header ── */}
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-2xl font-bold sm:text-3xl">The Learning Isles</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Seven challenges guard each island — clear them to sail onward.
          </p>
          {/* Journey progress bar */}
          <div className="mt-3 flex items-center gap-3">
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full ember-fill transition-all duration-700"
                style={{ width: `${Math.max(4, pct)}%` }}
              />
            </div>
            <span className="shrink-0 text-xs font-bold text-muted-foreground">
              {completedCount} / 15
            </span>
          </div>
        </div>

        {/* Dragon panel — desktop (md+) */}
        <div className="hidden md:block">
          <DragonPanel
            dragonStage={state.dragonStage}
            dragonState={dragonState}
            confetti={confetti}
            messageSeed={messageSeed}
          />
        </div>
      </header>

      {/* ── Mobile dragon strip ── */}
      <div className="mt-4 flex items-center gap-3 rounded-2xl border border-border bg-card p-3 md:hidden">
        <DragonArt
          key={`mob-${dragonState}-${messageSeed}`}
          stage={state.dragonStage}
          mood={MOOD_MAP[dragonState]}
          className={`h-14 w-14 shrink-0 ${dragonState === "happy" ? "animate-dragon-bounce" : "animate-dragon-idle"}`}
        />
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Dragon Companion</p>
          <p key={`mob-msg-${messageSeed}`} className="animate-message-pop text-sm font-semibold truncate">
            {pickMsg(dragonState, messageSeed)}
          </p>
        </div>
        {confetti && (
          <div className="ml-auto flex gap-1 shrink-0">
            {["🎉","⭐","✨"].map((e,i) => <span key={i} className="text-lg">{e}</span>)}
          </div>
        )}
      </div>

      {/* ── Journey map canvas ── */}
      <div className="relative mt-6 overflow-hidden rounded-3xl border border-border night-scene">

        {/* Starfield backdrop */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {Array.from({ length: 40 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full bg-gold animate-twinkle"
              style={{
                width:  1.5 + (i % 3) * 0.8,
                height: 1.5 + (i % 3) * 0.8,
                left:   `${(i * 37 + 11) % 100}%`,
                top:    `${(i * 53 + 7)  % 100}%`,
                animationDelay: `${(i % 7) * 0.45}s`,
                opacity: 0.55,
              }}
            />
          ))}
        </div>

        {/* Scrollable area */}
        <div className="overflow-y-auto scroll-smooth" style={{ maxHeight: "78vh" }}>
          <div className="relative p-4 sm:p-6" style={{ height: mapH + 40 }}>

            {/* Section dividers */}
            {SECTIONS.map(({ startId, label }) => {
              const n = nodes.find(x => x.id === startId);
              if (!n) return null;
              const y = n.y - 38;
              return (
                <div
                  key={startId}
                  className="pointer-events-none absolute left-0 right-0 flex items-center gap-3 px-4"
                  style={{ top: y, zIndex: 4 }}
                >
                  <div className="h-px flex-1 bg-primary/20" />
                  <span className="rounded-full border border-primary/20 bg-card/80 px-3 py-1 text-[11px] font-bold text-primary/70 backdrop-blur-sm">
                    {label}
                  </span>
                  <div className="h-px flex-1 bg-primary/20" />
                </div>
              );
            })}

            {/* SVG path layer */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox={`0 0 ${SVG_W} ${mapH}`}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              {/* Ghost trail — entire path, always visible */}
              <path
                d={fullPath}
                fill="none" stroke="var(--gold)" strokeWidth="0.6"
                strokeDasharray="2.5 3" strokeLinecap="round"
                opacity="0.14" vectorEffect="non-scaling-stroke"
              />

              {/* Completed segment highlight */}
              {donePath && (
                <>
                  <path d={donePath} fill="none" stroke="var(--gold)" strokeWidth="3"
                    strokeLinecap="round" opacity="0.14" vectorEffect="non-scaling-stroke" />
                  <path d={donePath} fill="none" stroke="var(--success)" strokeWidth="1.1"
                    strokeLinecap="round" opacity="0.7" vectorEffect="non-scaling-stroke" />
                </>
              )}

              {/* Animated draw-in path */}
              <path
                d={fullPath}
                fill="none" stroke="var(--gold)" strokeWidth="0.9" strokeLinecap="round"
                pathLength={1000}
                className="animate-path-draw animate-path-glow"
                style={{ strokeDasharray: 1000, strokeDashoffset: 1000 }}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Level nodes */}
            {nodes.map(n => (
              <JourneyNode
                key={n.id}
                node={n}
                nodeState={getNodeState(n.id, state.currentLevel, state.completedLevels)}
                result={state.completedLevels[n.id]}
                justUnlocked={justUnlockedId === n.id}
                onHover={handleHover}
                onLeave={handleLeave}
              />
            ))}

          </div>
        </div>
      </div>

      {/* ── Legend ── */}
      <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
        {[
          { cls: "bg-success",              label: "Completed" },
          { cls: "ember-fill",              label: "Current level" },
          { cls: "bg-muted border border-border/60", label: "Locked" },
        ].map(({ cls, label }) => (
          <span key={label} className="flex items-center gap-1.5">
            <span className={`inline-block h-2.5 w-2.5 rounded-full ${cls}`} />
            {label}
          </span>
        ))}
      </div>
    </AppShell>
  );
}
