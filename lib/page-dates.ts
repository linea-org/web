/**
 * When each page's content last changed, for the sitemap's <lastmod>.
 *
 * Search engines stop trusting <lastmod> once every URL reports the build
 * time, so these are fixed dates, not `new Date()`. Bump a page's date in the
 * same commit that materially changes it (new claims, new sections, changed
 * facts), not for typo fixes or styling. The blog index and posts take their
 * dates from the posts themselves (see app/sitemap.ts).
 */
export const PAGE_DATES = {
  "/": "2026-11-26",
  "/about": "2026-11-22",
  "/audience": "2026-11-22",
  "/research": "2026-11-12",
  "/careers": "2026-11-18",
  "/pricing": "2026-11-18",
  "/architecture": "2026-11-22",
  "/sdk": "2026-11-22",
  "/faq": "2026-11-18",
  "/runtime": "2026-11-22",
  "/replay": "2026-11-22",
  "/memory": "2026-11-22",
} as const;

export type DatedPath = keyof typeof PAGE_DATES;
