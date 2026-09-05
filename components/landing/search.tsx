"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Link from "next/link";
import { ExternalIcon } from "@/components/landing/external-icon";
import {
  filterSearchEntries,
  SEARCH_GROUPS,
  type SearchEntry,
} from "@/lib/search";

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
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(
    () => filterSearchEntries(entries, query),
    [entries, query],
  );

  function show() {
    setQuery("");
    setActive(0);
    dialogRef.current?.showModal();
    window.setTimeout(() => inputRef.current?.focus(), 0);
  }

  function hide() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (dialogRef.current?.open) {
          hide();
        } else {
          show();
        }
      }
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function onDialogKey(event: ReactKeyboardEvent<HTMLDialogElement>) {
    if (results.length === 0) {
      return;
    }

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        setActive((current) => (current + 1) % results.length);
        return;
      case "ArrowUp":
        event.preventDefault();
        setActive((current) => (current - 1 + results.length) % results.length);
        return;
      case "Enter": {
        const entry = results[active];
        if (!entry) {
          return;
        }
        event.preventDefault();
        hide();
        if (entry.external) {
          window.open(entry.href, "_blank", "noreferrer");
          return;
        }
        window.location.assign(entry.href);
        return;
      }
      default:
        return;
    }
  }

  let cursor = -1;

  return (
    <>
      <button
        type="button"
        className="lp-btn lp-btn-secondary inline-flex size-9 items-center justify-center border border-white/25 text-white"
        aria-label="Search"
        aria-keyshortcuts="Control+k"
        onClick={show}
      >
        <SearchIcon />
      </button>
      <dialog
        ref={dialogRef}
        className="lp-search"
        aria-label="Search resources"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            hide();
          }
        }}
        onKeyDown={onDialogKey}
      >
        <div className="border-b border-white/12 px-3 py-2.5">
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActive(0);
            }}
            placeholder="Search resources"
            aria-controls={listId}
            aria-autocomplete="list"
            className="w-full bg-transparent text-sm tracking-tight text-white outline-none placeholder:text-muted"
          />
        </div>
        <div
          id={listId}
          role="listbox"
          className="max-h-80 overflow-y-auto py-2"
        >
          {results.length === 0 ? (
            <p className="px-3 py-6 text-sm text-muted">Nothing matches.</p>
          ) : (
            SEARCH_GROUPS.map((group) => {
              const items = results.filter((entry) => entry.group === group);

              if (items.length === 0) {
                return null;
              }

              return (
                <div key={group} className="px-2 pb-2">
                  <p className="px-1.5 pt-1 pb-1 text-[11px] tracking-[0.12em] text-muted uppercase">
                    {group}
                  </p>
                  {items.map((entry) => {
                    cursor += 1;
                    const index = cursor;
                    const selected = index === active;

                    return (
                      <Link
                        key={entry.id}
                        id={`${listId}-${index}`}
                        href={entry.href}
                        role="option"
                        aria-selected={selected}
                        target={entry.external ? "_blank" : undefined}
                        rel={entry.external ? "noreferrer" : undefined}
                        className={`flex items-start justify-between gap-3 px-1.5 py-2 text-left ${selected ? "bg-white/[0.06] text-white" : "text-foreground hover:bg-white/[0.04] hover:text-white"}`}
                        onMouseEnter={() => setActive(index)}
                        onClick={hide}
                      >
                        <span className="min-w-0">
                          <span className="block text-sm tracking-tight">
                            {entry.title}
                          </span>
                          <span className="mt-0.5 block truncate text-xs text-muted">
                            {entry.hint}
                          </span>
                        </span>
                        {entry.external ? (
                          <ExternalIcon className="mt-1 size-2.5 text-muted" />
                        ) : null}
                      </Link>
                    );
                  })}
                </div>
              );
            })
          )}
        </div>
      </dialog>
    </>
  );
}
