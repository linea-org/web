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
    hint: "Reliable agent execution",
    title: "Reliable execution for every agent workflow.",
    description:
      "Build and deploy agent workflows on managed infrastructure with checkpoints, retries, automatic recovery, and sandboxed code.",
    excerpt:
      "Design visually or define workflows in TypeScript, then start them from your app, a webhook, or a schedule. Linea keeps every execution durable and observable.",
    image: "/linea/linea-builder.png",
    imageAlt: "Linea builder with a document summarization graph",
    how: {
      title: "From trigger to completed run",
      lead: "Deploy a workflow once and let Linea manage what happens next: execution, retries, checkpoints, custom code, and a complete record of every step.",
      steps: [
        {
          title: "One workflow, two ways to build",
          copy: "Use the visual builder for fast collaboration or the TypeScript SDK for code-first development. Both create the same workflow definition.",
        },
        {
          title: "Start from anywhere",
          copy: "Trigger a run from a schedule, an HTTP webhook, or directly from your application using the SDK.",
        },
        {
          title: "Recover automatically",
          copy: "Linea checkpoints each completed node. If an execution is interrupted, it can resume from the latest successful step.",
        },
        {
          title: "Run custom code safely",
          copy: "Add business logic with a sandboxed code node without exposing the rest of the runtime to untrusted execution.",
        },
      ],
    },
    example: {
      title: "Define the workflow in your codebase",
      copy: "Create a graph with the SDK and keep it alongside the rest of your application. Open the same workflow in the builder whenever a visual view is useful.",
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
      title: "Ship without building the runtime yourself",
      lead: "Keep ownership of your agent logic while Linea manages the infrastructure required to execute it reliably.",
      columns: ["Self-managed stack", "Linea Runtime"],
      rows: [
        {
          label: "Where the process lives",
          left: "Workers and queues you operate",
          right: "Managed with the workflow",
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
          "The events that should start each workflow",
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
    hint: "Debug a single step",
    title: "Replay the step that needs another pass.",
    description:
      "Update and replay one node from its original input without rerunning the rest of the workflow.",
    excerpt:
      "Every node records the payload it received. Change a prompt, model, or tool and replay that step with the same context while completed upstream work stays untouched.",
    image: "/linea/linea-signals.png",
    imageAlt: "Linea monitoring view with open signals",
    how: {
      title: "Return to the exact point you want to improve",
      lead: "When the final response in a workflow misses the mark, keep the successful retrieval and reasoning steps. Update the response node and replay only that step.",
      steps: [
        {
          title: "Capture the execution",
          copy: "As the workflow runs, Linea records the input and output for each node, including the memory and tool results available at that moment.",
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
          copy: "Choose the exact step you want to run again instead of queuing the full workflow.",
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
    hint: "Context across runs",
    title: "Give every run the context it needs.",
    description:
      "Persist agent facts across runs and search workspace knowledge without operating a separate memory and retrieval service.",
    excerpt:
      "Let workflows remember important facts, recall them on the next execution, and search shared workspace knowledge whenever a node needs more context.",
    image: "/linea/linea-evals.png",
    imageAlt: "Linea evals for a published workflow",
    how: {
      title: "Persistent context, available when workflows need it",
      lead: "Store structured facts for future runs and give every workflow a consistent way to search shared knowledge from the managed runtime.",
      steps: [
        {
          title: "Remember structured facts",
          copy: "Save durable information such as a customer plan or account state as records that workflows can use again.",
        },
        {
          title: "Recall context on the next run",
          copy: "A future execution can retrieve what an earlier run learned, giving the agent continuity across sessions and triggers.",
        },
        {
          title: "Search workspace knowledge",
          copy: "Let any workflow retrieve relevant policies, product information, or operating guidance through one hosted search path.",
        },
      ],
    },
    example: {
      title: "Remember, recall, and search",
      copy: "Access the same managed memory from workflows created in the builder or defined with the SDK.",
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
      lead: "Linea provides a consistent storage and retrieval layer for facts and workspace knowledge across all of your workflows.",
      columns: ["Self-managed memory", "Linea Memory"],
      rows: [
        {
          label: "Where facts live",
          left: "A database and schema you maintain",
          right: "A managed workspace store",
        },
        {
          label: "How a node reads them",
          left: "Custom integration for each workflow",
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
