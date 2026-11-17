import { CodeBlock } from "@/components/product/code-block";
import {
  FramedShot,
  GLASS_FRAME,
  GLASS_INNER,
} from "@/components/landing/framed-shot";
import {
  CARD,
  CARD_PAD,
  CheckList,
  PageHero,
  Section,
  SectionHeading,
  StepCards,
} from "@/components/landing/section";
import { RelatedPosts } from "@/components/blog/related-posts";
import {
  ComparePanels,
  FlowSteps,
  KeyFacts,
  LinkCards,
} from "@/components/landing/blocks";
import { Faq } from "@/components/landing/faq";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, HEADING_GAP } from "@/components/landing/ui";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";
import { faqsFor } from "@/lib/faq";
import type { NavIconName } from "@/lib/nav";
import type { Product } from "@/lib/product";

function Header({ product }: { product: Product }) {
  return (
    <PageHero
      eyebrow={product.name}
      title={product.title}
      lead={product.excerpt}
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
        src={product.image}
        alt={product.imageAlt}
        eager
        sizes="(min-width: 80rem) 80rem, 100vw"
      />
    </PageHero>
  );
}

function How({ product }: { product: Product }) {
  return (
    <Section id="how">
      <SectionHeading
        eyebrow="How it works"
        title={product.how.title}
        lead={product.how.lead}
      />
      <div className={HEADING_GAP}>
        <FlowSteps items={product.how.steps} />
      </div>
    </Section>
  );
}

