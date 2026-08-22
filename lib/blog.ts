import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { BlogMeta } from "@/lib/blog-meta";

export type { BlogMeta } from "@/lib/blog-meta";
export { formatPostDate } from "@/lib/blog-meta";

const BLOG_DIR = path.join(process.cwd(), "content/blog");

function readMeta(file: string): BlogMeta {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data } = matter(raw);

  return {
    slug,
    title: String(data.title ?? ""),
    date: String(data.date ?? ""),
    author: String(data.author ?? "Linea Labs"),
    excerpt: String(data.excerpt ?? ""),
    image: String(data.image ?? ""),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
  };
}

export function listPosts(): BlogMeta[] {
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"));

  return files
    .map(readMeta)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
}

export function relatedPosts(
  slug: string,
  tags: string[],
  limit = 4,
): BlogMeta[] {
  const others = listPosts().filter((post) => post.slug !== slug);
  const tagSet = new Set(tags);
  const matching = others.filter((post) =>
    post.tags.some((tag) => tagSet.has(tag)),
  );
  const used = new Set(matching.map((post) => post.slug));
  const rest = others.filter((post) => !used.has(post.slug));

  return [...matching, ...rest].slice(0, limit);
}

export function postExists(slug: string): boolean {
  return fs.existsSync(path.join(BLOG_DIR, `${slug}.mdx`));
}

export function getPost(slug: string): { meta: BlogMeta; content: string } {
  const file = path.join(BLOG_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);

  return {
    meta: {
      slug,
      title: String(data.title ?? ""),
      date: String(data.date ?? ""),
      author: String(data.author ?? "Linea Labs"),
      excerpt: String(data.excerpt ?? ""),
      image: String(data.image ?? ""),
      tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    },
    content,
  };
}
