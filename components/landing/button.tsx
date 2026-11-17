import Link from "next/link";
import type { ReactNode } from "react";
import { ExternalIcon } from "@/components/landing/external-icon";

type ButtonVariant = "primary" | "secondary";

const BUTTON_BASE =
  "lp-btn group inline-flex h-9 shrink-0 box-border items-center gap-2 rounded-md border px-3 text-sm font-medium leading-none tracking-tight";

function buttonClass(variant: ButtonVariant, iconOnly: boolean): string {
  if (iconOnly) {
    switch (variant) {
      case "primary":
        return "lp-btn lp-btn-primary group inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-white bg-white text-black";
      case "secondary":
        return "lp-btn lp-btn-secondary group inline-flex size-9 shrink-0 items-center justify-center rounded-md border border-white/20 bg-background text-foreground";
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
      return `${BUTTON_BASE} lp-btn-secondary border-white/30 bg-[#0f0f10] text-foreground`;
    default: {
      const _never: never = variant;
      return _never;
    }
  }
}

export function Button({
  href,
  variant = "primary",
  externalIcon = true,
  iconOnly = false,
  label,
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  shortcut?: string;
  externalIcon?: boolean;
  iconOnly?: boolean;
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  const external = /^https?:\/\//.test(href);
  const classes = `${buttonClass(variant, iconOnly)} ${className}`.trim();
  const content = (
    <>
      {children}
      {external && externalIcon ? <ExternalIcon /> : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={iconOnly ? label : undefined}
        target="_blank"
        rel="noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={classes}
      aria-label={iconOnly ? label : undefined}
    >
      {content}
    </Link>
  );
}
