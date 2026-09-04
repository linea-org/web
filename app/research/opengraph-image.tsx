import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Research · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Research",
    title: "What has to be true for replay to exist.",
    description:
      "Notes and theses on checkpoints, step-level replay, and the work a framework leaves on you.",
  });
}
