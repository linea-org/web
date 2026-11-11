import Link from "next/link";
import type { ReactNode } from "react";
import { FramedShot } from "@/components/landing/framed-shot";
import { Band } from "@/components/landing/frame";
import { RunGraph } from "@/components/landing/run-graph";
import { MemoryNotes } from "@/components/landing/scenes";
import { ArrowIcon, CheckIcon } from "@/components/landing/section";
import { SECTION_GAP, SECTION_Y } from "@/components/landing/ui";
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
        alt="Linea monitoring view with open signals"
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
      "Facts and workspace knowledge on the host",
      "No vector store to wire up per graph",
      "Shared across every run of the agent",
    ],
    link: { href: "/memory", label: "Explore memory" },
    visual: <MemoryNotes />,
  },
];

export function Features() {
  return (
    <Band rule={false} className="lp-defer">
      <div className={`flex flex-col px-5 sm:px-8 ${SECTION_GAP} ${SECTION_Y}`}>
        {ROWS.map((row, index) => {
          const flip = index % 2 === 1;

          return (
            <article
              key={row.id}
              id={row.id}
              className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16"
            >
              <div className={flip ? "lg:order-2 lg:pl-8" : ""}>
                <p className="text-sm font-medium tracking-tight text-[#9dbde4]">
                  {row.eyebrow}
                </p>
                <h2 className="mt-3 text-4xl leading-[1.05] font-medium tracking-[-0.04em] sm:text-5xl">
                  {row.title[0]}
                  <br />
                  {row.title[1]}
                </h2>
                <p className="mt-5 max-w-md text-base leading-7 text-muted">
                  {row.lead}
                </p>
                <ul className="mt-6 space-y-2.5">
                  {row.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-sm">
                      <CheckIcon />
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={row.link.href}
                  className="group mt-6 -ml-3 box-border inline-flex h-9 items-center gap-1.5 rounded-md border border-transparent px-3 text-sm leading-none font-medium tracking-tight text-foreground transition-colors outline-none hover:border-white/30 hover:bg-white/[0.06] focus-visible:border-white/30 focus-visible:bg-white/[0.06] focus-visible:ring-2 focus-visible:ring-white/40 motion-reduce:transition-none"
                >
                  {row.link.label}
                  <ArrowIcon />
                </Link>
              </div>
              <div className={flip ? "lg:order-1" : ""}>{row.visual}</div>
            </article>
          );
        })}
      </div>
    </Band>
  );
}
