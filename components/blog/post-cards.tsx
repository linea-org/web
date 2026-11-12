import Link from "next/link";
import { Logo } from "@/components/landing/logo";
import { PlatformShot } from "@/components/media/platform-shot";
import { SWIPE_ITEM, SWIPE_ROW } from "@/components/landing/ui";
import { formatPostDate, type BlogMeta } from "@/lib/blog-meta";

export function PostCards({
  posts,
  eager = false,
}: {
  posts: BlogMeta[];
  eager?: boolean;
}) {
  return (
    <div className={SWIPE_ROW}>
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className={`lp-press group relative flex flex-col overflow-hidden rounded-[10px] border border-white/10 bg-white/[0.03] ${SWIPE_ITEM}`}
        >
          <div className="p-2">
            <div className="relative aspect-[1627/967] overflow-hidden rounded-[8px] bg-white/[0.03]">
              <PlatformShot
                src={post.image}
                alt=""
                fill
                eager={eager}
                sizes="(min-width: 768px) 26rem, 100vw"
                className="transition-transform duration-250 group-hover:scale-[1.02] motion-reduce:transition-none"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col px-4 pt-3 pb-4 sm:px-5">
            <h3 className="text-base font-medium tracking-tight">{post.title}</h3>
            <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-muted">{post.excerpt}</p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-4">
              <div className="flex items-center gap-2">
                <Logo size={24} />
                <p className="text-sm">{post.author}</p>
              </div>
              <p className="text-xs text-muted">{formatPostDate(post.date)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
