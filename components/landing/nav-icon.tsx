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
    case "start":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m10 8.5 5.5 3.5-5.5 3.5Z" />
        </>
      );
    case "architecture":
      return (
        <>
          <path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z" />
          <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65" />
          <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65" />
        </>
      );
    case "guide":
      return (
        <>
          <path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2Z" />
          <path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7Z" />
        </>
      );
    case "sdk":
      return (
        <>
          <path d="M8 8 4 12l4 4" />
          <path d="M16 8l4 4-4 4" />
          <path d="M13 6 11 18" />
        </>
      );
    case "github":
      return (
        <>
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </>
      );
    case "about":
      return (
        <>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M9 21v-4h6v4" />
          <path d="M9 8h.01M15 8h.01M9 12h.01M15 12h.01" />
        </>
      );
    case "careers":
      return (
        <>
          <rect x="2" y="7" width="20" height="14" rx="2" />
          <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
          <path d="M2 13h20" />
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
