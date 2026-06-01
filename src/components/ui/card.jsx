import React from "react";

export function Card({ className = "", ...props }) {
  return <div className={`rounded-xl border bg-card text-card-foreground ${className}`} {...props} />;
}

export function CardContent({ className = "", ...props }) {
  return <div className={className} {...props} />;
}
