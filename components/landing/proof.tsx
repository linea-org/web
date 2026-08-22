import Image from "next/image";
import { Band } from "@/components/landing/frame";
import { Container } from "@/components/landing/ui";

const QUOTES = [
  {
    name: "Technical founder",
    role: "Would have written the glue",
    quote:
      "I do not want another agent framework. I want the retries, memory, and replay already hosted.",
  },
  {
    name: "Platform engineer",
    role: "Tired of the full re-run",
    quote:
      "Changing one prompt and paying for the whole graph again is the bug. Step-level replay is the fix.",
  },
  {
    name: "Agent team",
    role: "On a framework today",
    quote:
      "LangGraph solved the logic. We still had to operate it. Linea is that second half.",
  },
] as const;

export function Proof() {
  return (
    <Band marks={false}>
      <section id="audience">
      <Container className="py-16">
        <p className="text-sm text-muted">Who it is for</p>
        <h2 className="mt-3 max-w-2xl text-3xl font-medium tracking-tight sm:text-4xl">
          Technical first. SDK first.
        </h2>
      </Container>
      <div className="grid gap-3 border-t border-white/12 p-3 md:grid-cols-3 md:gap-1.5 md:p-0">
        {QUOTES.map((item) => (
          <figure
            key={item.name}
            className="relative border border-white/12 px-5 py-7 sm:px-8 md:border-x md:border-y-0 lp-grain lp-wash"
          >
            <div className="flex items-center gap-3">
              <Image
                src="/ref/rocket-avatar.webp"
                alt=""
                width={32}
                height={32}
                className="size-8 object-cover"
              />
              <figcaption>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-muted">{item.role}</p>
              </figcaption>
            </div>
            <blockquote className="mt-4 text-sm leading-6 text-muted">
              {item.quote}
            </blockquote>
          </figure>
        ))}
      </div>
      </section>
    </Band>
  );
}
