import { createOgImage, ogContentType, ogSize } from "@/lib/og";
import { getProduct } from "@/lib/product";

const product = getProduct("memory");

export const alt = `${product.name} · Linea`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: product.name,
    title: product.title,
    description: product.description,
  });
}
