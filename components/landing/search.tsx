"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { MagnifierIcon } from "@/components/landing/search-icon";
import type { SearchEntry } from "@/lib/search";

const SearchPanel = dynamic(
  () =>
    import("@/components/landing/search-panel").then((mod) => mod.SearchPanel),
  { ssr: false },
);

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
        className="lp-btn lp-btn-secondary inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-white/20 bg-background text-foreground"
        aria-label="Search"
        aria-keyshortcuts="Control+k"
        onClick={() => setOpen(true)}
      >
        <MagnifierIcon />
      </button>
      {open ? (
        <SearchPanel entries={entries} onClose={() => setOpen(false)} />
      ) : null}
    </>
  );
}
