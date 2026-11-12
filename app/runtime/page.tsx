import { ProductPage } from "@/components/product/product-page";
import { getProduct } from "@/lib/product";
import { pageMeta } from "@/lib/seo";

const product = getProduct("runtime");

export const metadata = pageMeta({
  title: "AI agent runtime with checkpoints",
  description: product.description,
  path: product.href,
});

export default function RuntimePage() {
  return <ProductPage product={product} />;
}
