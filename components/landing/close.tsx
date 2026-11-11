import { Band } from "@/components/landing/frame";
import { PathCards } from "@/components/landing/path-cards";
import { Button, HEADING_GAP, SECTION_Y } from "@/components/landing/ui";
import { DOCS_URL, PLATFORM_URL } from "@/lib/docs";
import { SHOTS } from "@/lib/shots";

const PATHS = [
  {
    href: "/runtime",
    title: "Run the graph",
    copy: "Checkpoints, retries, and resume.",
    image: SHOTS.workflow,
    surface: "lp-surface-sky",
  },
  {
    href: "/replay",
    title: "Replay a failure",
    copy: "Rerun one step on its original input.",
    image: SHOTS.signals,
    surface: "lp-surface-mist",
  },
  {
    href: "/memory",
    title: "Keep what it learned",
    copy: "Memory that outlives a single run.",
    image: SHOTS.evals,
    surface: "lp-surface-floor",
  },
] as const;

export function Close() {
  return (
    <Band rule={false} className="lp-defer">
      <section id="start" className={`px-5 sm:px-8 ${SECTION_Y}`}>
        <h2 className="text-center text-4xl leading-[1.05] font-medium tracking-[-0.04em] sm:text-5xl">
          Ready to build with Linea?
        </h2>
        <div className={HEADING_GAP}>
          <PathCards items={PATHS} />
        </div>
        <div className={`${HEADING_GAP} flex flex-wrap justify-center gap-3`}>
          <Button href={PLATFORM_URL} shortcut="s" externalIcon={false}>
            Start building
          </Button>
          <Button href={DOCS_URL} variant="secondary" shortcut="d">
            Read the docs
          </Button>
        </div>
      </section>
    </Band>
  );
}
