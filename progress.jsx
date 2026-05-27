import React from 'react'

export function Progress({ value = 0, className = '' }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0))

  return (
    <div className={`w-full overflow-hidden rounded-full bg-stone-800 ${className}`}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-amber-300 to-stone-100 transition-all duration-300"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  )
}
