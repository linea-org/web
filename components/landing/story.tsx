import { Band } from "@/components/landing/frame";
import { NewsletterForm } from "@/components/landing/newsletter-form";
import { SECTION_PT } from "@/components/landing/ui";

export function Story() {
  return (
    <Band rule={false}>
      <div className={`px-5 pb-3 sm:px-8 ${SECTION_PT}`}>
        <section
          id="newsletter"
          className="relative overflow-hidden rounded-[14px] bg-[linear-gradient(180deg,var(--stage-sky)_0%,var(--stage-mist)_55%,var(--stage-floor)_100%)] px-5 py-14 text-center text-[#1c1917] sm:px-8 lg:py-16"
        >
          <div aria-hidden className="lp-noise absolute inset-0" />
          <div className="relative">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/50 px-3 py-1 text-xs font-medium tracking-tight text-[#1c1917]/80 ring-1 ring-black/10 backdrop-blur-sm">
              <span aria-hidden className="size-1.5 rounded-full bg-[#2563eb]" />
              The Linea newsletter
            </p>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl leading-[1.1] font-medium tracking-[-0.04em] text-balance sm:text-5xl">
              What we learn from every run.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-7 text-[#1c1917]/70">
              New releases and field notes on running agents in production.
            </p>
            <div className="mt-8">
              <NewsletterForm />
            </div>
          </div>
        </section>
      </div>
    </Band>
  );
}
