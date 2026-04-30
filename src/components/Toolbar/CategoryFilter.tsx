import { useUIStore } from '../../store/useUIStore'
import type { Category } from '../../types/product'
import { CATEGORIES } from '../../utils/mockData'

export function CategoryFilter() {
  const filterCategory = useUIStore((s) => s.filterCategory)
  const setFilterCategory = useUIStore((s) => s.setFilterCategory)

  return (
    <select
      value={filterCategory}
      onChange={(e) => setFilterCategory(e.target.value as Category | 'All')}
      className="
        px-3 py-2 text-sm font-mono
        bg-zinc-900 border border-zinc-700 rounded
        text-zinc-200
        focus:outline-none focus:border-zinc-400
        transition-colors duration-150
        max-sm:w-full
      "
    >
      <option value="All">All Categories</option>
      {CATEGORIES.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  )
}
