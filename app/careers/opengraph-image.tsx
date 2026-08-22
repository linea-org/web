import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Careers · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage("Careers", "No open roles yet.");
}
