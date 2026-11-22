import { RelatedPosts } from "@/components/blog/related-posts";
import { Faq } from "@/components/landing/faq";
import { faqsFor } from "@/lib/faq";
import { FramedShot } from "@/components/landing/framed-shot";
import { FlowSteps, KeyFacts } from "@/components/landing/blocks";
import {
  CARD,
  CARD_PAD,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/landing/section";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, HEADING_GAP } from "@/components/landing/ui";
import { DOCS_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";
import { SHOTS } from "@/lib/shots";

export const metadata = pageMeta({
  title: "Architecture",
  description:
    "One published graph, an API that starts the run, queue-backed workers with a 30-second lease, and a checkpoint after every completed node.",
  path: "/architecture",
});

const PIECES = [
  {
    title: "One published graph",
    copy: "The builder saves the workflow as a document. Publish freezes a version. Checkpoints, replay, and regression cases all use the node ids in that version.",
  },
  {
    title: "An API that starts the run",
    copy: "A manual run, a webhook, a schedule, or the TypeScript SDK starts one execution of the published version. Starting the graph is not the product. The run after that is.",
  },
  {
    title: "Workers on a 30-second lease",
    copy: "Queue-backed workers hold a lease on the run they are executing. If a worker dies, the lease expires and another worker picks the run up.",
  },
  {
    title: "A checkpoint per completed node",
    copy: "Each finished node records its input and output. Resume continues from the last successful step. Replay loads that same input for one node.",
  },
] as const;

/* Each figure restates something this site already says; nothing here is a new claim. */
const FACTS = [
  { value: "1 graph", label: "published version: the canvas, the checkpoint and the replay target share its node ids" },
  { value: "30 s", label: "worker lease: if a worker dies, another picks the run up" },
  { value: "Every node", label: "records its input and output when it completes" },
  { value: "4 pieces", label: "one data model: graph, API, workers and checkpoint" },
] as const;

export default function ArchitecturePage() {
  return (
    <SiteChrome>
      <main>
        <PageHero
          eyebrow="Architecture"
          title="The host is the graph, the worker, and the checkpoint."
          lead="Linea executes the version you published. It does not observe a loop running somewhere else, so the checkpoint belongs to the host."
          actions={
            <>
              <Button href="/runtime" shortcut="r" externalIcon={false}>
                See the runtime
              </Button>
              <Button href={DOCS_URL} variant="secondary" shortcut="d">
                Read the docs
              </Button>
            </>
          }
        >
          <FramedShot
            src={SHOTS.workflow}
            alt="A published Linea workflow and its executions, with status, trigger, duration, and cost"
            eager
            sizes="(min-width: 80rem) 80rem, 100vw"
          />
        </PageHero>

        <Section id="facts" className="pt-0!">
          <KeyFacts items={FACTS} />
        </Section>

        <Section id="pieces">
          <SectionHeading
            eyebrow="What runs"
            title="Four pieces, one data model."
            lead="The same node ids are on the canvas, in the checkpoint, and in the replay target."
          />
          <div className={HEADING_GAP}>
            <FlowSteps items={PIECES} />
          </div>
        </Section>

        <Section id="crash">
          <div className="grid gap-3 lg:grid-cols-2">
            <article className={`${CARD} ${CARD_PAD}`}>
              <h2 className="text-xl font-medium tracking-tight">
                A crash resumes the run
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                When the worker holding the lease dies, another worker starts
                from the last checkpoint. Completed steps stay completed. The
                step that was in flight runs again.
              </p>
            </article>
            <article className={`${CARD} ${CARD_PAD}`}>
              <h2 className="text-xl font-medium tracking-tight">
                A wait holds the checkpoint
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                An approval or a wait pauses the execution at the checkpoint
                until someone decides or a timer fires. The run then continues
                from that step. It does not start over.
              </p>
            </article>
          </div>
        </Section>

        <RelatedPosts tags={["Runtime", "Ops"]} />
        <Faq
          items={faqsFor("How is this different from LangGraph?", "What is Linea?")}
          title="Questions about this page."
          align="center"
        />
      </main>
    </SiteChrome>
  );
}
