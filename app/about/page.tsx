import Image from "next/image";
import Link from "next/link";
import { Band } from "@/components/landing/frame";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, Container } from "@/components/landing/ui";
import { PLATFORM_URL } from "@/lib/docs";
import { PRODUCTS } from "@/lib/product";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About",
  description:
    "Linea Labs builds Linea, the hosted ops layer for agents and workflows.",
  path: "/about",
});

const SAID = [
  {
    title: "The company is early",
    copy: "We are not pretending otherwise. No ghost customers, no ghost roles, no ghost price list.",
  },
  {
    title: "The wedge is replay",
    copy: "Fix one step without re-running the graph. That needs a checkpoint. That needs a host that ran the graph.",
  },
  {
    title: "Builder and SDK are equal",
    copy: "Two editors. One graph. The canvas and the file in git describe the same run.",
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
                <Image
                  src="/ref/zed-page.jpg"
                  alt="Placeholder product surface from zed.dev"
                  fill
                  className="object-cover object-center"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  priority
                />
              </div>
            </div>
            <Container className="flex flex-col justify-center py-8 sm:py-10">
              <p className="text-sm text-muted">About</p>
              <h1 className="mt-3 max-w-xl text-3xl font-medium tracking-tight sm:text-4xl">
                Linea Labs builds Linea.
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-muted">
                Linea is the product: a hosted ops layer for agents and
                workflows. The company is the team shipping that host.
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
                Small, early, and not hiring from a fake board. We ship the
                host. Roles go on Careers when there is real work to do, not
                before.
              </p>
            </article>
            <article className="border border-white/12 px-5 py-8 sm:border-0 sm:px-8">
              <p className="text-sm text-muted">The product</p>
              <h2 className="mt-3 text-xl font-medium tracking-tight">Linea</h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                You design a graph once. We run it with checkpoints, memory, a
                sandboxed code node, and step-level replay. Builder and SDK
                write the same run.
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
              Three surfaces. One host.
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
