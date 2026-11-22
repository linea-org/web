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
      "Linea is an AI agent runtime. It runs the workflow behind your agent: checkpoints on every step, retries, and recovery. You ship the agent. We run the graph.",
    excerpt:
      "Draw the graph in the builder. Start an execution manually, from your app, a webhook, or a schedule. The host writes a checkpoint after every node.",
    image: "/linea/linea-approved-run.png",
    imageAlt:
      "A succeeded Linea execution for a refund workflow, with its step trace and the approval step expanded",
    how: {
      title: "From trigger to a finished execution",
      lead: "The agent is what you ship. The workflow is the versioned graph behind it. Linea executes that graph and keeps the record of every step.",
      steps: [
        {
          title: "One versioned graph",
          copy: "The builder saves the workflow as a graph, and each publish creates a version. The host runs that exact version. An agent may use several graphs. Those are still one product.",
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
          title: "Pause for an approval",
          copy: "An approval node holds the run at its checkpoint until someone decides. The execution then continues from that step instead of starting over.",
        },
      ],
    },
    example: {
      title: "Every version is a graph",
      copy: "This is what the builder saves and the host runs: a trigger, an entry node, nodes, and edges. Each publish freezes it as a version you can replay and test against.",
      lang: "json",
      code: `{
  "version": 1,
  "trigger": { "type": "webhook" },
  "entryNodeId": "fetch",
  "nodes": [
    {
      "id": "fetch",
      "type": "http",
      "config": { "method": "GET", "url": "https://billing.internal/invoices" }
    },
    {
      "id": "reason",
      "type": "ai",
      "config": { "prompt": "Explain the failed invoice in one paragraph." }
    }
  ],
  "edges": [{ "from": "fetch", "to": "reason" }]
}`,
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
          label: "A step that needs sign-off",
          left: "Wait states and callbacks you build",
          right: "An approval node that holds the checkpoint",
        },
        {
          label: "Run history",
          left: "Logs you stitch together",
          right: "Every step's input, output, tokens, and cost",
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
          "Approvals that pause a run until someone decides",
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
    image: "/linea/linea-failed-step.png",
    imageAlt:
      "A failed Linea execution with the failing memory step expanded and Replay and Add to regression suite buttons",
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
      "Memory nodes store keyed facts on the host. The next execution can read what the last one learned, without a store you operate.",
    excerpt:
      "A memory node writes a keyed value. A later run reads it back. Facts are scoped to your end user and a namespace, and every fact expires: 90 days by default, one year at most.",
    image: "/linea/linea-memory-step.png",
    imageAlt:
      "A Linea execution with the Memory step expanded: it read the plan for a customer and returned found true with the value Scale",
    how: {
      title: "Persistent context, available on the next execution",
      lead: "Store structured facts for future runs, scoped to the person they belong to, and share them across workflows when you choose.",
      steps: [
        {
          title: "Write a fact",
          copy: "A memory node saves a value under a key, such as a customer's plan or account state, for the end user named in the run's input.",
        },
        {
          title: "Read it on the next run",
          copy: "A later execution reads the same key, so the agent has continuity across conversations and triggers. AI nodes can also pull recent facts into their prompt.",
        },
        {
          title: "Share or isolate",
          copy: "Leave the namespace empty to keep memory inside one workflow, or set the same namespace on several workflows to share it. Every fact expires: after 90 days by default, or set a shorter or longer life, up to one year.",
        },
      ],
    },
    example: {
      title: "A memory node",
      copy: "Memory is a node in the graph, configured in the builder. This one stores a customer's plan for 30 days in the billing namespace.",
      lang: "json",
      code: `{
  "id": "remember-plan",
  "type": "memory",
  "config": {
    "operation": "write",
    "subjectPath": "customer.id",
    "namespace": "billing",
    "key": "plan",
    "valuePath": "customer.plan",
    "ttlSeconds": 2592000
  }
}`,
    },
    compare: {
      title: "Add memory without operating another service",
      lead: "Linea keeps facts on the host, so every graph behind the agent can read the same store.",
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
          right: "A memory node that reads or writes by key",
        },
        {
          label: "Whose memory it is",
          left: "Scoping you enforce in every query",
          right: "Scoped to the end user in each run",
        },
        {
          label: "Facts that should expire",
          left: "Cleanup jobs you schedule",
          right: "An expiry set on the write, 90 days by default",
        },
      ],
    },
    split: {
      left: {
        title: "Your workflow decides",
        items: [
          "Which facts should persist beyond the current run",
          "When earlier context should be read",
          "Which workflows share a namespace",
        ],
      },
      right: {
        title: "Linea provides",
        items: [
          "A managed fact store for each workspace",
          "Per-user scoping and an expiry on every fact",
          "Reads and writes recorded like any other step",
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
