import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Pricing · Linea";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage("Pricing", "Coming soon.");
}
