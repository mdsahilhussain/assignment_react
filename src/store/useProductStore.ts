import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { MOCK_PRODUCTS, hydrateProducts } from '../utils/mockData'
import { updateProductCategory } from '../services/productApi'
import type { HistoryEntry, ProductStoreState } from '../types/history'
import type { RuntimeProduct } from '../types/product'

//  Helpers 
function updateProduct(
  products: RuntimeProduct[],
  productId: number,
  patch: Partial<RuntimeProduct>
): RuntimeProduct[] {
  return products.map((p) => (p.id === productId ? { ...p, ...patch } : p))
}

//  Store 
export const useProductStore = create<ProductStoreState>()(
  devtools(
    (set, get) => ({
      products: hydrateProducts(MOCK_PRODUCTS),
      past: [],
      future: [],
      canUndo: false,
      canRedo: false,

      editCategory: async (productId, newCategory) => {
        const { products, past } = get()
        const product = products.find((p) => p.id === productId)
        if (!product || product._lockedByUser) return

        const previousCategory = product.category

        // Optimistic update — lock the row and show new value immediately
        set((s) => ({
          products: updateProduct(s.products, productId, {
            _status: 'saving',
            _optimisticCategory: newCategory,
            _lockedByUser: true,
            _error: null,
          }),
        }))

        try {
          await updateProductCategory(productId, newCategory)

          // Commit — apply real value, push to history, clear optimistic state
          const entry: HistoryEntry = {
            productId,
            from: previousCategory,
            to: newCategory,
          }

          set((s) => ({
            products: updateProduct(s.products, productId, {
              category: newCategory,
              _status: 'idle',
              _optimisticCategory: null,
              _lockedByUser: false,
              _error: null,
            }),
            past: [...past, entry],
            future: [],
            canUndo: true,
            canRedo: false,
          }))
        } catch (err) {
          // Rollback — restore previous category, surface error
          set((s) => ({
            products: updateProduct(s.products, productId, {
              category: previousCategory,
              _status: 'error',
              _optimisticCategory: null,
              _lockedByUser: false,
              _error: err instanceof Error ? err.message : 'Unknown error',
            }),
          }))
        }
      },

      applyBackgroundUpdates: (updates) => {
        set((s) => ({
          products: s.products.map((p) => {
            const update = updates.find((u) => u.id === p.id)
            if (!update || p._lockedByUser) return p
            return {
              ...p,
              price: update.price,
              rating: update.rating,
            }
          }),
        }))
      },

      undo: () => {
        const { past, future, products } = get()
        if (past.length === 0) return

        const entry = past[past.length - 1]
        const newPast = past.slice(0, -1)

        set({
          products: updateProduct(products, entry.productId, {
            category: entry.from,
          }),
          past: newPast,
          future: [entry, ...future],
          canUndo: newPast.length > 0,
          canRedo: true,
        })
      },

      redo: () => {
        const { past, future, products } = get()
        if (future.length === 0) return

        const entry = future[0]
        const newFuture = future.slice(1)

        set({
          products: updateProduct(products, entry.productId, {
            category: entry.to,
          }),
          past: [...past, entry],
          future: newFuture,
          canUndo: true,
          canRedo: newFuture.length > 0,
        })
      },
    }),
    { name: 'ProductStore' }
  )
)