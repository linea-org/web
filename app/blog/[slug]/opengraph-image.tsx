import { getPost, postExists } from "@/lib/blog";
import { createOgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "Note · Linea Labs";
export const size = ogSize;
export const contentType = ogContentType;

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!postExists(slug)) {
    return createOgImage({
      eyebrow: "Note",
      title: "Linea Labs",
      description: "A note from Linea Labs.",
    });
  }

  const { meta } = getPost(slug);
  return createOgImage({
    eyebrow: meta.author,
    title: meta.title,
    description: meta.excerpt,
  });
}
