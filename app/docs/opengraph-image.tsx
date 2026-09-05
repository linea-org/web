import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Docs · Linea";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Docs",
    title: "Build and operate workflows with Linea.",
    description:
      "Learn how to build, deploy, observe, and replay agent workflows with Linea.",
  });
}
