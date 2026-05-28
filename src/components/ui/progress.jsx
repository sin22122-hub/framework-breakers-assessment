import React from "react";

export function Progress({ value = 0, className = "" }) {
  return (
    <div className={`relative overflow-hidden rounded-full bg-stone-800 ${className}`}>
      <div
        className="h-full bg-amber-200 transition-all"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
