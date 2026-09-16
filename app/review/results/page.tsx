"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { protocolTests, PROTOCOL_VERSION } from "@/lib/protocol";
import { loadReview, Review } from "@/lib/review-storage";

export default function Results() {
  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => setReview(loadReview()), []);

  const average = useMemo(() => {
    if (!review) return null;
    const ratings = protocolTests
      .map((test) => review.results[test.id]?.rating)
      .filter((rating): rating is number => typeof rating === "number");
    if (!ratings.length) return null;
    return ratings.reduce((a, b) => a + b, 0) / ratings.length;
  }, [review]);

  if (!review) {
    return (
      <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
        <div className="mx-auto max-w-md">
          <h1 className="text-3xl font-bold">No review found</h1>
          <Link href="/review/new" className="mt-8 block rounded-2xl bg-white px-5 py-4 text-center font-semibold text-black">
            Start New Review
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-medium text-zinc-500">ARP v{PROTOCOL_VERSION} RESULTS</p>
        <h1 className="mt-3 text-3xl font-bold">{review.brand} {review.model}</h1>
        <p className="mt-2 capitalize text-zinc-400">{review.productType}</p>

        {average !== null && (
          <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900 p-5">
            <p className="text-sm text-zinc-500">Subjective rating average</p>
            <p className="mt-2 text-4xl font-bold">{average.toFixed(1)}<span className="text-lg text-zinc-500"> / 5</span></p>
          </div>
        )}

        <div className="mt-8 space-y-3">
          {protocolTests.map((test, index) => {
            const result = review.results[test.id];
            return (
              <div key={test.id} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
                <div className="flex justify-between gap-4">
                  <p className="font-semibold">{index + 1}. {test.name}</p>
                  <p className="text-zinc-300">{result?.rating ?? "—"} / 5</p>
                </div>
                {result?.notes && <p className="mt-3 text-sm leading-6 text-zinc-400">{result.notes}</p>}
              </div>
            );
          })}
        </div>

        <Link href="/review/run" className="mt-8 block rounded-2xl border border-zinc-800 px-5 py-4 text-center font-semibold">
          Return to Protocol
        </Link>
        <Link href="/review/new" className="mt-3 block rounded-2xl bg-white px-5 py-4 text-center font-semibold text-black">
          Start Another Review
        </Link>
      </div>
    </main>
  );
}
