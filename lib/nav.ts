import { DOCS_URL } from "@/lib/docs";

export type NavLink = {
  kind: "link";
  href: string;
  label: string;
  external?: boolean;
};

export type NavMenu = {
  kind: "menu";
  label: string;
  items: { href: string; label: string; hint: string }[];
};

export type NavItem = NavLink | NavMenu;

export const NAV: NavItem[] = [
  {
    kind: "menu",
    label: "Product",
    items: [
      { href: "/runtime", label: "Runtime", hint: "Host the graph" },
      { href: "/replay", label: "Replay", hint: "One step, not the run" },
      { href: "/memory", label: "Memory", hint: "Facts across runs" },
    ],
  },
  {
    kind: "menu",
    label: "Resources",
    items: [
      { href: "/blog", label: "Blog", hint: "Latest from the team" },
      { href: "/faq", label: "FAQ", hint: "Straight answers" },
      { href: "/audience", label: "Who it is for", hint: "Technical first" },
    ],
  },
  { kind: "link", href: DOCS_URL, label: "Docs", external: true },
  { kind: "link", href: "/pricing", label: "Pricing" },
];
