import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "FAQ · Linea";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "FAQ",
    title: "What people usually ask first.",
    description:
      "What Linea is, how it differs from frameworks and visual tools, and what step-level replay requires.",
  });
}
