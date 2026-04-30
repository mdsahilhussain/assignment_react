import { Search } from 'lucide-react'
import { useUIStore } from '../../store/useUIStore'

export function SearchBar() {
  const search = useUIStore((s) => s.search)
  const setSearch = useUIStore((s) => s.setSearch)

  return (
    <div className="relative max-sm:w-full">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search products…"
        className="
          w-64 pl-8 pr-4 py-2 text-sm font-mono
          bg-zinc-900 border border-zinc-700 rounded
          text-zinc-200 placeholder-zinc-600
          focus:outline-none focus:border-zinc-400
          transition-colors duration-150
          max-sm:w-full
        "
      />
      {search && (
        <button
          onClick={() => setSearch('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-xs"
        >
          Clear
        </button>
      )}
    </div>
  )
}
