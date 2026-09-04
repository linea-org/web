"use client";

import { useEffect, type ReactNode } from "react";
import { ExternalIcon } from "@/components/landing/external-icon";

type ButtonVariant = "primary" | "secondary";

const BUTTON_BASE =
  "lp-btn group inline-flex h-9 shrink-0 box-border items-center gap-2 rounded-md border pl-3 pr-1.5 text-sm font-medium leading-none tracking-tight";

function buttonClass(variant: ButtonVariant, iconOnly: boolean): string {
  if (iconOnly) {
    switch (variant) {
      case "primary":
        return "lp-btn lp-btn-primary group inline-flex size-9 shrink-0 items-center justify-center border border-white bg-white text-black";
      case "secondary":
        return "lp-btn lp-btn-secondary group inline-flex size-9 shrink-0 items-center justify-center border border-white/25 bg-background text-white";
      default: {
        const _never: never = variant;
        return _never;
      }
    }
  }

  switch (variant) {
    case "primary":
      return `${BUTTON_BASE} lp-btn-primary border-white bg-white text-black`;
    case "secondary":
      return `${BUTTON_BASE} lp-btn-secondary border-white/25 bg-background text-white`;
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

export function Keycap({
  shortcut,
  variant = "secondary",
}: {
  shortcut: string;
  variant?: ButtonVariant;
}) {
  return (
    <kbd
      aria-hidden
      className={`inline-flex size-[18px] items-center justify-center rounded-[3px] border text-[10px] font-medium leading-none ${keycapClass(variant)}`}
    >
      {shortcut.toUpperCase()}
    </kbd>
  );
}

const routes = new Map<string, string>();
let listening = false;

function onKeydown(event: KeyboardEvent) {
  if (!(event.ctrlKey || event.metaKey) || event.altKey) {
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
  iconOnly = false,
  label,
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  shortcut: string;
  externalIcon?: boolean;
  iconOnly?: boolean;
  label?: string;
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
      className={`${buttonClass(variant, iconOnly)} ${className}`.trim()}
      aria-keyshortcuts={`Control+${shortcut}`}
      aria-label={iconOnly ? label : undefined}
      {...(external
        ? { target: "_blank", rel: "noreferrer" }
        : {})}
    >
      {children}
      {external && externalIcon ? <ExternalIcon /> : null}
      {iconOnly ? null : <Keycap shortcut={shortcut} variant={variant} />}
    </a>
  );
}
