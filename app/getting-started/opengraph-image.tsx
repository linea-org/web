import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Getting started · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Getting started",
    title: "Publish a graph, then run it.",
    description:
      "Draw a workflow, publish a version, and start an execution. The host writes a checkpoint after every node.",
  });
}
