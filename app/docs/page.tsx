import { redirect } from "next/navigation";
import { DOCS_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Docs",
  description:
    "Author the graph, run it on the host, and operate the agent from the checkpoint.",
  path: "/docs",
});

export default function DocsPage() {
  redirect(DOCS_URL);
}
