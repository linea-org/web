import Link from "next/link";
import { Band } from "@/components/landing/frame";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, Container } from "@/components/landing/ui";
import { DOCS_URL } from "@/lib/docs";
import { RESEARCH, type ResearchNote } from "@/lib/research";
import { pageMeta } from "@/lib/seo";

function ResearchCards({ items }: { items: ResearchNote[] }) {
  const lastRowStart = items.length - (items.length % 2 === 0 ? 2 : 1);

  return (
    <div className="grid gap-3 border-t border-white/12 p-3 md:grid-cols-2 md:gap-0 md:p-0">
      {items.map((item, index) => {
        const left = index % 2 === 0;
        const lastRow = index >= lastRowStart;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`border border-white/12 px-5 py-8 hover:text-white sm:px-8 md:border-x-0 md:border-t-0 ${left ? "md:border-r" : ""} ${lastRow ? "md:border-b-0" : ""}`}
          >
            <p className="text-sm text-muted">
              {item.kind}
              <span> · {item.date}</span>
            </p>
            <h2 className="mt-3 text-xl font-medium tracking-tight">
              {item.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">{item.copy}</p>
          </Link>
        );
      })}
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
        <Band marks={false}>
          <Container className="py-16 sm:py-24">
            <p className="text-sm text-muted">Research</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
              The host, the checkpoint, and the loop after a failure.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
              Notes from the Linea team on executing the graph, holding the
              input each step saw, and operating the agent from those records.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/blog" shortcut="b" externalIcon={false}>
                Read the blog
              </Button>
              <Button href={DOCS_URL} variant="secondary" shortcut="d">
                Read the docs
              </Button>
            </div>
          </Container>
        </Band>

        <Band marks={false}>
          <Container className="py-8 sm:py-10">
            <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
              Thesis
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              Why Linea is a runtime and control plane, not another way to
              draw a loop.
            </p>
          </Container>
          <ResearchCards
            items={RESEARCH.filter((item) => item.kind === "Thesis")}
          />
        </Band>

        <Band marks={false}>
          <Container className="py-8 sm:py-10">
            <h2 className="text-2xl font-medium tracking-tight sm:text-3xl">
              Notes
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
              Focused notes on checkpoints, memory, and the code node.
            </p>
          </Container>
          <ResearchCards
            items={RESEARCH.filter((item) => item.kind === "Note")}
          />
        </Band>
      </main>
    </SiteChrome>
  );
}
