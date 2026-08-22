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
    hint: "Host the graph",
    title: "Design the graph. Linea keeps it running.",
    description:
      "Hosted checkpoints, retries, crash safety, and a sandboxed code node. Builder and SDK write the same graph.",
    excerpt:
      "Author visually or in JSON. Trigger from a schedule, a webhook, or your SDK. Crash safety, retries, and resume come with the host.",
    image: "/ref/rightfit-jobs.jpg",
    imageAlt: "Placeholder interface from rightfit.so",
    how: {
      title: "After the trigger, someone has to stay up",
      lead: "Cron, a webhook, and client.run() are solved. The runtime is the process that takes the graph from there: workers, retries, a boxed code node, and a record of every step.",
      steps: [
        {
          title: "One graph, two editors",
          copy: "The canvas and the SDK write the same workflow JSON and the same node registry. Pick the surface you already work in.",
        },
        {
          title: "Any start is fine",
          copy: "A schedule, an HTTP hook, or a call from your app can begin the run. Linea does not care how it started.",
        },
        {
          title: "Crash, then resume",
          copy: "If the host dies on step three, the next worker picks up from the last checkpoint. You do not re-queue the whole graph by hand.",
        },
        {
          title: "Code stays in a box",
          copy: "The code node is an escape hatch for real logic. It still runs somewhere that cannot take the host down.",
        },
      ],
    },
    example: {
      title: "Author it in the repo",
      copy: "This is the SDK path. The builder draws the same nodes. The host executes that graph, not the editor you used.",
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
      title: "The half a framework leaves on you",
      lead: "LangGraph and tools like it solve the agent loop. You still host the process. That second half is the runtime.",
      columns: ["A framework", "Linea runtime"],
      rows: [
        {
          label: "Where the process lives",
          left: "Your worker, your queue",
          right: "Hosted with the graph",
        },
        {
          label: "A crash mid-run",
          left: "You wire resume",
          right: "Resume from the last node",
        },
        {
          label: "A code node",
          left: "A process you babysit",
          right: "Sandboxed on the host",
        },
        {
          label: "Builder vs file in git",
          left: "Often two graphs",
          right: "One JSON, two views",
        },
      ],
    },
    split: {
      left: {
        title: "You write",
        items: [
          "The nodes and edges unique to the problem",
          "The prompts, HTTP calls, and code escape hatch",
          "The schedule, webhook, or SDK call that starts it",
        ],
      },
      right: {
        title: "Linea runs",
        items: [
          "The worker pool and crash resume",
          "The sandbox around the code node",
          "A checkpoint after every node",
        ],
      },
    },
  },
  {
    slug: "replay",
    href: "/replay",
    name: "Replay",
    hint: "One step, not the run",
    title: "Fix one step, not the whole run.",
    description:
      "Step-level replay against the exact input a node saw. No full-graph tax.",
    excerpt:
      "Linea holds the checkpoint and the exact input each step saw. Re-run step four without paying for steps one through three again.",
    image: "/ref/rightfit-profile.jpg",
    imageAlt: "Placeholder profile surface from rightfit.so",
    how: {
      title: "One run, then the one node that broke",
      lead: "Invoice recovery ran. Fetch worked. Reason worked. draft_reply wrote a bad email. Replay that node. Do not pay for fetch and reason again.",
      steps: [
        {
          title: "The run already happened",
          copy: "Linea executed the graph. Each node left a checkpoint: the exact payload it received, including memory and tool results in scope.",
        },
        {
          title: "draft_reply is the break",
          copy: "You change the prompt or the model on that node. You do not touch fetch or reason. Those outputs are already paid for.",
        },
        {
          title: "Replay loads the checkpoint",
          copy: "The host looks up run_4f2a / draft_reply and calls the node again against that object. Nothing upstream moves.",
        },
        {
          title: "You get a new output",
          copy: "Same thread, same facts, new draft. A full re-run would have given you a new run and a new input.",
        },
      ],
    },
    example: {
      title: "The object replay actually loads",
      copy: "This is not your prompt file. It is the payload draft_reply saw when Linea ran it. If this record does not exist, you cannot replay the step.",
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
      title: "What you pay for when it breaks",
      lead: "Retrying the graph and replaying a step are different products. Only one of them needs the host to have stored the input.",
      columns: ["Re-run the graph", "Replay the step"],
      rows: [
        {
          label: "Bill",
          left: "Fetch, reason, and draft again",
          right: "draft_reply only",
        },
        {
          label: "Input to the broken node",
          left: "Whatever this new run produces",
          right: "The payload from run_4f2a",
        },
        {
          label: "Upstream nodes",
          left: "Run again",
          right: "Stay still",
        },
        {
          label: "Required record",
          left: "The graph definition",
          right: "The checkpoint from a real run",
        },
      ],
    },
    split: {
      left: {
        title: "You change",
        items: [
          "The prompt, model, or code on draft_reply",
          "Which step to call again",
        ],
      },
      right: {
        title: "You leave alone",
        items: [
          "Fetch and reason, already succeeded",
          "The thread, facts, and tool results in the checkpoint",
        ],
      },
    },
    not: {
      title: "Replay is not a retry button",
      lead: "If the host never ran the graph, there is no input to load. A framework can model the loop. It cannot replay what it never stored.",
      items: [
        {
          title: "Not a full retry",
          copy: "Retry queues the graph. Replay names one node.",
        },
        {
          title: "Not a new run",
          copy: "A new trigger creates a new input. Replay reuses the old one.",
        },
        {
          title: "Not a local debugger",
          copy: "The payload lived on the host. That is why replay is a hosted feature.",
        },
      ],
    },
  },
  {
    slug: "memory",
    href: "/memory",
    name: "Memory",
    hint: "Facts across runs",
    title: "Facts persist across runs.",
    description:
      "Agent facts and workspace knowledge without a store and RAG pipeline you have to operate.",
    excerpt:
      "Agents remember what they learned last time, and search a workspace knowledge base, without you standing up a store and a RAG pipeline.",
    image: "/ref/rocket-hero.webp",
    imageAlt: "Placeholder visual from rocket.new",
    how: {
      title: "The graph asks. The host keeps the store.",
      lead: "Memory is not a longer prompt. It is a fact that has to live until the next trigger, and a knowledge base the node can search without you shipping RAG.",
      steps: [
        {
          title: "Write a fact, not a hope",
          copy: "plan=annual and last_invoice=failed are records. They are not sentences you stuff back into the next system prompt.",
        },
        {
          title: "The next run can read them",
          copy: "Tuesday's recovery graph can recall Monday's facts. If that requires your database, you are still doing the ops half.",
        },
        {
          title: "Search is a node, not a repo",
          copy: "Workspace knowledge (retry policy, plan rules) is a host path. You do not stand up embeddings for every workflow.",
        },
      ],
    },
    example: {
      title: "Remember, recall, search",
      copy: "The node calls the host. You do not open a client to your own store. Builder and SDK hit the same memory.",
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
      title: "The store you should not be standing up",
      lead: "Every team that ships a real agent builds a fact table and a retrieval path. That glue is the memory product.",
      columns: ["You build the store", "Memory on Linea"],
      rows: [
        {
          label: "Where facts live",
          left: "Your DB, your schema, your migrations",
          right: "The workspace store on the host",
        },
        {
          label: "How a node reads them",
          left: "Glue you write per graph",
          right: "recall and search on the run",
        },
        {
          label: "Workspace documents",
          left: "A RAG pipeline you operate",
          right: "A hosted search path",
        },
        {
          label: "Builder vs SDK",
          left: "Easy to fork two stores",
          right: "One store, either editor",
        },
      ],
    },
    split: {
      left: {
        title: "The graph asks",
        items: [
          "Remember plan and last_invoice on this workspace",
          "Recall those facts on the next trigger",
          "Search retry policy in the knowledge base",
        ],
      },
      right: {
        title: "Linea keeps",
        items: [
          "The fact store keyed by workspace",
          "The retrieval path, already hosted",
          "The same memory whether you drew the graph or wrote it",
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
