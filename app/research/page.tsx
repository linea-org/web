import Link from "next/link";
import {
  ArrowIcon,
  CARD_LINK,
  CARD_PAD,
  PANEL_PAD,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/landing/section";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, HEADING_GAP } from "@/components/landing/ui";
import { formatPostDate } from "@/lib/blog-meta";
import { DOCS_URL } from "@/lib/docs";
import { RESEARCH, type ResearchNote } from "@/lib/research";
import { pageMeta } from "@/lib/seo";

function ThesisCard({ item }: { item: ResearchNote }) {
  return (
    <Link
      href={item.href}
      className={`lp-surface lp-surface-sky group relative block overflow-hidden rounded-[14px] ${PANEL_PAD}`}
    >
      <div aria-hidden className="lp-noise absolute inset-0" />
      <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
        <p className="flex items-center gap-2 text-xs text-muted">
          <span className="rounded-full bg-white/50 px-2 py-0.5 font-medium text-[#1c1917] ring-1 ring-black/10">
            {item.kind}
          </span>
          <time dateTime={item.date}>{formatPostDate(item.date)}</time>
        </p>
        <h2 className="mt-5 text-3xl leading-[1.08] font-medium tracking-[-0.035em] text-balance sm:text-4xl">
          {item.title}
        </h2>
        <p className="mt-4 max-w-xl text-base leading-7 text-muted">
          {item.copy}
        </p>
        <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium tracking-tight">
          Read the thesis
          <ArrowIcon />
        </span>
      </div>
    </Link>
  );
}

function ResearchCards({ items }: { items: ResearchNote[] }) {
  return (
    <div
      className={`${HEADING_GAP} grid gap-3 md:grid-cols-2 ${items.length % 3 === 0 ? "lg:grid-cols-3" : ""}`}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={`${CARD_LINK} ${CARD_PAD} group flex flex-col`}
        >
          <p className="flex items-center gap-2 text-xs text-muted">
            <span className="rounded-full border border-white/15 px-2 py-0.5 font-medium text-foreground">
              {item.kind}
            </span>
            <time dateTime={item.date}>{formatPostDate(item.date)}</time>
          </p>
          <h2 className="mt-4 text-xl font-medium tracking-[-0.02em]">
            {item.title}
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted">{item.copy}</p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium tracking-tight">
            Read the note
            <ArrowIcon />
          </span>
        </Link>
      ))}
    </div>
  );
}

export const metadata = pageMeta({
  title: "Research",
  description:
    "Notes on the substrate production agents need: a host that executes the graph, a checkpoint, and a fix loop.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <SiteChrome>
      <main>
        <PageHero
          eyebrow="Research"
          title="The host, the checkpoint, and the loop after a failure."
          lead="Notes from the Linea team on executing the graph, holding the input each step saw, and operating the agent from those records."
          actions={
            <>
              <Button href="/blog" shortcut="b" externalIcon={false}>
                Read the blog
              </Button>
              <Button href={DOCS_URL} variant="secondary" shortcut="d">
                Read the docs
              </Button>
            </>
          }
        >
          <div id="thesis" className="space-y-3">
            {RESEARCH.filter((item) => item.kind === "Thesis").map((item) => (
              <ThesisCard key={item.href} item={item} />
            ))}
          </div>
        </PageHero>

        <Section id="notes">
          <SectionHeading
            eyebrow="Notes"
            title="Checkpoints, memory, and replay."
            lead="Focused notes on the pieces the host keeps for you."
          />
          <ResearchCards
            items={RESEARCH.filter((item) => item.kind === "Note")}
          />
        </Section>
      </main>
    </SiteChrome>
  );
}
