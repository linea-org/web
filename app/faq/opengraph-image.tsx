import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "FAQ · Linea";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "FAQ",
    title: "Everything you need to know.",
    description:
      "Answers about Linea's runtime, visual builder, TypeScript SDK, memory, checkpoints, and step-level replay.",
  });
}
