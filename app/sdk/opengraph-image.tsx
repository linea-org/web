import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "TypeScript SDK · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "SDK",
    title: "Start the run from your app.",
    description:
      "TypeScript starts executions and reads them. The builder writes the graph.",
  });
}
