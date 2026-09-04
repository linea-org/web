import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "About · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "About",
    title: "Linea Labs builds Linea.",
    description:
      "Linea Labs is a small team building Linea, a hosted runtime for agent graphs.",
  });
}
