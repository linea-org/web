import { pageMeta } from "@/lib/seo";
import { FaqJump } from "./jump";

export const metadata = pageMeta({
  title: "FAQ",
  description: "Straight answers on the hosted ops layer, replay, and the SDK.",
  path: "/faq",
});

export default function FaqPage() {
  return <FaqJump />;
}
