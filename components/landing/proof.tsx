import { Band } from "@/components/landing/frame";
import { Container } from "@/components/landing/ui";
import { AUDIENCE } from "@/lib/audience";

export function Proof() {
  return (
    <Band marks={false} className="lp-defer">
      <section id="audience">
        <Container className="py-16">
          <p className="text-sm text-muted">Who it is for</p>
          <h2 className="mt-3 max-w-4xl text-3xl font-medium tracking-tight sm:text-4xl">
            Built for people who would otherwise operate this layer themselves.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-muted">
            Technical builders first. You write the agent. We execute the
            graph and keep the records that let you diagnose, replay, and
            ship a fix.
          </p>
        </Container>
        <div className="grid gap-3 border-t border-white/12 p-3 md:grid-cols-3 md:gap-1.5 md:p-0">
          {AUDIENCE.map((item) => (
            <article
              key={item.label}
              className="relative border border-white/12 px-5 py-7 sm:px-8 md:border-x md:border-y-0 lp-grain"
            >
              <p className="text-sm text-muted">{item.label}</p>
              <h3 className="mt-3 text-lg font-medium tracking-tight">
                {item.title}
              </h3>
              <p className="mt-4 text-sm leading-6 text-muted">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </Band>
  );
}
