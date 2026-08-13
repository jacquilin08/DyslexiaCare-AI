import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import {
  Compass,
  LayoutDashboard,
  Map as MapIcon,
  BarChart3,
  Sparkles,
  Settings2,
  Users,
  GraduationCap,
  Flame,
  Star,
  Gem,
  Volume2,
  VolumeX,
  LogOut,
  RotateCcw,
} from "lucide-react";
import { useAppState, hydrate, updateSettings, signOut, getDueReviews } from "@/lib/store";
import { CompanionArt } from "@/components/art";

const NAV = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/map", label: "Journey", icon: MapIcon },
  { to: "/review", label: "Review", icon: RotateCcw },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/tutor", label: "Tutor", icon: Sparkles },
  { to: "/parent", label: "Parent", icon: Users },
  { to: "/teacher", label: "Class", icon: GraduationCap },
  { to: "/settings", label: "Settings", icon: Settings2 },
] as const;

export function useThemeEffect() {
  const { settings } = useAppState();
  useEffect(() => {
    hydrate();
  }, []);
  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    root.classList.remove("dark", "theme-warm", "theme-contrast");
    if (settings.theme === "dark") root.classList.add("dark");
    if (settings.theme === "warm") root.classList.add("theme-warm");
    if (settings.theme === "contrast") root.classList.add("theme-contrast");
    root.classList.toggle("focus-mode", settings.focusMode);
    root.style.setProperty("--reading-scale", String(settings.fontScale));
    root.style.setProperty("--reading-spacing", `${settings.letterSpacing}em`);
    root.style.setProperty("--reading-leading", String(settings.lineHeight));
  }, [settings]);
}

export function StatPill({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Flame;
  value: string | number;
  label: string;
}) {
  return (
    <div className="flex min-w-0 items-center gap-2 rounded-xl border border-border bg-card px-3 py-2">
      <Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={2.2} />
      <div className="min-w-0 leading-tight">
        <div className="truncate text-sm font-bold">{value}</div>
        <div className="truncate text-[11px] text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  useThemeEffect();
  const state = useAppState();
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:justify-between">
          <Link to="/dashboard" className="flex min-w-0 items-center gap-2">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl ember-fill">
              <Compass className="h-5 w-5 text-primary-foreground" />
            </span>
            <span className="min-w-0">
              <span className="block truncate font-display text-base font-bold leading-none">DyslexiaCare AI</span>
              <span className="block truncate text-[11px] text-muted-foreground">Learning adventure</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 md:flex">
              <StatPill icon={Flame} value={state.streak} label="day streak" />
              <StatPill icon={Star} value={state.xp.toLocaleString()} label="XP" />
              <StatPill icon={Gem} value={state.coins} label="coins" />
            </div>
            <button
              onClick={() => updateSettings({ sound: !state.settings.sound })}
              className="grid h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground"
              aria-label={state.settings.sound ? "Turn sound off" : "Turn sound on"}
            >
              {state.settings.sound ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </button>
            {state.user && (
              <Link
                to="/profile"
                className="grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-border bg-parchment"
                aria-label="Your profile"
              >
                <CompanionArt kind={state.user.companion} className="h-8 w-8" />
              </Link>
            )}
            <Link
              to="/"
              onClick={() => signOut()}
              className="hidden h-9 w-9 place-items-center rounded-xl border border-border text-muted-foreground transition-colors hover:text-foreground sm:grid"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <nav className="focus-hide sticky top-24 hidden h-fit w-52 shrink-0 flex-col gap-1 lg:flex">
          {NAV.map((item) => {
            const active = path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <main className="min-w-0 flex-1 pb-20 lg:pb-0">{children}</main>
      </div>

      <nav className="focus-hide fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 backdrop-blur lg:hidden">
        <div className="mx-auto flex max-w-2xl justify-between px-2 py-1.5">
          {NAV.slice(0, 5).map((item) => {
            const active = path.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-1 flex-col items-center gap-0.5 rounded-lg px-1 py-1.5 text-[10px] font-semibold ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}