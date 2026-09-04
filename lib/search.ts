export const SEARCH_GROUPS = [
  "Product",
  "Resources",
  "Writing",
  "Questions",
] as const;

export type SearchGroup = (typeof SEARCH_GROUPS)[number];

export type SearchEntry = {
  id: string;
  href: string;
  title: string;
  hint: string;
  group: SearchGroup;
  external?: boolean;
};

export function filterSearchEntries(
  entries: SearchEntry[],
  query: string,
): SearchEntry[] {
  const needle = query.trim().toLowerCase();

  if (!needle) {
    return entries;
  }

  return entries.filter((entry) => {
    const hay = `${entry.title} ${entry.hint} ${entry.group}`.toLowerCase();
    return hay.includes(needle);
  });
}
