import { useState, useEffect } from 'react'
import { CATEGORIES } from '../../utils/mockData'
import type { Category, RuntimeProduct } from '../../utils/mockData'

interface Props {
  product: RuntimeProduct
  onConfirm: (newCategory: Category) => void
  onClose: () => void
}

export function EditCategoryModal({ product, onConfirm, onClose }: Props) {
  const current = product._optimisticCategory ?? product.category
  const [selected, setSelected] = useState<Category>(current)

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const isDirty = selected !== current

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-zinc-900 border border-zinc-700 rounded-lg w-full max-w-sm p-6 shadow-2xl">
        <h2 className="text-sm font-mono text-zinc-400 mb-1">Edit Category</h2>
        <p className="text-white font-medium mb-5 leading-snug">{product.title}</p>

        <div className="flex flex-col gap-2 mb-6">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded border cursor-pointer
                transition-colors duration-100
                ${
                  selected === cat
                    ? 'border-zinc-400 bg-zinc-800 text-white'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-zinc-200'
                }
              `}
            >
              <input
                type="radio"
                name="category"
                value={cat}
                checked={selected === cat}
                onChange={() => setSelected(cat)}
                className="accent-white"
              />
              <span className="text-sm font-mono">{cat}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-mono border border-zinc-700 rounded text-zinc-400 hover:text-zinc-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => { onConfirm(selected); onClose() }}
            disabled={!isDirty}
            className="
              px-4 py-2 text-sm font-mono rounded
              transition-colors duration-150
              disabled:opacity-30 disabled:cursor-not-allowed
              bg-white text-zinc-900 hover:bg-zinc-200
            "
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
