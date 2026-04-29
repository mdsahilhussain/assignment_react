import { useEffect, useState } from 'react'

interface Props {
  message: string
  type?: 'error' | 'success'
  onDismiss: () => void
  duration?: number
}

export function Toast({ message, type = 'error', onDismiss, duration = 4000 }: Props) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true))
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(onDismiss, 300)
    }, duration)
    return () => clearTimeout(timer)
  }, [duration, onDismiss])

  const colors =
    type === 'error'
      ? 'bg-red-950 border-red-500/40 text-red-300'
      : 'bg-emerald-950 border-emerald-500/40 text-emerald-300'

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50 flex items-center gap-3
        px-4 py-3 border rounded font-mono text-sm max-w-sm
        transition-all duration-300
        ${colors}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={onDismiss}
        className="opacity-50 hover:opacity-100 transition-opacity text-xs"
      >
        ✕
      </button>
    </div>
  )
}
