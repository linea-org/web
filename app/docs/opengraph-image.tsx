import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Docs · Linea";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Docs",
    title: "How to author a graph and replay a step.",
    description: "How to author a graph, run it, and replay a single step.",
  });
}
