import Link from "next/link";
import type { ReactNode } from "react";
import { Band } from "@/components/landing/frame";
import {
  Container,
  HEADING_GAP,
  SECTION_Y,
} from "@/components/landing/ui";

/** The landing card: hairline border on a faint lift. */
export const CARD = "lp-reveal rounded-[10px] border border-white/10 bg-white/[0.03]";
/** Hover lifts the fill, never the border: a brighter border on black reads as a selection ring. */
export const CARD_LINK = `${CARD} lp-press hover:bg-white/[0.05]`;
/** Inner padding for every standard card, matching the landing audience cards. */
export const CARD_PAD = "px-5 py-6 sm:px-6";
/** Inner padding for full-width feature panels (page CTA, featured thesis). */
export const PANEL_PAD = "px-6 py-10 sm:px-10 sm:py-12";
/** Eyebrow → title → lead → actions, used by every heading block. */
const TITLE_GAP = "mt-3";
const LEAD_GAP = "mt-5";
const ACTIONS_GAP = "mt-8";

/** Sky / mist / floor, in order, for rows of three surface cards. */
export const SURFACES = [
  "lp-surface-sky",
  "lp-surface-mist",
  "lp-surface-floor",
] as const;

/**
 * The one label style for the top of a page (and feature rows): a tinted pill.
 * Section labels further down stay plain `Eyebrow` text so chips do not pile up.
 */
export function PageLabel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`inline-flex items-center rounded-full border border-[#9dbde4]/25 bg-[#9dbde4]/10 px-2.5 py-1 text-xs leading-none font-medium tracking-tight text-[#9dbde4] ${className}`}
    >
      {children}
    </p>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`text-sm font-medium tracking-tight text-[#9dbde4] ${className}`}
    >
      {children}
    </p>
  );
}

/** Top of an inner page: centered like the landing hero and the post header. */
export function PageHero({
  eyebrow,
  title,
  lead,
  actions,
  children,
}: {
  eyebrow: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <Band rule={false}>
      <Container className={SECTION_Y}>
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <PageLabel>{eyebrow}</PageLabel>
          <h1
            className={`${TITLE_GAP} text-4xl leading-[1.04] font-medium tracking-[-0.045em] text-balance sm:text-5xl lg:text-[4rem]`}
          >
            {title}
          </h1>
          {lead ? (
            <p
              className={`${LEAD_GAP} max-w-2xl text-base leading-7 text-pretty text-muted sm:text-lg sm:leading-8`}
            >
              {lead}
            </p>
          ) : null}
          {actions ? (
            <div
              className={`${ACTIONS_GAP} flex flex-wrap justify-center gap-3`}
            >
              {actions}
            </div>
          ) : null}
        </div>
        {children ? <div className={HEADING_GAP}>{children}</div> : null}
      </Container>
    </Band>
  );
}

/** One landing section: no rule, shared vertical rhythm. */
export function Section({
  id,
  children,
  className = "",
  defer = true,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  defer?: boolean;
}) {
  return (
    <Band rule={false} className={defer ? "lp-defer" : ""}>
      <section
        id={id}
        className={`px-5 sm:px-8 ${SECTION_Y} ${className}`}
      >
        {children}
      </section>
    </Band>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  action,
  align = "center",
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  /** Center for full-width sections; left only beside a visual in a two-column row. */
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <div
      className={
        centered
          ? "lp-reveal mx-auto flex max-w-3xl flex-col items-center text-center"
          : "lp-reveal flex flex-col items-start"
      }
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={`${eyebrow ? TITLE_GAP : ""} text-3xl leading-[1.08] font-medium tracking-[-0.035em] text-balance sm:text-4xl lg:text-5xl`}
      >
        {title}
      </h2>
      {lead ? (
        <p
          className={`${LEAD_GAP} max-w-2xl text-base leading-7 text-pretty text-muted`}
        >
          {lead}
        </p>
      ) : null}
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function CheckIcon() {
  return (
    <span
      aria-hidden
      className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/[0.06] ring-1 ring-white/15"
    >
      <svg viewBox="0 0 12 12" className="size-3 text-[#9dbde4]">
        <path
          d="M2.5 6.2 4.9 8.5 9.5 3.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function CheckList({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-5">
          <CheckIcon />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ArrowIcon({ className = "size-3.5" }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 12 12"
      className={`${className} shrink-0 transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5 motion-reduce:transition-none`}
    >
      <path
        d="M1.5 6h9M7 2.5 10.5 6 7 9.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Quiet text link with a nudging arrow, as under each landing feature row. */
export function ArrowLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`lp-press group inline-flex h-10 items-center gap-1.5 rounded-md px-3 text-sm leading-none font-medium tracking-tight text-foreground outline-none hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-white/40 ${className}`}
    >
      {children}
      <ArrowIcon />
    </Link>
  );
}

/** Numbered card for "how it works" style steps. */
export function StepCards({
  items,
}: {
  items: readonly { title: string; copy: string }[];
}) {
  return (
    <div
      className={`grid gap-3 sm:grid-cols-2 ${items.length % 3 === 0 ? "lg:grid-cols-3" : ""}`}
    >
      {items.map((item, index) => (
        <div key={item.title} className={`${CARD} ${CARD_PAD}`}>
          <p className="font-mono text-xs text-[#9dbde4] tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-4 text-base font-medium tracking-tight">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted">{item.copy}</p>
        </div>
      ))}
    </div>
  );
}
