import { RelatedPosts } from "@/components/blog/related-posts";
import { Faq } from "@/components/landing/faq";
import { faqsFor } from "@/lib/faq";
import { FramedShot } from "@/components/landing/framed-shot";
import { FlowSteps, KeyFacts, LinkCards } from "@/components/landing/blocks";
import {
  PageHero,
  Section,
  SectionHeading,
} from "@/components/landing/section";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, HEADING_GAP } from "@/components/landing/ui";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";
import { SHOTS } from "@/lib/shots";

export const metadata = pageMeta({
  title: "Getting started",
  description:
    "Draw a workflow, publish a version, and start an execution. The host writes a checkpoint after every node.",
  path: "/getting-started",
});

const STEPS = [
  {
    title: "Draw the graph",
    copy: "Author the workflow on the canvas: a trigger, nodes, and the edges between them. Prompts, tools, and business logic stay yours.",
  },
  {
    title: "Publish a version",
    copy: "Publish freezes that graph. The host runs the version you published, so the canvas you reviewed is the execution that starts.",
  },
  {
    title: "Start an execution",
    copy: "Run it by hand, from a webhook, on a schedule, or from your app with the TypeScript SDK. Each start is one run of that version.",
  },
] as const;

const NEXT = [
  {
    href: "/runtime",
    icon: "runtime",
    title: "Runtime",
    copy: "How the host checkpoints a step, retries, and resumes after a crash.",
  },
  {
    href: "/replay",
    icon: "replay",
    title: "Replay",
    copy: "Rerun one node against the input the original execution recorded.",
  },
  {
    href: "/sdk",
    icon: "sdk",
    title: "SDK",
    copy: "Start runs from TypeScript. A server key can prepare workflows; publishing is done in the dashboard.",
  },
] as const;

/* Each figure restates something this site already says; nothing here is a new claim. */
const FACTS = [
  { value: "3 moves", label: "draw the graph, publish a version, start an execution" },
  { value: "4 ways", label: "to start a run: by hand, a webhook, a schedule, or the TypeScript SDK" },
  { value: "Every node", label: "writes a checkpoint, so the host keeps the record of the run" },
] as const;

export default function GettingStartedPage() {
  return (
    <SiteChrome>
      <main>
        <PageHero
          eyebrow="Getting started"
          title="Publish a graph, then run it."
          lead="You do not assemble workers, queues, and a checkpoint store first. Draw the workflow, publish a version, and start an execution. The host keeps the record."
          actions={
            <>
              <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
                Start building
              </Button>
              <Button href={DOCS_URL} variant="secondary" shortcut="d">
                Read the docs
              </Button>
            </>
          }
        >
          <FramedShot
            src={SHOTS.builder}
            alt="The Linea builder with a refund workflow on the canvas"
            eager
            sizes="(min-width: 80rem) 80rem, 100vw"
          />
        </PageHero>

        <Section id="facts" className="pt-0!">
          <KeyFacts items={FACTS} />
        </Section>

        <Section id="steps">
          <SectionHeading
            eyebrow="First run"
            title="Three moves, then the host takes the graph."
            lead="The agent is what you ship. The workflow is the versioned graph behind it."
          />
          <div className={HEADING_GAP}>
            <FlowSteps items={STEPS} />
          </div>
        </Section>

        <Section id="next">
          <SectionHeading
            eyebrow="Where to go next"
            title="The pages that follow the first run."
          />
          <div className={HEADING_GAP}>
            <LinkCards items={NEXT} />
          </div>
        </Section>

        <RelatedPosts tags={["Builder", "Runtime"]} />
        <Faq
          items={faqsFor("Do I have to use the visual builder?", "What is Linea?")}
          title="Questions about this page."
          align="center"
        />
      </main>
    </SiteChrome>
  );
}
