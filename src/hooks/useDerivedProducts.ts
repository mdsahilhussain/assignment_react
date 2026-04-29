import { useMemo } from "react";
import { useProductStore } from "../store/useProductStore";
import { useUIStore } from "../store/useUIStore";
import { deriveProducts } from "../utils/deriveProducts";

export const useDerivedProducts = () => {
  const products = useProductStore((s) => s.products);

  const { search, filterCategory, sortBy, sortOrder } =
    useUIStore();

  return useMemo(() => {
    return deriveProducts(products, {
      search,
      filterCategory,
      sortBy,
      sortOrder
    });
  }, [products, search, filterCategory, sortBy, sortOrder]);
};