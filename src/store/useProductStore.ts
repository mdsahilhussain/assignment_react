/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { generateProducts } from "../utils/mockData";
import type { Category, Product } from "../types/product";
import type { CategoryPatch } from "../types/history";

interface ProductState {
  products: Product[];

  // undo / redo
  past: CategoryPatch[];
  future: CategoryPatch[];

  // actions
  loadProducts: () => void;

  updateCategoryOptimistic: (
    productId: number,
    newCategory: Category
  ) => number; // returns requestId

  confirmCategoryUpdate: (productId: number, requestId: number) => void;

  rollbackCategoryUpdate: (productId: number, requestId: number) => void;

  undo: () => void;
  redo: () => void;

  applyBackgroundUpdate: (updates: Partial<Product>[]) => void;
}

let requestCounter = 0;

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  past: [],
  future: [],

  // load initial data
  loadProducts: () => {
    const data = generateProducts(20);
    set({ products: data });
  },

  // OPTIMISTIC UPDATE
  updateCategoryOptimistic: (productId, newCategory) => {
    const requestId = ++requestCounter;

    set((state: any) => {
      const products = state.products.map((p: Product) => {
        if (p.id !== productId) return p;

        const currentCategory = p._optimisticCategory ?? p.category;

        return {
          ...p,
          _prevCategory: currentCategory,   // store previous for rollback
          _optimisticCategory: newCategory,
          _status: "saving",
          _locked: true,
          _requestId: requestId,
        };
      });

      return { products };
    });

    return requestId;
  },

  // SUCCESS
  confirmCategoryUpdate: (productId, requestId) => {
    set((state: any) => {
    let newPatch: CategoryPatch | null = null;
      const products = state.products.map((p: Product) => {
        if (p.id !== productId) return p;

        // ignore stale response
        if (p._requestId !== requestId) return p;

        const finalCategory = p._optimisticCategory ?? p.category;

        // push to history
         newPatch = {
          productId,
          from: p.category,
          to: finalCategory,
        };

        return {
          ...p,
          category: finalCategory,
          _optimisticCategory: undefined,
          _prevCategory: undefined,
          _status: "idle",
          _locked: false,
          _requestId: undefined,
        };
      });

      return {
        products,
        // past: [
        //   ...state.past,
        //   ...products
        //     .filter((p: { _requestId: number }) => p._requestId === requestId)
        //     .map((p: { id: any; category: any; _optimisticCategory: any }) => ({
        //       productId: p.id,
        //       from: p.category,
        //       to: p._optimisticCategory ?? p.category,
        //     })),
        // ],
        past: newPatch ? [...state.past, newPatch] : state.past,
        future: [],
      };
    });
  },

  // FAILURE → ROLLBACK
  rollbackCategoryUpdate: (productId, requestId) => {
    set((state: any) => {
      const products = state.products.map((p: Product) => {
        if (p.id !== productId) return p;

        if (p._requestId !== requestId) return p;

        return {
          ...p,
          _optimisticCategory: undefined,
          _status: "error",
          _locked: false,
          _requestId: undefined,
        };
      });

      return { products };
    });
  },

  // UNDO
  undo: () => {
    const { past, products } = get();
    if (past.length === 0) return;

    const last = past[past.length - 1];

    set({
      products: products.map((p) =>
        p.id === last.productId ? { ...p, category: last.from } : p
      ),
      past: past.slice(0, -1),
      future: [last, ...get().future],
    });
  },

  // REDO
  redo: () => {
    const { future, products } = get();
    if (future.length === 0) return;

    const next = future[0];

    set({
      products: products.map((p) =>
        p.id === next.productId ? { ...p, category: next.to } : p
      ),
      future: future.slice(1),
      past: [...get().past, next],
    });
  },

  // BACKGROUND UPDATE
  applyBackgroundUpdate: (updates) => {
    set((state) => {
      const products = state.products.map((p) => {
        const update = updates.find((u) => u.id === p.id);
        if (!update) return p;

        // skip locked rows
        if (p._locked) return p;

        return {
          ...p,
          price: update.price ?? p.price,
          rating: update.rating ?? p.rating,
        };
      });

      return { products };
    });
  },
}));
