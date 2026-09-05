import { Band } from "@/components/landing/frame";
import { Container } from "@/components/landing/ui";
import { FAQS } from "@/lib/faq";

export function Faq() {
  return (
    <Band>
      <section id="faq">
        <Container className="py-16">
          <p className="text-sm text-muted">Questions</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            Everything you need to know.
          </h2>
        </Container>
        <div className="divide-y divide-white/12 border-t border-white/12">
          {FAQS.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-base font-medium tracking-tight sm:px-8 [&::-webkit-details-marker]:hidden">
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
              <p className="mx-5 mb-4 border-x border-white/12 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-muted sm:mx-8">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </Band>
  );
}
