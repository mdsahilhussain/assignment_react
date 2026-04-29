import type { Category, LiveProductUpdate, RuntimeProduct, UpdateCategoryResponse } from "../types/product"

interface ApiConfig {
  /** Probability a mutating call fails — 0 = never, 1 = always */
  FAILURE_RATE: number
  MIN_DELAY_MS: number
  MAX_DELAY_MS: number
  POLL_DELAY_MS: number
  /** Max ± drift as a fraction of current price per tick */
  PRICE_DRIFT: number
  /** Max ± drift in stars per tick */
  RATING_DRIFT: number
  RATING_MIN: number
  RATING_MAX: number
}

export const API_CONFIG: ApiConfig = {
  FAILURE_RATE: 0.3,
  MIN_DELAY_MS: 600,
  MAX_DELAY_MS: 1400,
  POLL_DELAY_MS: 400,
  PRICE_DRIFT: 0.05,
  RATING_DRIFT: 0.1,
  RATING_MIN: 1.0,
  RATING_MAX: 5.0,
}

// ─── Private Helpers ──────────────────────────────────────────────────────────
function simulateDelay(
  min = API_CONFIG.MIN_DELAY_MS,
  max = API_CONFIG.MAX_DELAY_MS
): Promise<void> {
  const ms = Math.floor(Math.random() * (max - min + 1)) + min
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function maybeThrow(): void {
  if (Math.random() < API_CONFIG.FAILURE_RATE) {
    const errors: string[] = [
      'Network timeout. Please try again.',
      'Server error (500). Retrying is safe.',
      'Service temporarily unavailable.',
      'Request failed. Check your connection.',
    ]
    throw new Error(errors[Math.floor(Math.random() * errors.length)])
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function applyDrift(value: number, driftFactor: number): number {
  const delta = value * driftFactor * (Math.random() * 2 - 1)
  return Math.round((value + delta) * 100) / 100
}

// ─── Public API ───────────────────────────────────────────────────────────────
export async function updateProductCategory(
  productId: number,
  newCategory: Category
): Promise<UpdateCategoryResponse> {
  await simulateDelay()
  maybeThrow()

  return {
    id: productId,
    category: newCategory,
    updatedAt: new Date().toISOString(),
  }
}

export async function getProductUpdates(
  products: RuntimeProduct[]
): Promise<LiveProductUpdate[]> {
  await simulateDelay(API_CONFIG.POLL_DELAY_MS, API_CONFIG.POLL_DELAY_MS + 200)

  return products
    .filter(() => Math.random() < 0.4)
    .map(
      (p): LiveProductUpdate => ({
        id: p.id,
        price: applyDrift(p.price, API_CONFIG.PRICE_DRIFT),
        rating: clamp(
          applyDrift(p.rating, API_CONFIG.RATING_DRIFT / p.rating),
          API_CONFIG.RATING_MIN,
          API_CONFIG.RATING_MAX
        ),
      })
    )
}