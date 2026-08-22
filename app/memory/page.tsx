import { ProductPage } from "@/components/product/product-page";
import { getProduct } from "@/lib/product";
import { pageMeta } from "@/lib/seo";

const product = getProduct("memory");

export const metadata = pageMeta({
  title: product.name,
  description: product.description,
  path: product.href,
});

export default function MemoryPage() {
  return <ProductPage product={product} />;
}
