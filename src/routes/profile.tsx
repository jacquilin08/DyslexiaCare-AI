import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { CompanionArt, DragonArt, type CreatureKind } from "@/components/art";
import { useAppState, updateUser, DRAGON_STAGE_NAMES } from "@/lib/store";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Student profile — DyslexiaCare AI" },
      { name: "description", content: "Your learner profile: companion, interests, dragon stage and journey stats." },
      { property: "og:title", content: "Student profile — DyslexiaCare AI" },
      { property: "og:description", content: "Companion, interests and journey stats." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Profile,
});

const COMPANIONS: CreatureKind[] = ["dragon", "fox", "owl", "rabbit"];

function Profile() {
  const s = useAppState();
  if (!s.user) {
    return (
      <AppShell>
        <p className="card-elevated p-6">
          You&apos;re signed out. <Link to="/auth" className="font-bold text-primary">Sign in</Link> to see your profile.
        </p>
      </AppShell>
    );
  }
  return (
    <AppShell>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Student profile</h1>

      <section className="card-elevated mt-5 grid gap-6 p-6 sm:grid-cols-[auto_minmax(0,1fr)]">
        <CompanionArt kind={s.user.companion} className="h-28 w-28 shrink-0" />
        <div className="min-w-0">
          <h2 className="font-display text-xl font-bold">{s.user.name}</h2>
          <p className="text-sm text-muted-foreground">
            Age {s.user.age} · {s.user.learningLevel} reader · {s.user.email}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {(s.user.interests.length ? s.user.interests : ["No interests picked yet"]).map((i) => (
              <span key={i} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{i}</span>
            ))}
          </div>
          <Link to="/setup" className="mt-4 inline-block text-sm font-bold text-primary hover:underline">
            Edit profile details
          </Link>
        </div>
      </section>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <section className="card-elevated p-6">
          <h2 className="font-bold">Change companion</h2>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {COMPANIONS.map((c) => (
              <button
                key={c}
                onClick={() => updateUser({ companion: c })}
                className={`rounded-xl border p-2 ${s.user!.companion === c ? "border-primary bg-primary/8" : "border-border hover:bg-muted"}`}
              >
                <CompanionArt kind={c} className="mx-auto h-14 w-14" />
              </button>
            ))}
          </div>
        </section>
        <section className="card-elevated flex items-center gap-4 p-6">
          <DragonArt stage={s.dragonStage} className="h-24 w-24 shrink-0" />
          <div className="min-w-0">
            <h2 className="font-bold">{DRAGON_STAGE_NAMES[s.dragonStage]}</h2>
            <p className="text-sm text-muted-foreground">
              {Object.keys(s.completedLevels).length} levels complete · {s.xp.toLocaleString()} XP · {s.coins} coins
            </p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
