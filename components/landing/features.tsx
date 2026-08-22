import Image from "next/image";
import { Band, Cross, Separator } from "@/components/landing/frame";

const STEPS = [
  {
    index: "01",
    title: "Author the graph",
    copy: "Builder or SDK. Same JSON, same node registry.",
  },
  {
    index: "02",
    title: "Linea runs it",
    copy: "Checkpoints, retries, and crash safety come with the host.",
  },
  {
    index: "03",
    title: "Replay the break",
    copy: "Re-run one step against the input it originally saw.",
  },
] as const;

const FEATURES = [
  {
    id: "product",
    index: "01",
    title: "Design the graph. Linea keeps it running.",
    copy: "Author visually or in JSON. Trigger from a schedule, a webhook, or your SDK. Crash safety, retries, and resume come with the runtime.",
    image: "/ref/rightfit-jobs.jpg",
    alt: "Placeholder interface from rightfit.so",
  },
  {
    id: "replay",
    index: "02",
    title: "Fix one step, not the whole run.",
    copy: "Linea holds the checkpoint and the exact input each step saw. Re-run step four without paying for steps one through three again.",
    image: "/ref/rightfit-profile.jpg",
    alt: "Placeholder profile surface from rightfit.so",
  },
  {
    id: "memory",
    index: "03",
    title: "Facts persist across runs.",
    copy: "Agents remember what they learned last time, and search a workspace knowledge base, without you standing up a store and a RAG pipeline.",
    image: "/ref/rocket-hero.webp",
    alt: "Placeholder visual from rocket.new",
  },
] as const;

export function Features() {
  return (
    <>
      <Band>
        <Cross className="top-0 left-0 -translate-x-1/2 -translate-y-1/2" />
        <Cross className="top-0 right-0 translate-x-1/2 -translate-y-1/2" />
        <div className="grid gap-3 p-3 md:grid-cols-3 md:gap-0 md:p-0 md:divide-x md:divide-white/12">
          {STEPS.map((step) => (
            <div
              key={step.index}
              className="border border-white/12 px-5 py-7 sm:px-8 md:border-0"
            >
              <p className="text-sm tabular-nums text-muted">{step.index}</p>
              <h2 className="mt-2 text-base font-medium tracking-tight">
                {step.title}
              </h2>
              <p className="mt-1 text-sm leading-6 text-muted">{step.copy}</p>
            </div>
          ))}
        </div>
      </Band>
      <Separator marks={false} bottomLeft />
      <Band>
      <div className="grid gap-3 p-3 lg:gap-0 lg:p-0 lg:divide-y lg:divide-white/12">
        {FEATURES.map((feature, index) => {
          const flip = index % 2 === 1;

          return (
            <article
              key={feature.id}
              id={feature.id}
              className="grid border border-white/12 lg:grid-cols-2 lg:border-0"
            >
              <div
                className={`flex flex-col justify-center px-5 py-10 sm:px-8 lg:py-16 ${flip ? "lg:order-2" : ""}`}
              >
                <p className="text-sm tabular-nums text-muted">{feature.index}</p>
                <h3 className="mt-3 max-w-md text-2xl font-medium tracking-tight sm:text-[1.75rem]">
                  {feature.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-6 text-muted">
                  {feature.copy}
                </p>
              </div>
              <div
                className={`relative min-h-56 border-white/12 lg:min-h-[280px] ${flip ? "border-b lg:border-b-0 lg:border-r" : "border-t lg:border-t-0 lg:border-l"}`}
              >
                <Cross className="-top-px left-0 -translate-x-1/2 -translate-y-1/2" />
                <Cross className="-top-px right-0 translate-x-1/2 -translate-y-1/2" />
                <Cross className="-bottom-px left-0 -translate-x-1/2 translate-y-1/2" />
                <Cross className="-bottom-px right-0 translate-x-1/2 translate-y-1/2" />
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={1200}
                  height={800}
                  className="h-56 w-full object-cover lg:absolute lg:inset-0 lg:h-full"
                />
              </div>
            </article>
          );
        })}
      </div>
    </Band>
    </>
  );
}
