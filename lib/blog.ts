import { cache } from "react";
import type { PortableTextProps } from "next-sanity";
import { client, sanityConfigured } from "@/sanity/client";
import type { BlogMeta } from "@/lib/blog-meta";

export type { BlogMeta } from "@/lib/blog-meta";
export { formatPostDate } from "@/lib/blog-meta";

/** Seconds a static page may serve old blog content before refreshing. */
export const BLOG_REVALIDATE = 60;

const META_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  date,
  "updated": coalesce(_updatedAt, date),
  "author": coalesce(author, "Linea Labs"),
  "excerpt": coalesce(excerpt, ""),
  "image": coalesce(image.asset->url, ""),
  "tags": coalesce(tags, [])
`;

const LIST_QUERY = /* groq */ `*[_type == "post" && defined(slug.current)] | order(date desc) { ${META_FIELDS} }`;

const POST_QUERY = /* groq */ `*[_type == "post" && slug.current == $slug][0] {
  ${META_FIELDS},
  body[]{
    ...,
    _type == "image" => { ..., "url": asset->url }
  }
}`;

/** Portable Text body. Shape is defined by sanity/schema/post.ts. */
export type PostBody = PortableTextProps["value"];

async function fetchPosts<T>(
  query: string,
  params: Record<string, unknown> = {},
): Promise<T> {
  // Pages stay static and are rebuilt in the background at most once per
  // BLOG_REVALIDATE seconds, so edits go live within that window.
  return client.fetch<T>(query, params, {
    next: { revalidate: BLOG_REVALIDATE },
  });
}

// De-dupes the several list calls made while rendering a single page.
export const listPosts = cache(async (): Promise<BlogMeta[]> => {
  if (!sanityConfigured) {
    return [];
  }

  return fetchPosts<BlogMeta[]>(LIST_QUERY);
});

export async function relatedPosts(
  slug: string,
  tags: string[],
  limit = 4,
): Promise<BlogMeta[]> {
  const others = (await listPosts()).filter((post) => post.slug !== slug);
  const tagSet = new Set(tags);
  const matching = others.filter((post) =>
    post.tags.some((tag) => tagSet.has(tag)),
  );
  const used = new Set(matching.map((post) => post.slug));
  const rest = others.filter((post) => !used.has(post.slug));

  return [...matching, ...rest].slice(0, limit);
}

/** Returns null when the slug does not exist (callers should 404). */
export const getPost = cache(
  async (slug: string): Promise<{ meta: BlogMeta; body: PostBody } | null> => {
    if (!sanityConfigured) {
      return null;
    }

    const doc = await fetchPosts<(BlogMeta & { body?: PostBody }) | null>(
      POST_QUERY,
      { slug },
    );

    if (!doc) {
      return null;
    }

    const { body, ...meta } = doc;

    return { meta, body: body ?? [] };
  },
);
