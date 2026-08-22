import { createOgImage, ogContentType, ogSize } from "@/lib/og";
import { getProduct } from "@/lib/product";

const product = getProduct("runtime");

export const alt = `${product.name} · Linea`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage(product.name, product.title);
}
