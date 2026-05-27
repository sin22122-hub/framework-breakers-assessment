import React from 'react'

export function Button({ className = '', variant = 'default', children, disabled, ...props }) {
  const base =
    'inline-flex items-center justify-center rounded-xl px-4 py-2 font-medium transition disabled:pointer-events-none disabled:opacity-50'
  const variants = {
    default: '',
    outline: 'border',
  }

  return (
    <button className={`${base} ${variants[variant] || ''} ${className}`} disabled={disabled} {...props}>
      {children}
    </button>
  )
}
