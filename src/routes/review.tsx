import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Volume2, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { useAppState, getDueReviews, resolveReview, CONFUSION_LABELS, type MistakeRecord } from "@/lib/store";
import { speak } from "@/lib/speech";

export const Route = createFileRoute("/review")({
  head: () => ({
    meta: [
      { title: "Word review — DyslexiaCare AI" },
      { name: "description", content: "A quick spaced-repetition review of words that need a little more practice." },
      { property: "og:title", content: "Word review — DyslexiaCare AI" },
      { property: "og:description", content: "Previously missed words, brought back at just the right time." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReviewPage,
});

function norm(s: string) {
  return s.toLowerCase().replace(/[^a-z]/g, "").trim();
}

function ReviewPage() {
  const state = useAppState();
  const queue = useMemo(() => getDueReviews(state, 10), [state]);
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState<{ ok: boolean; item: MistakeRecord } | null>(null);
  const [doneCount, setDoneCount] = useState(0);

  const item = queue[index];

  function submit() {
    if (!item) return;
    const ok = norm(text) === norm(item.word);
    resolveReview(item.id, ok);
    setFeedback({ ok, item });
  }

  function next() {
    setFeedback(null);
    setText("");
    setDoneCount((c) => c + 1);
    setIndex((i) => i + 1);
  }

  if (!queue.length) {
    return (
      <AppShell>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Word review</h1>
        <p className="text-sm text-muted-foreground">Words you've missed come back here for a quick second look.</p>
        <div className="card-elevated mt-6 flex flex-col items-center gap-3 p-10 text-center">
          <CheckCircle2 className="h-10 w-10 text-success" />
          <p className="font-bold">Nothing due for review right now.</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Keep playing through the islands — any tricky words will show up here automatically when it's a good
            time to revisit them.
          </p>
          <Link to="/map" className="mt-2 inline-flex items-center gap-2 rounded-xl ember-fill px-5 py-3 font-bold text-primary-foreground">
            Back to the map <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </AppShell>
    );
  }

  if (index >= queue.length) {
    return (
      <AppShell>
        <div className="mx-auto max-w-xl">
          <div className="card-elevated flex flex-col items-center gap-3 p-10 text-center">
            <Sparkles className="h-10 w-10 text-gold" />
            <h1 className="font-display text-2xl font-bold">Review complete!</h1>
            <p className="text-sm text-muted-foreground">
              You reviewed {doneCount} word{doneCount === 1 ? "" : "s"}. Nicely done.
            </p>
            <Link to="/map" className="mt-2 inline-flex items-center gap-2 rounded-xl ember-fill px-5 py-3 font-bold text-primary-foreground">
              Back to the map <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Word review</h1>
        <p className="text-sm text-muted-foreground">
          Word {index + 1} of {queue.length} — these came up tricky before, let's try them again.
        </p>

        <div className="card-elevated mt-5 p-8 text-center">
          <button
            onClick={() => speak(item!.word, 0.85)}
            className="mx-auto flex items-center gap-2 rounded-xl border-2 border-primary px-5 py-3 font-bold text-primary hover:bg-primary/10"
          >
            <Volume2 className="h-5 w-5" /> Hear the word
          </button>

          <input
            value={text}
            disabled={!!feedback}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !feedback && text.trim() && submit()}
            placeholder="Type what you hear"
            autoFocus
            className="mt-6 w-full rounded-xl border border-input bg-card px-4 py-3.5 text-center font-learn text-lg outline-none focus:ring-2 focus:ring-ring"
          />

          {!feedback && (
            <button
              disabled={!text.trim()}
              onClick={submit}
              className="mt-4 rounded-xl ember-fill px-6 py-3 font-bold text-primary-foreground disabled:opacity-45"
            >
              Check answer
            </button>
          )}

          {feedback && (
            <div className={`mt-6 animate-fade-up rounded-2xl border p-4 text-left ${feedback.ok ? "border-success/40 bg-success/10" : "border-primary/30 bg-primary/8"}`}>
              <p className="font-bold">{feedback.ok ? "Got it! That word is sticking." : "Good try — a little more practice will help."}</p>
              {!feedback.ok && (
                <p className="mt-1 text-sm text-muted-foreground">
                  The word is <span className="font-learn font-bold text-foreground">{feedback.item.word}</span>.{" "}
                  {feedback.item.pattern !== "unrelated" && (
                    <>Common pattern noticed: {CONFUSION_LABELS[feedback.item.pattern]}.</>
                  )}
                </p>
              )}
              <button onClick={next} className="mt-4 inline-flex items-center gap-2 rounded-xl ember-fill px-5 py-3 font-bold text-primary-foreground">
                {index + 1 === queue.length ? "Finish review" : "Next word"} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}