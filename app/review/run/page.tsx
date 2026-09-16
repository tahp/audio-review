"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { protocolTests, PROTOCOL_VERSION } from "@/lib/protocol";
import { loadReview, Review, saveReview } from "@/lib/review-storage";
import SignalPanel from "@/components/SignalPanel";

export default function RunReview() {
  const [review, setReview] = useState<Review | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const loaded = loadReview();
    setReview(loaded);
    if (loaded) {
      const firstIncomplete = protocolTests.findIndex(
        (test) => !loaded.results[test.id]?.completed
      );
      setActive(firstIncomplete === -1 ? 0 : firstIncomplete);
    }
  }, []);

  const completed = useMemo(() => {
    if (!review) return 0;
    return protocolTests.filter((test) => review.results[test.id]?.completed).length;
  }, [review]);

  if (!review) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-bold">No active review</h1>
          <p className="mt-3 text-zinc-400">Start a review before running the protocol.</p>
          <Link href="/review/new" className="mt-8 block rounded-2xl bg-white px-5 py-4 text-center font-semibold text-black">
            Start New Review
          </Link>
        </div>
      </main>
    );
  }

  const test = protocolTests[active];
  const result = review.results[test.id] ?? { rating: null, notes: "", completed: false };

  function update(patch: Partial<typeof result>) {
    if (!review) return;
    const next: Review = {
      ...review,
      results: {
        ...review.results,
        [test.id]: { ...result, ...patch }
      }
    };
    setReview(next);
    saveReview(next);
  }

  function completeAndNext() {
    update({ completed: true });
    if (active < protocolTests.length - 1) setActive(active + 1);
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-8 text-white">
      <div className="mx-auto max-w-md">
        <div className="flex items-center justify-between text-sm text-zinc-500">
          <span>ARP v{PROTOCOL_VERSION}</span>
          <span>{completed}/10 complete</span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-800">
          <div
            className="h-full bg-white transition-all"
            style={{ width: `${(completed / protocolTests.length) * 100}%` }}
          />
        </div>

        <p className="mt-8 text-sm font-medium text-zinc-500">
          TEST {active + 1} OF {protocolTests.length}
        </p>
        <h1 className="mt-2 text-3xl font-bold">{test.name}</h1>
        <p className="mt-3 leading-7 text-zinc-400">{test.description}</p>

        <SignalPanel testId={test.id} />

        <div className="mt-7 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm font-semibold text-zinc-300">PROCEDURE</p>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
            {test.instructions.map((instruction, index) => (
              <li key={instruction}>
                <span className="mr-2 text-zinc-600">{index + 1}.</span>
                {instruction}
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-8">
          <p className="text-sm text-zinc-400">Rating</p>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {[1, 2, 3, 4, 5].map((rating) => (
              <button
                key={rating}
                onClick={() => update({ rating })}
                className={`rounded-xl py-4 font-semibold ${
                  result.rating === rating
                    ? "bg-white text-black"
                    : "border border-zinc-800 bg-zinc-900 text-white"
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-xs text-zinc-600">
            <span>Poor</span><span>Excellent</span>
          </div>
        </div>

        <div className="mt-7">
          <label className="text-sm text-zinc-400">Notes / observations</label>
          <textarea
            value={result.notes}
            onChange={(e) => update({ notes: e.target.value })}
            rows={4}
            placeholder="Record what you observed..."
            className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4 outline-none"
          />
        </div>

        <button
          disabled={result.rating === null}
          onClick={completeAndNext}
          className="mt-7 w-full rounded-2xl bg-white px-5 py-4 font-semibold text-black disabled:opacity-30"
        >
          {active === protocolTests.length - 1 ? "Complete Test" : "Save & Next Test"}
        </button>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            disabled={active === 0}
            onClick={() => setActive(active - 1)}
            className="rounded-xl border border-zinc-800 px-4 py-3 text-sm disabled:opacity-30"
          >
            Previous
          </button>
          <button
            disabled={active === protocolTests.length - 1}
            onClick={() => setActive(active + 1)}
            className="rounded-xl border border-zinc-800 px-4 py-3 text-sm disabled:opacity-30"
          >
            Next
          </button>
        </div>

        <div className="mt-8 border-t border-zinc-800 pt-6">
          <p className="mb-3 text-sm text-zinc-500">Protocol checklist</p>
          <div className="space-y-2">
            {protocolTests.map((item, index) => (
              <button
                key={item.id}
                onClick={() => setActive(index)}
                className="flex w-full items-center justify-between rounded-xl bg-zinc-900 px-4 py-3 text-left text-sm"
              >
                <span>{index + 1}. {item.name}</span>
                <span className={review.results[item.id]?.completed ? "text-white" : "text-zinc-600"}>
                  {review.results[item.id]?.completed ? "✓" : "○"}
                </span>
              </button>
            ))}
          </div>
        </div>

        {completed === protocolTests.length && (
          <Link
            href="/review/results"
            className="mt-8 block w-full rounded-2xl bg-white px-5 py-4 text-center font-semibold text-black"
          >
            View Review Results
          </Link>
        )}
      </div>
    </main>
  );
}
