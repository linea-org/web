export const FAQS = [
  {
    q: "What is Linea?",
    a: "A hosted runtime for agents and workflows. You describe a graph of steps once (model calls, HTTP, memory, approvals, sandboxed code). We execute it, write a checkpoint after each node, and let you replay a step that failed.",
  },
  {
    q: "How is this different from n8n or Zapier?",
    a: "Those products optimize for visual simplicity. They get thin when a step needs real code or multi-step reasoning. Linea assumes a technical author: the SDK is a first-class surface, and a code node is expected, not a failure of the product.",
  },
  {
    q: "How is this different from LangGraph?",
    a: "Frameworks help you write the loop. They do not host the process, store checkpoints, or keep memory between runs. That work is still yours unless a host does it. Linea is that host.",
  },
  {
    q: "What is step-level replay?",
    a: "Running one node again against the payload that node originally received, without re-executing the nodes before it. That payload only exists if the host stored it during a real run.",
  },
  {
    q: "Do I have to use the visual builder?",
    a: "No. The builder and the SDK are two views of the same graph. Pick the one that matches how you already work.",
  },
] as const;
