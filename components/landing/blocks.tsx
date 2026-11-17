import Link from "next/link";
import { GLASS_FRAME, GLASS_INNER } from "@/components/landing/framed-shot";
import { NavIcon } from "@/components/landing/nav-icon";
import { ArrowIcon, CheckIcon } from "@/components/landing/section";
import type { NavIconName } from "@/lib/nav";

/**
 * Content blocks for the inner pages. Each one fits a kind of content, so a
 * page can pick the right shape instead of putting everything in boxed cards:
 *   FlowSteps      a sequence (numbered nodes joined by a line)
 *   ComparePanels  before / after, side by side
 *   LinkCards      where to read next
 */

const COLS: Record<number, string> = {
  2: "lg:grid-cols-2",
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
};

/**
 * A process, left to right on desktop: numbered nodes on a connecting line,
 * with the step's title and copy under each. Reads as order, not as a pile of
 * equal boxes. Stacks (without the line) below lg.
 */
export function FlowSteps({
  items,
}: {
  items: readonly { title: string; copy: string }[];
}) {
  return (
    <ol
      className={`lp-reveal grid gap-x-8 gap-y-10 sm:grid-cols-2 ${COLS[items.length] ?? "lg:grid-cols-3"}`}
    >
      {items.map((item, index) => (
        <li key={item.title} className="relative">
          {/* Line from this node to the next: ends 0.5rem short of the next node.
              The last node's line fades out to the column edge, so the flow does not just stop. */}
          <span
            aria-hidden
            className={`absolute top-4 left-10 hidden h-px lg:block ${index < items.length - 1 ? "w-[calc(100%-1rem)] bg-gradient-to-r from-[#9dbde4]/40 to-white/5" : "w-[calc(100%-2.5rem)] bg-gradient-to-r from-[#9dbde4]/40 to-transparent"}`}
          />
          <span className="flex size-8 items-center justify-center rounded-full border border-[#9dbde4]/40 bg-[#9dbde4]/10 font-mono text-xs text-[#9dbde4] tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-5 text-lg font-medium tracking-tight">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-pretty text-muted">
            {item.copy}
          </p>
        </li>
      ))}
    </ol>
  );
}

type CompareRow = { label: string; left: string; right: string };

/**
 * Two panels instead of a table: the left is the quiet "before", the right is
 * the highlighted Linea side with a check on every row. Rows share equal
 * heights, so each pair stays level across the panels. Stacks on phones.
 */
