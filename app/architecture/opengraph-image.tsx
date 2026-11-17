import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Architecture · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Architecture",
    title: "The host is the graph, the worker, and the checkpoint.",
    description:
      "One published graph, queue-backed workers with a 30-second lease, and a checkpoint after every completed node.",
  });
}
