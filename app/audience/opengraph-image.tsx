import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Who it is for · Linea";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage("Who it is for", "Technical first. SDK first.");
}
