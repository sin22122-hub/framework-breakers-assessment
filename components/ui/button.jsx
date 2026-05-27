import React from 'react'

export function Button({ className = '', variant = 'default', children, ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md transition disabled:pointer-events-none disabled:opacity-50'
  const variantClass = variant === 'outline' ? 'border' : ''
  return <button className={`${base} ${variantClass} ${className}`} {...props}>{children}</button>
}
