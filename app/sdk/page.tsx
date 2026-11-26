import { RelatedPosts } from "@/components/blog/related-posts";
import { Faq } from "@/components/landing/faq";
import { faqsFor } from "@/lib/faq";
import { FramedShot } from "@/components/landing/framed-shot";
import { FlowSteps, KeyFacts, LinkCards } from "@/components/landing/blocks";
import {
  CARD,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/landing/section";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, HEADING_GAP } from "@/components/landing/ui";
import { DOCS_GETTING_STARTED_URL, DOCS_URL, PLATFORM_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";
import { SHOTS } from "@/lib/shots";

export const metadata = pageMeta({
  title: "TypeScript SDK",
  description:
    "The Linea SDK is TypeScript. Your app starts executions and reads them back, and a server key can prepare workflows. An admin publishes a version in the dashboard, and the host runs that published version.",
  path: "/sdk",
});

const PROSE = "text-base leading-7 text-pretty text-muted";

const POINTS = [
  {
    title: "What the SDK does",
    copy: "Start an execution and read each step's record back. A server key can also save drafts and versions.",
  },
  {
    title: "What an admin does",
    copy: "Publishing a version and binding an environment need a signed-in admin. The host runs that version.",
  },
  {
    title: "TypeScript only",
    copy: "There is no Python client. A payload sample in another language is an example of the body, not an SDK.",
  },
] as const;

const HANDOFF = [
  {
    title: "Name the version",
    copy: "When you publish, the builder freezes the workflow as a version: the graph the host will run. Your app names that version and asks the host to start one execution of it, so the graph you reviewed is the graph that runs.",
  },
  {
    title: "Pass the input",
    copy: "The start carries the input the trigger expects: a webhook body, the fields the first node reads, or the id of the person the run is for. It is data for the graph, not a description of it. Prompts, tools, and edges stay on the host.",
  },
  {
    title: "Read the record",
    copy: "As the run proceeds, the host writes each step's input and output onto the execution. The SDK reads that record back: the same record you see in the run, and the same checkpoint replay loads for one node.",
  },
] as const;

const NEXT = [
  {
    href: "/runtime",
    icon: "runtime",
    title: "Runtime",
    copy: "Where a worker takes the run and resumes from the last checkpoint.",
  },
  {
    href: "/replay",
    icon: "replay",
    title: "Replay",
    copy: "Rerun one node against the input that execution recorded.",
  },
  {
    href: DOCS_GETTING_STARTED_URL,
    icon: "start",
    title: "Getting started",
    copy: "The path from a blank canvas to that first run.",
  },
] as const;

/* Each figure restates something this site already says; nothing here is a new claim. */
const FACTS = [
  { value: "TypeScript", label: "the only SDK: there is no Python client" },
  { value: "Start + read", label: "what it does: starts executions and reads each step's record back" },
  { value: "Admin publishes", label: "the SDK can save drafts and versions, but publishing and binding an environment need a signed-in admin" },
  { value: "Webhooks", label: "verified by the SDK, alongside starting and reading runs" },
] as const;

export default function SdkPage() {
  return (
    <SiteChrome cta={false}>
      <main>
        <PageHero
          eyebrow="SDK"
          title="Start the run from your app."
          lead="The SDK is TypeScript. It starts executions and reads them back, and a server key can create workflows and save drafts and versions. Publishing needs a signed-in admin in the dashboard, and the host runs the version that was published."
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
            src={SHOTS.executions}
            alt="Linea execution history listing runs started by API and webhook, with status, duration and cost"
            eager
            sizes="(min-width: 80rem) 80rem, 100vw"
          />
        </PageHero>

        <Section id="facts" className="pt-0!">
          <KeyFacts items={FACTS} />
        </Section>

        <Section id="handoff">
          <SectionHeading
            eyebrow="The handoff"
            title="Three things cross from your app to the host."
          />
          <div className={HEADING_GAP}>
            <FlowSteps items={HANDOFF} />
          </div>
        </Section>

        <Section id="split">
          <SectionHeading
            align="left"
            eyebrow="One graph"
            title="Your app starts the run. An admin publishes the graph."
          />
          <p className={`mt-5 max-w-2xl ${PROSE}`}>
            If the nodes in a run are not the nodes on the canvas, replay has
            nothing to target. The SDK can prepare a draft or a version, but
            only an admin publishes one, and the host runs that published
            version.
          </p>
          <div className={`${HEADING_GAP} grid items-stretch gap-6 lg:grid-cols-2 lg:gap-8`}>
            <div className="flex flex-col gap-3">
              {POINTS.map((item, index) => (
                <div
                  key={item.title}
                  className={`${CARD} flex flex-1 gap-4 px-5 py-4 sm:px-6`}
                >
                  <p className="pt-0.5 font-mono text-xs text-[#9dbde4] tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <div>
                    <h3 className="text-base font-medium tracking-tight">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-6 text-muted">
                      {item.copy}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <FramedShot
              src={SHOTS.builder}
              alt="The Linea builder canvas, where the graph is authored"
              sizes="(min-width: 1024px) 40rem, 100vw"
              stretch
            />
          </div>
          <div className="mt-10 sm:mt-12">
            <LinkCards items={NEXT} />
          </div>
        </Section>

        <RelatedPosts tags={["Builder"]} />
        <Faq
          items={faqsFor("Do I have to use the visual builder?", "What is Linea?")}
          title="Questions about this page."
          align="center"
        />
      </main>
    </SiteChrome>
  );
}
