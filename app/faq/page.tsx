import { JsonLd } from "@/components/seo/json-ld";
import { faqGraph } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { FaqJump } from "./jump";

export const metadata = pageMeta({
  title: "FAQ",
  description:
    "What Linea is, how it differs from LangGraph and n8n, why it is not the Linea blockchain, and how the host, checkpoint, and fix loop work.",
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
