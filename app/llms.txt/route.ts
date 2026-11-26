import { listPosts } from "@/lib/blog";
import { DOCS_GETTING_STARTED_URL, DOCS_URL } from "@/lib/docs";
import { PRODUCTS } from "@/lib/product";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";
import { GITHUB_URL } from "@/lib/socials";

/** Posts come from Sanity, so refresh the file hourly instead of rebuilding it per request. */
export const revalidate = 3600;

const page = (path: string) => new URL(path, SITE_URL).toString();

/**
 * llms.txt for language-model crawlers: what the site is and where the
 * canonical pages are. Every line restates something the site already says.
 */
export async function GET() {
  const posts = await listPosts();

  const lines = [
    "# Linea",
    "",
    `> ${SITE_DESCRIPTION}`,
    "",
    "Linea is from Linea Labs (getlinea.app). It is not the Linea blockchain network from Consensys, and not the Linea sketching app.",
    "",
    "## Product",
    "",
    ...PRODUCTS.map((p) => `- [${p.name}](${page(p.href)}): ${p.hint}`),
    `- [SDK](${page("/sdk")}): Start runs from TypeScript.`,
    `- [Architecture](${page("/architecture")}): API, workers, checkpoints.`,
    `- [Pricing](${page("/pricing")}): Free during early access; usage-based pricing will be published before any paid plan.`,
    `- [FAQ](${page("/faq")}): Common questions.`,
    "",
    "## Docs",
    "",
    `- [Linea documentation](${DOCS_URL}/docs): Architecture, APIs and security boundaries.`,
    `- [Getting started](${DOCS_GETTING_STARTED_URL}): Build the SDKs, run the examples, and find your way around the docs.`,
    `- [Public API overview](${DOCS_URL}/docs/api): The public /v1 operations and the credential each surface takes.`,
    `- [All docs pages, in llms.txt form](${DOCS_URL}/llms.txt)`,
    "",
    "## Writing",
    "",
    ...posts.map((post) => `- [${post.title}](${page(`/blog/${post.slug}`)})${post.excerpt ? `: ${post.excerpt}` : ""}`),
    "",
    "## Source",
    "",
    `- [GitHub](${GITHUB_URL}): The SDKs, the public protocol and the docs.`,
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
