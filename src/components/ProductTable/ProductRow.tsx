import { memo, useState, lazy, Suspense } from 'react'
import { StatusBadge } from '../UI/StatusBadge'
import type { Category, RuntimeProduct } from '../../types/product'

const EditCategoryModal = lazy(
  () => import('../EditModal/EditCategoryModal').then((m) => ({ default: m.EditCategoryModal }))
)

interface Props {
  product: RuntimeProduct
  onEditCategory: (productId: number, newCategory: Category) => void
}

function RatingStars({ rating }: { rating: number }) {
  const filled = Math.round(rating)
  return (
    <span className="text-xs tracking-tight" title={`${rating.toFixed(1)} / 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < filled ? 'text-amber-400' : 'text-zinc-700'}>
          ★
        </span>
      ))}
      <span className="ml-1.5 text-zinc-500 font-mono">{rating.toFixed(1)}</span>
    </span>
  )
}

export const ProductRow = memo(function ProductRow({ product, onEditCategory }: Props) {
  const [modalOpen, setModalOpen] = useState(false)

  const displayCategory = product._optimisticCategory ?? product.category
  const isLocked = product._lockedByUser

  return (
    <>
      <tr
        className={`
          border-b border-zinc-800/60 transition-colors duration-150
          ${isLocked ? 'opacity-70' : 'hover:bg-zinc-800/30'}
        `}
      >
        {/* Title */}
        <td className="px-4 py-3 text-sm text-zinc-200 max-w-xs">
          <span className="line-clamp-1">{product.title}</span>
        </td>

        {/* Price */}
        <td className="px-4 py-3 text-sm font-mono text-zinc-300 tabular-nums whitespace-nowrap">
          ${product.price.toFixed(2)}
        </td>

        {/* Category */}
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-1 rounded border border-zinc-700 text-zinc-400 bg-zinc-800/50">
              {displayCategory}
            </span>
            <StatusBadge status={product._status} error={product._error} />
          </div>
        </td>

        {/* Rating */}
        <td className="px-4 py-3">
          <RatingStars rating={product.rating} />
        </td>

        {/* Actions */}
        <td className="px-4 py-3 text-right">
          <button
            onClick={() => setModalOpen(true)}
            disabled={isLocked}
            className="
              px-3 py-1 text-xs font-mono border border-zinc-700 rounded
              text-zinc-400 hover:text-zinc-200 hover:border-zinc-500
              disabled:opacity-30 disabled:cursor-not-allowed
              transition-colors duration-150
            "
          >
            Edit
          </button>
        </td>
      </tr>

      {modalOpen && (
        <Suspense fallback={null}>
          <EditCategoryModal
            product={product}
            onConfirm={(newCategory) => onEditCategory(product.id, newCategory)}
            onClose={() => setModalOpen(false)}
          />
        </Suspense>
      )}
    </>
  )
})
