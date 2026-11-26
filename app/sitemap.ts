import type { MetadataRoute } from "next";
import { listPosts } from "@/lib/blog";
import { PRODUCTS } from "@/lib/product";
import { PAGE_DATES, type DatedPath } from "@/lib/page-dates";
import { SITE_URL } from "@/lib/site";

const STATIC = [
  "/",
  "/about",
  "/audience",
  "/blog",
  "/research",
  "/careers",
  "/pricing",
  "/architecture",
  "/sdk",
  "/faq",
] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await listPosts();

  // The blog index changes whenever a post is published or edited, so it takes
  // the most recently edited post's date. Every other page has a fixed date in
  // lib/page-dates.ts.
  const newestPost = posts.reduce<Date | undefined>((latest, post) => {
    const date = new Date(post.updated);
    return !latest || date > latest ? date : latest;
  }, undefined);

  function lastModified(path: DatedPath | "/blog"): Date | undefined {
    return path === "/blog" ? newestPost : new Date(PAGE_DATES[path]);
  }

  const pages = STATIC.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: lastModified(path),
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const products = PRODUCTS.map((product) => ({
    url: new URL(product.href, SITE_URL).toString(),
    lastModified: new Date(PAGE_DATES[product.href]),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const postEntries = posts.map((post) => ({
    url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
    lastModified: new Date(post.updated),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...products, ...postEntries];
}
