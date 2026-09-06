import { JsonLd } from "@/components/seo/json-ld";
import { faqGraph } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { FaqJump } from "./jump";

export const metadata = pageMeta({
  title: "FAQ",
  description:
    "What Linea is, why it is not a workflow-automation tool, and how the host, checkpoint, and fix loop work.",
  path: "/faq",
});

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqGraph()} />
      <FaqJump />
    </>
  );
}
