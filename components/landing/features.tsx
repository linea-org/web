import Image from "next/image";
import { Band, Cross, Separator } from "@/components/landing/frame";

const STEPS = [
  {
    index: "01",
    title: "Author the graph",
    copy: "Draw it in the builder or write it in the SDK. Both emit the same JSON.",
  },
  {
    index: "02",
    title: "We run it",
    copy: "The host executes the graph, retries on failure, and writes a checkpoint after every node.",
  },
  {
    index: "03",
    title: "Replay the break",
    copy: "Name the step that failed and run it again. Nothing upstream has to move.",
  },
] as const;

const FEATURES = [
  {
    id: "product",
    index: "01",
    title: "You design the graph. We keep it running.",
    copy: "Author on a canvas or in TypeScript. Start from a schedule, a webhook, or your own code. Crash safety, retries, and resume are part of the host, not a side project.",
    image: "/ref/linea-runtime.jpg",
    alt: "Linea runtime console with checkpointed runs",
  },
  {
    id: "replay",
    index: "02",
    title: "Fix one step, not the whole run.",
    copy: "Each node leaves a checkpoint: the exact payload it received. You can change a prompt on step four and run that node again without paying for steps one through three.",
    image: "/ref/linea-replay.jpg",
    alt: "Linea replay inspector on a failed step",
  },
  {
    id: "memory",
    index: "03",
    title: "Memory that survives the run.",
    copy: "Agents can remember facts from last time and search a workspace knowledge base. You do not have to stand up a store and a retrieval pipeline for every graph.",
    image: "/ref/linea-memory.jpg",
    alt: "Linea memory workspace with facts and knowledge",
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
                <h3 className="mt-3 text-2xl font-medium tracking-tight sm:text-[1.75rem]">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {feature.copy}
                </p>
              </div>
              <div
                className={`relative border-white/12 ${flip ? "border-b lg:border-b-0 lg:border-r" : "border-t lg:border-t-0 lg:border-l"}`}
              >
                {flip || index === 0 ? (
                  <Cross className="-top-px left-0 -translate-x-1/2 -translate-y-1/2" />
                ) : null}
                {flip ? null : (
                  <Cross className="-top-px right-0 translate-x-1/2 -translate-y-1/2" />
                )}
                <Cross className="-bottom-px left-0 -translate-x-1/2 translate-y-1/2" />
                <Cross className="-bottom-px right-0 translate-x-1/2 translate-y-1/2" />
                <Image
                  src={feature.image}
                  alt={feature.alt}
                  width={1200}
                  height={800}
                  className="h-auto w-full"
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
