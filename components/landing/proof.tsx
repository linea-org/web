import { FramedShot } from "@/components/landing/framed-shot";
import { Band } from "@/components/landing/frame";
import { FullBleed } from "@/components/landing/full-bleed";
import { HEADING_GAP, SECTION_Y } from "@/components/landing/ui";
import { AUDIENCE, type AudienceIcon } from "@/lib/audience";
import { SHOTS } from "@/lib/shots";

const SURFACES = [
  { card: "lp-surface-sky", tile: "bg-white/50 ring-black/10" },
  { card: "lp-surface-mist", tile: "bg-white/50 ring-black/10" },
  { card: "lp-surface-floor", tile: "bg-white/15 ring-white/30" },
] as const;

function audienceIconPath(icon: AudienceIcon) {
  switch (icon) {
    case "stack":
      return <path d="M8 2 14 5 8 8 2 5ZM2 8l6 3 6-3M2 11l6 3 6-3" />;
    case "replay":
      return <path d="M12.5 8A4.5 4.5 0 1 1 11 4.6M11.5 2v3h-3" />;
    case "host":
      return (
        <>
          <rect x="2.5" y="2.5" width="11" height="4.5" rx="1" />
          <rect x="2.5" y="9" width="11" height="4.5" rx="1" />
          <path d="M5 4.75h.01M5 11.25h.01" />
        </>
      );
    default: {
      const exhaustive: never = icon;
      return exhaustive;
    }
  }
}

export function AudienceCards({ className = "" }: { className?: string }) {
  return (
    <div className={`grid gap-3 md:grid-cols-3 ${className}`}>
      {AUDIENCE.map((item, index) => {
        const surface = SURFACES[index] ?? SURFACES[1];

        return (
          <article key={item.label} className="flex flex-col">
            <div
              className={`lp-surface flex-1 rounded-[10px] px-5 py-6 sm:px-6 ${surface.card}`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`inline-flex size-8 shrink-0 items-center justify-center rounded-md ring-1 ${surface.tile}`}
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 16 16"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {audienceIconPath(item.icon)}
                  </svg>
                </span>
                <p className="text-sm text-muted">{item.label}</p>
              </div>
              <h2 className="mt-2 text-lg font-medium tracking-tight">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.copy}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function Proof() {
  return (
    <Band rule={false}>
      <FullBleed backdrop="border-y border-white/10 bg-[#0b0b0b]">
        <section id="audience" className={`px-5 sm:px-8 ${SECTION_Y}`}>
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-4xl leading-[1.05] font-medium tracking-[-0.04em] sm:text-5xl">
              Built for the people
              <br />
              who operate the run.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted">
              Technical builders first. You write the agent. We execute the
              graph and keep the records that let you diagnose, replay, and
              ship a fix.
            </p>
          </div>

          <AudienceCards className={HEADING_GAP} />

          <FramedShot
            src={SHOTS.builder}
            alt="Linea builder with a document summarization graph"
            sizes="(min-width: 80rem) 80rem, 100vw"
            className={HEADING_GAP}
          />
        </section>
      </FullBleed>
    </Band>
  );
}
