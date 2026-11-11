import Link from "next/link";
import { Band } from "@/components/landing/frame";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, Container } from "@/components/landing/ui";
import { PlatformShot } from "@/components/media/platform-shot";
import { PLATFORM_URL } from "@/lib/docs";
import { PRODUCTS } from "@/lib/product";
import { pageMeta } from "@/lib/seo";
import { SHOTS } from "@/lib/shots";

export const metadata = pageMeta({
  title: "About",
  description:
    "Linea Labs is building an agentic runtime and control plane for production agents.",
  path: "/about",
});

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
    title: "One graph, two surfaces",
    copy: "The builder and the SDK emit the same workflow definition. An agent may use several graphs. We will not ship a second product for a second editor.",
  },
] as const;

export default function AboutPage() {
  return (
    <SiteChrome>
      <main>
        <Band>
          <div className="grid lg:grid-cols-2">
            <div className="lp-hatch border-b border-black/[0.08] p-1.5 lg:order-2 lg:border-b-0 lg:border-l">
              <div className="relative aspect-[3/2] overflow-hidden border border-black/[0.08] lg:aspect-auto lg:min-h-72 lg:h-full">
                <PlatformShot
                  src={SHOTS.builder}
                  alt="Linea graph canvas in the builder"
                  fill
                  eager
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  tone="cool"
                />
              </div>
            </div>
            <Container className="flex flex-col justify-center py-8 sm:py-10">
              <p className="text-sm text-muted">About</p>
              <h1 className="mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
                We are building the runtime and control plane for production
                agents.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-muted">
                You ship the agent. Linea executes the graph and keeps the
                records around the run. Workflow stays the name of that
                graph, not the name of the product.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
                  Start building
                </Button>
                <Button href="/careers" variant="secondary" shortcut="c">
                  Careers
                </Button>
              </div>
            </Container>
          </div>
        </Band>

        <Band>
          <div className="grid gap-3 p-3 sm:grid-cols-2 sm:gap-0 sm:p-0 sm:divide-x sm:divide-black/[0.08]">
            <article className="border border-black/[0.08] px-5 py-8 sm:border-0 sm:px-8">
              <p className="text-sm text-muted">The company</p>
              <h2 className="mt-3 text-xl font-medium tracking-tight">
                Linea Labs
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                A small team building the substrate production agents need:
                durable execution, memory, human-in-the-loop, and the fix
                loop that sits on the same data model.
              </p>
            </article>
            <article className="border border-black/[0.08] px-5 py-8 sm:border-0 sm:px-8">
              <p className="text-sm text-muted">The product</p>
              <h2 className="mt-3 text-xl font-medium tracking-tight">Linea</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                An agentic runtime and control plane. Author the graph,
                run it on the host, and operate the agent from the records
                that execution wrote.
              </p>
            </article>
          </div>
        </Band>

        <Band>
          <div className="grid gap-3 p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-black/[0.08]">
            {SAID.map((item) => (
              <article
                key={item.title}
                className="border border-black/[0.08] px-5 py-8 sm:px-8 md:border-0"
              >
                <h2 className="text-xl font-medium tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </Band>

        <Band>
          <Container className="py-8 sm:py-9">
            <p className="text-sm text-muted">The product</p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
              Runtime, replay, and memory.
            </h2>
          </Container>
          <div className="grid gap-3 border-t border-black/[0.08] p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-black/[0.08]">
            {PRODUCTS.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="border border-black/[0.08] px-5 py-8 hover:text-foreground sm:px-8 md:border-0"
              >
                <p className="text-sm text-muted">{item.name}</p>
                <h3 className="mt-3 text-xl font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {item.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </Band>
      </main>
    </SiteChrome>
  );
}
