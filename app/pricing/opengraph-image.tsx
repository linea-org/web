import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Pricing · Linea";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Pricing",
    title: "No prices yet.",
    description:
      "Linea pricing is coming soon. We will price usage when the bill is real.",
  });
}
