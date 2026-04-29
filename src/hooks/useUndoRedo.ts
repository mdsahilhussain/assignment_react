import { useEffect } from 'react'
import { useProductStore } from '../store/useProductStore'

export function useUndoRedo() {
  const undo = useProductStore((s) => s.undo)
  const redo = useProductStore((s) => s.redo)
  const canUndo = useProductStore((s) => s.canUndo)
  const canRedo = useProductStore((s) => s.canRedo)

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMac = navigator.platform.toUpperCase().includes('MAC')
      const modifier = isMac ? e.metaKey : e.ctrlKey

      if (!modifier) return

      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault()
        if (canUndo) undo()
      }

      if (e.key === 'z' && e.shiftKey) {
        e.preventDefault()
        if (canRedo) redo()
      }

      if (e.key === 'y') {
        e.preventDefault()
        if (canRedo) redo()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [undo, redo, canUndo, canRedo])

  return { undo, redo, canUndo, canRedo }
}