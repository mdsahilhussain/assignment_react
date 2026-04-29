import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { Category } from "../types/product";

// ─── Types ────────────────────────────────────────────────────────────────────

export type SortField = "price" | "rating";
export type SortOrder = "asc" | "desc";

interface UIStoreState {
  search: string;
  filterCategory: Category | "All";
  sortField: SortField;
  sortOrder: SortOrder;
  currentPage: number;

  setSearch: (value: string) => void;
  setFilterCategory: (value: Category | "All") => void;
  setSortField: (field: SortField) => void;
  toggleSortOrder: () => void;
  setSortOrder: (order: SortOrder) => void;
  resetFilters: () => void;
  setCurrentPage: (page: number) => void;
}

// ─── Store ────────────────────────────────────────────────────────────────────

const DEFAULT_STATE = {
  search: "",
  currentPage: 1 as number,
  filterCategory: "All" as const,
  sortField: "rating" as SortField,
  sortOrder: "desc" as SortOrder,
};

export const useUIStore = create<UIStoreState>()(
  devtools(
    (set) => ({
      ...DEFAULT_STATE,

      setSearch: (value) =>
        set(() => ({
          search: value,
          currentPage: 1, // reset here
        })),

      setFilterCategory: (value) =>
        set({ filterCategory: value, currentPage: 1 }),

      setSortField: (field) => set({ sortField: field, currentPage: 1 }),

      toggleSortOrder: () =>
        set((s) => ({ sortOrder: s.sortOrder === "asc" ? "desc" : "asc" })),

      setSortOrder: (order) => set({ sortOrder: order }),
      setCurrentPage: (page) => set({ currentPage: page }),

      resetFilters: () => set(DEFAULT_STATE),
    }),
    { name: "UIStore" }
  )
);
