import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Who it is for · Linea";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Who it is for",
    title: "For people who would otherwise operate this layer themselves.",
    description:
      "Technical builders first. You ship the agent. We execute the graph.",
  });
}
