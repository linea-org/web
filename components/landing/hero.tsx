import Image from "next/image";
import { Band, Cross } from "@/components/landing/frame";
import { GitHubIcon } from "@/components/landing/github-icon";
import { Button, Container } from "@/components/landing/ui";
import { PLATFORM_URL } from "@/lib/docs";

const PILLARS = [
  {
    title: "Runtime",
    copy: "You write the graph. We execute it with checkpoints, retries, and crash resume already on the host.",
  },
  {
    title: "Replay",
    copy: "When a node fails, run that node again against the input it originally saw. The rest of the graph stays put.",
  },
  {
    title: "Memory",
    copy: "Facts and documents live with the run, so the next trigger can read what the last one learned.",
  },
] as const;

export function Hero() {
  return (
    <>
      <Band>
        <Container className="py-16 text-center sm:py-20">
          <p className="flex justify-center">
            <span className="inline-flex items-center gap-1.5 border border-white/12 py-1 pr-2 pl-1 text-[11px] font-medium tracking-tight text-white">
              <span className="inline-flex size-4 items-center justify-center bg-white">
                <GitHubIcon className="size-2.5 text-black" />
              </span>
              Backed by open source contributors
            </span>
          </p>
          <p className="mt-3 text-sm text-muted">
            For people who would otherwise operate this layer themselves.
          </p>
          <h1 className="mx-auto mt-4 text-[2.25rem] leading-[1.08] font-medium tracking-[-0.04em] sm:text-5xl lg:whitespace-nowrap lg:text-[clamp(2.5rem,4.8vw,3.75rem)]">
            The hosted ops layer for agents.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
            You write the graph. We host the run, checkpoint every step, and
            let you replay only the one that failed.
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
              src="/linea-dashboard.png"
              alt="Linea dashboard with workflows, signals, and recent executions"
              width={2880}
              height={1884}
              priority
              className="h-auto w-full object-cover object-top"
            />
          </div>
        </div>
      </Band>
    </>
  );
}
