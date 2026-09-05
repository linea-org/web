import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Research · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Research",
    title: "Engineering reliable agents, one layer at a time.",
    description:
      "Technical perspectives on durable execution, checkpoints, step-level replay, and memory for production agents.",
  });
}
