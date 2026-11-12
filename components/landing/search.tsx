"use client";

import { useEffect, useId, useRef } from "react";
import { MagnifierIcon } from "@/components/landing/search-icon";
import { SearchPanel } from "@/components/landing/search-panel";
import type { SearchEntry } from "@/lib/search";

// Invoker Commands open the dialog natively, so a click before hydration still works.
// React's DOM types do not know these attributes yet; unknown lowercase attributes pass through.
function invoker(target: string): Record<string, string> {
  return { commandfor: target, command: "show-modal" };
}

export function Search({ entries }: { entries: SearchEntry[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const dialogId = useId();

  // Fallback for browsers without Invoker Commands; elsewhere `command` already opened it.
  function open() {
    if ("command" in HTMLButtonElement.prototype) {
      return;
    }
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (
        !(event.metaKey || event.ctrlKey) ||
        event.altKey ||
        event.shiftKey ||
        event.key.toLowerCase() !== "k"
      ) {
        return;
      }
      event.preventDefault();
      // Holding ⌘K must not flicker the panel open and shut.
      if (event.repeat) {
        return;
      }
      const dialog = dialogRef.current;
      if (dialog?.open) {
        dialog.close();
      } else {
        dialog?.showModal();
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
        aria-keyshortcuts="Meta+K Control+K"
        aria-haspopup="dialog"
        {...invoker(dialogId)}
        onClick={open}
      >
        <MagnifierIcon />
      </button>
      <SearchPanel id={dialogId} dialogRef={dialogRef} entries={entries} />
    </>
  );
}
