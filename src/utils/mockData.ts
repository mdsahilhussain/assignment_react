import type { Category, Product } from "../types/product";

export const categories: Category[] = [
  "Electronics",
  "Clothing",
  "Books",
  "Home",
  "Sports"
];

export const generateProducts = (count: number = 20): Product[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `Product ${i + 1}`,
    price: Number((Math.random() * 500 + 50).toFixed(2)),
    category: categories[Math.floor(Math.random() * categories.length)],
    rating: Number((Math.random() * 5).toFixed(1)),

    _status: "idle",
    _locked: false
  }));
};