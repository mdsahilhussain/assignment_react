import { create } from "zustand";
import type { Category } from "../types/product";

type SortBy = "price" | "rating";
type SortOrder = "asc" | "desc";

interface UIState {
  search: string;
  filterCategory: Category | "All";
  sortBy: SortBy;
  sortOrder: SortOrder;

  setSearch: (value: string) => void;
  setFilterCategory: (category: Category | "All") => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortOrder: (order: SortOrder) => void;
}

export const useUIStore = create<UIState>((set) => ({
  search: "",
  filterCategory: "All",
  sortBy: "price",
  sortOrder: "asc",

  setSearch: (search) => set({ search }),
  setFilterCategory: (filterCategory) => set({ filterCategory }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder })
}));