import { Band } from "@/components/landing/frame";
import { SectionHeading } from "@/components/landing/section";
import {
  Container,
  HEADING_GAP,
  SECTION_PB,
  SECTION_PT,
} from "@/components/landing/ui";
import { FAQS } from "@/lib/faq";

export function Faq({
  items = FAQS,
  title = "Everything you need to know.",
  align = "left",
}: {
  items?: readonly { q: string; a: string }[];
  title?: string;
  /** Left on the landing page; centered on inner pages, like their other sections. */
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <Band rule={false} className="lp-defer">
      <section id="faq">
        <Container className={SECTION_PT}>
          {centered ? (
            <SectionHeading eyebrow="Questions" title={title} />
          ) : (
            <>
              <p className="text-sm text-muted">Questions</p>
              <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
                {title}
              </h2>
            </>
          )}
        </Container>
        <div
          className={`space-y-2 px-5 sm:px-8 ${HEADING_GAP} ${SECTION_PB} ${centered ? "mx-auto max-w-4xl" : ""}`}
        >
          {items.map((item) => (
            <details
              key={item.q}
              name="faq"
              className="lp-faq lp-reveal group rounded-[10px] border border-white/10 transition-colors hover:bg-white/[0.02]"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium tracking-tight sm:px-6 [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="size-4 shrink-0 text-muted transition-[color,rotate] duration-200 group-open:rotate-180 group-hover:text-foreground motion-reduce:transition-none"
                >
                  <path
                    d="M3.2 5.7 8 10.3l4.8-4.6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.25"
                    strokeLinecap="square"
                  />
                </svg>
              </summary>
              {/* Inset margin + box padding sum to the summary's px-5/sm:px-6 so text edges align. */}
              <div className="px-2 pb-2 sm:px-3 sm:pb-3">
                <p className="lp-faq-answer rounded-[8px] bg-white/[0.04] px-3 py-3.5 text-sm leading-6 text-muted ring-1 ring-white/[0.06] sm:py-4">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </Band>
  );
}
