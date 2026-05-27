export function Button({ className = "", variant, children, ...props }) {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
}
