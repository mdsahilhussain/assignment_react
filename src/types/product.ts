export type Category =
  | "Electronics"
  | "Clothing"
  | "Books"
  | "Home"
  | "Sports";

export type ProductStatus = "idle" | "saving" | "error";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: Category;
  rating: number;

  // UI / system fields
  _optimisticCategory?: Category;
  _status?: ProductStatus;
  _error?: string;
  _locked?: boolean;

  // async safety
  _requestId?: number;
}