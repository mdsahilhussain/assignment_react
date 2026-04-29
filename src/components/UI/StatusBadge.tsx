import type { ProductStatus } from '../../utils/mockData'

interface Props {
  status: ProductStatus
  error: string | null
}

const config: Record<ProductStatus, { label: string; className: string }> = {
  idle: { label: '', className: '' },
  saving: {
    label: 'Saving…',
    className: 'text-amber-400 border-amber-400/30 bg-amber-400/10',
  },
  error: {
    label: 'Failed',
    className: 'text-red-400 border-red-400/30 bg-red-400/10',
  },
}

export function StatusBadge({ status, error }: Props) {
  if (status === 'idle') return null

  const { label, className } = config[status]

  return (
    <span
      title={status === 'error' ? (error ?? undefined) : undefined}
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-mono border rounded ${className}`}
    >
      {status === 'saving' && (
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
      )}
      {label}
    </span>
  )
}
