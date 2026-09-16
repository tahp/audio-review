"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createReview, saveReview, ProductType } from "@/lib/review-storage";

export default function NewReview() {
  const router = useRouter();
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [productType, setProductType] = useState<ProductType | "">("");

  function submit(event: FormEvent) {
    event.preventDefault();
    if (!brand.trim() || !model.trim() || !productType) return;
    saveReview(createReview(brand.trim(), model.trim(), productType));
    router.push("/review/run");
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-6 py-10 text-white">
      <div className="mx-auto max-w-md">
        <p className="text-sm font-medium text-zinc-500">NEW REVIEW</p>
        <h1 className="mt-3 text-3xl font-bold">What are we testing?</h1>
        <p className="mt-3 text-zinc-400">
          Enter the product details before starting the protocol.
        </p>

        <form onSubmit={submit} className="mt-10 space-y-6">
          <div>
            <label className="mb-2 block text-sm text-zinc-400">Brand</label>
            <input
              required
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Sony"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4 outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-zinc-400">Model</label>
            <input
              required
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="WF-1000XM5"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4 outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm text-zinc-400">Product type</label>
            <select
              required
              value={productType}
              onChange={(e) => setProductType(e.target.value as ProductType)}
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-4 outline-none"
            >
              <option value="" disabled>Select type</option>
              <option value="earbuds">Earbuds</option>
              <option value="headphones">Headphones</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl bg-white px-5 py-4 font-semibold text-black"
          >
            Begin 10-Test Review
          </button>
        </form>
      </div>
    </main>
  );
}
