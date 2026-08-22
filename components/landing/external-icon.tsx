export function ExternalIcon({ className = "size-2.5" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 10 10" className={`shrink-0 ${className}`}>
      <path
        d="M2 8 8 2M4 2h4v4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="square"
      />
    </svg>
  );
}
