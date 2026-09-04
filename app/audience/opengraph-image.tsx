import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Who it is for · Linea";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Who it is for",
    title: "For people who already know how they would do this.",
    description:
      "Linea is for founders, platform engineers, and teams who already know how they would operate an agent graph, and would rather not.",
  });
}
