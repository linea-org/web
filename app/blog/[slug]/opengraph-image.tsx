import { getPost } from "@/lib/blog";
import {
  createContentOgImage,
  createOgImage,
  ogContentType,
  ogSize,
} from "@/lib/og";

export const alt = "Note · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) {
    return createOgImage({
      eyebrow: "Note",
      title: "Linea Labs",
      description: "A note from Linea Labs.",
    });
  }

  const { meta } = post;
  const content = {
    eyebrow: meta.author,
    title: meta.title,
    description: meta.excerpt,
  };

  return meta.image
    ? createContentOgImage({ ...content, image: meta.image })
    : createOgImage(content);
}
