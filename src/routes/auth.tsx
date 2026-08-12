import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Waypoints, Mail, Lock, User as UserIcon, Cake, ArrowRight } from "lucide-react";
import { useThemeEffect } from "@/components/app-shell";
import { signIn, updateUser, useAppState } from "@/lib/store";
import { HeroScene } from "@/components/art";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — DyslexiaCare AI" },
      { name: "description", content: "Sign in or create a DyslexiaCare AI learner account to continue your reading adventure." },
      { property: "og:title", content: "Sign in — DyslexiaCare AI" },
      { property: "og:description", content: "Continue your personalized reading adventure." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthPage,
});

const LEVELS = [
  { id: "beginner", label: "Beginner", body: "Letters and first words" },
  { id: "developing", label: "Developing", body: "Sentences and spelling" },
  { id: "confident", label: "Confident", body: "Stories and fluency" },
] as const;

const INTERESTS = ["Animals", "Space", "Adventure", "Sports", "Fantasy", "Science", "Nature"];

const field =
  "w-full rounded-xl border border-input bg-card px-10 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-ring";

function AuthPage() {
  useThemeEffect();
  const navigate = useNavigate();
  const state = useAppState();
  const [tab, setTab] = useState<"in" | "up">("in");
  const [step, setStep] = useState<"form" | "prefs">("form");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("10");
  const [remember, setRemember] = useState(true);
  const [learningLevel, setLearningLevel] = useState<(typeof LEVELS)[number]["id"]>("developing");
  const [interests, setInterests] = useState<string[]>([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (state.user?.profileComplete) navigate({ to: "/dashboard" });
  }, [state.user?.profileComplete, navigate]);

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@") || password.length < 4) {
      setNote("Enter an email and a password of at least 4 characters.");
      return;
    }
    signIn(email);
    navigate({ to: state.user?.profileComplete ? "/dashboard" : "/setup" });
  }

  function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.includes("@")) return setNote("Please add your name and email.");
    if (password.length < 4) return setNote("Password needs at least 4 characters.");
    if (password !== confirm) return setNote("Both passwords need to match.");
    setNote("");
    setStep("prefs");
  }

  function finishSignUp() {
    signIn(email, name.trim());
    updateUser({
      name: name.trim(),
      age: Number(age) || 10,
      learningLevel,
      interests,
      profileComplete: false,
    });
    navigate({ to: "/setup" });
  }

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_1.05fr]">
      <aside className="hidden flex-col justify-between night-scene p-10 lg:flex">
        <Link to="/" className="flex items-center gap-2 text-primary-foreground">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-foreground/15">
            <Waypoints className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold">DyslexiaCare AI</span>
        </Link>
        <div>
          <HeroScene className="w-full max-w-md" />
          <h2 className="mt-8 max-w-sm font-display text-3xl font-bold text-primary-foreground">
            Your island journey is waiting.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-primary-foreground/70">
            Progress stays in this browser. Nothing is sent anywhere.
          </p>
        </div>
        <p className="text-xs text-primary-foreground/50">Prototype mock authentication.</p>
      </aside>

      <main className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          {step === "form" ? (
            <>
              <div className="mb-7 grid grid-cols-2 gap-1 rounded-xl bg-muted p-1">
                {(["in", "up"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTab(t);
                      setNote("");
                    }}
                    className={`rounded-lg py-2.5 text-sm font-bold transition-colors ${
                      tab === t ? "bg-card text-foreground shadow-[var(--shadow-soft)]" : "text-muted-foreground"
                    }`}
                  >
                    {t === "in" ? "Sign In" : "Create Account"}
                  </button>
                ))}
              </div>

              <h1 className="font-display text-3xl font-bold">
                {tab === "in" ? "Welcome back" : "Start your adventure"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {tab === "in"
                  ? "Sign in to pick up where your dragon left off."
                  : "A few details and your learning island is ready."}
              </p>

              {tab === "in" ? (
                <form onSubmit={handleSignIn} className="mt-7 space-y-4">
                  <Field icon={Mail}>
                    <input className={field} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Field>
                  <Field icon={Lock}>
                    <input className={field} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Field>
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 text-muted-foreground">
                      <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 accent-[var(--primary)]" />
                      Remember me
                    </label>
                    <button
                      type="button"
                      onClick={() => setNote("Password reset is not part of this offline prototype — any password works.")}
                      className="font-semibold text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  {note && <p className="text-sm text-muted-foreground">{note}</p>}
                  <button className="w-full rounded-xl ember-fill py-3.5 font-bold text-primary-foreground transition-transform hover:scale-[1.01]">
                    Sign In
                  </button>
                </form>
              ) : (
                <form onSubmit={handleSignUp} className="mt-7 space-y-4">
                  <Field icon={UserIcon}>
                    <input className={field} placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                  </Field>
                  <Field icon={Cake}>
                    <input className={field} type="number" min={4} max={18} placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                  </Field>
                  <Field icon={Mail}>
                    <input className={field} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </Field>
                  <Field icon={Lock}>
                    <input className={field} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </Field>
                  <Field icon={Lock}>
                    <input className={field} type="password" placeholder="Confirm password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                  </Field>
                  {note && <p className="text-sm text-muted-foreground">{note}</p>}
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl ember-fill py-3.5 font-bold text-primary-foreground transition-transform hover:scale-[1.01]">
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </>
          ) : (
            <div className="animate-fade-up">
              <h1 className="font-display text-3xl font-bold">Tell us how you read</h1>
              <p className="mt-2 text-sm text-muted-foreground">This shapes your first levels.</p>

              <h2 className="mt-7 text-sm font-bold uppercase tracking-wide text-muted-foreground">Learning level</h2>
              <div className="mt-3 space-y-2">
                {LEVELS.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLearningLevel(l.id)}
                    className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                      learningLevel === l.id ? "border-primary bg-primary/8" : "border-border hover:bg-muted"
                    }`}
                  >
                    <div className="font-bold">{l.label}</div>
                    <div className="text-xs text-muted-foreground">{l.body}</div>
                  </button>
                ))}
              </div>

              <h2 className="mt-7 text-sm font-bold uppercase tracking-wide text-muted-foreground">Interests</h2>
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

              <button
                onClick={finishSignUp}
                className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl ember-fill py-3.5 font-bold text-primary-foreground"
              >
                Build my profile <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function Field({ icon: Icon, children }: { icon: typeof Mail; children: React.ReactNode }) {
  return (
    <div className="relative">
      <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      {children}
    </div>
  );
}
