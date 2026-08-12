import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { Heart, Star, Volume2, Mic, ImagePlus, ArrowRight, ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { DragonCeremony } from "@/components/dragon-ceremony";
import { getLevel, getLevelQuestions, type Question } from "@/lib/curriculum";
import { completeLevel, progressQuest, useAppState } from "@/lib/store";
import { listenOnce, playCue, speak, speechRecognitionSupported, stopSpeaking, pauseSpeaking, resumeSpeaking } from "@/lib/speech";

export const Route = createFileRoute("/level/$levelId")({
  head: () => ({
    meta: [
      { title: "Level challenge — DyslexiaCare AI" },
      { name: "description", content: "Seven adaptive reading, spelling, phonics and voice challenges — clear them to hatch your dragon." },
      { property: "og:title", content: "Level challenge — DyslexiaCare AI" },
      { property: "og:description", content: "Seven challenges stand between you and the next island." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LevelPlay,
});

const PRAISE = ["Amazing work!", "You got it!", "Excellent — that's right!", "Your dragon is getting stronger!"];
const ENCOURAGE = [
  "Almost there! Let's look at this one again.",
  "Nice attempt! Let's practise this word once more.",
  "You're close! Check the middle letters.",
];

function norm(s: string) {
  return s.toLowerCase().replace(/[^a-z ]/g, "").trim();
}

function analyseSpelling(input: string, expected: string) {
  const a = norm(input);
  const b = norm(expected);
  if (a === b) return null;
  if (a.split("").reverse().join("") === b || (a.length === b.length && [...a].sort().join("") === [...b].sort().join("")))
    return "Letter order looks different. Let's practise this word again.";
  if (a.length < b.length) return "It looks like a letter is missing. Listen once more and try again.";
  if (a.length > b.length) return "There may be an extra letter in there. Listen once more and try again.";
  return "You're close! Check the middle letters.";
}

function LevelPlay() {
  const { levelId } = Route.useParams();
  const id = Number(levelId);
  const level = getLevel(id);
  const state = useAppState();
  const navigate = useNavigate();

  const [seed] = useState(() => Math.floor(Math.random() * 999) + 1);
  const questions = useMemo(() => getLevelQuestions(id, seed), [id, seed]);
  const [phase, setPhase] = useState<"intro" | "play" | "ceremony">("intro");
  const [index, setIndex] = useState(0);
  const [lives, setLives] = useState(3);
  const [xp, setXp] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  if (!level) {
    return (
      <AppShell>
        <p className="card-elevated p-6">That island isn&apos;t on the map. <Link to="/map" className="font-bold text-primary">Back to the map</Link></p>
      </AppShell>
    );
  }

  const q = questions[index]!;

  function handleAnswer(ok: boolean, gained: number) {
    playCue(ok ? "correct" : "gentle", state.settings.sound);
    if (ok) {
      setXp((x) => x + gained);
      setCorrectCount((c) => c + 1);
      progressQuest("words", 2);
      if (q.type === "spelling") progressQuest("spelling", 1);
      if (q.type === "reading" || q.type === "comprehension") progressQuest("lesson", 1);
    } else {
      setLives((l) => Math.max(0, l - 1));
    }
  }

  function next() {
    if (index + 1 >= questions.length) {
      stopSpeaking();
      completeLevel({ level: id, correct: correctCount, xp, skillKey: level!.skillKey });
      setPhase("ceremony");
    } else {
      setIndex((i) => i + 1);
    }
  }

  if (phase === "ceremony") {
    const stars = correctCount >= 7 ? 3 : correctCount >= 6 ? 2 : 1;
    return (
      <DragonCeremony
        xp={xp + (correctCount === 7 ? 150 : 0)}
        coins={30}
        stars={stars}
        nextLevel={id < 15 ? id + 1 : null}
        dragonStage={state.dragonStage}
        finalLevel={id === 15}
        soundOn={state.settings.sound}
        onContinue={() => navigate({ to: id < 15 ? "/map" : "/progress" })}
      />
    );
  }

  if (phase === "intro") {
    return (
      <AppShell>
        <div className="mx-auto max-w-xl">
          <Link to="/map" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to map
          </Link>
          <div className="card-elevated mt-4 p-8 text-center">
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Level {level.id}</span>
            <h1 className="mt-2 font-display text-3xl font-bold">{level.title}</h1>
            <p className="mt-2 text-muted-foreground">{level.blurb}</p>
            <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
              <Box label="Skill" value={level.skill} />
              <Box label="Challenges" value="7" />
              <Box label="Reward" value={`${level.xpReward} XP`} />
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              You have three hearts. A miss just means another try later — nothing is lost.
            </p>
            <button
              onClick={() => setPhase("play")}
              className="mt-6 inline-flex items-center gap-2 rounded-xl ember-fill px-6 py-3.5 font-bold text-primary-foreground"
            >
              Begin challenge <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="min-w-0">
            <p className="text-sm font-bold">Question {index + 1} / 7</p>
            <div className="mt-2 flex gap-1.5">
              {questions.map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 w-2.5 rounded-full ${i < index ? "bg-success" : i === index ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-3">
            <span className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <Heart key={i} className={`h-4 w-4 ${i < lives ? "fill-destructive text-destructive" : "text-muted-foreground/30"}`} />
              ))}
            </span>
            <span className="flex items-center gap-1 text-sm font-bold">
              <Star className="h-4 w-4 text-gold" /> {xp}
            </span>
          </div>
        </div>

        <QuestionView
          key={q.id + index}
          question={q}
          speed={state.settings.readingSpeed}
          onAnswer={handleAnswer}
          onNext={next}
          last={index + 1 === questions.length}
        />
      </div>
    </AppShell>
  );
}

function Box({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-parchment px-3 py-2">
      <div className="text-[11px] text-muted-foreground">{label}</div>
      <div className="truncate font-bold">{value}</div>
    </div>
  );
}

function QuestionView({
  question,
  speed,
  onAnswer,
  onNext,
  last,
}: {
  question: Question;
  speed: number;
  onAnswer: (ok: boolean, xp: number) => void;
  onNext: () => void;
  last: boolean;
}) {
  const [picked, setPicked] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(null);
  const [listening, setListening] = useState(false);
  const [heard, setHeard] = useState<string | null>(null);
  const [voiceNote, setVoiceNote] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgState, setImgState] = useState<"idle" | "analysing" | "done">("idle");
  const [sentence, setSentence] = useState(-1);
  const [reading, setReading] = useState(false);
  const shakeRef = useRef<HTMLDivElement>(null);

  const sentences = (question.story ?? "").match(/[^.!?]+[.!?]?/g)?.map((s) => s.trim()).filter(Boolean) ?? [];

  useEffect(() => () => stopSpeaking(), []);

  function resolve(ok: boolean, msg?: string) {
    setFeedback({
      ok,
      msg: msg ?? (ok ? PRAISE[Math.floor(Math.random() * PRAISE.length)]! : ENCOURAGE[Math.floor(Math.random() * ENCOURAGE.length)]!),
    });
    onAnswer(ok, question.xp);
    if (!ok && shakeRef.current) {
      shakeRef.current.classList.remove("animate-shake-x");
      void shakeRef.current.offsetWidth;
      shakeRef.current.classList.add("animate-shake-x");
    }
  }

  function checkText(value: string) {
    const ok = norm(value) === norm(question.answer) || (question.accepts ?? []).some((a) => norm(a) === norm(value));
    resolve(ok, ok ? undefined : (analyseSpelling(value, question.answer) ?? undefined));
  }

  function startVoice() {
    if (!speechRecognitionSupported()) {
      setVoiceNote("Voice input is not supported in this browser. You can type your answer instead.");
      return;
    }
    setVoiceNote(null);
    setListening(true);
    listenOnce(
      (t) => {
        setHeard(t);
        checkText(t);
      },
      (err) => {
        setListening(false);
        if (err === "unsupported") setVoiceNote("Voice input is not supported in this browser. You can type your answer instead.");
        else if (err) setVoiceNote("The microphone didn't catch that. Try again or type your answer.");
      },
    );
  }

  function readAlong() {
    if (!sentences.length) return;
    setReading(true);
    let i = 0;
    const step = () => {
      if (i >= sentences.length) {
        setReading(false);
        setSentence(-1);
        return;
      }
      setSentence(i);
      const u = speak(sentences[i]!, speed);
      if (!u) {
        setReading(false);
        return;
      }
      u.onend = () => {
        i += 1;
        step();
      };
    };
    step();
  }

  const answered = feedback !== null;

  return (
    <div ref={shakeRef} className="card-elevated mt-5 p-6 sm:p-8">
      <p className="text-xs font-bold uppercase tracking-wide text-primary">{question.category.replace(/-/g, " ")}</p>
      <h2 className="mt-2 font-display text-xl font-bold sm:text-2xl text-learn">{question.question}</h2>
      {question.helper && <p className="mt-1 text-sm text-muted-foreground">{question.helper}</p>}

      {/* Prompt display */}
      {question.content && !question.story && (
        <div className="mt-6 flex flex-col items-center gap-3">
          {["spelling"].includes(question.type) ? (
            <button
              onClick={() => speak(question.content!, speed)}
              className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 font-bold transition-colors hover:bg-muted"
            >
              <Volume2 className="h-5 w-5 text-primary" /> Play the word
            </button>
          ) : (
            <>
              <div className="rounded-2xl bg-parchment px-10 py-6 text-center font-learn text-6xl font-bold tracking-wide sm:text-7xl">
                {question.type === "letter-confusion" ? (
                  <>
                    <span className="text-primary underline decoration-primary/40 decoration-8 underline-offset-8">
                      {question.content.charAt(0)}
                    </span>
                    {question.content.slice(1)}
                  </>
                ) : (
                  question.content
                )}
              </div>
              <button
                onClick={() => speak(question.content!, speed)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <Volume2 className="h-4 w-4" /> Listen
              </button>
            </>
          )}
        </div>
      )}

      {/* Story reading */}
      {question.story && (
        <div className="mt-6">
          <div className="rounded-2xl bg-parchment p-5 font-learn text-lg leading-relaxed">
            {sentences.map((s, i) => (
              <span
                key={i}
                className={`transition-colors ${i === sentence ? "rounded bg-primary/20 px-1 font-semibold" : ""}`}
              >
                {s}{" "}
              </span>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={readAlong} className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">
              <Play className="h-4 w-4 text-primary" /> Read With Me
            </button>
            <button onClick={() => speak(question.story!, speed)} className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">
              <Volume2 className="h-4 w-4 text-primary" /> Listen
            </button>
            <button onClick={pauseSpeaking} className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">
              <Pause className="h-4 w-4" /> Pause
            </button>
            <button onClick={resumeSpeaking} className="inline-flex items-center gap-1.5 rounded-xl border border-border px-4 py-2 text-sm font-semibold hover:bg-muted">
              <RotateCcw className="h-4 w-4" /> Resume
            </button>
          </div>
          {!answered && (
            <button
              onClick={() => resolve(true, "Great reading. Let's keep going.")}
              className="mt-4 w-full rounded-xl ember-fill py-3 font-bold text-primary-foreground"
            >
              {reading ? "I'm following along" : "I've read it"}
            </button>
          )}
        </div>
      )}

      {/* Options */}
      {question.options && (
        <div className={`mt-6 grid gap-3 ${question.options.length > 2 ? "sm:grid-cols-2" : ""}`}>
          {question.options.map((opt) => {
            const isPicked = picked === opt;
            const correct = answered && opt === question.answer;
            return (
              <button
                key={opt}
                disabled={answered}
                onClick={() => {
                  setPicked(opt);
                  resolve(opt === question.answer);
                }}
                className={`rounded-2xl border-2 px-5 py-4 text-left font-learn text-lg font-bold transition-all ${
                  correct
                    ? "border-success bg-success/10"
                    : isPicked
                      ? "border-destructive bg-destructive/8"
                      : "border-border bg-card hover:border-primary hover:-translate-y-0.5"
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      )}

      {/* Text / spelling / phonics input */}
      {["spelling", "phonics"].includes(question.type) && (
        <div className="mt-6 space-y-3">
          <input
            value={text}
            disabled={answered}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !answered && text.trim() && checkText(text)}
            placeholder="Type your answer"
            className="w-full rounded-xl border border-input bg-card px-4 py-3.5 font-learn text-lg outline-none focus:ring-2 focus:ring-ring"
          />
          <div className="flex flex-wrap gap-2">
            <button
              disabled={answered || !text.trim()}
              onClick={() => checkText(text)}
              className="rounded-xl ember-fill px-5 py-3 font-bold text-primary-foreground disabled:opacity-45"
            >
              Check answer
            </button>
            <VoiceButton listening={listening} onClick={startVoice} disabled={answered} />
          </div>
        </div>
      )}

      {/* Voice-first */}
      {question.type === "voice-input" && (
        <div className="mt-6 space-y-3">
          <VoiceButton listening={listening} onClick={startVoice} disabled={answered} large />
          <div className="flex flex-wrap gap-2">
            <input
              value={text}
              disabled={answered}
              onChange={(e) => setText(e.target.value)}
              placeholder="…or type it instead"
              className="min-w-0 flex-1 rounded-xl border border-input bg-card px-4 py-3 outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              disabled={answered || !text.trim()}
              onClick={() => checkText(text)}
              className="rounded-xl border border-border px-4 py-3 font-bold disabled:opacity-45"
            >
              Check
            </button>
          </div>
        </div>
      )}

      {heard && (
        <p className="mt-3 rounded-xl bg-parchment px-4 py-3 text-sm">
          <span className="text-muted-foreground">You said: </span>
          <span className="font-learn font-bold">{heard}</span>
        </p>
      )}
      {voiceNote && <p className="mt-3 text-sm text-muted-foreground">{voiceNote}</p>}

      {/* Image input */}
      {question.type === "image-input" && (
        <div className="mt-6 space-y-3">
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border px-5 py-8 text-sm font-bold text-muted-foreground hover:border-primary hover:text-foreground">
            <ImagePlus className="h-5 w-5" /> Choose an image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onload = () => {
                  setImgSrc(String(reader.result));
                  setImgState("analysing");
                  setTimeout(() => setImgState("done"), 1400);
                };
                reader.readAsDataURL(file);
              }}
            />
          </label>
          {imgSrc && (
            <div className="flex items-center gap-4 rounded-2xl border border-border p-3">
              <img src={imgSrc} alt="Your upload" className="h-24 w-24 rounded-xl object-cover" />
              <div className="min-w-0 text-sm">
                {imgState === "analysing" ? (
                  <p className="text-muted-foreground">Checking your picture…</p>
                ) : (
                  <>
                    <p className="font-bold">Image received</p>
                    <p className="text-muted-foreground">
                      Possible match detected for “{question.content}”. (Prototype: this check is simulated
                      locally, no computer vision is running.)
                    </p>
                  </>
                )}
              </div>
            </div>
          )}
          {imgState === "done" && !answered && (
            <button
              onClick={() => resolve(true, "Great choice — that fits the letter perfectly.")}
              className="w-full rounded-xl ember-fill py-3 font-bold text-primary-foreground"
            >
              Submit picture
            </button>
          )}
          {!answered && (
            <button onClick={() => resolve(true, "No picture handy — that's fine, let's move on.")} className="w-full rounded-xl border border-border py-3 text-sm font-semibold">
              Skip this picture task
            </button>
          )}
        </div>
      )}

      {/* Feedback */}
      {feedback && (
        <div
          className={`mt-6 animate-fade-up rounded-2xl border p-4 ${
            feedback.ok ? "border-success/40 bg-success/10" : "border-primary/30 bg-primary/8"
          }`}
        >
          <p className="font-bold">{feedback.ok ? feedback.msg : "Let's try that again together"}</p>
          {!feedback.ok && (
            <p className="mt-1 text-sm text-muted-foreground">
              {feedback.msg} The answer is <span className="font-learn font-bold text-foreground">{question.answer}</span>.
            </p>
          )}
          <button
            onClick={onNext}
            className="mt-4 inline-flex items-center gap-2 rounded-xl ember-fill px-5 py-3 font-bold text-primary-foreground"
          >
            {last ? "Finish level" : "Next question"} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

function VoiceButton({
  listening,
  onClick,
  disabled,
  large,
}: {
  listening: boolean;
  onClick: () => void;
  disabled?: boolean;
  large?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl border-2 font-bold transition-colors disabled:opacity-45 ${
        large ? "w-full border-primary px-5 py-4 text-lg" : "border-border px-5 py-3"
      } ${listening ? "animate-pulse-ring border-primary bg-primary/10" : "hover:bg-muted"}`}
    >
      <Mic className={`h-5 w-5 ${listening ? "text-primary" : ""}`} />
      {listening ? "Listening…" : "Speak Answer"}
    </button>
  );
}
