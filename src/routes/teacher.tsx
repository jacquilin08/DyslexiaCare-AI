import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/app-shell";

export const Route = createFileRoute("/teacher")({
  head: () => ({
    meta: [
      { title: "Classroom overview — DyslexiaCare AI" },
      { name: "description", content: "A mock classroom dashboard: student levels, reading and spelling progress, and support flags." },
      { property: "og:title", content: "Classroom overview — DyslexiaCare AI" },
      { property: "og:description", content: "Class-wide reading and spelling progress at a glance." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Teacher,
});

type Student = { name: string; level: number; reading: number; spelling: number; status: "On track" | "Improving" | "Needs support" };

const STUDENTS: Student[] = [
  { name: "Ava Lindgren", level: 8, reading: 91, spelling: 84, status: "On track" },
  { name: "Noah Fitzgerald", level: 5, reading: 68, spelling: 54, status: "Needs support" },
  { name: "Ines Duarte", level: 7, reading: 82, spelling: 76, status: "Improving" },
  { name: "Kofi Mensah", level: 11, reading: 94, spelling: 88, status: "On track" },
  { name: "Lena Petrova", level: 4, reading: 61, spelling: 49, status: "Needs support" },
  { name: "Marcus Bell", level: 9, reading: 86, spelling: 79, status: "Improving" },
];

function Teacher() {
  const [selected, setSelected] = useState<Student | null>(null);

  return (
    <AppShell>
      <h1 className="font-display text-2xl font-bold sm:text-3xl">Classroom overview</h1>
      <p className="text-sm text-muted-foreground">Sample class data for demonstration purposes.</p>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          ["Students", "28"],
          ["Active", "24"],
          ["Improving", "21"],
          ["Needs support", "7"],
        ].map(([l, v]) => (
          <div key={l} className="card-elevated p-4">
            <div className="font-display text-2xl font-bold">{v}</div>
            <div className="text-xs text-muted-foreground">{l}</div>
          </div>
        ))}
      </div>

      <section className="card-elevated mt-4 overflow-x-auto">
        <table className="w-full min-w-[560px] text-sm">
          <thead className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              {["Student", "Level", "Reading", "Spelling", "Status"].map((h) => (
                <th key={h} className="px-5 py-3 font-bold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {STUDENTS.map((st) => (
              <tr
                key={st.name}
                onClick={() => setSelected(st)}
                className="cursor-pointer border-b border-border last:border-0 hover:bg-muted"
              >
                <td className="px-5 py-3 font-semibold">{st.name}</td>
                <td className="px-5 py-3">{st.level}</td>
                <td className="px-5 py-3">{st.reading}%</td>
                <td className="px-5 py-3">{st.spelling}%</td>
                <td className="px-5 py-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                      st.status === "Needs support"
                        ? "bg-primary/12 text-primary"
                        : st.status === "Improving"
                          ? "bg-accent text-accent-foreground"
                          : "bg-success/15 text-success"
                    }`}
                  >
                    {st.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {selected && (
        <section className="card-elevated mt-4 animate-fade-up p-6">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
            <h2 className="truncate font-display text-xl font-bold">{selected.name}</h2>
            <button onClick={() => setSelected(null)} className="shrink-0 text-sm font-semibold text-muted-foreground hover:text-foreground">
              Close
            </button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              ["Levels completed", `${selected.level - 1} / 15`],
              ["Reading accuracy", `${selected.reading}%`],
              ["Spelling", `${selected.spelling}%`],
            ].map(([l, v]) => (
              <div key={l} className="rounded-xl bg-parchment p-4">
                <div className="font-display text-xl font-bold">{v}</div>
                <div className="text-xs text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
          <h3 className="mt-5 text-sm font-bold">Recommended activities</h3>
          <ul className="mt-2 space-y-2 text-sm">
            {["Guided reading with sentence highlighting", "Spelling practice: multi-syllable words", "Phonics blending review"].map((r) => (
              <li key={r} className="rounded-xl bg-muted px-4 py-2.5 font-semibold">{r}</li>
            ))}
          </ul>
        </section>
      )}
    </AppShell>
  );
}
