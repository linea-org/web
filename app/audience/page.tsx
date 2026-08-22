import { Band } from "@/components/landing/frame";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, Container } from "@/components/landing/ui";
import { PLATFORM_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Who it is for",
  description:
    "Linea is for technical founders, platform engineers, and teams already on a framework who still have to operate the run.",
  path: "/audience",
});

const FOR = [
  {
    title: "Technical founder",
    role: "Would have written the glue",
    copy: "You do not want another agent framework. You want retries, memory, and replay already hosted so you can stay on the logic unique to the product.",
  },
  {
    title: "Platform engineer",
    role: "Tired of the full re-run",
    copy: "Changing one prompt and paying for the whole graph again is the bug. You want to name the broken step and run that node against the input it already saw.",
  },
  {
    title: "Agent team",
    role: "On a framework today",
    copy: "LangGraph solved the loop. You still host the process, store the facts, and sandbox the code node. Linea is that second half.",
  },
] as const;

const NOT = [
  {
    title: "Not a Zapier swap",
    copy: "If the job is a visual-only path and a code node would be a failure, this is the wrong product.",
  },
  {
    title: "Not another framework",
    copy: "If you need a new way to write the agent loop, stay on the framework you have. We host the run.",
  },
  {
    title: "Not a logo wall",
    copy: "If you need a customer page before you try it, we do not have one. The product is early. That is the honest answer.",
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
              Technical first. SDK first.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
              Built for people who would otherwise write the glue themselves.
              The builder is there. It is not the only door.
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
            {FOR.map((item, index) => (
              <article
                key={item.title}
                className="border border-white/12 px-5 py-8 sm:px-8 md:border-0"
              >
                <p className="text-sm tabular-nums text-muted">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-xl font-medium tracking-tight">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm text-muted">{item.role}</p>
                <p className="mt-3 text-sm leading-6 text-muted">{item.copy}</p>
              </article>
            ))}
          </div>
        </Band>

        <Band marks={false}>
          <Container className="py-10 sm:py-12">
            <p className="text-sm text-muted">Who it is not for</p>
            <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
              Say no early.
            </h2>
          </Container>
          <div className="grid gap-3 border-t border-white/12 p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-white/12">
            {NOT.map((item) => (
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
