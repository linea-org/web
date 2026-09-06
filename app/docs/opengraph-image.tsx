import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Docs · Linea";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return createOgImage({
    eyebrow: "Docs",
    title: "Author the graph. Run it on the host.",
    description:
      "How to define a workflow, execute it, and operate the agent from the checkpoint.",
  });
}
