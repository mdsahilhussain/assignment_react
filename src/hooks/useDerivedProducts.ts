import { useMemo } from "react";
import { useProductStore } from "../store/useProductStore";
import { useUIStore } from "../store/useUIStore";
import { deriveProducts } from "../utils/deriveProducts";

export const useDerivedProducts = () => {
  const products = useProductStore((s) => s.products);

  const { search, filterCategory, sortOrder, sortField } =
    useUIStore();

  return useMemo(() => {
    return deriveProducts(products, {
      search,
      filterCategory,
      sortField,
      sortOrder
    });
  }, [products, search, filterCategory, sortField, sortOrder]);
};