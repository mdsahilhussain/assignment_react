import type { Category } from "./product";

export interface CategoryPatch {
    productId: number;
    from: Category;
    to: Category;
  }