async function Example({ product }: { product: Product }) {
  return (
    <Section id="example">
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <SectionHeading
          align="left"
          eyebrow="Example"
          title={product.example.title}
          lead={product.example.copy}
        />
        <div className={`lp-reveal ${GLASS_FRAME}`}>
          <div className={`${GLASS_INNER} bg-[#0a0a0a]`}>
            <CodeBlock
              code={product.example.code}
              lang={product.example.lang}
              className="rounded-none! border-0!"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function Compare({ product }: { product: Product }) {
  return (
    <Section id="compare">
      <SectionHeading
        eyebrow="Compare"
        title={product.compare.title}
        lead={product.compare.lead}
      />
      <div className={HEADING_GAP}>
        <ComparePanels
          columns={product.compare.columns}
          rows={product.compare.rows}
        />
      </div>
    </Section>
  );
}

function Split({ product }: { product: Product }) {
  const { left, right } = product.split;

  return (
    <Section id="split">
      <SectionHeading
        eyebrow="Who does what"
        title="You keep the logic. Linea keeps the host."
      />
      <div className={`${HEADING_GAP} grid gap-3 md:grid-cols-2`}>
        <div className={`${CARD} ${CARD_PAD}`}>
          <p className="text-sm font-medium tracking-tight text-muted">
            {left.title}
          </p>
          <ul className="mt-5 space-y-3">
            {left.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-sm leading-5 text-muted"
              >
                <span
                  aria-hidden
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-white/30"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div
          className={`rounded-[10px] border border-white/20 bg-white/[0.06] shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] ${CARD_PAD}`}
        >
          <p className="text-sm font-medium tracking-tight">{right.title}</p>
          <CheckList items={right.items} className="mt-5" />
        </div>
      </div>
    </Section>
  );
}

function Precision({ product }: { product: Product }) {
  const block = product.not;
  if (!block) {
    return null;
  }

  return (
    <Section id="precision">
      <SectionHeading
        eyebrow="Designed for precision"
        title={block.title}
        lead={block.lead}
      />
      <div className={HEADING_GAP}>
        <StepCards items={block.items} />
      </div>
    </Section>
  );
}

function Body({ product }: { product: Product }) {
  switch (product.slug) {
    case "runtime":
      return (
        <>
          <How product={product} />
          <Example product={product} />
          <Compare product={product} />
          <Split product={product} />
        </>
      );
    case "replay":
      return (
        <>
          <How product={product} />
          <Example product={product} />
          <Compare product={product} />
          <Precision product={product} />
        </>
      );
    case "memory":
      return (
        <>
          <Split product={product} />
          <Example product={product} />
          <How product={product} />
          <Compare product={product} />
        </>
      );
    default: {
      const _never: never = product.slug;
      return _never;
    }
  }
}

/*
 * Added page content. Every line restates something the site already says (the
 * excerpts, steps and FAQ above, the architecture page); nothing here is a new claim.
 */
const FACTS: Record<Product["slug"], { value: string; label: string }[]> = {
  runtime: [
    { value: "Every node", label: "writes a checkpoint, so a crashed run resumes from the last successful step" },
    { value: "30 s", label: "worker lease: if a worker dies, another picks the run up" },
    { value: "4 ways", label: "to start a run: by hand, from your app, a webhook, or a schedule" },
    { value: "1 version", label: "frozen at publish: the host runs exactly that graph" },
  ],
  replay: [
    { value: "1 node", label: "replayed on its own, with the steps before it left alone" },
    { value: "0 deploys", label: "needed to replay a step against its original input" },
    { value: "Same input", label: "the payload that node received in the original execution" },
    { value: "Compare", label: "the new output against the original run, in the same context" },
  ],
  memory: [
    { value: "Keyed", label: "facts, scoped to your end user and a namespace" },
    { value: "Shared", label: "across workflows that use the same namespace" },
    { value: "90 days", label: "default life of a fact, adjustable up to one year" },
    { value: "0 stores", label: "for you to run: memory lives on the host" },
  ],
};

const QUESTIONS: Record<Product["slug"], string[]> = {
  runtime: [
    "What is Linea?",
    "Is this a workflow-automation tool?",
    "How is this different from LangGraph?",
  ],
  replay: [
    "What is step-level replay?",
    "How is this different from LangGraph?",
    "How is this different from n8n or Zapier?",
  ],
  memory: [
    "What is Linea?",
    "Do I have to use the visual builder?",
    "Is this a workflow-automation tool?",
  ],
};

const TAGS: Record<Product["slug"], string[]> = {
  runtime: ["Runtime"],
  replay: ["Replay", "Runtime"],
  memory: ["Memory"],
};

const NEXT: Record<
  Product["slug"],
  { href: string; title: string; copy: string; icon: NavIconName }[]
> = {
  runtime: [
    { href: "/replay", title: "Replay", copy: "One step, original input.", icon: "replay" },
    { href: "/memory", title: "Memory", copy: "Facts that survive the run.", icon: "memory" },
    { href: "/architecture", title: "Architecture", copy: "API, workers, checkpoints.", icon: "architecture" },
  ],
  replay: [
    { href: "/runtime", title: "Runtime", copy: "The host that runs the graph.", icon: "runtime" },
    { href: "/memory", title: "Memory", copy: "Facts that survive the run.", icon: "memory" },
    { href: "/sdk", title: "SDK", copy: "Start runs from TypeScript.", icon: "sdk" },
  ],
  memory: [
    { href: "/runtime", title: "Runtime", copy: "The host that runs the graph.", icon: "runtime" },
    { href: "/replay", title: "Replay", copy: "One step, original input.", icon: "replay" },
    { href: "/getting-started", title: "Getting started", copy: "Publish, then run it.", icon: "start" },
  ],
};

function Facts({ product }: { product: Product }) {
  return (
    <Section id="facts" className="pt-0!">
      <KeyFacts items={FACTS[product.slug]} />
    </Section>
  );
}

function Next({ product }: { product: Product }) {
  return (
    <Section id="next">
      <SectionHeading eyebrow="Where to go next" title="Keep following the run." />
      <div className={HEADING_GAP}>
        <LinkCards items={NEXT[product.slug]} />
      </div>
    </Section>
  );
}

export async function ProductPage({ product }: { product: Product }) {
  return (
    <SiteChrome>
      <main>
        <Header product={product} />
        <Facts product={product} />
        <Body product={product} />
        <RelatedPosts tags={TAGS[product.slug]} />
        <Faq
          items={faqsFor(...QUESTIONS[product.slug])}
          title="Questions about this page."
          align="center"
        />
        <Next product={product} />
      </main>
    </SiteChrome>
  );
}
