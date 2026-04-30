import { useCallback, useRef } from 'react'
import { useProductStore } from '../store/useProductStore'
import type { Category } from '../types/product'

const DEBOUNCE_MS = 500

export function useProductActions() {
  const editCategory = useProductStore((s) => s.editCategory)
  const timers = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map())

  const debouncedEditCategory = useCallback(
    (productId: number, newCategory: Category) => {
      const existing = timers.current.get(productId)
      if (existing) clearTimeout(existing)

      const timer = setTimeout(() => {
        timers.current.delete(productId)
        editCategory(productId, newCategory)
      }, DEBOUNCE_MS)

      timers.current.set(productId, timer)
    },
    [editCategory]
  )

  const cancelPending = useCallback((productId: number) => {
    const existing = timers.current.get(productId)
    if (existing) {
      clearTimeout(existing)
      timers.current.delete(productId)
    }
  }, [])

  return { debouncedEditCategory, cancelPending }
}