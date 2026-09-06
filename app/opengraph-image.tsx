import { createContentOgImage, ogContentType, ogSize } from "@/lib/og";
import { SHOTS } from "@/lib/shots";
import { SITE_DESCRIPTION } from "@/lib/site";

export const alt = "Linea · Build and operate production agents";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createContentOgImage({
    eyebrow: "Linea",
    title: "Build and operate production agents.",
    description: SITE_DESCRIPTION,
    image: SHOTS.dashboard,
  });
}
