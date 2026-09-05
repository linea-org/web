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
      { href: "/runtime", label: "Runtime", hint: "Reliable agent execution" },
      { href: "/replay", label: "Replay", hint: "Debug a single step" },
      { href: "/memory", label: "Memory", hint: "Context across runs" },
    ],
  },
  {
    kind: "menu",
    label: "Resources",
    items: [
      { href: "/blog", label: "Blog", hint: "Writing from the team" },
      { href: "/research", label: "Research", hint: "Technical perspectives" },
      { href: "/faq", label: "FAQ", hint: "Common questions" },
      { href: "/audience", label: "Teams", hint: "Who builds with Linea" },
    ],
  },
  { kind: "link", href: DOCS_URL, label: "Docs", external: true },
  { kind: "link", href: "/pricing", label: "Pricing" },
];
