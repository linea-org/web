import type { ReactNode } from "react";
import type { SearchEntry } from "@/lib/search";

type SearchIconKind =
  | "runtime"
  | "replay"
  | "memory"
  | "blog"
  | "research"
  | "faq"
  | "audience"
  | "docs"
  | "pricing"
  | "about"
  | "post"
  | "page";

const ICON_BY_HREF: Record<string, SearchIconKind> = {
  "/runtime": "runtime",
  "/replay": "replay",
  "/memory": "memory",
  "/blog": "blog",
  "/research": "research",
  "/faq": "faq",
  "/audience": "audience",
  "/pricing": "pricing",
  "/about": "about",
};

function iconKind(entry: SearchEntry): SearchIconKind {
  const byHref = ICON_BY_HREF[entry.href];
  if (byHref) {
    return byHref;
  }
  if (entry.external) {
    return "docs";
  }
  return entry.group === "Writing" ? "post" : "page";
}

function iconPaths(kind: SearchIconKind): ReactNode {
  switch (kind) {
    case "runtime":
      return (
        <>
          <rect x="2.5" y="3" width="11" height="4" rx="1" />
          <rect x="2.5" y="9" width="11" height="4" rx="1" />
          <path d="M5 5h.01M5 11h.01" />
        </>
      );
    case "replay":
      return (
        <>
          <path d="M3 8a5 5 0 1 0 1.5-3.5" />
          <path d="M3 2.5V5h2.5" />
          <path d="m7 6 2.5 2L7 10z" />
        </>
      );
    case "memory":
      return (
        <>
          <ellipse cx="8" cy="4" rx="5" ry="1.75" />
          <path d="M3 4v8c0 1 2.24 1.75 5 1.75S13 13 13 12V4" />
          <path d="M3 8c0 1 2.24 1.75 5 1.75S13 9 13 8" />
        </>
      );
    case "blog":
      return (
        <>
          <path d="M3 13.5V11l7.5-7.5 2.5 2.5L5.5 13.5z" />
          <path d="m9 5 2 2" />
        </>
      );
    case "research":
      return (
        <>
          <path d="M6 2.5h4M6.5 2.5v4L3 12.5a.8.8 0 0 0 .7 1h8.6a.8.8 0 0 0 .7-1L9.5 6.5v-4" />
          <path d="M4.5 10h7" />
        </>
      );
    case "faq":
      return (
        <>
          <circle cx="8" cy="8" r="5.5" />
          <path d="M6.5 6.5a1.5 1.5 0 1 1 2 1.4c-.35.14-.5.4-.5.75V9" />
          <path d="M8 11h.01" />
        </>
      );
    case "audience":
      return (
        <>
          <circle cx="6" cy="5.5" r="2" />
          <path d="M2.5 13a3.5 3.5 0 0 1 7 0" />
          <path d="M10.5 3.6a2 2 0 0 1 0 3.8M11.5 9.6A3.5 3.5 0 0 1 13.5 13" />
        </>
      );
    case "docs":
      return (
        <>
          <path d="M4 2.5h5.5L12 5v8.5H4z" />
          <path d="M9.5 2.5V5H12M6 8h4M6 10.5h4" />
        </>
      );
    case "pricing":
      return (
        <>
          <path d="M2.5 8.5V3h5.5l5.5 5.5-5 5z" />
          <path d="M5.5 6h.01" />
        </>
      );
    case "about":
      return (
        <>
          <circle cx="8" cy="8" r="5.5" />
          <path d="M8 7.5V11M8 5h.01" />
        </>
      );
    case "post":
      return (
        <>
          <rect x="3" y="2.5" width="10" height="11" rx="1" />
          <path d="M5.5 5.5h5M5.5 8h5M5.5 10.5h3" />
        </>
      );
    case "page":
      return (
        <>
          <rect x="3" y="2.5" width="10" height="11" rx="1" />
          <path d="M5.5 6h5" />
        </>
      );
    default: {
      const _never: never = kind;
      return _never;
    }
  }
}

export function MagnifierIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className={`shrink-0 ${className}`}>
      <circle
        cx="7"
        cy="7"
        r="4.25"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M10.2 10.2 13.5 13.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function ReturnIcon({ className = "size-3" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={`shrink-0 ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 3.5v4a2 2 0 0 1-2 2H3.5" />
      <path d="m6 6.5-3 3 3 3" />
    </svg>
  );
}

export function SearchResultIcon({ entry }: { entry: SearchEntry }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconPaths(iconKind(entry))}
    </svg>
  );
}
