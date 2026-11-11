import Image from "next/image";
import type { ReactNode } from "react";
import { Cat } from "@/components/landing/cat";
import { Band } from "@/components/landing/frame";
import { HeroGrid } from "@/components/landing/hero-grid";
import {
  Button,
  Container,
  HEADING_GAP,
  SECTION_PB,
} from "@/components/landing/ui";
import { PLATFORM_URL } from "@/lib/docs";

const PILLARS: {
  title: string;
  copy: string;
  surface: string;
  icon: ReactNode;
}[] = [
  {
    title: "Durable execution",
    copy: "Every step is checkpointed, failures retry, and an interrupted run resumes from the last successful node.",
    surface: "lp-surface-sky",
    icon: <path d="M3 8.5 6.5 12 13 4.5" />,
  },
  {
    title: "The fix loop",
    copy: "Replay the failing step against the exact input it saw, freeze it as a case, and publish the fix.",
    surface: "lp-surface-mist",
    icon: <path d="M12.5 8A4.5 4.5 0 1 1 11 4.6M11.5 2v3h-3" />,
  },
  {
    title: "Memory on the host",
    copy: "Facts and workspace knowledge live with the run, so the next execution reads what the last one learned.",
    surface: "lp-surface-floor",
    icon: <path d="M3 4.5h10M3 8h10M3 11.5h6" />,
  },
];

export function Hero() {
  return (
    <>
      <Band rule={false} className="relative">
        <HeroGrid />
        <Container className="relative z-10 flex flex-col items-center justify-center pt-14 pb-12 text-center sm:min-h-[32rem] sm:py-16 lg:min-h-[38rem]">
          <p className="flex justify-center">
            <span className="inline-flex items-center border border-white/15 px-2.5 py-1 text-[11px] font-medium tracking-tight text-foreground">
              The runtime and control plane for production agents
            </span>
          </p>
          <h1 className="mx-auto mt-5 text-[2.5rem] leading-[1.02] font-medium tracking-[-0.045em] sm:text-6xl lg:text-[4.25rem]">
            Build and operate
            <br />
            production agents.
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-muted">
            You ship the agent. Linea executes the graph, holds the
            checkpoint, and gives you the loop to replay a failure and publish
            a fix.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
              Start building
            </Button>
            <Button href="/runtime" variant="secondary" shortcut="a">
              Explore the platform
            </Button>
          </div>
        </Container>
      </Band>

      <Band rule={false}>
        <div className={`px-5 sm:px-8 ${SECTION_PB}`}>
          <Cat
            priority
            sizes="11rem"
            className="mx-auto w-28 drop-shadow-[0_10px_16px_rgba(255,255,255,0.16)] lg:w-36"
          />
          <div className="mt-6 overflow-hidden rounded-[14px]">
            <Image
              src="/linea/linea-dashboard-window.jpg"
              alt="Linea dashboard with workflows, signals, and recent executions"
              width={1024}
              height={682}
              priority
              sizes="(min-width: 80rem) 80rem, 100vw"
              className="h-auto w-full"
            />
          </div>
          <div className={`${HEADING_GAP} grid gap-10 md:grid-cols-3 md:gap-8`}>
            {PILLARS.map((pillar) => (
              <div key={pillar.title}>
                <span
                  className={`lp-surface inline-flex size-8 items-center justify-center rounded-md ${pillar.surface}`}
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {pillar.icon}
                  </svg>
                </span>
                <h3 className="mt-4 text-base font-medium tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
                  {pillar.copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Band>
    </>
  );
}
