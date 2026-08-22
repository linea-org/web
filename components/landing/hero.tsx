import Image from "next/image";
import { Band, Cross } from "@/components/landing/frame";
import { Button, Container } from "@/components/landing/ui";
import { PLATFORM_URL } from "@/lib/docs";

const PILLARS = [
  {
    title: "Runtime",
    copy: "Design the graph, trigger it, and get checkpoint, resume, and crash safety for free.",
  },
  {
    title: "Replay",
    copy: "Re-run one step against the exact input it saw. No full-graph tax.",
  },
  {
    title: "Memory",
    copy: "Facts and knowledge persist across runs without a store you have to operate.",
  },
] as const;

export function Hero() {
  return (
    <>
      <Band>
        <Container className="py-16 text-center sm:py-20">
          <p className="text-sm text-muted">
            Built for people who would otherwise write the glue themselves.
          </p>
          <h1 className="mx-auto mt-4 max-w-3xl text-[2.25rem] leading-[1.08] font-medium tracking-[-0.04em] sm:text-5xl lg:text-6xl">
            The hosted ops layer for agents.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
            Design the graph once. Linea checkpoints every step and lets you
            replay the one that failed, without re-running the rest.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
              Start building
            </Button>
            <Button href="/runtime" variant="secondary" shortcut="a">
              See it in action
            </Button>
          </div>
        </Container>
      </Band>

      <Band wash>
        <div className="grid gap-3 p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-white/12">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.title}
              className="relative border border-white/12 px-5 py-7 sm:px-8 md:border-0"
            >
              <Cross className="-top-px left-0 -translate-x-1/2 -translate-y-1/2" />
              <Cross className="-top-px right-0 translate-x-1/2 -translate-y-1/2" />
              <Cross className="-bottom-px left-0 -translate-x-1/2 translate-y-1/2" />
              <Cross className="-bottom-px right-0 translate-x-1/2 translate-y-1/2" />
              <h2 className="text-lg font-medium tracking-tight">{pillar.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{pillar.copy}</p>
            </div>
          ))}
        </div>
      </Band>

      <Band hatch>
        <div className="p-3">
          <div className="relative border border-white/12">
            <Image
              src="/ref/zed-page.jpg"
              alt="Placeholder product surface from zed.dev"
              width={1600}
              height={900}
              priority
              className="h-auto w-full object-cover object-top"
            />
          </div>
        </div>
      </Band>
    </>
  );
}
