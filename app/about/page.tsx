import { RelatedPosts } from "@/components/blog/related-posts";
import { Faq } from "@/components/landing/faq";
import { faqsFor } from "@/lib/faq";
import { FramedShot } from "@/components/landing/framed-shot";
import { PathCards } from "@/components/landing/path-cards";
import {
  CARD,
  CARD_PAD,
  Eyebrow,
  PageHero,
  Section,
  SectionHeading,
  SURFACES,
} from "@/components/landing/section";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, HEADING_GAP } from "@/components/landing/ui";
import { PLATFORM_URL } from "@/lib/docs";
import { PRODUCTS } from "@/lib/product";
import { pageMeta } from "@/lib/seo";
import { SHOTS } from "@/lib/shots";

export const metadata = pageMeta({
  title: "About Linea Labs",
  description:
    "Linea Labs builds Linea, an AI agent runtime and control plane for production agents. Meet the team and see how the host, checkpoint, and fix loop fit together.",
  path: "/about",
});

const WHO = [
  {
    label: "The company",
    title: "Linea Labs",
    copy: "A small team building the substrate production agents need: durable execution, memory, human-in-the-loop, and the fix loop that sits on the same data model.",
  },
  {
    label: "The product",
    title: "Linea",
    copy: "An agentic runtime and control plane. Author the graph, run it on the host, and operate the agent from the records that execution wrote.",
  },
] as const;

const SAID = [
  {
    title: "We execute the graph",
    copy: "Not observe it, not orchestrate a call out to something else. Because Linea runs the workflow, it holds the checkpoint, the signal, and the case you freeze from a failure.",
  },
  {
    title: "The fix loop is on the host",
    copy: "Replay the failing step against the input it saw. Publish a version. The suite checks the fix. An observability tool can show the break; it never ran the graph.",
  },
  {
    title: "One versioned graph",
    copy: "The builder saves the workflow as a graph, and every publish freezes it as a version. The host runs that exact version, so what you reviewed is what runs.",
  },
] as const;

const PRODUCT_SURFACES = {
  runtime: "lp-surface-sky",
  replay: "lp-surface-mist",
  memory: "lp-surface-floor",
} as const;

export default function AboutPage() {
  return (
    <SiteChrome>
      <main>
        <PageHero
          eyebrow="About"
          title="We are building the runtime and control plane for production agents."
          lead="You ship the agent. Linea executes the graph and keeps the records around the run. Workflow stays the name of that graph, not the name of the product."
          actions={
            <>
              <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
                Start building
              </Button>
              <Button href="/careers" variant="secondary" shortcut="c">
                Careers
              </Button>
            </>
          }
        >
          <FramedShot
            src={SHOTS.builder}
            alt="The Linea builder canvas showing a refund workflow graph"
            eager
            sizes="(min-width: 80rem) 80rem, 100vw"
          />
        </PageHero>

        <Section id="company">
          <div className="grid gap-3 md:grid-cols-2">
            {WHO.map((item) => (
              <article key={item.label} className={`${CARD} ${CARD_PAD}`}>
                <Eyebrow>{item.label}</Eyebrow>
                <h2 className="mt-3 text-2xl font-medium tracking-[-0.03em]">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {item.copy}
                </p>
              </article>
            ))}
          </div>
        </Section>

        <Section id="beliefs">
          <SectionHeading
            eyebrow="What we believe"
            title="Three things we will not trade away."
          />
          <div className={`${HEADING_GAP} grid gap-3 md:grid-cols-3`}>
            {SAID.map((item, index) => (
              <article
                key={item.title}
                className={`lp-surface relative overflow-hidden rounded-[10px] ${CARD_PAD} ${SURFACES[index] ?? SURFACES[1]}`}
              >
                <div aria-hidden className="lp-noise absolute inset-0" />
                <div className="relative">
                  <p className="font-mono text-xs text-muted tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-lg font-medium tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted">
                    {item.copy}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section id="product">
          <SectionHeading
            eyebrow="What we ship"
            title="Runtime, replay, and memory."
            lead="One host, one data model, three ways to operate the agent you ship."
          />
          <div className={HEADING_GAP}>
            <PathCards
              items={PRODUCTS.map((item) => ({
                href: item.href,
                label: item.name,
                title: item.hint,
                copy: item.excerpt,
                image: item.image,
                surface: PRODUCT_SURFACES[item.slug],
              }))}
            />
          </div>
        </Section>
        <RelatedPosts tags={["Principles"]} />
        <Faq
          items={faqsFor("Is Linea the same as Consensys Linea?", "What is Linea?", "Is this a workflow-automation tool?")}
          title="Questions about this page."
          align="center"
        />
      </main>
    </SiteChrome>
  );
}
