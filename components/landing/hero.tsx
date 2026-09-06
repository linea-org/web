import { Band, Cross } from "@/components/landing/frame";
import { PlatformShot } from "@/components/media/platform-shot";
import { Button, Container } from "@/components/landing/ui";
import { PLATFORM_URL } from "@/lib/docs";
import { SHOTS } from "@/lib/shots";

const PILLARS = [
  {
    title: "Durable execution",
    copy: "Linea runs the graph. Every step is checkpointed, failures retry, and an interrupted execution resumes from the last successful node.",
  },
  {
    title: "The fix loop",
    copy: "Replay the failing step against the exact input it saw. Freeze it as a case, publish, and check you did not break anything else.",
  },
  {
    title: "Memory on the host",
    copy: "Facts and workspace knowledge live with the run, so the next execution can read what the last one learned.",
  },
] as const;

export function Hero() {
  return (
    <>
      <Band>
        <Container className="py-16 text-center sm:py-20">
          <p className="flex justify-center">
            <span className="inline-flex items-center border border-white/12 px-2.5 py-1 text-[11px] font-medium tracking-tight text-white">
              The runtime and control plane for production agents
            </span>
          </p>
          <h1 className="mx-auto mt-4 text-[2.25rem] leading-[1.08] font-medium tracking-[-0.04em] sm:text-5xl lg:whitespace-nowrap lg:text-[clamp(2.5rem,4.8vw,3.75rem)]">
            Build and operate production agents.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
            You ship the agent. Linea executes the graph, holds the
            checkpoint, and gives you the loop to diagnose a failure, replay
            it, and publish a fix.
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

      <Band grain>
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
            <PlatformShot
              src={SHOTS.dashboard}
              alt="Linea dashboard with workflows, signals, and recent executions"
              eager
              sizes="(min-width: 80rem) 80rem, 100vw"
            />
          </div>
        </div>
      </Band>
    </>
  );
}
