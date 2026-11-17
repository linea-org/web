import type { ReactNode } from "react";
import { Cat } from "@/components/landing/cat";
import { CodeSwitcher } from "@/components/code/code-switcher";
import { Band } from "@/components/landing/frame";
import { HeroGlow } from "@/components/landing/hero-glow";
import { PlatformShot } from "@/components/media/platform-shot";
import { PageLabel, SectionHeading } from "@/components/landing/section";
import {
  Button,
  Container,
  HEADING_GAP,
  SECTION_PB,
  SECTION_Y,
} from "@/components/landing/ui";
import { PLATFORM_URL } from "@/lib/docs";
import { highlightCode } from "@/lib/highlight";
import { getProduct } from "@/lib/product";
import { SHOTS } from "@/lib/shots";

/** The hero panel shows real artifacts from the product pages, not invented SDK calls. */
const SAMPLES = [
  { id: "graph", label: "Graph", slug: "runtime" },
  { id: "replay", label: "Replay input", slug: "replay" },
  { id: "memory", label: "Memory node", slug: "memory" },
] as const;

async function heroSamples() {
  return Promise.all(
    SAMPLES.map(async ({ id, label, slug }) => {
      const { code, lang } = getProduct(slug).example;

      return { id, label, code, html: await highlightCode(code, lang) };
    }),
  );
}

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
    copy: "Keyed facts live on the host, so the next execution reads what the last one learned.",
    surface: "lp-surface-floor",
    icon: <path d="M3 4.5h10M3 8h10M3 11.5h6" />,
  },
];

export async function Hero() {
  const samples = await heroSamples();

  return (
    <>
      <Band rule={false} className="relative">
        <HeroGlow />
        <Container className={`relative z-10 flex flex-col items-center pt-14 text-center sm:pt-16 lg:pt-20 ${SECTION_PB}`}>
          <PageLabel>The AI agent runtime and control plane</PageLabel>
          <h1 className="mx-auto mt-6 font-serif text-[2.75rem] leading-[1.02] font-normal tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.75rem]">
            Build and operate
            <br />
            <em className="text-[#c9dcf5] italic">production agents.</em>
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
          <Cat
            priority
            sizes="11rem"
            className="mt-10 w-28 drop-shadow-[0_10px_16px_rgba(255,255,255,0.16)] sm:mt-12 lg:w-36"
          />
          {/* Glass frame: the plain screenshot sits in a frosted pane over the glow. */}
          <div className="relative -mt-px w-full rounded-[18px] border border-white/15 bg-white/[0.06] p-1.5 shadow-[0_40px_80px_-24px_rgb(0_0_0/0.7),inset_0_1px_0_rgb(255_255_255/0.18)] backdrop-blur-md sm:p-2.5">
            <div className="overflow-hidden rounded-[12px] bg-black ring-1 ring-white/10">
              <PlatformShot
                eager
                src={SHOTS.dashboard}
                alt="Linea dashboard with workflows, signals, and recent executions"
                sizes="(min-width: 80rem) 80rem, 100vw"
              />
            </div>
          </div>
        </Container>
      </Band>

      {/* Each section below the hero pads like the rest of the page (SECTION_PT / SECTION_PB),
          so every gap is 96 / 112 / 128px and each one opens with its own tag and heading. */}
      <Band rule={false}>
        <div className={`px-5 sm:px-8 ${SECTION_Y}`}>
          <SectionHeading
            eyebrow="Under the hood"
            title="Real artifacts, not a black box."
            lead="Every run starts from a published graph. These are the actual payloads the host works with."
          />
          {/* One framed card: the real artifacts on the left, what each one is on the right,
              split by a hairline and stretched to the same height. */}
          <div
            className={`${HEADING_GAP} lp-reveal overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.02] lg:grid lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]`}
          >
            <CodeSwitcher
              options={[...samples]}
              className="h-full rounded-none! border-0!"
            />
            <ul className="flex flex-col justify-center divide-y divide-white/[0.08] border-t border-white/10 p-6 sm:p-8 lg:border-t-0 lg:border-l">
              {SAMPLES.map(({ id, slug }) => {
                const { title, copy } = getProduct(slug).example;

                return (
                  <li key={id} className="py-5 first:pt-0 last:pb-0">
                    <p className="text-sm font-medium tracking-tight">
                      {title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">{copy}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Band>

      <Band rule={false}>
        <div className={`px-5 sm:px-8 ${SECTION_Y}`}>
          <SectionHeading
            eyebrow="The platform"
            title="Three things the host does for you."
          />
          {/* Phones: open list, icon beside the text, hairlines between items (no box); md+: three columns. */}
          <div
            className={`${HEADING_GAP} divide-y divide-white/[0.08] md:grid md:grid-cols-3 md:gap-8 md:divide-y-0`}
          >
            {PILLARS.map((pillar) => (
              <div key={pillar.title} className="lp-reveal flex gap-4 py-6 first:pt-0 last:pb-0 md:block md:p-0">
                <span
                  className={`lp-surface inline-flex size-8 shrink-0 items-center justify-center rounded-md ${pillar.surface}`}
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
                <div>
                  <h3 className="text-base font-medium tracking-tight md:mt-4">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 max-w-sm text-sm leading-6 text-muted md:mt-2">
                    {pillar.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Band>
    </>
  );
}
