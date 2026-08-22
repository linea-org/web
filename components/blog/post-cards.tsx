import Image from "next/image";
import Link from "next/link";
import { formatPostDate, type BlogMeta } from "@/lib/blog-meta";

export function PostCards({
  posts,
  framed = true,
}: {
  posts: BlogMeta[];
  framed?: boolean;
}) {
  return (
    <div className="grid gap-3 md:grid-cols-3 md:gap-1.5">
      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/blog/${post.slug}`}
          className={`relative flex flex-col ${framed ? "border border-white/12" : ""}`}
        >
          <div className="lp-hatch border-b border-white/12 p-1.5">
            <div className="relative overflow-hidden border border-white/12">
              <Image
                src={post.image}
                alt=""
                width={800}
                height={480}
                className="h-40 w-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col px-5 py-5 sm:px-6">
            <h3 className="text-base font-medium tracking-tight">{post.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted">{post.excerpt}</p>
            <div className="mt-auto flex items-center justify-between gap-3 pt-5">
              <div className="flex items-center gap-2">
                <Image
                  src="/ref/rocket-avatar.webp"
                  alt=""
                  width={24}
                  height={24}
                  className="size-6 object-cover"
                />
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
