"use client";

import { useState } from "react";

export type CodeOption = {
  id: string;
  label: string;
  code: string;
  html: string;
};

export function CodeSwitcher({ options }: { options: CodeOption[] }) {
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
    <div className="lp-code lp-code-switch my-6 overflow-x-auto border border-white/15 bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-white/15 px-3 py-2">
        <select
          aria-label="Language"
          value={current.id}
          onChange={(event) => {
            setActive(event.target.value);
            setCopied(false);
          }}
          className="lp-code-select max-w-40 bg-transparent py-0.5 pr-5 text-[11px] font-medium tracking-tight text-white"
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={onCopy}
          className="border border-black/[0.08] bg-background px-2 py-1 text-[11px] font-medium tracking-tight text-muted hover:border-black/20 hover:text-foreground"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div dangerouslySetInnerHTML={{ __html: current.html }} />
    </div>
  );
}
