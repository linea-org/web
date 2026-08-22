import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Linea · The hosted ops layer for agents";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage(
    "Linea",
    "The hosted ops layer for agents.",
  );
}
