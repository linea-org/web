import Link from "next/link";
import type { ReactNode } from "react";
import { FramedShot } from "@/components/landing/framed-shot";
import { Band } from "@/components/landing/frame";
import { RunGraph } from "@/components/landing/run-graph";
import { MemoryNotes } from "@/components/landing/scenes";
import { ArrowIcon, CheckIcon, PageLabel } from "@/components/landing/section";
import { SECTION_Y } from "@/components/landing/ui";
import { SHOTS } from "@/lib/shots";

const ROWS: {
  id: string;
  eyebrow: string;
  title: [string, string];
  lead: string;
  points: [string, string, string];
  link: { href: string; label: string };
  visual: ReactNode;
}[] = [
  {
    id: "product",
    eyebrow: "Runtime",
    title: ["The host", "runs the graph."],
    lead: "You write the agent. Linea executes every step of it.",
    points: [
      "Checkpoint after every step",
      "Automatic retries on failure",
      "Resume where a crash left off",
    ],
    link: { href: "/runtime", label: "Explore the runtime" },
    visual: <RunGraph />,
  },
  {
    id: "replay",
    eyebrow: "Replay",
    title: ["Replay the step", "that failed."],
    lead: "We ran it, so we kept the exact input every step saw.",
    points: [
      "Rerun one node, not the whole run",
      "Swap the prompt or model and compare",
      "Freeze the fix as a regression case",
    ],
    link: { href: "/replay", label: "See how replay works" },
    visual: (
      <FramedShot
        src={SHOTS.signals}
        alt="The Linea monitoring tab for a workflow, with a trend chart and an open tool error signal"
        sizes="(min-width: 1024px) 40rem, 100vw"
      />
    ),
  },
  {
    id: "memory",
    eyebrow: "Memory",
    title: ["Memory that", "survives the run."],
    lead: "The next run reads what the last one learned.",
    points: [
      "Keyed facts, scoped per end user",
      "An expiry on every fact",
      "Shared across every run of the agent",
    ],
    link: { href: "/memory", label: "Explore memory" },
    visual: <MemoryNotes />,
  },
];

export function Features() {
  return (
    <Band rule={false} className="lp-defer">
      {/* Tighter than SECTION_GAP on phones: 96px between stacked rows read as empty. */}
      <div className={`flex flex-col gap-20 px-5 sm:gap-28 sm:px-8 lg:gap-32 ${SECTION_Y}`}>
        {ROWS.map((row, index) => {
          const flip = index % 2 === 1;

          return (
            <article
              key={row.id}
              id={row.id}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <div className={`lp-reveal ${flip ? "lg:order-2 lg:pl-8" : ""}`}>
                <PageLabel>{row.eyebrow}</PageLabel>
                {/* Natural, balanced wrap while stacked; the two-line break only beside the visual. */}
                <h2 className="mt-4 text-[2rem] leading-[1.08] font-medium tracking-[-0.04em] text-balance sm:text-5xl sm:leading-[1.05]">
                  {row.title[0]} <br className="hidden lg:inline" />
                  {row.title[1]}
                </h2>
                <p className="mt-5 text-base leading-7 text-muted lg:max-w-md">
                  {row.lead}
                </p>
                {/* Stacked: chips that wrap across the column (fills the width without a boxed table).
                    Beside the visual: a plain list. */}
                <ul className="mt-6 flex flex-wrap gap-2 lg:block lg:space-y-2.5">
                  {row.points.map((point) => (
                    <li
                      key={point}
                      className="inline-flex items-center gap-2 rounded-full bg-white/[0.04] py-1.5 pr-3 pl-1.5 text-sm ring-1 ring-white/10 lg:flex lg:gap-3 lg:rounded-none lg:bg-transparent lg:p-0 lg:ring-0"
                    >
                      <CheckIcon />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={row.link.href}
                  className="lp-press group mt-4 inline-flex h-10 items-center lg:mt-6 gap-1.5 rounded-md px-3 text-sm leading-none font-medium tracking-tight text-foreground outline-none hover:bg-white/[0.06] focus-visible:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-white/40"
                >
                  {row.link.label}
                  <ArrowIcon />
                </Link>
              </div>
              <div className={`lp-reveal ${flip ? "lg:order-1" : ""}`}>{row.visual}</div>
            </article>
          );
        })}
      </div>
    </Band>
  );
}
