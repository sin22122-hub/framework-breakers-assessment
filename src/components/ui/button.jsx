import React from "react";

export function Button({ className = "", variant, disabled, ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition disabled:pointer-events-none disabled:opacity-50";
  const style =
    variant === "outline"
      ? "border border-stone-700 bg-transparent hover:bg-stone-900"
      : "";
  return <button className={`${base} ${style} ${className}`} disabled={disabled} {...props} />;
}
