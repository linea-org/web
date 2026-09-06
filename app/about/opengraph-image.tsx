import { createContentOgImage, ogContentType, ogSize } from "@/lib/og";
import { SHOTS } from "@/lib/shots";

export const alt = "About · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createContentOgImage({
    eyebrow: "About",
    title: "The runtime and control plane for production agents.",
    description:
      "Linea Labs is building an agentic runtime: execute the graph, hold the checkpoint, operate the run.",
    image: SHOTS.builder,
  });
}
