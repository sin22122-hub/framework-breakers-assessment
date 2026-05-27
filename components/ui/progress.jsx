import React from 'react'

export function Progress({ value = 0, className = '', ...props }) {
  const safeValue = Math.max(0, Math.min(100, Number(value) || 0))
  return (
    <div className={`relative overflow-hidden rounded-full ${className}`} {...props}>
      <div className="h-full rounded-full bg-gradient-to-r from-amber-300 to-stone-100 transition-all" style={{ width: `${safeValue}%` }} />
    </div>
  )
}
