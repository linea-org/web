import { redirect } from "next/navigation";
import { DOCS_URL } from "@/lib/docs";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Docs",
  description: "Learn how to build, deploy, observe, and replay agent workflows with Linea.",
  path: "/docs",
});

export default function DocsPage() {
  redirect(DOCS_URL);
}
