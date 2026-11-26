export type BlogMeta = {
  slug: string;
  title: string;
  date: string;
  /** When the post was last edited in Sanity; never earlier than `date`. */
  updated: string;
  author: string;
  excerpt: string;
  image: string;
  tags: string[];
};

export function formatPostDate(date: string): string {
  const parsed = new Date(`${date}T00:00:00`);
  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
