import type { ReactNode } from "react";
import type { NavIconName } from "@/lib/nav";

function paths(name: NavIconName): ReactNode {
  switch (name) {
    case "runtime":
      return (
        <>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <rect x="9.5" y="9.5" width="5" height="5" rx="0.5" />
          <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
        </>
      );
    case "replay":
      return (
        <>
          <path d="M3 12a9 9 0 1 0 2.64-6.36L3 8" />
          <path d="M3 3v5h5" />
          <path d="M10.5 9.5v5l4-2.5Z" />
        </>
      );
    case "memory":
      return (
        <>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.66 3.58 3 8 3s8-1.34 8-3V5" />
          <path d="M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3" />
        </>
      );
    case "docs":
      return (
        <>
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
          <path d="M9 7h6M9 11h4" />
        </>
      );
    case "blog":
      return (
        <>
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </>
      );
    case "research":
      return (
        <>
          <path d="M9 3h6" />
          <path d="M10 3v6.5L4.7 18.9A1.5 1.5 0 0 0 6 21.2h12a1.5 1.5 0 0 0 1.3-2.3L14 9.5V3" />
          <path d="M7.2 15h9.6" />
        </>
      );
    case "faq":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6" />
          <path d="M12 17h.01" />
        </>
      );
    case "audience":
      return (
        <>
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </>
      );
    default: {
      const _never: never = name;
      return _never;
    }
  }
}

function Glyph({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`shrink-0 ${className}`}
    >
      {children}
    </svg>
  );
}

export function NavIcon({
  name,
  className = "size-4",
}: {
  name: NavIconName;
  className?: string;
}) {
  return <Glyph className={className}>{paths(name)}</Glyph>;
}

export function NavArrow({ className = "size-4" }: { className?: string }) {
  return (
    <Glyph className={className}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Glyph>
  );
}
