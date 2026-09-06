export type ProductSlug = "runtime" | "replay" | "memory";

export type Product = {
  slug: ProductSlug;
  href: `/${ProductSlug}`;
  name: string;
  hint: string;
  title: string;
  description: string;
  excerpt: string;
  image: string;
  imageAlt: string;
  how: {
    title: string;
    lead: string;
    steps: { title: string; copy: string }[];
  };
  example: {
    title: string;
    copy: string;
    lang: "json" | "ts";
    code: string;
  };
  compare: {
    title: string;
    lead: string;
    columns: [string, string];
    rows: { label: string; left: string; right: string }[];
  };
  split: {
    left: { title: string; items: string[] };
    right: { title: string; items: string[] };
  };
  not?: {
    title: string;
    lead: string;
    items: { title: string; copy: string }[];
  };
};

export const PRODUCTS: Product[] = [
  {
    slug: "runtime",
    href: "/runtime",
    name: "Runtime",
    hint: "The host that runs the graph",
    title: "The host that runs the agent graph.",
    description:
      "Linea executes the workflow behind your agent: checkpoints, retries, recovery, and a sandboxed code node. You ship the agent. We run the graph.",
    excerpt:
      "Author the graph on the canvas or in TypeScript. Start an execution from your app, a webhook, or a schedule. The host writes a checkpoint after every node.",
    image: "/linea/linea-builder.png",
    imageAlt: "Linea builder with a document summarization graph",
    how: {
      title: "From trigger to a finished execution",
      lead: "The agent is what you ship. The workflow is the versioned graph behind it. Linea executes that graph and keeps the record of every step.",
      steps: [
        {
          title: "One graph, two surfaces",
          copy: "The builder and the TypeScript SDK emit the same workflow definition. An agent may use several graphs. Those are still one product.",
        },
        {
          title: "Start an execution",
          copy: "A conversation is one user thread. An execution is one run of the graph — from a schedule, a webhook, or your own code.",
        },
        {
          title: "Recover from the checkpoint",
          copy: "Each completed node writes a checkpoint. If the process dies, the next worker resumes from the last successful step.",
        },
        {
          title: "Sandbox the code node",
          copy: "Last-mile logic drops into a boxed function. It can fail without taking the host down, and it can be replayed like any other node.",
        },
      ],
    },
    example: {
      title: "Define the graph in your codebase",
      copy: "The SDK writes the same workflow the builder draws. Keep the file next to the agent you ship. Open the canvas when a visual view helps.",
      lang: "ts",
      code: `import { graph, http, model } from "@linea/sdk";

export const recovery = graph({
  name: "invoice-recovery",
  nodes: {
    fetch: http.get("/invoices/:id"),
    reason: model.complete("Explain the failure."),
    notify: http.post("/hooks/slack"),
  },
});`,
    },
    compare: {
      title: "Ship the agent. Do not operate the host.",
      lead: "Keep the prompts, tools, and business logic. Linea executes the graph and holds the control plane around the run.",
      columns: ["Self-managed stack", "Linea Runtime"],
      rows: [
        {
          label: "Where the process lives",
          left: "Workers and queues you operate",
          right: "The host that runs the graph",
        },
        {
          label: "A crash mid-run",
          left: "Custom retry and recovery logic",
          right: "Resume from the latest checkpoint",
        },
        {
          label: "A code node",
          left: "Infrastructure you isolate",
          right: "Sandboxed execution",
        },
        {
          label: "Builder vs file in git",
          left: "Definitions can drift",
          right: "One shared workflow definition",
        },
      ],
    },
    split: {
      left: {
        title: "You build",
        items: [
          "The prompts, models, tools, and business logic",
          "The nodes and transitions unique to your product",
          "The events that should start each execution",
        ],
      },
      right: {
        title: "Linea manages",
        items: [
          "Workers, retries, and recovery",
          "Sandboxed execution for custom code",
          "Checkpoints and execution history for every node",
        ],
      },
    },
  },
  {
    slug: "replay",
    href: "/replay",
    name: "Replay",
    hint: "One step, original input",
    title: "Replay the step that failed.",
    description:
      "Because Linea executed the graph, it holds the checkpoint. Replay one node against the exact input it saw — no deploy, no full re-run.",
    excerpt:
      "An observability tool can show the failure. It never ran the graph, so it has no checkpoint to replay from. Linea does.",
    image: "/linea/linea-signals.png",
    imageAlt: "Linea monitoring view with open signals",
    how: {
      title: "The fix loop starts at the checkpoint",
      lead: "When a node misses, keep the steps that already succeeded. Change the prompt or model on that node and replay it against the payload it originally received.",
      steps: [
        {
          title: "Capture the execution",
          copy: "As the graph runs, Linea records the input and output for each node, including the memory and tool results in scope at that moment.",
        },
        {
          title: "Find the step to change",
          copy: "Inspect the execution, identify the node that needs work, and update its prompt, model, configuration, or code.",
        },
        {
          title: "Replay from the checkpoint",
          copy: "Linea loads the payload captured for that node and runs the updated step against the same context. Upstream nodes remain unchanged.",
        },
        {
          title: "Compare the new result",
          copy: "Review the new output against the original execution with the same thread, facts, and tool results in scope.",
        },
      ],
    },
    example: {
      title: "Replay starts with captured input",
      copy: "This is the payload the response node received during the original execution. Linea restores this checkpoint when you replay the step.",
      lang: "json",
      code: `{
  "runId": "run_4f2a",
  "step": "draft_reply",
  "input": {
    "thread": "cust_8891",
    "facts": ["plan is annual", "last invoice failed"],
    "draft": null
  }
}`,
    },
    compare: {
      title: "Iterate without repeating completed work",
      lead: "A full rerun creates a new execution. Step-level replay uses the recorded context from the execution you are already investigating.",
      columns: ["Full workflow run", "Step-level replay"],
      rows: [
        {
          label: "Work executed",
          left: "Every node runs again",
          right: "Only the selected node",
        },
        {
          label: "Input to the broken node",
          left: "Newly generated upstream context",
          right: "Captured input from the original run",
        },
        {
          label: "Upstream nodes",
          left: "Repeated",
          right: "Preserved",
        },
        {
          label: "Best for",
          left: "Testing the workflow end to end",
          right: "Debugging or refining one step",
        },
      ],
    },
    split: {
      left: {
        title: "Update what matters",
        items: [
          "The prompt, model, tool, or code on one node",
          "The step you want to evaluate again",
        ],
      },
      right: {
        title: "Preserve the original context",
        items: [
          "Upstream work that already succeeded",
          "The thread, facts, and tool results in the checkpoint",
        ],
      },
    },
    not: {
      title: "A controlled loop for debugging and evaluation",
      lead: "Replay is grounded in a checkpoint from a completed or interrupted execution, so every iteration starts from known input.",
      items: [
        {
          title: "Target a single node",
          copy: "Choose the exact step you want to run again instead of queuing a new execution of the whole graph.",
        },
        {
          title: "Keep the same input",
          copy: "A new trigger creates new context. Replay restores the input from the execution you selected.",
        },
        {
          title: "Work from production context",
          copy: "The checkpoint comes from a real hosted execution, including the data available to that node at the time.",
        },
      ],
    },
  },
  {
    slug: "memory",
    href: "/memory",
    name: "Memory",
    hint: "Facts that survive the run",
    title: "Memory that survives the run.",
    description:
      "Facts and workspace knowledge live on the host. The next execution can read what the last one learned, without a store you operate.",
    excerpt:
      "The graph asks for memory. The host keeps it. remember, recall, and search are calls on the run — not a weekend of schema design.",
    image: "/linea/linea-evals.png",
    imageAlt: "Linea evals for a published workflow",
    how: {
      title: "Persistent context, available on the next execution",
      lead: "Store structured facts for future runs and give every graph a consistent way to search shared knowledge from the host.",
      steps: [
        {
          title: "Remember structured facts",
          copy: "Save durable information such as a customer plan or account state as records the next execution can read.",
        },
        {
          title: "Recall context on the next run",
          copy: "A later execution can retrieve what an earlier one learned, so the agent has continuity across conversations and triggers.",
        },
        {
          title: "Search workspace knowledge",
          copy: "Any graph can retrieve policies or product guidance through one hosted search path.",
        },
      ],
    },
    example: {
      title: "Remember, recall, and search",
      copy: "The same memory from the builder and the SDK. One store for the agent, not one store per graph.",
      lang: "ts",
      code: `await memory.remember("billing", {
  plan: "annual",
  last_invoice: "failed",
});

const facts = await memory.recall("billing");

const policy = await memory.search(
  "billing",
  "retry policy for annual plans",
);`,
    },
    compare: {
      title: "Add memory without operating another service",
      lead: "Linea keeps facts and workspace knowledge on the host, so every graph behind the agent reads the same store.",
      columns: ["Self-managed memory", "Linea Memory"],
      rows: [
        {
          label: "Where facts live",
          left: "A database and schema you maintain",
          right: "A managed workspace store",
        },
        {
          label: "How a node reads them",
          left: "Custom integration for each graph",
          right: "Shared remember, recall, and search APIs",
        },
        {
          label: "Workspace documents",
          left: "A retrieval pipeline you operate",
          right: "Hosted workspace search",
        },
        {
          label: "Builder vs SDK",
          left: "Separate integrations can drift",
          right: "One memory layer across both surfaces",
        },
      ],
    },
    split: {
      left: {
        title: "Your workflow decides",
        items: [
          "Which facts should persist beyond the current run",
          "When earlier context should be recalled",
          "What knowledge a node should search for",
        ],
      },
      right: {
        title: "Linea provides",
        items: [
          "A managed fact store for each workspace",
          "A hosted retrieval path for shared knowledge",
          "The same memory from the builder and SDK",
        ],
      },
    },
  },
];

export function getProduct(slug: ProductSlug): Product {
  const product = PRODUCTS.find((item) => item.slug === slug);
  if (!product) {
    throw new Error(`Unknown product: ${slug}`);
  }

  return product;
}
