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
      "Notes on executing the graph, holding the checkpoint, and operating production agents.",
  };

  return image
    ? createContentOgImage({ ...content, image })
    : createOgImage(content);
}
