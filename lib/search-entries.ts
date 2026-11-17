import { listPosts } from "@/lib/blog";
import { DOCS_URL } from "@/lib/docs";
import { PRODUCTS } from "@/lib/product";
import type { SearchEntry } from "@/lib/search";

const RESOURCE_PAGES: Omit<SearchEntry, "id">[] = [
  { href: "/blog", title: "Blog", hint: "Writing from the team", group: "Resources" },
  { href: "/research", title: "Research", hint: "Claims we will defend", group: "Resources" },
  { href: "/faq", title: "FAQ", hint: "Common questions", group: "Resources" },
  {
    href: "/audience",
    title: "Who it is for",
    hint: "And who it is not",
    group: "Resources",
  },
  {
    href: DOCS_URL,
    title: "Docs",
    hint: "Author the graph. Run it on the host.",
    group: "Resources",
    external: true,
  },
  { href: "/pricing", title: "Pricing", hint: "Not ready yet", group: "Resources" },
  { href: "/about", title: "About", hint: "Linea Labs", group: "Resources" },
  {
    href: "/getting-started",
    title: "Getting started",
    hint: "Publish, then run it",
    group: "Product",
  },
  {
    href: "/architecture",
    title: "Architecture",
    hint: "API, workers, checkpoints",
    group: "Product",
  },
  {
    href: "/sdk",
    title: "SDK",
    hint: "Start runs from TypeScript",
    group: "Product",
  },
];

function withId(entry: Omit<SearchEntry, "id">): SearchEntry {
  return {
    id: `${entry.group}:${entry.href}:${entry.title}`,
    ...entry,
  };
}

export async function getSearchEntries(): Promise<SearchEntry[]> {
  return [
    ...PRODUCTS.map((product) =>
      withId({
        href: product.href,
        title: product.name,
        hint: product.hint,
        group: "Product",
      }),
    ),
    ...RESOURCE_PAGES.map(withId),
    ...(await listPosts()).map((post) =>
      withId({
        href: `/blog/${post.slug}`,
        title: post.title,
        hint: post.excerpt,
        group: "Writing",
      }),
    ),
  ];
}
