import type { MetadataRoute } from "next";
import { listPosts } from "@/lib/blog";
import { PRODUCTS } from "@/lib/product";
import { SITE_URL } from "@/lib/site";

const STATIC = [
  "/",
  "/about",
  "/audience",
  "/blog",
  "/careers",
  "/faq",
  "/pricing",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages = STATIC.map((path) => ({
    url: new URL(path, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  })) satisfies MetadataRoute.Sitemap;

  const products = PRODUCTS.map((product) => ({
    url: new URL(product.href, SITE_URL).toString(),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const posts = listPosts().map((post) => ({
    url: new URL(`/blog/${post.slug}`, SITE_URL).toString(),
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...pages, ...products, ...posts];
}
