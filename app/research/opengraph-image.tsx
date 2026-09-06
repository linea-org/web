import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Research · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Research",
    title: "The host, the checkpoint, and the loop after a failure.",
    description:
      "Notes on executing the graph and operating production agents from those records.",
  });
}
