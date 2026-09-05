import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Pricing · Linea";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Pricing",
    title: "Simple pricing is on the way.",
    description:
      "Linea is free during early access. Transparent usage-based pricing is coming soon.",
  });
}
