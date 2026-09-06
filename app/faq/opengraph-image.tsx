import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "FAQ · Linea";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "FAQ",
    title: "Everything you need to know.",
    description:
      "What Linea is, why it is not a workflow-automation tool, and how the fix loop works.",
  });
}
