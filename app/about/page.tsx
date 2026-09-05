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
    "Linea Labs is building the platform for reliable, production-ready agent workflows.",
  path: "/about",
});

const SAID = [
  {
    title: "Built for real workflows",
    copy: "Agents need more than a successful demo. Linea brings execution, recovery, memory, approvals, and visibility into one production platform.",
  },
  {
    title: "Improve without starting over",
    copy: "Every node captures its input and output so teams can understand what happened and replay the exact step they want to refine.",
  },
  {
    title: "One definition everywhere",
    copy: "The visual builder and TypeScript SDK create the same workflow, giving technical and non-technical collaborators a shared source of truth.",
  },
] as const;

export default function AboutPage() {
  return (
    <SiteChrome>
      <main>
        <Band marks={false}>
          <div className="grid lg:grid-cols-2">
            <div className="lp-hatch border-b border-white/12 p-1.5 lg:order-2 lg:border-b-0 lg:border-l">
              <div className="relative aspect-[3/2] overflow-hidden border border-white/12 lg:aspect-auto lg:min-h-72 lg:h-full">
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
                We are building the runtime for production agents.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-muted">
                Linea helps teams design, deploy, and improve reliable agent
                workflows without assembling the operational layer themselves.
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

        <Band marks={false}>
          <div className="grid gap-3 p-3 sm:grid-cols-2 sm:gap-0 sm:p-0 sm:divide-x sm:divide-white/12">
            <article className="border border-white/12 px-5 py-8 sm:border-0 sm:px-8">
              <p className="text-sm text-muted">The company</p>
              <h2 className="mt-3 text-xl font-medium tracking-tight">
                Linea Labs
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                A focused team working on the infrastructure that turns agent
                prototypes into durable, observable products.
              </p>
            </article>
            <article className="border border-white/12 px-5 py-8 sm:border-0 sm:px-8">
              <p className="text-sm text-muted">The product</p>
              <h2 className="mt-3 text-xl font-medium tracking-tight">Linea</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                A single platform to build workflows, run them on managed
                infrastructure, preserve context, and improve individual steps
                with replay.
              </p>
            </article>
          </div>
        </Band>

        <Band marks={false}>
          <div className="grid gap-3 p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-white/12">
            {SAID.map((item) => (
              <article
                key={item.title}
                className="border border-white/12 px-5 py-8 sm:px-8 md:border-0"
              >
                <h2 className="text-xl font-medium tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </Band>

        <Band marks={false}>
          <Container className="py-8 sm:py-9">
            <p className="text-sm text-muted">The product</p>
            <h2 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
              One platform, three foundations.
            </h2>
          </Container>
          <div className="grid gap-3 border-t border-white/12 p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-white/12">
            {PRODUCTS.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                className="border border-white/12 px-5 py-8 hover:text-white sm:px-8 md:border-0"
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
