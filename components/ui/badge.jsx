import React from 'react'

export function Badge({ className = '', children, ...props }) {
  return <span className={`inline-flex items-center rounded-full ${className}`} {...props}>{children}</span>
}
