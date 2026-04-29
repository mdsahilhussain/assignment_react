import type { RuntimeProduct, Category } from './mockData'
import type { SortField, SortOrder } from '../store/useUIStore'

export interface DeriveOptions {
  search: string
  filterCategory: Category | 'All'
  sortField: SortField
  sortOrder: SortOrder
}

export function deriveProducts(
  products: RuntimeProduct[],
  options: DeriveOptions
): RuntimeProduct[] {
  const { search, filterCategory, sortField, sortOrder } = options

  const query = search.trim().toLowerCase()

  const filtered = products.filter((p) => {
    const matchesSearch = query === '' || p.title.toLowerCase().includes(query)
    const matchesCategory =
      filterCategory === 'All' || p.category === filterCategory
    return matchesSearch && matchesCategory
  })

  return [...filtered].sort((a, b) => {
    const aVal = sortField === 'price' ? a.price : a.rating
    const bVal = sortField === 'price' ? b.price : b.rating
    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
  })
}