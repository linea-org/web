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
    return createOgImage("Note", "Linea Labs");
  }

  const { meta } = getPost(slug);
  return createOgImage(meta.author, meta.title);
}
