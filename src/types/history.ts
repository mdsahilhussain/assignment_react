import type { Category, LiveProductUpdate, RuntimeProduct } from "./product"

export interface HistoryEntry {
  productId: number
  from: Category
  to: Category
}

export interface ProductStoreState {
  products: RuntimeProduct[]

  past: HistoryEntry[]
  future: HistoryEntry[]

  canUndo: boolean
  canRedo: boolean

  // Actions
  editCategory: (productId: number, newCategory: Category) => Promise<void>
  applyBackgroundUpdates: (updates: LiveProductUpdate[]) => void
  undo: () => void
  redo: () => void
}