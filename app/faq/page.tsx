import { JsonLd } from "@/components/seo/json-ld";
import { faqGraph } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { FaqJump } from "./jump";

export const metadata = pageMeta({
  title: "FAQ",
  description: "Answers about Linea's runtime, visual builder, TypeScript SDK, memory, checkpoints, and step-level replay.",
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
