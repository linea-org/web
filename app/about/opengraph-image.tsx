import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "About · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage("About", "Linea Labs builds Linea.");
}
