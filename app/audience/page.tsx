import { Band } from "@/components/landing/frame";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, Container } from "@/components/landing/ui";
import { AUDIENCE } from "@/lib/audience";
import { PLATFORM_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Who it is for",
  description:
    "Linea helps product, AI, and platform teams build, run, and improve production agent workflows.",
  path: "/audience",
});

const FIT = [
  {
    title: "Use the tools you prefer",
    copy: "Build visually when collaboration matters, or define the same workflow in TypeScript when code belongs in the repository.",
  },
  {
    title: "Bring your agent logic",
    copy: "Linea is the execution layer around your prompts, model calls, tools, and business logic—not a requirement to rebuild them.",
  },
  {
    title: "Start small, then publish",
    copy: "Test a workflow in the builder, inspect each step, and publish it to the hosted runtime when it is ready for real traffic.",
  },
] as const;

export default function AudiencePage() {
  return (
    <SiteChrome>
      <main>
        <Band marks={false}>
          <Container className="py-16 sm:py-24">
            <p className="text-sm text-muted">Who it is for</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
              One platform for every team shipping agents.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
              Design together in the builder, work in TypeScript with the SDK,
              and run the same workflow on managed infrastructure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
                Start building
              </Button>
              <Button href="/runtime" variant="secondary" shortcut="a">
                See the runtime
              </Button>
            </div>
          </Container>
        </Band>

        <Band marks={false}>
          <div className="grid gap-3 p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-white/12">
            {AUDIENCE.map((item, index) => (
              <article
                key={item.label}
                className="border border-white/12 px-5 py-8 sm:px-8 md:border-0"
              >
                <p className="text-sm tabular-nums text-muted">
                  {String(index + 1).padStart(2, "0")}.
                </p>
                <p className="mt-4 text-sm text-muted">{item.label}</p>
                <h2 className="mt-3 text-xl font-medium tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </Band>

        <Band marks={false}>
          <Container className="py-10 sm:py-12">
            <p className="text-sm text-muted">How teams work with Linea</p>
            <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
              Fit Linea into the stack you already have.
            </h2>
          </Container>
          <div className="grid gap-3 border-t border-white/12 p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-white/12">
            {FIT.map((item) => (
              <div
                key={item.title}
                className="border border-white/12 px-5 py-8 sm:px-8 md:border-0"
              >
                <h3 className="text-base font-medium tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted">{item.copy}</p>
              </div>
            ))}
          </div>
        </Band>
      </main>
    </SiteChrome>
  );
}
