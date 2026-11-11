import { Band } from "@/components/landing/frame";
import {
  Container,
  HEADING_GAP,
  SECTION_PB,
  SECTION_PT,
} from "@/components/landing/ui";
import { FAQS } from "@/lib/faq";

export function Faq() {
  return (
    <Band rule={false} className="lp-defer">
      <section id="faq">
        <Container className={SECTION_PT}>
          <p className="text-sm text-muted">Questions</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            Everything you need to know.
          </h2>
        </Container>
        <div className={`space-y-2 px-5 sm:px-8 ${HEADING_GAP} ${SECTION_PB}`}>
          {FAQS.map((item) => (
            <details
              key={item.q}
              name="faq"
              className="lp-faq group rounded-[10px] border border-white/10 transition-colors hover:border-white/20"
            >
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium tracking-tight sm:px-6 [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="size-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
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
