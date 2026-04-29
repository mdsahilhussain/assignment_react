import type { Product } from "../types/product";

interface DeriveOptions {
  search: string;
  filterCategory: string;
  sortBy: "price" | "rating";
  sortOrder: "asc" | "desc";
}

export const deriveProducts = (
  products: Product[],
  options: DeriveOptions
): Product[] => {
  let result = [...products];

  // FILTER
  if (options.filterCategory !== "All") {
    result = result.filter(
      (p) => (p._optimisticCategory ?? p.category) === options.filterCategory
    );
  }

  // SEARCH
  if (options.search.trim()) {
    const search = options.search.toLowerCase();
    result = result.filter((p) => p.title.toLowerCase().includes(search));
  }

  // SORT
  result.sort((a, b) => {
    const valueA = a[options.sortBy];
    const valueB = b[options.sortBy];

    if (options.sortOrder === "asc") {
      return valueA - valueB;
    } else {
      return valueB - valueA;
    }
  });

  return result;
};
