import { createOgImage, ogContentType, ogSize } from "@/lib/og";
import { SITE_DESCRIPTION } from "@/lib/site";

export const alt = "Linea · The hosted ops layer for agents";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Linea",
    title: "The hosted ops layer for agents.",
    description: SITE_DESCRIPTION,
  });
}
