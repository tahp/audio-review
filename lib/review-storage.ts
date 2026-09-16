import { protocolTests } from "./protocol";

export type ProductType = "earbuds" | "headphones";

export type TestResult = {
  rating: number | null;
  notes: string;
  completed: boolean;
};

export type Review = {
  id: string;
  brand: string;
  model: string;
  productType: ProductType;
  createdAt: string;
  results: Record<string, TestResult>;
};

const ACTIVE_KEY = "arp-active-review";

export function createReview(
  brand: string,
  model: string,
  productType: ProductType
): Review {
  return {
    id: crypto.randomUUID(),
    brand,
    model,
    productType,
    createdAt: new Date().toISOString(),
    results: Object.fromEntries(
      protocolTests.map((test) => [
        test.id,
        { rating: null, notes: "", completed: false }
      ])
    )
  };
}

export function saveReview(review: Review) {
  localStorage.setItem(ACTIVE_KEY, JSON.stringify(review));
}

export function loadReview(): Review | null {
  const raw = localStorage.getItem(ACTIVE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as Review;
  } catch {
    return null;
  }
}

export function clearReview() {
  localStorage.removeItem(ACTIVE_KEY);
}
