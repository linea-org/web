import { createContentOgImage, ogContentType, ogSize } from "@/lib/og";
import { SHOTS } from "@/lib/shots";

export const alt = "About · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createContentOgImage({
    eyebrow: "About",
    title: "The runtime for production agents.",
    description:
      "Linea Labs is building the platform for reliable, production-ready agent workflows.",
    image: SHOTS.builder,
  });
}
