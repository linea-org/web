"use client";

import { useState } from "react";

export type CodeOption = {
  id: string;
  label: string;
  code: string;
  html: string;
};

/**
 * Every code block on the site: language on the left (tabs when there is more
 * than one), copy on the right, highlighted code below.
 */
export function CodeSwitcher({
  options,
  className = "",
}: {
  options: CodeOption[];
  className?: string;
}) {
  const [active, setActive] = useState(options[0]?.id ?? "");
  const [copied, setCopied] = useState(false);
  const current = options.find((option) => option.id === active) ?? options[0];

  if (!current) {
    return null;
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(current.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div
      className={`lp-code overflow-hidden rounded-[10px] border border-white/10 ${className}`}
    >
      <div className="flex h-11 items-center justify-between gap-3 border-b border-white/10 pr-2 pl-2">
        {options.length > 1 ? (
          <div role="tablist" aria-label="Language" className="flex gap-1">
            {options.map((option) => {
              const selected = option.id === current.id;

              return (
                <button
                  key={option.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => {
                    setActive(option.id);
                    setCopied(false);
                  }}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium tracking-tight transition-colors motion-reduce:transition-none ${selected ? "bg-white/[0.08] text-foreground ring-1 ring-white/10" : "text-muted hover:text-foreground"}`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        ) : (
          <p className="px-2.5 text-xs font-medium tracking-tight text-muted">
            {current.label}
          </p>
        )}
        <button
          type="button"
          onClick={onCopy}
          className="rounded-md border border-white/10 px-2 py-1 text-[11px] font-medium tracking-tight text-muted transition-colors hover:border-white/30 hover:text-foreground motion-reduce:transition-none"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div
        role={options.length > 1 ? "tabpanel" : undefined}
        className="overflow-x-auto"
        dangerouslySetInnerHTML={{ __html: current.html }}
      />
    </div>
  );
}
