import { RelatedPosts } from "@/components/blog/related-posts";
import { Faq } from "@/components/landing/faq";
import { faqsFor } from "@/lib/faq";
import { FramedShot } from "@/components/landing/framed-shot";
import { FlowSteps } from "@/components/landing/blocks";
import { AudienceCards } from "@/components/landing/proof";
import {
  PageHero,
  Section,
  SectionHeading,
} from "@/components/landing/section";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, HEADING_GAP } from "@/components/landing/ui";
import { PLATFORM_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";
import { SHOTS } from "@/lib/shots";

export const metadata = pageMeta({
  title: "Who it is for",
  description:
    "Linea is for technical builders who would otherwise assemble the ops layer themselves: runtime, replay, memory, and the records around the run.",
  path: "/audience",
});

const FIT = [
  {
    title: "Draw it, publish it, run it",
    copy: "Author the graph on the canvas. Each published version is the exact graph the host runs, and your app starts runs through the API.",
  },
  {
    title: "Bring the agent logic",
    copy: "Prompts, tools, and business logic stay yours. Linea executes the graph and holds the checkpoint. That is the control plane, not a rewrite of your loop.",
  },
  {
    title: "Publish into the fix loop",
    copy: "A published version is an immutable graph. Replay a failing step, freeze the case, publish again, and check you did not break what used to pass.",
  },
] as const;

export default function AudiencePage() {
  return (
    <SiteChrome>
      <main>
        <PageHero
          eyebrow="Who it is for"
          title="For people who would otherwise operate this layer themselves."
          lead="Technical builders first. You ship the agent. We execute the graph. End users meet the agent you deploy, not Linea."
          actions={
            <>
              <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
                Start building
              </Button>
              <Button href="/runtime" variant="secondary" shortcut="a">
                See the runtime
              </Button>
            </>
          }
        >
          <AudienceCards />
        </PageHero>

        <Section id="fit">
          <SectionHeading
            eyebrow="How builders work with Linea"
            title="Keep the logic. Give us the host."
            lead="Linea is the control plane under the agent, not a rewrite of it."
          />
          <FramedShot
            src={SHOTS.workflow}
            alt="A Linea workflow graph on the canvas"
            sizes="(min-width: 80rem) 80rem, 100vw"
            className={HEADING_GAP}
          />
          <div className={HEADING_GAP}>
            <FlowSteps items={FIT} />
          </div>
        </Section>
        <RelatedPosts tags={["Principles", "Builder"]} />
        <Faq
          items={faqsFor("How is this different from n8n or Zapier?", "How is this different from LangGraph?", "Is this a workflow-automation tool?")}
          title="Questions about this page."
          align="center"
        />
      </main>
    </SiteChrome>
  );
}
