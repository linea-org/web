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
    <div className="grid lg:grid-cols-[minmax(0,1fr)_16rem] lg:divide-x lg:divide-white/12">
      <div className="max-h-[32rem] overflow-y-auto border-t border-white/12">
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
                className="flex min-w-0 gap-3 border-b border-white/12 px-5 py-6 last:border-b-0 sm:gap-6 sm:px-8 sm:py-7"
              >
                <div className="relative h-16 w-24 shrink-0 overflow-hidden border border-white/12 sm:h-24 sm:w-36 lg:h-28 lg:w-44">
                  <PlatformShot src={post.image} alt="" fill />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
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
                  <div className="flex shrink-0 flex-col items-start gap-1.5 sm:items-end">
                    <p className="text-xs text-muted">
                      {formatPostDate(post.date)}
                    </p>
                    <p className="text-xs text-muted">{post.author}</p>
                    {primary ? (
                      <span
                        className={`mt-2 border px-1.5 py-0.5 text-[10px] font-medium tracking-[0.12em] uppercase ${tagBadge(primary)}`}
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
      <aside className="border-t border-white/12 px-5 py-6 sm:px-8">
        <ul className="space-y-3">
          <li>
            <button
              type="button"
              className={`flex w-full items-center justify-between text-sm ${tag === null ? "text-white" : "text-muted hover:text-white"}`}
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
                  className={`flex w-full items-center justify-between gap-3 text-sm ${tag === item ? "text-white" : "text-muted hover:text-white"}`}
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
