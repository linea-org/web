"use client";

import { useState, type ReactNode } from "react";

export function CopyCode({
  code,
  className = "",
  children,
}: {
  code: string;
  className?: string;
  children: ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className={`relative ${className}`.trim()}>
      <button
        type="button"
        onClick={onCopy}
        className="absolute top-2 right-2 z-10 border border-white/12 bg-background px-2 py-1 text-[11px] font-medium tracking-tight text-muted hover:border-white/25 hover:text-white"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      {children}
    </div>
  );
}
