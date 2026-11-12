import { DOCS_URL } from "@/lib/docs";
import { GITHUB_URL } from "@/lib/socials";

export type NavLink = {
  kind: "link";
  href: string;
  label: string;
  external?: boolean;
};

export type NavFeatured = {
  href: string;
  badge: string;
  title: string;
  copy: string;
  surface: "lp-surface-sky" | "lp-surface-mist" | "lp-surface-floor";
};

export type NavIconName =
  | "runtime"
  | "replay"
  | "memory"
  | "docs"
  | "blog"
  | "research"
  | "faq"
  | "audience"
  | "start"
  | "architecture"
  | "guide"
  | "github";

export type NavMenuItem = {
  href: string;
  label: string;
  hint: string;
  icon: NavIconName;
  /** Opens in a new tab with an external-link mark (docs, GitHub). */
  external?: boolean;
};

export type NavMenu = {
  kind: "menu";
  label: string;
  items: NavMenuItem[];
  featured: NavFeatured;
};

export type NavItem = NavLink | NavMenu;

export const NAV: NavItem[] = [
  {
    kind: "menu",
    label: "Product",
    items: [
      {
        href: "/runtime",
        label: "Runtime",
        hint: "The host that runs the graph",
        icon: "runtime",
      },
      {
        href: "/replay",
        label: "Replay",
        hint: "One step, original input",
        icon: "replay",
      },
      {
        href: "/memory",
        label: "Memory",
        hint: "Facts that survive the run",
        icon: "memory",
      },
      {
        href: "/docs",
        label: "Docs",
        hint: "Author and run the graph",
        icon: "docs",
      },
      {
        href: `${DOCS_URL}/docs/getting-started`,
        label: "Getting started",
        hint: "Run your first workflow",
        icon: "start",
        external: true,
      },
      {
        href: `${DOCS_URL}/docs/architecture`,
        label: "Architecture",
        hint: "API, workers, and queues",
        icon: "architecture",
        external: true,
      },
    ],
    featured: {
      href: "/replay",
      badge: "New",
      title: "Step-level replay",
      copy: "Rerun one node against the exact input it originally saw.",
      surface: "lp-surface-floor",
    },
  },
  {
    kind: "menu",
    label: "Resources",
    items: [
      { href: "/blog", label: "Blog", hint: "Writing from the team", icon: "blog" },
      {
        href: "/research",
        label: "Research",
        hint: "Technical perspectives",
        icon: "research",
      },
      { href: "/faq", label: "FAQ", hint: "Common questions", icon: "faq" },
      {
        href: "/audience",
        label: "Who it is for",
        hint: "Technical builders first",
        icon: "audience",
      },
      {
        href: "/blog/what-is-an-ai-agent-runtime",
        label: "Agent runtime explained",
        hint: "Framework vs runtime",
        icon: "guide",
      },
      {
        href: GITHUB_URL,
        label: "GitHub",
        hint: "Open source, Apache-2.0",
        icon: "github",
        external: true,
      },
    ],
    featured: {
      href: "/blog/what-is-an-ai-agent-runtime",
      badge: "Latest post",
      title: "What is an AI agent runtime?",
      copy: "A framework gives you the loop. A runtime runs it, keeps the record, and replays one step.",
      surface: "lp-surface-sky",
    },
  },
  { kind: "link", href: DOCS_URL, label: "Docs", external: true },
  { kind: "link", href: "/pricing", label: "Pricing" },
];
