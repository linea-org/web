import { createContentOgImage, ogContentType, ogSize } from "@/lib/og";
import { getProduct } from "@/lib/product";

const product = getProduct("memory");

export const alt = `${product.name} · Linea`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createContentOgImage({
    eyebrow: product.name,
    title: product.title,
    description: product.description,
    image: product.image,
  });
}
