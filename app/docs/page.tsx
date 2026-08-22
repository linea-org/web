import { redirect } from "next/navigation";
import { DOCS_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Docs",
  description: "How to author a graph, run it, and replay a single step.",
  path: "/docs",
});

export default function DocsPage() {
  redirect(DOCS_URL);
}
