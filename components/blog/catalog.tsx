"use client";

import { useState } from "react";
import Link from "next/link";
import { tagBadge, tagDot } from "@/components/blog/tag-style";
import { PlatformShot } from "@/components/media/platform-shot";
import { formatPostDate, type BlogMeta } from "@/lib/blog-meta";

export function BlogCatalog({ posts }: { posts: BlogMeta[] }) {
  const [tag, setTag] = useState<string | null>(null);
  const tags = [...new Set(posts.flatMap((post) => post.tags))].sort();
  const visible = tag
    ? posts.filter((post) => post.tags.includes(tag))
    : posts;

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:divide-x lg:divide-black/[0.08]">
      <div className="border-t border-black/[0.08] lg:max-h-[32rem] lg:overflow-y-auto">
        {visible.length === 0 ? (
          <p className="px-5 py-10 text-sm text-muted sm:px-8">
            No posts in this tag yet.
          </p>
        ) : (
          visible.map((post) => {
            const primary = post.tags[0];

            return (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex min-w-0 flex-col gap-4 border-b border-black/[0.08] px-5 py-6 last:border-b-0 sm:flex-row sm:gap-6 sm:px-8 sm:py-7"
              >
                <div className="overflow-hidden border border-black/[0.08] sm:w-36 sm:shrink-0 lg:w-44">
                  <PlatformShot
                    src={post.image}
                    alt=""
                    sizes="(min-width: 1024px) 11rem, (min-width: 640px) 9rem, 100vw"
                  />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="min-w-0 sm:max-w-md">
                    <div className="flex items-start gap-2">
                      {primary ? (
                        <span
                          aria-hidden
                          className={`mt-2 size-1.5 shrink-0 rounded-full ${tagDot(primary)}`}
                        />
                      ) : null}
                      <h3 className="text-lg font-medium tracking-tight">
                        {post.title}
                      </h3>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 sm:shrink-0 sm:flex-col sm:items-end">
                    <p className="text-xs text-muted">
                      {formatPostDate(post.date)}
                    </p>
                    <p className="text-xs text-muted">{post.author}</p>
                    {primary ? (
                      <span
                        className={`border px-1.5 py-0.5 text-[10px] font-medium tracking-[0.12em] uppercase sm:mt-2 ${tagBadge(primary)}`}
                      >
                        {primary}
                      </span>
                    ) : null}
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
      <aside className="border-t border-black/[0.08] px-5 py-6 sm:px-8">
        <ul className="space-y-3">
          <li>
            <button
              type="button"
              className={`flex w-full items-center justify-between text-sm ${tag === null ? "text-foreground" : "text-muted hover:text-foreground"}`}
              onClick={() => setTag(null)}
            >
              All
              <span className="font-mono text-xs tabular-nums">
                {posts.length}
              </span>
            </button>
          </li>
          {tags.map((item) => {
            const count = posts.filter((post) => post.tags.includes(item)).length;

            return (
              <li key={item}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-3 text-sm ${tag === item ? "text-foreground" : "text-muted hover:text-foreground"}`}
                  onClick={() => setTag(item)}
                >
                  <span className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className={`size-1.5 rounded-full ${tagDot(item)}`}
                    />
                    {item}
                  </span>
                  <span className="font-mono text-xs tabular-nums">{count}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
}
