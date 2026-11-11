import { Section } from "@/components/landing/section";
import { Button } from "@/components/landing/ui";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";

/** Open, centered close for inner pages, matching the landing "Ready to build". */
export function PageCta() {
  return (
    <Section id="start" className="text-center">
      <h2 className="mx-auto max-w-2xl text-4xl leading-[1.05] font-medium tracking-[-0.04em] text-balance sm:text-5xl">
        You write the agent.
        <br />
        <span className="text-muted">We execute the graph.</span>
      </h2>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
          Start building
        </Button>
        <Button href={DOCS_URL} variant="secondary" shortcut="d">
          Read the docs
        </Button>
      </div>
    </Section>
  );
}
