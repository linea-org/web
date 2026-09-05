import { Band, Cross, Separator } from "@/components/landing/frame";
import { PlatformShot } from "@/components/media/platform-shot";
import { SHOTS } from "@/lib/shots";

const STEPS = [
  {
    index: "01",
    title: "Build your workflow",
    copy: "Design on the canvas or define it in TypeScript. Both create the same deployable graph.",
  },
  {
    index: "02",
    title: "Deploy with confidence",
    copy: "Start runs from your app, a webhook, or a schedule. Linea manages execution and recovery.",
  },
  {
    index: "03",
    title: "Improve every run",
    copy: "Inspect each step, resolve signals, and replay only the work that needs another pass.",
  },
] as const;

const FEATURES = [
  {
    id: "product",
    index: "01",
    title: "Reliable execution, built in.",
    copy: "Run multi-step agents without building a separate queue and recovery layer. Every step is checkpointed, failures are retried, and interrupted runs resume from the last successful node.",
    image: SHOTS.builder,
    alt: "Linea builder with a document summarization graph",
    tone: "cool" as const,
  },
  {
    id: "replay",
    index: "02",
    title: "Debug with the original context.",
    copy: "See the input and output for every node. When a prompt, model, or tool needs a change, replay that step from the payload it originally received—without rerunning upstream work.",
    image: SHOTS.signals,
    alt: "Linea monitoring view with open signals",
    tone: "warm" as const,
  },
  {
    id: "memory",
    index: "03",
    title: "Context that carries forward.",
    copy: "Persist facts between executions and search shared workspace knowledge from any workflow. Give agents continuity without maintaining a separate memory and retrieval service.",
    image: SHOTS.evals,
    alt: "Linea evals for a published workflow",
    tone: "neutral" as const,
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
              <h2 className="text-base font-medium tracking-tight">
                <span className="tabular-nums">{step.index}.</span>{" "}
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
                <h3 className="text-2xl font-medium tracking-tight sm:text-[1.75rem]">
                  <span className="tabular-nums">{feature.index}.</span>{" "}
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
                <PlatformShot
                  src={feature.image}
                  alt={feature.alt}
                  tone={feature.tone}
                  sizes="(min-width: 1024px) 50vw, 100vw"
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
