"use client";

import { useState } from "react";
import Link from "next/link";
import { TAG_PILL, tagBadge, tagDot } from "@/components/blog/tag-style";
import { PlatformShot } from "@/components/media/platform-shot";
import { formatPostDate, type BlogMeta } from "@/lib/blog-meta";

const CARD = "rounded-[10px] border border-white/10 bg-white/[0.03]";

export function BlogCatalog({ posts }: { posts: BlogMeta[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();
  const visible = tag
    ? posts.filter((post) => post.tags.includes(tag))
    : posts;
  const filters: { value: string | null; label: string; count: number }[] = [
    { value: null, label: "All", count: posts.length },
    ...tags.map((item) => ({
      value: item,
      label: item,
      count: posts.filter((post) => post.tags.includes(item)).length,
    })),
  ];

  return (
    <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_15rem]">
      <div className={`${CARD} divide-y divide-white/10 overflow-hidden`}>
        {visible.length === 0 ? (
          <p className="px-5 py-10 text-sm text-muted sm:px-6">
            No posts in this tag yet.
          </p>
        ) : (
          visible.map((post) => {
            const primary = post.tags[0];

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="lp-press group flex min-w-0 flex-col gap-4 p-3 hover:bg-white/[0.03] sm:flex-row sm:items-center sm:gap-6 sm:pr-6"
              >
                <div className="overflow-hidden rounded-[8px] ring-1 ring-white/10 sm:w-44 sm:shrink-0 lg:w-56">
                  <PlatformShot
                    src={post.image}
                    alt=""
                    sizes="(min-width: 1024px) 14rem, (min-width: 640px) 11rem, 100vw"
                  />
                </div>
                {/* One text column that uses the row's width: tag, date and author on a single
                    meta line, then title and excerpt. */}
                <div className="min-w-0 flex-1 px-2 pb-2 sm:p-0">
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-muted">
                    {primary ? (
                      <span className={`${TAG_PILL} ${tagBadge(primary)}`}>
                        {primary}
                      </span>
                    ) : null}
                    <span>{formatPostDate(post.date)}</span>
                    <span aria-hidden className="text-white/25">
                      ·
                    </span>
                    <span>{post.author}</span>
                  </div>
                  <h3 className="mt-3 text-xl font-medium tracking-tight text-balance">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-pretty text-muted">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>
      <aside className="lg:sticky lg:top-20 lg:self-start">
        <div className={`${CARD} p-2`}>
          <p className="px-3 pt-2 pb-3 text-xs font-medium tracking-wider text-muted uppercase">
            Topics
          </p>
          <ul className="space-y-0.5">
            {filters.map((filter) => {
              const active = tag === filter.value;

              return (
                <li key={filter.label}>
                  <button
                    type="button"
                    aria-pressed={active}
                    className={`flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm transition-colors motion-reduce:transition-none ${active ? "bg-white/[0.07] text-foreground" : "text-muted hover:bg-white/[0.04] hover:text-foreground"}`}
                    onClick={() => setTag(filter.value)}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span
                        aria-hidden
                        className={`size-1.5 rounded-full ${filter.value ? tagDot(filter.value) : "bg-white/60"}`}
                      />
                      {filter.label}
                    </span>
                    <span className="font-mono text-xs tabular-nums">
                      {filter.count}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </div>
  );
}
