import { Band } from "@/components/landing/frame";
import { Container } from "@/components/landing/ui";

const FAQS = [
  {
    q: "What is Linea?",
    a: "A hosted ops layer for agents and workflows. You design a graph of steps once (AI calls, HTTP, memory, approvals, sandboxed code) and Linea runs it with checkpoints, retries, and a fix loop that stays on the graph.",
  },
  {
    q: "How is this different from n8n or Zapier?",
    a: "Those products compete on visual simplicity and thin out when a step needs real code or agent reasoning. Linea is built for technical builders: the code node is an escape hatch, and the SDK is a first-class authoring surface.",
  },
  {
    q: "How is this different from LangGraph?",
    a: "Frameworks solve the agent-logic problem, not the ops problem. You still host, retry, checkpoint, store memory, and sandbox yourself. Linea is the hosted half of that stack.",
  },
  {
    q: "What is step-level replay?",
    a: "Re-run one step against the exact input it originally saw, without re-running the steps before it. That needs the checkpoint, which needs Linea to have executed the run.",
  },
  {
    q: "Do I have to use the visual builder?",
    a: "No. Builder and SDK are equal entry points. The workflow JSON, node registry, and canvas all describe the same graph.",
  },
] as const;

export function Faq() {
  return (
    <Band>
      <section id="faq">
        <Container className="py-16">
          <p className="text-sm text-muted">Questions worth answering</p>
          <h2 className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
            Straight answers.
          </h2>
        </Container>
        <div className="divide-y divide-white/12 border-t border-white/12">
          {FAQS.map((item) => (
            <details key={item.q} name="faq" className="group px-5 py-4 sm:px-8">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium tracking-tight [&::-webkit-details-marker]:hidden">
                {item.q}
                <svg
                  aria-hidden
                  viewBox="0 0 16 16"
                  className="size-4 shrink-0 text-muted transition-transform group-open:rotate-180"
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
              <p className="mt-3 w-full border-x border-white/12 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-muted">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </Band>
  );
}
