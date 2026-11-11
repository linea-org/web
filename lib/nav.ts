import { DOCS_URL } from "@/lib/docs";

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
  | "audience";

export type NavMenuItem = {
  href: string;
  label: string;
  hint: string;
  icon: NavIconName;
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
    ],
    featured: {
      href: "/blog/why-replay-needs-the-checkpoint",
      badge: "Latest post",
      title: "Why replay needs the checkpoint",
      copy: "That input only exists if the host executed the run.",
      surface: "lp-surface-sky",
    },
  },
  { kind: "link", href: DOCS_URL, label: "Docs", external: true },
  { kind: "link", href: "/pricing", label: "Pricing" },
];
