import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Blog · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage("Blog", "Notes from Linea Labs.");
}
