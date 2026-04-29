import { useUIStore } from '../../store/useUIStore'
import type { SortField } from '../../store/useUIStore'

export function SortControl() {
  const sortField = useUIStore((s) => s.sortField)
  const sortOrder = useUIStore((s) => s.sortOrder)
  const setSortField = useUIStore((s) => s.setSortField)
  const toggleSortOrder = useUIStore((s) => s.toggleSortOrder)

  const fields: { value: SortField; label: string }[] = [
    { value: 'price', label: 'Price' },
    { value: 'rating', label: 'Rating' },
  ]

  const btnBase = 'px-3 py-2 text-sm font-mono border transition-colors duration-150'
  const active = 'bg-zinc-700 border-zinc-500 text-white'
  const inactive = 'bg-zinc-900 border-zinc-700 text-zinc-400 hover:text-zinc-200'

  return (
    <div className="flex items-center gap-0">
      {fields.map((f, i) => (
        <button
          key={f.value}
          onClick={() => setSortField(f.value)}
          className={`
            ${btnBase}
            ${sortField === f.value ? active : inactive}
            ${i === 0 ? 'rounded-l border-r-0' : 'rounded-r'}
          `}
        >
          {f.label}
        </button>
      ))}
      <button
        onClick={toggleSortOrder}
        title={`Sort ${sortOrder === 'asc' ? 'descending' : 'ascending'}`}
        className="
          ml-1 px-2 py-2 text-sm font-mono
          bg-zinc-900 border border-zinc-700 rounded
          text-zinc-400 hover:text-zinc-200
          transition-colors duration-150
        "
      >
        {sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  )
}
