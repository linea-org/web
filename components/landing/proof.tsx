import Image from "next/image";
import { Band } from "@/components/landing/frame";
import { Container } from "@/components/landing/ui";
import { AUDIENCE } from "@/lib/audience";

export function Proof() {
  return (
    <Band marks={false}>
      <section id="audience">
        <Container className="py-16">
          <p className="text-sm text-muted">Who it is for</p>
          <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">
            Built for people who already know how they would do this.
          </h2>
        </Container>
        <div className="grid gap-3 border-t border-white/12 p-3 md:grid-cols-3 md:gap-1.5 md:p-0">
          {AUDIENCE.map((item) => (
            <article
              key={item.name}
              className="relative border border-white/12 px-5 py-7 sm:px-8 md:border-x md:border-y-0 lp-grain lp-wash"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={item.image}
                  alt=""
                  width={32}
                  height={32}
                  loading="lazy"
                  className="size-8 object-cover"
                />
                <div>
                  <h3 className="text-sm font-medium">{item.name}</h3>
                  <p className="text-xs text-muted">
                    {item.title} · {item.role}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </Band>
  );
}
