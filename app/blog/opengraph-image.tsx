import { listPosts } from "@/lib/blog";
import {
  createContentOgImage,
  createOgImage,
  ogContentType,
  ogSize,
} from "@/lib/og";

export const alt = "Blog · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const image = listPosts()[0]?.image;
  const content = {
    eyebrow: "Blog",
    title: "Notes from Linea Labs.",
    description:
      "Practical notes on reliable execution, step-level replay, memory, and building agents for production.",
  };

  return image
    ? createContentOgImage({ ...content, image })
    : createOgImage(content);
}
