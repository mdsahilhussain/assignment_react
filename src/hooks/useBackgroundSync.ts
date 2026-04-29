import { useEffect, useRef } from 'react'
import { useProductStore } from '../store/useProductStore'
import { getProductUpdates } from '../services/productApi'

const POLL_INTERVAL_MS = 5000

export function useBackgroundSync() {
  const getProducts = () => useProductStore.getState().products
  const applyBackgroundUpdates = useProductStore((s) => s.applyBackgroundUpdates)

  const isPolling = useRef(false)
  const isMounted = useRef(true)

  useEffect(() => {
    isMounted.current = true

    async function poll() {
      if (isPolling.current) return
      isPolling.current = true

      try {
        const products = getProducts()
        const unlocked = products.filter((p) => !p._lockedByUser)
        if (unlocked.length === 0) return

        const updates = await getProductUpdates(unlocked)

        if (isMounted.current && updates.length > 0) {
          applyBackgroundUpdates(updates)
        }
      } catch {
        // Silent fail — background sync is best-effort
      } finally {
        isPolling.current = false
      }
    }

    const interval = setInterval(poll, POLL_INTERVAL_MS)

    return () => {
      isMounted.current = false
      clearInterval(interval)
    }
  }, [applyBackgroundUpdates])
}