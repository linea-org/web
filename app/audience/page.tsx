import { FramedShot } from "@/components/landing/framed-shot";
import { AudienceCards } from "@/components/landing/proof";
import {
  CARD,
  CARD_PAD,
  PageHero,
  Section,
  SectionHeading,
} from "@/components/landing/section";
import { SiteChrome } from "@/components/landing/site-chrome";
import { Button, HEADING_GAP } from "@/components/landing/ui";
import { PLATFORM_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";
import { SHOTS } from "@/lib/shots";

export const metadata = pageMeta({
  title: "Who it is for",
  description:
    "Linea is for technical builders who would otherwise assemble the ops layer themselves: runtime, replay, memory, and the records around the run.",
  path: "/audience",
});

const FIT = [
  {
    title: "Draw it, publish it, run it",
    copy: "Author the graph on the canvas. Each published version is the exact graph the host runs, and your app starts runs through the API.",
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
        <PageHero
          eyebrow="Who it is for"
          title="For people who would otherwise operate this layer themselves."
          lead="Technical builders first. You ship the agent. We execute the graph. End users meet the agent you deploy, not Linea."
          actions={
            <>
              <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
                Start building
              </Button>
              <Button href="/runtime" variant="secondary" shortcut="a">
                See the runtime
              </Button>
            </>
          }
        >
          <AudienceCards />
        </PageHero>

        <Section id="fit">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                align="left"
                eyebrow="How builders work with Linea"
                title="Keep the logic. Give us the host."
                lead="Linea is the control plane under the agent, not a rewrite of it."
              />
              <div className={`${HEADING_GAP} space-y-3`}>
                {FIT.map((item, index) => (
                  <div key={item.title} className={`${CARD} ${CARD_PAD} flex gap-4`}>
                    <p className="pt-0.5 font-mono text-xs text-[#9dbde4] tabular-nums">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <div>
                      <h2 className="text-base font-medium tracking-tight">
                        {item.title}
                      </h2>
                      <p className="mt-1.5 text-sm leading-6 text-muted">
                        {item.copy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <FramedShot
              src={SHOTS.workflow}
              alt="A Linea workflow graph on the canvas"
              sizes="(min-width: 1024px) 40rem, 100vw"
            />
          </div>
        </Section>
      </main>
    </SiteChrome>
  );
}
