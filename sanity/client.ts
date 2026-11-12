import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "./env";

export const sanityConfigured = projectId.length > 0;

export const client = createClient({
  projectId: projectId || "unconfigured",
  dataset,
  apiVersion,
  // Published content only, served from Sanity's CDN (purged on publish).
  // Next's static pages refresh on a timer; see BLOG_REVALIDATE in lib/blog.ts.
  useCdn: true,
  perspective: "published",
  ...(process.env.SANITY_API_HOST
    ? { apiHost: process.env.SANITY_API_HOST, useProjectHostname: false }
    : {}),
});
