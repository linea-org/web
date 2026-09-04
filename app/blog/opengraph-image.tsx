import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Blog · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Blog",
    title: "Notes from Linea Labs.",
    description:
      "How we think about checkpoints, replay, and the work a framework leaves on you.",
  });
}
