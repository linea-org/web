import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Who it is for · Linea";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Who it is for",
    title: "One platform for every team shipping agents.",
    description:
      "Build, run, and improve production agent workflows across product, AI, and platform teams.",
  });
}
