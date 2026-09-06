import Link from "next/link";
import { PostCards } from "@/components/blog/post-cards";
import { Band } from "@/components/landing/frame";
import { Container } from "@/components/landing/ui";
import { listPosts } from "@/lib/blog";

export function Blog() {
  const posts = listPosts().slice(0, 3);

  return (
    <Band marks={false} className="lp-defer">
      <section id="blog">
        <Container className="flex flex-col items-start gap-5 py-10 sm:py-12 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              From the Linea team
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Notes on the host, the checkpoint, and the loop after a
              failure.
            </p>
          </div>
          <Link
            href="/blog"
            className="lp-btn lp-btn-secondary inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-white/25 px-3 text-sm font-medium tracking-tight"
          >
            View Blog
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              className="size-3.5 shrink-0 text-muted"
            >
              <path
                d="M5.7 3.2 10.3 8l-4.6 4.8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="square"
              />
            </svg>
          </Link>
        </Container>
        <div className="px-5 pb-8 sm:px-8 sm:pb-10">
          <PostCards posts={posts} />
        </div>
      </section>
    </Band>
  );
}
