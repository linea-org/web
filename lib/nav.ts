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
      { href: "/runtime", label: "Runtime", hint: "The host that runs the graph" },
      { href: "/replay", label: "Replay", hint: "One step, original input" },
      { href: "/memory", label: "Memory", hint: "Facts that survive the run" },
    ],
  },
  {
    kind: "menu",
    label: "Resources",
    items: [
      { href: "/blog", label: "Blog", hint: "Writing from the team" },
      { href: "/research", label: "Research", hint: "Technical perspectives" },
      { href: "/faq", label: "FAQ", hint: "Common questions" },
      { href: "/audience", label: "Who it is for", hint: "Technical builders first" },
    ],
  },
  { kind: "link", href: DOCS_URL, label: "Docs", external: true },
  { kind: "link", href: "/pricing", label: "Pricing" },
];
