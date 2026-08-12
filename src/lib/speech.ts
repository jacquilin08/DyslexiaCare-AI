/** Browser speech + subtle WebAudio cues. No external services, no API keys. */

export function speak(text: string, rate = 1, onBoundary?: (charIndex: number) => void) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = rate;
  u.pitch = 1;
  if (onBoundary) u.onboundary = (e) => onBoundary(e.charIndex);
  window.speechSynthesis.speak(u);
  return u;
}

export function stopSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.cancel();
}

export function pauseSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.pause();
}

export function resumeSpeaking() {
  if (typeof window !== "undefined" && "speechSynthesis" in window) window.speechSynthesis.resume();
}

export function speechRecognitionSupported() {
  if (typeof window === "undefined") return false;
  const w = window as unknown as Record<string, unknown>;
  return Boolean(w["SpeechRecognition"] || w["webkitSpeechRecognition"]);
}

export function listenOnce(onResult: (text: string) => void, onEnd?: (err?: string) => void) {
  const w = window as unknown as Record<string, unknown>;
  const Ctor = (w["SpeechRecognition"] || w["webkitSpeechRecognition"]) as
    | (new () => any)
    | undefined;
  if (!Ctor) {
    onEnd?.("unsupported");
    return null;
  }
  const rec = new Ctor();
  rec.lang = "en-US";
  rec.interimResults = false;
  rec.maxAlternatives = 1;
  rec.onresult = (e: any) => onResult(String(e.results[0][0].transcript ?? "").trim());
  rec.onerror = (e: any) => onEnd?.(String(e.error ?? "error"));
  rec.onend = () => onEnd?.();
  rec.start();
  return rec as { stop: () => void };
}

/* ---- tiny synthesised sound cues (no audio assets required) ---- */
let ctx: AudioContext | null = null;
function audio() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const C = (window as any).AudioContext || (window as any).webkitAudioContext;
    if (!C) return null;
    ctx = new C();
  }
  return ctx;
}

function tone(freq: number, start: number, dur: number, type: OscillatorType = "sine", gain = 0.06) {
  const a = audio();
  if (!a) return;
  const osc = a.createOscillator();
  const g = a.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, a.currentTime + start);
  g.gain.setValueAtTime(0.0001, a.currentTime + start);
  g.gain.exponentialRampToValueAtTime(gain, a.currentTime + start + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, a.currentTime + start + dur);
  osc.connect(g).connect(a.destination);
  osc.start(a.currentTime + start);
  osc.stop(a.currentTime + start + dur + 0.05);
}

export type Cue = "correct" | "gentle" | "xp" | "badge" | "crack" | "evolve" | "complete";

export function playCue(cue: Cue, enabled: boolean) {
  if (!enabled) return;
  switch (cue) {
    case "correct":
      tone(660, 0, 0.14);
      tone(880, 0.1, 0.2);
      break;
    case "gentle":
      tone(360, 0, 0.16, "triangle", 0.045);
      break;
    case "xp":
      tone(760, 0, 0.08, "triangle", 0.04);
      break;
    case "badge":
      tone(600, 0, 0.1);
      tone(900, 0.09, 0.12);
      tone(1200, 0.18, 0.2);
      break;
    case "crack":
      tone(140, 0, 0.12, "sawtooth", 0.05);
      tone(90, 0.08, 0.18, "sawtooth", 0.04);
      break;
    case "evolve":
      [400, 520, 640, 800, 980].forEach((f, i) => tone(f, i * 0.11, 0.25, "sine", 0.05));
      break;
    case "complete":
      [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.13, 0.3, "sine", 0.055));
      break;
  }
}
