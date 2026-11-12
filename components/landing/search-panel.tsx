"use client";

import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type ReactNode,
  type RefObject,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ExternalIcon } from "@/components/landing/external-icon";
import {
  MagnifierIcon,
  ReturnIcon,
  SearchResultIcon,
} from "@/components/landing/search-icon";
import {
  filterSearchEntries,
  SEARCH_GROUPS,
  type SearchEntry,
} from "@/lib/search";

function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] border border-white/10 bg-white/[0.04] px-1 font-sans text-[11px] leading-none text-muted">
      {children}
    </kbd>
  );
}

/**
 * Always mounted (closed) so opening is a synchronous `showModal()` with no
 * chunk to fetch. `showModal()` focuses the input: it is the first focusable child.
 */
export function SearchPanel({
  id,
  dialogRef,
  entries,
}: {
  id: string;
  dialogRef: RefObject<HTMLDialogElement | null>;
  entries: SearchEntry[];
}) {
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(
    () => filterSearchEntries(entries, query),
    [entries, query],
  );
  const activeId = results[active] ? `${listId}-${active}` : undefined;

  function hide() {
    dialogRef.current?.close();
  }

  // Every close path (Esc, backdrop, result, ⌘K) lands here: start fresh next time.
  function reset() {
    setQuery("");
    setActive(0);
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }

  useEffect(() => {
    const list = listRef.current;
    const row = activeId ? document.getElementById(activeId) : null;
    if (!list || !row) {
      return;
    }
    // Scroll only the list; scrollIntoView can also move the page behind the modal.
    if (row.offsetTop < list.scrollTop) {
      list.scrollTop = row.offsetTop - 8;
    } else if (row.offsetTop + row.offsetHeight > list.scrollTop + list.clientHeight) {
      list.scrollTop = row.offsetTop + row.offsetHeight - list.clientHeight + 8;
    }
  }, [activeId]);

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
        router.push(entry.href);
        return;
      }
      default:
        return;
    }
  }

  let cursor = -1;

  return (
    <dialog
      ref={dialogRef}
      id={id}
      className="lp-search"
      aria-label="Search resources"
      // The browser may set `open` before hydration via the trigger's `commandfor`.
      suppressHydrationWarning
      onClose={reset}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          hide();
        }
      }}
      onKeyDown={onDialogKey}
    >
      <div className="flex items-center gap-3 border-b border-white/10 px-4">
        <MagnifierIcon className="size-4 text-muted" />
        <input
          type="text"
          role="combobox"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setActive(0);
          }}
          placeholder="Search resources"
          aria-label="Search resources"
          aria-controls={listId}
          aria-expanded={results.length > 0}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          autoComplete="off"
          spellCheck={false}
          className="h-14 min-w-0 flex-1 bg-transparent text-[15px] tracking-tight text-foreground outline-none placeholder:text-muted"
        />
        <button
          type="button"
          onClick={hide}
          aria-label="Close search"
          className="inline-flex h-6 items-center rounded-md border border-white/10 px-1.5 text-xs text-muted transition-colors hover:bg-white/[0.06] hover:text-foreground"
        >
          Esc
        </button>
      </div>
      <div
        ref={listRef}
        id={listId}
        role="listbox"
        aria-label="Results"
        className="lp-search-list relative max-h-[min(26rem,55dvh)] min-h-0 overflow-y-auto p-2"
      >
        {results.length === 0 ? (
          <p className="px-3 py-10 text-center text-sm text-muted">
            No results for &ldquo;{query.trim()}&rdquo;
          </p>
        ) : (
          SEARCH_GROUPS.map((group) => {
            const items = results.filter((entry) => entry.group === group);

            if (items.length === 0) {
              return null;
            }

            return (
              <div
                key={group}
                role="group"
                aria-label={group}
                className="pb-2 last:pb-0"
              >
                <p
                  aria-hidden
                  className="px-2.5 pt-2 pb-1.5 text-xs font-medium tracking-wide text-muted"
                >
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
                      tabIndex={-1}
                      target={entry.external ? "_blank" : undefined}
                      rel={entry.external ? "noreferrer" : undefined}
                      className={`group/row flex items-center gap-3 rounded-[8px] px-2.5 py-2 ${selected ? "bg-white/[0.06]" : ""}`}
                      // mousemove, not mouseenter: keyboard scrolling would otherwise steal the active row.
                      onMouseMove={() => setActive(index)}
                      onClick={hide}
                    >
                      <span
                        className={`grid size-8 shrink-0 place-items-center rounded-md ring-1 ${selected ? "bg-white/[0.08] text-foreground ring-white/20" : "bg-white/[0.04] text-muted ring-white/10"}`}
                      >
                        <SearchResultIcon entry={entry} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 text-sm font-medium tracking-tight text-foreground">
                          <span className="truncate">{entry.title}</span>
                          {entry.external ? (
                            <ExternalIcon className="size-2.5 text-muted" />
                          ) : null}
                        </span>
                        <span className="block truncate text-sm text-muted">
                          {entry.hint}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className={`grid size-6 shrink-0 place-items-center rounded-[5px] border border-white/10 bg-white/[0.04] text-muted ${selected ? "opacity-100" : "opacity-0"}`}
                      >
                        <ReturnIcon />
                      </span>
                    </Link>
                  );
                })}
              </div>
            );
          })
        )}
      </div>
      <div
        aria-hidden
        className="hidden items-center gap-4 border-t border-white/10 px-4 py-2.5 text-xs text-muted sm:flex"
      >
        <span className="inline-flex items-center gap-1.5">
          <Kbd>↑</Kbd>
          <Kbd>↓</Kbd>
          to navigate
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Kbd>
            <ReturnIcon className="size-2.5" />
          </Kbd>
          to open
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Kbd>esc</Kbd>
          to close
        </span>
      </div>
    </dialog>
  );
}
