import { Band } from "@/components/landing/frame";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, Container } from "@/components/landing/ui";
import { AUDIENCE } from "@/lib/audience";
import { PLATFORM_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Who it is for",
  description:
    "Linea is for technical builders who would otherwise assemble the ops layer themselves: runtime, replay, memory, and the records around the run.",
  path: "/audience",
});

const FIT = [
  {
    title: "Author on either surface",
    copy: "The canvas and the TypeScript SDK emit the same workflow definition. Pick the editor. Do not pick a second product.",
  },
  {
    title: "Bring the agent logic",
    copy: "Prompts, tools, and business logic stay yours. Linea executes the graph and holds the checkpoint. That is the control plane, not a rewrite of your loop.",
  },
  {
    title: "Publish into the fix loop",
    copy: "A published version is an immutable graph. Replay a failing step, freeze the case, publish again, and check you did not break what used to pass.",
  },
] as const;

export default function AudiencePage() {
  return (
    <SiteChrome>
      <main>
        <Band>
          <Container className="py-16 sm:py-24">
            <p className="text-sm text-muted">Who it is for</p>
            <h1 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-5xl">
              For people who would otherwise operate this layer themselves.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-muted sm:text-base">
              Technical builders first. You ship the agent. We execute the
              graph. End users meet the agent you deploy, not Linea.
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

        <Band>
          <div className="grid gap-3 p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-black/[0.08]">
            {AUDIENCE.map((item, index) => (
              <article
                key={item.label}
                className="border border-black/[0.08] px-5 py-8 sm:px-8 md:border-0"
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

        <Band>
          <Container className="py-10 sm:py-12">
            <p className="text-sm text-muted">How builders work with Linea</p>
            <h2 className="mt-3 max-w-xl text-2xl font-medium tracking-tight sm:text-3xl">
              Keep the logic. Give us the host.
            </h2>
          </Container>
          <div className="grid gap-3 border-t border-black/[0.08] p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-black/[0.08]">
            {FIT.map((item) => (
              <div
                key={item.title}
                className="border border-black/[0.08] px-5 py-8 sm:px-8 md:border-0"
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
