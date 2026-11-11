import { Band } from "@/components/landing/frame";
import { Button } from "@/components/landing/ui";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";

export function Close() {
  return (
    <Band hatch className="lp-defer">
      <section id="start" className="p-3">
        <div className="relative border border-black/[0.08] bg-background px-5 py-16 text-center sm:px-10 sm:py-24">
          <p className="text-sm text-muted">Start building with Linea</p>
          <h2 className="mx-auto mt-4 max-w-2xl text-3xl leading-[1.1] font-medium tracking-[-0.04em] sm:text-5xl">
            Build and operate production agents.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-muted sm:text-base">
            You write the logic unique to the problem. We execute the graph
            and keep the control plane around the run.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
              Start building
            </Button>
            <Button href={DOCS_URL} variant="secondary" shortcut="d">
              Read the docs
            </Button>
          </div>
        </div>
      </section>
    </Band>
  );
}
