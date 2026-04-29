import { Redo2, Undo2 } from 'lucide-react'
import { useUndoRedo } from '../../hooks/useUndoRedo'

export function UndoRedoBar() {
  const { undo, redo, canUndo, canRedo } = useUndoRedo()

  const isMac =
    typeof navigator !== 'undefined' &&
    navigator.platform.toUpperCase().includes('MAC')

  const mod = isMac ? '⌘' : 'Ctrl'

  const btnBase = "px-3 py-1.5 text-xs font-mono border rounded transition-colors duration-150 flex item-s-center gap-1"
  const active = "border-zinc-600 text-zinc-300 hover:border-zinc-400 hover:text-white bg-zinc-800/60"
  const disabled = "border-zinc-800 text-zinc-700 cursor-not-allowed"

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={undo}
        disabled={!canUndo}
        title={`Undo (${mod}+Z)`}
        className={`${btnBase} ${canUndo ? active : disabled}`}
      >
       <Undo2 className='size-3'/> Undo
      </button>
      <button
        onClick={redo}
        disabled={!canRedo}
        title={`Redo (${mod}+Shift+Z)`}
        className={`${btnBase} ${canRedo ? active : disabled}`}
      >
        <Redo2 className='size-3'/> Redo
      </button>
    </div>
  )
}
