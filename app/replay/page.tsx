import { ProductPage } from "@/components/product/product-page";
import { getProduct } from "@/lib/product";
import { pageMeta } from "@/lib/seo";

const product = getProduct("replay");

export const metadata = pageMeta({
  title: "Step-level replay for AI agents",
  description: product.description,
  path: product.href,
});

export default function ReplayPage() {
  return <ProductPage product={product} />;
}
