export const FAQS = [
  {
    q: "What is Linea?",
    a: "Linea is an agentic runtime and control plane. You ship an agent to your users. Linea executes the workflow graph behind it — model calls, tools, waits, approvals, memory, and sandboxed code — and keeps the records around the run: checkpoints, signals, approvals, and regressions.",
  },
  {
    q: "Is this a workflow-automation tool?",
    a: "No. Workflow is the precise name for the executable graph, not the product category. An agent may use several workflows; some graphs are intentionally non-agentic. External positioning is build and operate production agents. Workflow terminology stays underneath where it is technically accurate.",
  },
  {
    q: "How is this different from n8n or Zapier?",
    a: "Those products execute automations and compete on visual simplicity. They get thin when a step needs real code or an agent loop, and they have no signal or regression layer. Linea executes the graph so it can hold the checkpoint, replay one step, and keep the control plane around the run.",
  },
  {
    q: "How is this different from LangGraph?",
    a: "A framework helps you write the loop. You still host the process, store checkpoints, keep memory, and operate the result. Linea is that host and control plane. Keep the prompts and tools you already have; we execute the graph.",
  },
  {
    q: "What is step-level replay?",
    a: "Because Linea executes the graph, it holds the checkpoint: the exact input a node received. Replay runs that one step again against that input. No deploy, no reproducing state, no re-running the steps before it. An observability vendor can show the failure; it never ran the graph, so it has no checkpoint to replay from.",
  },
  {
    q: "Do I have to use the visual builder?",
    a: "No. The builder and the TypeScript SDK are two views of the same workflow definition. Pick the surface. Do not pick a second product.",
  },
] as const;
