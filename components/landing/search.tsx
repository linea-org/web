"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import type { SearchEntry } from "@/lib/search";

const SearchPanel = dynamic(
  () =>
    import("@/components/landing/search-panel").then((mod) => mod.SearchPanel),
  { ssr: false },
);

function SearchIcon() {
  return (
    <svg aria-hidden viewBox="0 0 16 16" className="size-3.5 shrink-0">
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

export function Search({ entries }: { entries: SearchEntry[] }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        className="lp-btn lp-btn-secondary inline-flex size-9 items-center justify-center border border-white/25 text-white"
        aria-label="Search"
        aria-keyshortcuts="Control+k"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
      </button>
      {open ? (
        <SearchPanel entries={entries} onClose={() => setOpen(false)} />
      ) : null}
    </>
  );
}
