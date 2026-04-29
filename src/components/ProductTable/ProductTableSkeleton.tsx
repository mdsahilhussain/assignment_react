export function ProductTableSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }, (_, i) => (
        <tr key={i} className="border-b border-zinc-800/60">
          {[180, 80, 120, 100, 60].map((w, j) => (
            <td key={j} className="px-4 py-3">
              <div
                className="h-4 rounded bg-zinc-800 animate-pulse"
                style={{ width: w }}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  )
}
