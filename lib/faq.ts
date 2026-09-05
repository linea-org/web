export const FAQS = [
  {
    q: "What is Linea?",
    a: "Linea is a platform for building and running agent workflows. Define a graph with model calls, HTTP requests, memory, approvals, and sandboxed code; then deploy it to a managed runtime with checkpoints, retries, observability, and step-level replay.",
  },
  {
    q: "How is this different from n8n or Zapier?",
    a: "Linea is designed for production agent workflows that combine model reasoning, tools, custom code, persistent memory, and human approval. It supports both a visual builder and a TypeScript SDK, so teams can collaborate on the canvas or keep workflows in code.",
  },
  {
    q: "How is this different from LangGraph?",
    a: "Linea complements agent frameworks by providing the managed execution layer around your agent logic. You can keep the prompts and tools you already have while Linea handles deployment, recovery, checkpoints, memory, and operational visibility.",
  },
  {
    q: "What is step-level replay?",
    a: "Step-level replay runs one node again from the input captured during an earlier execution. You can update a prompt, model, or tool and test that change without repeating upstream steps that already completed.",
  },
  {
    q: "Do I have to use the visual builder?",
    a: "No. The visual builder and TypeScript SDK create the same workflow definition. Start visually, work in code, or move between both without maintaining separate versions.",
  },
] as const;