/** The quiet counterpart of CheckIcon: same size and ring, a dash instead of a tick. */
function DashIcon() {
  return (
    <span
      aria-hidden
      className="flex size-5 shrink-0 items-center justify-center rounded-full bg-white/[0.04] ring-1 ring-white/10"
    >
      <svg viewBox="0 0 12 12" className="size-3 text-muted">
        <path
          d="M3.5 6h5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function ComparePanels({
  columns,
  rows,
}: {
  columns: readonly [string, string];
  rows: readonly CompareRow[];
}) {
  const n = rows.length;

  return (
    <div className="lp-reveal">
      {/* Phones: one card per row, with both answers inside it. */}
      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <div
            key={row.label}
            className="rounded-[14px] border border-white/10 bg-white/[0.03] p-5"
          >
            <p className="text-sm font-medium tracking-tight">{row.label}</p>
            <div className="mt-4 flex items-start gap-3">
              <span className="mt-0.5">
                <DashIcon />
              </span>
              <span>
                <span className="block text-xs text-muted">{columns[0]}</span>
                <span className="mt-0.5 block text-base leading-6 text-muted">
                  {row.left}
                </span>
              </span>
            </div>
            <div className="mt-3 flex items-start gap-3 rounded-[10px] border border-white/20 bg-white/[0.06] p-3">
              <span className="mt-0.5">
                <CheckIcon />
              </span>
              <span>
                <span className="block text-xs text-muted">{columns[1]}</span>
                <span className="mt-0.5 block text-base leading-6 text-foreground">
                  {row.right}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* md and up: a table in a glass frame. Linea's column is one raised panel that shares the
          table's rows (subgrid), so every row stays level across all three columns. */}
      <div className={`hidden md:block ${GLASS_FRAME}`}>
        <div className={`${GLASS_INNER} bg-[#0a0a0a] p-3 lg:p-4`}>
          <div
            className="grid gap-x-3"
            style={{
              gridTemplateColumns:
                "minmax(0,0.85fr) minmax(0,1.1fr) minmax(0,1.15fr)",
              gridTemplateRows: `auto repeat(${n}, auto)`,
            }}
          >
            <p
              className="px-4 py-5 text-base font-medium tracking-tight text-muted lg:px-5"
              style={{ gridColumn: 2, gridRow: 1 }}
            >
              {columns[0]}
            </p>
            {rows.map((row, i) => (
              <p
                key={`label-${row.label}`}
                className="border-t border-white/10 px-4 py-5 text-sm leading-6 font-medium lg:px-5"
                style={{ gridColumn: 1, gridRow: i + 2 }}
              >
                {row.label}
              </p>
            ))}
            {rows.map((row, i) => (
              <p
                key={`left-${row.label}`}
                className="border-t border-white/10 px-4 py-5 text-base leading-6 text-muted lg:px-5"
                style={{ gridColumn: 2, gridRow: i + 2 }}
              >
                {row.left}
              </p>
            ))}
            <div
              className="relative grid overflow-hidden rounded-[14px] border border-white/20 bg-white/[0.06] shadow-[inset_0_1px_0_rgb(255_255_255/0.12)]"
              style={{
                gridColumn: 3,
                gridRow: `1 / span ${n + 1}`,
                gridTemplateRows: "subgrid",
              }}
            >
              <p className="relative px-4 py-5 text-base font-medium tracking-tight lg:px-5">
                {columns[1]}
              </p>
              {rows.map((row) => (
                <p
                  key={`right-${row.label}`}
                  className="relative flex items-start gap-3 border-t border-white/10 px-4 py-5 text-base leading-6 text-foreground lg:px-5"
                >
                  <span className="mt-0.5">
                    <CheckIcon />
                  </span>
                  {row.right}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Sky, mist, floor in order, as on the landing's audience cards. */
const SURFACES = [
  { card: "lp-surface-sky", tile: "bg-white/50 ring-black/10" },
  { card: "lp-surface-mist", tile: "bg-white/50 ring-black/10" },
  { card: "lp-surface-floor", tile: "bg-white/15 ring-white/30" },
] as const;

/**
 * Where to read next: the landing's colour surface cards, each with an icon
 * tile, a clear title and an arrow that nudges on hover.
 */
export function LinkCards({
  items,
}: {
  items: readonly {
    href: string;
    title: string;
    copy: string;
    icon?: NavIconName;
  }[];
}) {
  return (
    <div
      className={`lp-reveal grid gap-3 sm:grid-cols-2 ${COLS[items.length] ?? "lg:grid-cols-3"}`}
    >
      {items.map((item, index) => {
        const surface = SURFACES[index % SURFACES.length];
        // Two columns (sm to lg) leave an odd last card alone on the left: centre it
        // under the pair, at one column's width. From lg it is back in its own column.
        const orphan =
          items.length % 2 === 1 && index === items.length - 1
            ? "sm:col-span-2 sm:mx-auto sm:w-[calc(50%-0.375rem)] lg:col-span-1 lg:mx-0 lg:w-auto"
            : "";

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`lp-surface lp-press group flex flex-col rounded-[10px] px-5 py-6 sm:px-6 ${surface.card} ${orphan}`}
          >
            <span className="flex items-center justify-between gap-4">
              <span
                className={`inline-flex size-8 shrink-0 items-center justify-center rounded-md ring-1 ${surface.tile}`}
              >
                {item.icon ? (
                  <NavIcon name={item.icon} />
                ) : (
                  <ArrowIcon className="size-4" />
                )}
              </span>
              <ArrowIcon className="size-4 opacity-70 transition-opacity group-hover:opacity-100" />
            </span>
            <span className="mt-5 text-xl font-medium tracking-tight">
              {item.title}
            </span>
            <span className="mt-2 text-sm leading-6 text-muted">
              {item.copy}
            </span>
          </Link>
        );
      })}
    </div>
  );
}

/**
 * A strip of short facts: a big figure or phrase with one line under it. Each
 * fact must restate something the site already says; this block only gives it weight.
 */
export function KeyFacts({
  items,
}: {
  items: readonly { value: string; label: string }[];
}) {
  return (
    <dl
      className={`lp-reveal grid gap-px overflow-hidden rounded-[14px] border border-white/10 bg-white/10 sm:grid-cols-2 ${COLS[items.length] ?? "lg:grid-cols-4"}`}
    >
      {items.map((item) => (
        <div key={item.label} className="bg-[#0a0a0a] px-5 py-6 sm:px-6">
          <dt className="sr-only">{item.label}</dt>
          <dd>
            <span className="block font-serif text-3xl leading-none tracking-[-0.02em] sm:text-4xl">
              {item.value}
            </span>
            <span className="mt-3 block text-sm leading-6 text-muted">
              {item.label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  );
}
