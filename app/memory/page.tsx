import { ProductPage } from "@/components/product/product-page";
import { getProduct } from "@/lib/product";
import { pageMeta } from "@/lib/seo";

const product = getProduct("memory");

export const metadata = pageMeta({
  title: "Agent memory that survives the run",
  description:
    "Agent memory on the host: memory nodes store keyed facts that persist across runs, so the next execution reads what the last one learned, with no store you operate.",
  path: product.href,
});

export default function MemoryPage() {
  return <ProductPage product={product} />;
}
