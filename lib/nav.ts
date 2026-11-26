import { DOCS_GETTING_STARTED_URL, DOCS_URL } from "@/lib/docs";

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
  | "github"
  | "sdk"
  | "about"
  | "careers";

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
  /** Links per column, filled top to bottom. */
  columns: readonly number[];
  featured: NavFeatured;
};

export type NavItem = NavLink | NavMenu;

export const NAV: NavItem[] = [
  {
    kind: "menu",
    label: "Product",
    columns: [3, 1, 2],
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
        href: DOCS_GETTING_STARTED_URL,
        label: "Getting started",
        hint: "Publish, then run it",
        icon: "start",
        external: true,
      },
      {
        href: "/architecture",
        label: "Architecture",
        hint: "API, workers, checkpoints",
        icon: "architecture",
      },
      {
        href: "/sdk",
        label: "SDK",
        hint: "Start runs from TypeScript",
        icon: "sdk",
      },
    ],
    featured: {
      href: "/blog/why-replay-needs-the-checkpoint",
      badge: "From the blog",
      title: "Why replay needs the checkpoint",
      copy: "You cannot rerun one step unless the host kept the input that step saw.",
      surface: "lp-surface-floor",
    },
  },
  {
    kind: "menu",
    label: "Resources",
    columns: [2, 3, 1],
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
        href: "/about",
        label: "About",
        hint: "The team behind Linea",
        icon: "about",
      },
      {
        href: "/careers",
        label: "Careers",
        hint: "No open roles yet",
        icon: "careers",
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
