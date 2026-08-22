"use client";

import { useEffect, type ReactNode } from "react";
import { ExternalIcon } from "@/components/landing/external-icon";

type ButtonVariant = "primary" | "secondary";

const BUTTON_BASE =
  "inline-flex h-9 shrink-0 box-border items-center gap-2 rounded-md border pl-3 pr-1.5 text-sm font-medium leading-none tracking-tight transition-colors";

function buttonClass(variant: ButtonVariant): string {
  switch (variant) {
    case "primary":
      return `${BUTTON_BASE} border-white bg-white text-black hover:border-neutral-200 hover:bg-neutral-200`;
    case "secondary":
      return `${BUTTON_BASE} border-white/12 bg-transparent text-white hover:border-white/25`;
    default: {
      const _never: never = variant;
      return _never;
    }
  }
}

function keycapClass(variant: ButtonVariant): string {
  switch (variant) {
    case "primary":
      return "border-black/20 bg-black/[0.04] text-black";
    case "secondary":
      return "border-white/25 bg-white/[0.04] text-white";
    default: {
      const _never: never = variant;
      return _never;
    }
  }
}

const routes = new Map<string, string>();
let listening = false;

function onKeydown(event: KeyboardEvent) {
  if (event.metaKey || event.ctrlKey || event.altKey) {
    return;
  }

  const target = event.target;
  if (
    target instanceof HTMLElement &&
    target.closest("input, textarea, select, [contenteditable='true']")
  ) {
    return;
  }

  const href = routes.get(event.key.toLowerCase());
  if (!href) {
    return;
  }

  event.preventDefault();
  if (href.startsWith("#")) {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", href);
    return;
  }

  if (/^https?:\/\//.test(href)) {
    window.open(href, "_blank", "noreferrer");
    return;
  }

  window.location.assign(href);
}

function ensureListen() {
  if (listening || typeof window === "undefined") {
    return;
  }

  listening = true;
  window.addEventListener("keydown", onKeydown);
}

export function Button({
  href,
  variant = "primary",
  shortcut,
  externalIcon = true,
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  shortcut: string;
  externalIcon?: boolean;
  className?: string;
  children: ReactNode;
}) {
  useEffect(() => {
    routes.set(shortcut.toLowerCase(), href);
    ensureListen();
  }, [shortcut, href]);

  const external = /^https?:\/\//.test(href);

  return (
    <a
      href={href}
      className={`${buttonClass(variant)} ${className}`.trim()}
      aria-keyshortcuts={shortcut}
      {...(external
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
    >
      {children}
      {external && externalIcon ? <ExternalIcon /> : null}
      <kbd
        aria-hidden
        className={`inline-flex size-[18px] items-center justify-center rounded-[3px] border text-[10px] font-medium ${keycapClass(variant)}`}
      >
        {shortcut.toUpperCase()}
      </kbd>
    </a>
  );
}
