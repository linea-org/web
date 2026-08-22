import Link from "next/link";
import { PostCards } from "@/components/blog/post-cards";
import { Band } from "@/components/landing/frame";
import { Container } from "@/components/landing/ui";
import { listPosts } from "@/lib/blog";

export function Blog() {
  const posts = listPosts().slice(0, 3);

  return (
    <Band marks={false}>
      <section id="blog">
        <Container className="flex flex-col gap-6 py-10 sm:py-12 md:flex-row md:items-start md:justify-between">
          <div className="max-w-xl">
            <h2 className="text-3xl font-medium tracking-tight sm:text-4xl">
              The latest from Linea Labs
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted">
              Notes on checkpoints, step-level replay, and the ops half
              frameworks do not ship.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md border border-white/12 px-3 text-sm font-medium tracking-tight hover:border-white/25"
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
