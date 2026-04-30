import { useMemo, useState, useCallback } from 'react'
import { useProductStore } from '../../store/useProductStore'
import { useUIStore } from '../../store/useUIStore'
import { deriveProducts } from '../../utils/deriveProducts'
import { useProductActions } from '../../hooks/useProductActions'
import { ProductRow } from './ProductRow'
import { ProductTableSkeleton } from './ProductTableSkeleton'
import { CategoryFilter } from '../Toolbar/CategoryFilter'
import { SortControl } from '../Toolbar/SortControl'
import { UndoRedoBar } from '../UI/UndoRedoBar'
import { Toast } from '../UI/Toast'
import { SearchBar } from '../Toolbar/SearchBar'
import type { Category } from '../../types/product'
import Pagination from '../UI/Pagination'

interface ToastState {
  id: number
  message: string
  type: 'error' | 'success'
}

const COLUMNS = ['Product', 'Price', 'Category', 'Rating', '']

export function ProductTable() {
  const products = useProductStore((s) => s.products)
  const search = useUIStore((s) => s.search)
  const filterCategory = useUIStore((s) => s.filterCategory)
  const sortField = useUIStore((s) => s.sortField)
  const sortOrder = useUIStore((s) => s.sortOrder)
  const resetFilters = useUIStore((s) => s.resetFilters)
  const currentPage = useUIStore((s) => s.currentPage)
  const setCurrentPage = useUIStore((s) => s.setCurrentPage)

  
  const pageSize = 10

  const { debouncedEditCategory } = useProductActions()

  const [toasts, setToasts] = useState<ToastState[]>([])

  const visible = useMemo(
    () => deriveProducts(products, { search, filterCategory, sortField, sortOrder }),
    [products, search, filterCategory, sortField, sortOrder]
  )

  const totalPages = Math.ceil(visible.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const paginatedProducts = visible.slice(startIndex, startIndex + pageSize)

  console.log('currentPage:', currentPage)
  console.log('Visible products:', visible)
  console.log('Paginated products:', paginatedProducts)

  const handleEditCategory = useCallback(
    (productId: number, newCategory: Category) => {
      debouncedEditCategory(productId, newCategory)

      const product = products.find((p) => p.id === productId)
      if (product?._status === 'error') {
        setToasts((prev) => [
          ...prev,
          {
            id: Date.now(),
            message: product._error ?? 'Update failed',
            type: 'error',
          },
        ])
      }
    },
    [debouncedEditCategory, products]
  )

  const dismissToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const hasActiveFilters =
    search !== '' || filterCategory !== 'All'

  return (
    <main className="min-h-screen w-full bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-mono font-semibold tracking-tight text-white">
            Product Catalogue <br />
            <span className="text-xs text-zinc-500 font-mono mt-0.5"> {visible.length} of {products.length} products</span>
          </h1>
          <UndoRedoBar />
        </div>
      </header>

      {/* Toolbar */}
      <section className="border-b border-zinc-800/60 px-6 py-3">
        <div className="flex items-center gap-3 flex-wrap">
          <SearchBar />
          <CategoryFilter />
          <SortControl />
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs font-mono text-zinc-500 hover:text-zinc-300 underline transition-colors"
            >
              Reset
            </button>
          )}
        </div>
      </section>

      {/* Table */}
      <section className="w-full mx-auto px-6 py-4">
        <div className="border border-zinc-800 rounded-lg max-sm:overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-900/60">
                {COLUMNS.map((col, i) => (
                  <th
                    key={i}
                    className="px-4 py-3 text-left text-xs font-mono text-zinc-500 uppercase tracking-widest"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products?.length === 0 ? (
                <ProductTableSkeleton />
              ) : visible.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-sm text-zinc-600 font-mono">
                    No products match your filters.
                  </td>
                </tr>
              ) : (
                paginatedProducts?.map((product) => (
                  <ProductRow
                    key={product.id}
                    product={product}
                    onEditCategory={handleEditCategory}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          hasNext={currentPage < totalPages}
          hasPrev={currentPage > 1}
          onPageChange={setCurrentPage}
        />
      </section>

      {/* Toasts */}
      {toasts.map((t) => (
        <Toast
          key={t.id}
          message={t.message}
          type={t.type}
          onDismiss={() => dismissToast(t.id)}
        />
      ))}
    </main>
  )
}
