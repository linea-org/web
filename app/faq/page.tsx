import { JsonLd } from "@/components/seo/json-ld";
import { faqGraph } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { FaqJump } from "./jump";

export const metadata = pageMeta({
  title: "FAQ",
  description: "What Linea is, how it differs from frameworks and visual tools, and what step-level replay requires.",
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
